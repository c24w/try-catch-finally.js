(function preventLeaks() {

	function namespaceTo(ns) {

		function TryCatch(tryBlock) {
			var errorToHandle;
			try {
				tryBlock();
			}
			catch (e) {
				errorToHandle = e;
			}
			this['catch'] = function (errorType, handleError) {
				if (errorNotHandled() && arguments.length > 0) {
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
			this['finally'] = function (callback) {
				if(callback) callback();
				if (errorNotHandled()) throw errorToHandle;
			};
			function setErrorHandled() { errorToHandle = undefined; }
			function isUndefined(subject) { return typeof subject === 'undefined'; }
			function errorNotHandled() { return !isUndefined(errorToHandle); }
			function errorToBeHandledIsType(errorType) {
				if (typeof errorType === 'string') {
					return errorToHandle.constructor.name === errorType
						|| new RegExp('^\\s*function ' + errorType + '()').test(errorToHandle.constructor.toString()); // for IE
				}
				return errorToHandle instanceof errorType
					|| errorToHandle.constructor.name === errorType.name;
			}
		}

		ns['try'] = function (tryBlock) {
			return new TryCatch(tryBlock);
		};

	}

	if (typeof define === "function" && define.amd) {
		define(function exportAsDefine() {
			var exportObj = {};
			namespaceTo(exportObj);
			return exportObj['try'];
		});
	}
	else namespaceTo(window.c24w = window.c24w || {});

})();