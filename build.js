var requirejs = require('requirejs');
var build_config = require('./build-config.js');
var build_min_config = require('./build-min-config.js');

function build(config) {
	requirejs.optimize(
		config,
		console.log.bind(null),
		console.error.bind(null)
	);
}

build(build_config);

build(build_min_config);