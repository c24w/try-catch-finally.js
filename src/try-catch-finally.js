define(function defineTryCatchFinally() {

	function TryCatchFinally(tryBlock) {

		var errorToHandle, errorCaught = false, errorHandled = false;
		// errorCaught is because undefined can be thrown (and caught and assigned to errorToHandle)
		// so checking errorToHandle for undefined is not a safe check to see if anything was thrown/caught

		try {
			tryBlock();
		}
		catch (e) {
			errorToHandle = e;
			errorCaught = true;
		}

		this['catch'] = function (errorType, handleError) {
			if (errorCaught && !errorHandled && arguments.length > 0) {
				if (isUndefined(handleError)) {
					handleError = errorType;
					errorType = undefined;
					handleError(errorToHandle);
					setErrorHandled();
				}
				else if (errorToBeHandledIsType(errorType)) {
					handleError(errorToHandle);
					setErrorHandled();
				}
			}
			return this;
		};

		this['finally'] = function (finallyBlock) {
			if (finallyBlock) finallyBlock();
			if (errorCaught && !errorHandled) throw errorToHandle;
		};

		function setErrorHandled() { errorHandled = true; }

		function isUndefined(subject) { return typeof subject === 'undefined'; }

		function errorToBeHandledIsType(errorType) {
		// convert func to only use strings, and pass Obj.name + move instanceof out
		// remove case sensitivity
		// make work for null (uncomment tests)

		// ability to do _try(function () {throw 123}).catch(123, function(e){}), i.e. catch a specific primitive
		// easy first check of errorCaught === errorType then return true

			if (typeof errorType === 'string') {
				return errorToHandle.constructor.name === errorType
					|| new RegExp('^\\s*function ' + errorType + '()').test(errorToHandle.constructor.toString()); // for IE
			}

			return errorToHandle instanceof errorType
				|| errorToHandle.constructor.name === errorType.name;

		}

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});