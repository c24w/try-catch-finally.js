'use strict';
module.exports = function (config) {
  // Chai first so it doesn't know about almond and AMD itself
  var files = [require.resolve('chai/chai')];
  
  // Bit nasty...
  if (process.env.AMD) {
    console.log('Testing AMD');
    // Almond before the main module
    files.push(require.resolve('almond'));
    // Main module
    files.push(require('./main-path'));
    // AMD test 'adapter' before tests
    files.push('test-amd-bootstrap.js');
  } else {
    files.push(require('./main-path'));
  }

  files.push('test/*-tests.js');

  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: files,
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'] // Rquired for non-root
      }
    },
    browsers: ['ChromeHeadlessNoSandbox', 'Firefox'],
    singleRun: true,
    concurrency: Infinity
  });
};
