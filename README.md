try-catch-finally.js
====================

	c24w.try(function () {
	    throw new Error('error message');
	})
	.catch(String, function (e) {
	    console.log('Caught String: ' + e);
	})
	.catch(Error, function (e) {
	    console.log('Caught Error: ' + e);
	})
	.catch(function (e) {
	    console.log('Caught other: ' + e);
	})
	.finally(function () {
	    console.log('Error was caught explicitly');
	});
