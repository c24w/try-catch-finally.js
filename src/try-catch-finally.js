define(function defineTryCatchFinally() {

	Number.prototype.coerceToObject =
	String.prototype.coerceToObject =
	Boolean.prototype.coerceToObject =
	function coerceToObject() { return this; };

	function TryCatchFinally(tryBlock) {

		var rawError, coercedError, errorCaught = false, errorHandled = false;
		// errorCaught is because undefined can be thrown (and caught and assigned to rawError)
		// so checking rawError for undefined is not a safe check to see if anything was thrown/caught

		try {
			tryBlock();
		}
		catch (e) {
			coercedError = e;
			rawError = e;
			if (typeof coercedError !== 'undefined' && coercedError.coerceToObject) {
				coercedError = coercedError.coerceToObject(); // coerce primitives to objects
			}
			errorCaught = true;
		}

		this['catch'] = function (errorType, handleError) {
			if (errorCaught && !errorHandled && arguments.length > 0) {
				if (isUndefined(handleError)) {
					handleError = errorType;
					errorType = undefined;
					handleError(rawError);
					setErrorHandled();
				}
				else if (errorToBeHandledIsType(errorType)) {
					handleError(rawError);
					setErrorHandled();
				}
			}
			return this;
		};

		this['finally'] = function (finallyBlock) {
			if (finallyBlock) finallyBlock();
			if (errorCaught && !errorHandled) throw rawError;
		};

		function setErrorHandled() { errorHandled = true; }

		function isUndefined(subject) { return typeof subject === 'undefined'; }

		function errorToBeHandledIsType(errorType) {
			// make type coercian an option! So primities won't always be coerced to objects
			// convert func to only use strings, and pass Obj.name + move instanceof out
			// remove case sensitivity
			// make work for null (uncomment tests)

			// ability to do _try(function () {throw 123}).catch(123, function(e){}), i.e. catch a specific primitive
			// easy first check of errorCaught === errorType then return true
			// also for other literals, but not primitives, e.g. _try(function () { throw {prop:value} } ).catch({..},fn) and for regex / arrays

			if (typeof errorType === 'string') {
				return rawError.constructor.name === errorType
					|| new RegExp('^\\s*function ' + errorType + '()').test(rawError.constructor.toString()); // for IE
			}

			return coercedError instanceof errorType;

		}

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});