// Testacular configuration
// Generated on Wed Mar 13 2013 11:55:28 GMT+0000 (GMT Standard Time)


// base path, that will be used to resolve files and exclude
basePath = '../';


// list of files / patterns to load in the browser
files = [
	MOCHA,
	MOCHA_ADAPTER,
	REQUIRE,
	REQUIRE_ADAPTER,
	{pattern: 'node_modules/chai/chai.js', included: false},
	{pattern: 'src/*.js', included: false}, // raw source
	{pattern: 'test/*.test.js', included: false},
	{pattern: 'test/catch-test-helpers.js', included: false},
	'test/karma-runner.js',
];


// list of files to exclude
exclude = [];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'IE', 'Opera', 'Safari', 'Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
