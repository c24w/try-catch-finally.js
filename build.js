({
	optimize: 'none',
	baseUrl: './src/',
	paths: {
		'object-checker': './object-checker',
		'almond': '../global-shim/almond'
	},
	wrap: { // add to global scope if AMD isn't being used
		startFile: './global-shim/wrap-start',
		endFile: './global-shim/wrap-end'
	},
	name: 'almond',
	include: ['try-catch-finally'],
	out: 'try-catch-finally.js'
})