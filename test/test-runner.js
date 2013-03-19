var tests = Object.keys(window.__testacular__.files).filter(function (file) {
    return /\.test\.js$/.test(file);
});

require(
	{
		baseUrl: '/base/',
		paths: {
			'tcf': './src/try-catch-finally',
			'chai': './node_modules/chai/chai',
			'catch-test-helpers': './test/catch-test-helpers',
			'object-checker': './src/object-checker'
		}
	},
	tests,
	window.__testacular__.start
);