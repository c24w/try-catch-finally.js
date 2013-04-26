var requirejs = require('requirejs'),
	build_config = require('./build-config.js'),
	build_min_config = require('./build-min-config.js'),
	handleBuildResponse = console.log.bind(null),
	handleBuildError = console.error.bind(null);

function build(config) {
	requirejs.optimize(config, handleBuildResponse, handleBuildError);
}

build(build_config);

build(build_min_config);