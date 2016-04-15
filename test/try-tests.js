'use strict';
describe('try', function () {
  var assert = chai.assert;

  it('is a function', function () {
    assert.isFunction(_try);
  });

  it('calls the try block', function (done) {
    _try(done);
  });
});
