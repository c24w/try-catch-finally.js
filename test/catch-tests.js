'use strict';
describe('catch', function () {
  var spy, assert = chai.assert;

  var objectTypes = [
    { name: 'string', value: 'blah', ctor: String },
    { name: 'number', value: 123, ctor: Number },
    { name: 'boolean', value: true, ctor: Boolean },
    { name: 'array', value: [], ctor: Array },
    { name: 'object', value: {}, ctor: Object },
    { name: 'Error', value: new Error(), ctor: Error }
  ];

  var specialTypes = [
    { name: 'undefined', value: undefined },
    { name: 'null', value: null }
  ];

  var allTypes = objectTypes.concat(specialTypes);

  function noop() {}

  function throws(throwable) {
    return function throwThing() { throw throwable; };
  }

  function fail(err) { throw new Error('catch was called with: ' + err); }

  beforeEach(function () {
    spy = function spy() {
      spy.calls.push([].slice.call(arguments));
      spy.firstCall = spy.firstCall || arguments;
    };
    spy.calls = [];
  });

  it('chains from try', function () {
    assert.isFunction(_try().catch,
      'expected to chain catch from empty try');
    assert.isFunction(_try(noop).catch,
      'expected to chain catch from non-empty try');
  });

  it('chains recursively', function () {
    assert.isFunction(_try().catch().catch,
      'expected to chain catch from empty catch');
    assert.isFunction(_try().catch(noop).catch,
      'expected to chain catch from indiscriminate catch');
    assert.isFunction(_try().catch(123, noop).catch,
      'expected to chain catch from catch by value');
    assert.isFunction(_try().catch('string', noop).catch,
      'expected to chain catch from catch by name');
    assert.isFunction(_try().catch(Boolean, noop).catch,
      'expected to chain catch from catch by constructor');
    assert.isFunction(_try().catch.call({}).catch,
      'expected to chain catch from catch with modified context');
  });

  describe('indiscriminately', function () {

    allTypes.forEach(function (type) {
      it('is called when ' + type.name + ' is thrown', function () {
        _try(throws(type.value)).catch(spy);
        assert.deepEqual(spy.calls, [[type.value]],
          'expected handler to be called with thrown error');
      });
    });

    it('is not called if try block does not throw', function () {
      _try(noop).catch(fail);
    });

    it('is not called after the first match', function () {
      _try(throws({})).catch(noop).catch(fail);
    });
  });

  describe('by value', function () {

    it('is not called if try block does not throw', function () {
      _try(noop).catch(true, fail);
    });

    it('is not called if error does not match', function () {
      _try(throws('foo')).catch('bar', fail);
    });

    it('is not called after the first match', function () {
      _try(throws(123)).catch(123, noop).catch(123, fail);
    });

    allTypes.forEach(function (type) {
      it('is called when ' + type.name + ' is thrown', function () {
        _try(throws(type.value)).catch(type.value, spy);
        assert.deepEqual(spy.calls, [[type.value]],
          'expected handler to be called with thrown error');
      });
    });
  });

  describe('by name', function () {

    it('is not called if try block does not throw', function () {
      _try(noop).catch('string', fail);
    });

    it('is not called if error does not match', function () {
      _try(throws(123)).catch('boolean', fail);
    });

    it('is not called after the first match', function () {
      _try(throws(null)).catch('null', noop).catch('null', fail);
    });

    it('is not case-sensitive', function () {
      _try(throws(null)).catch('nUlL', spy);

      assert.lengthOf(spy.calls, 1,
        'expected handler to be called once');
      assert.lengthOf(spy.firstCall, 1,
        'expected handler to be called with one argument');
      assert.equal(spy.firstCall[0], null,
        'expected handler to be called with thrown error');
    });

    allTypes.forEach(function (type) {
      it('is called when ' + type.name + ' is thrown', function () {
        _try(throws(type.value)).catch(type.name, spy);
        assert.deepEqual(spy.calls, [[type.value]],
          'expected handler to be called with thrown error');
      });
    });
  });

  describe('by constructor', function () {

    it('is not called if try block does not throw', function () {
      _try(noop).catch(Object, fail);
    });

    it('is not called if error does not match', function () {
      _try(throws(true)).catch(Number, fail);
    });

    it('is not called after the first match', function () {
      _try(throws([])).catch(Array, noop).catch(Array, fail);
    });

    specialTypes.forEach(function (type) {
      it('is not called when ' + type.name + ' is thrown', function () {
        _try(throws(type.value)).catch(Function, fail);
      });
    });

    objectTypes.forEach(function (type) {
      it('is called when ' + type.name + ' is thrown', function () {
        _try(throws(type.value)).catch(type.ctor, spy);
        assert.deepEqual(spy.calls, [[type.value]],
          'expected handler to be called with thrown error');
      });
    });
  });
});
