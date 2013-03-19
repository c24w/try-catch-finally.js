var tests = Object.keys(window.__testacular__.files).filter(function (file) {
    return /\.test\.js$/.test(file);
});

require(
	{
		baseUrl: '/base/',
		paths: {
			'try-catch-finally': './try-catch-finally.min',
			'object-checker': './src/object-checker',
			'chai': './node_modules/chai/chai',
			'catch-test-helpers': './test/catch-test-helpers'
		}
	},
	tests,
	window.__testacular__.start
);