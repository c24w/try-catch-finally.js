'use strict';
describe('finally', function () {
  var assert = chai.assert;

  function throws(throwable) {
    return function throwThing() { throw throwable; };
  }

  function noop() {}

  it('chains from try', function () {
    assert.isFunction(_try().finally,
      'expected to chain from empty try');
    assert.isFunction(_try(noop).finally,
      'expected to chain from non-empty try');
  });

  it('chains from catch', function () {
    assert.isFunction(_try().catch().finally,
      'expected to chain from non-empty catch');
    assert.isFunction(_try(noop).catch(noop).finally,
      'expected to chain from indiscriminate catch');
    assert.isFunction(_try(noop).catch(123, noop).finally,
      'expected to chain from catch by value');
    assert.isFunction(_try(noop).catch('boolean', noop).finally,
      'expected to chain from catch by name');
    assert.isFunction(_try(noop).catch(Array, noop).finally,
      'expected to chain from catch by constructor');
    assert.isFunction(_try().catch().finally,
      'expected to chain from catch');
    assert.isFunction(_try().catch.call({}).finally,
      'expected to chain catch from catch with modified context');
  });

  it('ignores errors thrown in the finally block', function () {
    var throwInFinally = _try(noop)
      .finally.bind(null, throws(new Error('zing')));
    assert.throws(throwInFinally, Error, 'zing');
  });

  it('terminates the chain', function () {
    assert.isUndefined(_try().finally(),
      'expected to terminate after try');
    assert.isUndefined(_try().catch().finally(),
      'expected to terminate after catch');
  });

  it('calls the finally block', function (done) {
    _try().finally(done);
  });

  it('re-throws any uncaught error', function () {
    var throwFn = throws(new Error('blah'));
    var tcf = _try(throwFn).catch(Number, noop).finally;
    assert.throws(tcf, Error, 'blah');
  });

  it('does not re-throw if no error was thrown', function () {
    assert.doesNotThrow(_try(noop).finally);
  });

  it('does not re-throw if error was handled', function () {
    var throwFn = throws(new Error('blah'));
    assert.doesNotThrow(_try(throwFn).catch(noop).finally);
  });
});
