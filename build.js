var requirejs = require('requirejs');
var buildConfig = require('./build-config.js');
var buildMinConfig = require('./build-min-config.js');

function build(config) {
	requirejs.optimize(
		config,
		console.log.bind(console),
		console.error.bind(console)
	);
}

build(buildConfig);
build(buildMinConfig);