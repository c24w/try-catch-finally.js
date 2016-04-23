(function umd(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('try-catch-finally', [], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.try = root._try = factory();
  }
}(this, (function tryCatchFinallyFactory(getBoxed) {
  'use strict';

  function hasName(obj, name) {
    if (typeof name !== 'string') { return false; }
    var className = Object.prototype.toString.call(obj).toLowerCase();
    return className === '[object ' + name.toLowerCase() + ']';
  }

  function instanceOf(obj, constructor) {
    var defined = obj !== undefined && obj !== null;
    if (defined && typeof constructor === 'function') {
      // Get the 'boxed' value so instanceof works for primitive literals
      return getBoxed(obj) instanceof constructor;
    }
  }

  return function _try(tryBlock) {
    // Store error in an object so we can use 'in', which will always
    // return true if a property has been set on the object, even if it
    // was set to 'undefined'.
    var state = {};

    function isUnhandledError() { return 'error' in state; }

    function setErrorHandled() { delete state.error; }

    function caughtErrorIs(expectedErr) {
      return state.error === expectedErr
        || hasName(state.error, expectedErr)
          || instanceOf(state.error, expectedErr);
    }

    try {
      if (tryBlock) { tryBlock(); }
    }
    catch (e) {
      state.error = e;
    }

    var chain = {
      catch: function _catch(expectedErr, catchBlock) {
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

        return chain;
      },
      finally: function _finally(finallyBlock) {
        if (finallyBlock) {
          finallyBlock();
        }
        if (isUnhandledError()) {
          throw state.error;
        }
      }
    };

    return chain;
  };
}).bind(null, function getBoxed(obj) {
  // Injected because boxing doesn't work in strict mode </nasty>
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode#Securing_JavaScript
  // jshint strict: false
  return (function () { return this; }).call(obj);
})));
