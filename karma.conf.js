'use strict';

// Karma configuration
// Generated on Thu Apr 14 2016 12:24:18 GMT+0100 (BST)
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

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: files,


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    customLaunchers: {
      Chrome_Squashed: {
        base: 'Chrome',
        flags: ['--window-size=1,1', '--window-position=-0,0' ]
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_Squashed', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
