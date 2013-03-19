define(['chai'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	xdescribe('global export', function () {

		it('should exist', function (done) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = '../try-catch-finally.js';

			s.onload = function () {
				expect(window.c24w).to.be.an('object');
				expect(window.c24w.try).to.be.a('function');
				done();
			};

			document.getElementsByTagName('head')[0].appendChild(s);
		});

	});

});