/*

To do:

Configurables?
 - value coercian, e.g. try throw '12345' catch 12345 succeeds - default disabled
 - primitive coercian, e.g. try throw 12345 catch Number succeeds - default enabled
 - case-sensitivity - not yet implemented - also, what if there are both string and String objects... catch('string')...?
 - hierarchical catching - not yet implemented - only catch explicitly, e.g. catch(Object) would not catch a Number

? catch(/regex-pattern/)

? by value deep equal

? check catch callback only expecting one argument

? check arguments more strictly? throw if not function and numArgs === 1

---

Notes:

 - catching precedence (contrived example): {throw 12345} {throw 'Number'} {catch 'Number' gets the second}
 - instanceof fails across frames, e.g. inside an iframe: [] instance of window.top.Array === false

*/

define(['object-checker'], function defineTryCatchFinally(ObjectChecker) {

	function errorShouldBeCaught(caughtError, toCatch) {

		caughtError = new ObjectChecker(caughtError);

		return caughtError.valueEquals(toCatch)
			|| caughtError.nameEquals(toCatch)
			|| caughtError.instanceOf(toCatch);
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
				else if (errorShouldBeCaught(error.raw, toCatch)) { // specific catch
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