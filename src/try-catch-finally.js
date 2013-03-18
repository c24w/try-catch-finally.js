/*

To do:

Configurables?
 - value coercian, e.g. try throw '12345' catch 12345 succeeds - default disabled
 - primitive coercian, e.g. try throw 12345 catch Number succeeds - default enabled
 - case-sensitivity - not yet implemented - also, what if there are both string and String objects... catch('string')...?

? catch(/regex-pattern/)

? by value deep equal

Notes:

 - catching precedence (contrived example): {throw 12345} {throw 'Number'} {catch 'Number' gets the second}
 - instanceof fails across frames, e.g. inside an iframe: [] instance of window.top.Array === false

*/

define(function defineTryCatchFinally() {

	String.prototype.__coerceToObject__ =
	Number.prototype.__coerceToObject__ =
	Boolean.prototype.__coerceToObject__ =
	function __coerceToObject__() { return this; };

	function canCoerceToObject(obj) {
		return obj !== undefined
			&& obj !== null
			&& typeof obj.__coerceToObject__ === 'function';
	}


	function caughtErrorIsType(caughtError, typeToCatch) {
		var errorAsObject;

		if (caughtError === typeToCatch) // catch by value
			return true;

		if (typeof typeToCatch === 'string') { // catch by name

			var typeToCatchPattern, errorAsString;

			typeToCatchPattern = new RegExp('^\\[object ' + typeToCatch + '\\]$');

			errorAsString = Object.prototype.toString.call(caughtError);

			if (typeToCatchPattern.test(errorAsString))
				return true;
		}

		errorAsObject = canCoerceToObject(caughtError) ? caughtError.__coerceToObject__() : caughtError;

		return (typeof typeToCatch === 'function') && (errorAsObject instanceof typeToCatch); // catch by constructor

	}

	function TryCatchFinally(tryBlock) {

		var error = {
			raw: undefined,
			exists: false, // undefined can be thrown/caught so cannot check raw for undefined for presence of error
			handled: false
		};

		try {
			tryBlock();
		}
		catch (e) {
			error.raw = e;
			error.exists = true;
		}

		this['catch'] = function (toCatch, handleError) {
			// check catch callback only expecting one argument?
			// configurable to only catch explicitly, i.e. catch(Object) would not catch a Number
			// check arguments more strictly? throw if not function and numArgs === 1?

			function handleSuccessfulCatch() {
				handleError(error.raw);
				setErrorHandled();
			}

			var numArgs = arguments.length;

			if (numArgs > 0 && error.exists && !error.handled) {

				if (numArgs === 1) { // indiscriminate catch
					handleError = toCatch;
					toCatch = undefined;
					handleSuccessfulCatch();
				}
				else if (caughtErrorIsType(error.raw, toCatch)) { // specific catch
					handleSuccessfulCatch();
				}

			}

			return this;
		};

		this['finally'] = function (finallyBlock) {
			if (finallyBlock) finallyBlock();
			if (error.exists && !error.handled) throw error.raw;
		};

		function setErrorHandled() { error.handled = true; }

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});