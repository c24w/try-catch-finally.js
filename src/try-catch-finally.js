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

		this['catch'] = function (errorType, handleError) {
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
					handleError = errorType;
					errorType = undefined;
					handleSuccessfulCatch();
				}
				else if (errorToBeHandledIsType(errorType)) {
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

		function errorToBeHandledIsType(errorType) {
			// make type coercian an option! So primities won't always be coerced to objects
			// convert func to only use strings, and pass Obj.name + move instanceof out
			// remove case sensitivity - what if String and string were both different classes?
			// make work for null (uncomment tests)

			// ability to do _try(function () {throw 123}).catch(123, function(e){}), i.e. catch a specific primitive
			// easy first check of isErrorToHandle === errorType then return true
			// also for other literals, but not primitives, e.g. _try(function () { throw {prop:value} } ).catch({..},fn) and for regex / arrays

			// test nonesense or partial match names, e.g. 'Strin'

			// retry null and undefined with Object.prototype.toString.call - may fail in older ecma specs

			if (typeof errorType === 'string') {
				var caughtErrorType = rawError.constructor.name,
					errorTypeToStringPattern, rawErrorAsString;

				if (caughtErrorType === errorType)
					return true;

				errorTypeToStringPattern = new RegExp('^\\[object ' + errorType + '\\]$');
				rawErrorAsString = Object.prototype.toString.call(rawError);

				if (errorTypeToStringPattern.test(rawErrorAsString))
					return true; // for IE
			}

			return coercedError instanceof errorType;

		}

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});