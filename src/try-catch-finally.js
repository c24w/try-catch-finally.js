define(function defineTryCatchFinally() {

	Number.prototype.coerceToObject =
	String.prototype.coerceToObject =
	Boolean.prototype.coerceToObject =
	function coerceToObject() { return this; };

	function isUndefined(subject) { return typeof subject === 'undefined'; }

	function isCoerciblePrimitive(obj) {
		return !isUndefined(obj)
			&& obj !== null
			&& typeof obj.coerceToObject === 'function';
	}

	function TryCatchFinally(tryBlock) {

		var rawError, coercedError, isErrorToHandle = false, errorHasBeenHandled = false;
		// isErrorToHandle is because undefined can be thrown (and caught and assigned to rawError)
		// so checking rawError for undefined is not a safe check to see if anything was thrown/caught

		try {
			tryBlock();
		}
		catch (e) {

			rawError = e;

			coercedError = isCoerciblePrimitive(rawError) ? rawError.coerceToObject() : rawError;

			isErrorToHandle = true;

		}

		this['catch'] = function (toCatch, handleError) {
			// check catch callback only expecting one argument?
			// configurable to only catch explicitly, i.e. catch(Object) would not catch a Number
			// check arguments more strictly? throw if not function and numArgs === 1?

			function handleSuccessfulCatch() {
				handleError(rawError);
				setErrorHandled();
			}

			var numArgs = arguments.length;

			if (numArgs > 0 && isErrorToHandle && !errorHasBeenHandled) {

				if (numArgs === 1) {  // catch(function (e) {})
					handleError = toCatch;
					toCatch = undefined;
					handleSuccessfulCatch();
				}
				else if (errorToBeHandledIsType(toCatch)) {
					handleSuccessfulCatch();
				}

			}

			return this;
		};

		this['finally'] = function (finallyBlock) {
			if (finallyBlock) finallyBlock();
			if (isErrorToHandle && !errorHasBeenHandled) throw rawError;
		};

		function setErrorHandled() { errorHasBeenHandled = true; }

		function errorToBeHandledIsType(toCatch) {
			// make type coercian an option! So primities won't always be coerced to objects
			// remove case sensitivity - what if String and string were both different classes?
			// add by value deep equals
			// config option? use coercian for catching by value, but === by default

			// test nonesense or partial match names, e.g. 'Strin'

			// retry null and undefined with Object.prototype.toString.call - may fail in older ecma specs

			// by value takes presidence, also possible overlap:
				// e.g. expecting:
					// { throw new MyObject() }
				// but find:
					// { throw 'MyObject' }
				// catch 'MyObject' gets the string

			if (rawError === toCatch) // catch by value
				return true;

			if (typeof toCatch === 'string') { // catch by name

				var errorTypeToStringPattern, rawErrorAsString;

				if (toCatch === 'Undefined' && isUndefined(rawError)) // special case for undefined
					return true;

				if (toCatch === 'Null' && rawError === null) // special case for null
					return true;

				if (rawError.constructor.name === toCatch) // generic name match
					return true;

				// workaround for no .constructor.name in IE
				errorTypeToStringPattern = new RegExp('^\\[object ' + toCatch + '\\]$');
				rawErrorAsString = Object.prototype.toString.call(rawError);

				if (errorTypeToStringPattern.test(rawErrorAsString))
					return true;
			}

			if (typeof toCatch === 'function') // by constructor
				return coercedError instanceof toCatch;

			return false;

		}

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});