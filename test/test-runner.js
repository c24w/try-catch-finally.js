var tests = Object.keys(window.__testacular__.files).filter(function (file) {
    return /\.test\.js$/.test(file);
});

require(
	{
		baseUrl: '/base/',
		paths: {
			'tcf': 'src/try-catch-finally',
			'chai': 'node_modules/chai/chai'
		}
	},
	tests,
	window.__testacular__.start
);