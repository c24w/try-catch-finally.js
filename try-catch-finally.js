(function buildTryCatchFinally(root) {

	function tryCatchFinallyFactory(undefined) {

		function add__toObject__() {
			String.prototype.__toObject__ =
				Number.prototype.__toObject__ =
				Boolean.prototype.__toObject__ =
				function __toObject__() { return this; };
		}

		function remove_toObject__() {
			delete String.prototype.__toObject__;
			delete Number.prototype.__toObject__;
			delete Boolean.prototype.__toObject__;
		}

		function isConstructablePrimitive(obj) {
			return obj !== undefined
				&& obj !== null
				&& typeof obj.__toObject__ === 'function';
		}

		function ObjectChecker(subject) {

			this.valueEquals = function valueEquals(value) {
				return subject === value;
			};

			this.nameEquals = function nameEquals(name) {
				if (typeof name !== 'string') { return false; }

				var classNamePattern = new RegExp('^\\[object ' + name + '\\]$', 'i');

				var className = Object.prototype.toString.call(subject);

				return classNamePattern.test(className);
			};

			this.instanceOf = function instanceOf(constructor) {
				add__toObject__();

				var subjectAsObject = isConstructablePrimitive(subject)
					? subject.__toObject__()
					: subject;

				remove_toObject__();

				return (typeof constructor === 'function')
					&& (subjectAsObject instanceof constructor);
			};
		}

		return function _try(tryBlock) {
			// Store error in an object so we can use 'in', which will always
			// return true if a property has been set on the object, even if it
			// was set to 'undefined'.
			var state = {};

			function isUnhandledError() { return 'error' in state; }

			function setErrorHandled() { delete state.error; }

			function caughtErrorIs(expectedErr) {
				var actualErr = new ObjectChecker(state.error);

				return actualErr.valueEquals(expectedErr)
					|| actualErr.nameEquals(expectedErr)
					|| actualErr.instanceOf(expectedErr);
			}

			try {
				if (tryBlock) { tryBlock(); }
			}
			catch (e) {
				state.error = e;
			}

			return {

				catch: function (expectedErr, catchBlock) {
					/*
						there is a catchBlock
						and an error was thrown
						and either it's an indiscriminate catch
						or the error matches the expected error
					*/
					var callHandler = arguments.length > 0
						&& isUnhandledError()
						&& (catchBlock === undefined
						|| caughtErrorIs(expectedErr));

					if (callHandler) {
						catchBlock = catchBlock || expectedErr;
						catchBlock(state.error);
						setErrorHandled();
					}

					return this;
				},

				finally: function (finallyBlock) {
					if (finallyBlock) {
						finallyBlock();
					}
					if (isUnhandledError()) {
						throw state.error;
					}
				}

			};

		};

	}

	// TODO: test these
	if (typeof define === 'function' && define.amd) {
		// Expose as AMD module
		define(tryCatchFinallyFactory);
	}
	else {
		// Expose on global
		root.try = root._try = tryCatchFinallyFactory();
	}

})(this);
