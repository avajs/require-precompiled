'use strict';
module.exports = install;

// we need to save it before it gets overriden by install
const defaultHandler = require.extensions['.js'];

function install(precompile, ext, extensions) {
	ext = ext || '.js';
	extensions = extensions || require.extensions;

	// if there is no handler in extensions(as in case with .cjs)
	// use the default one which we saved before
	var oldExtension = extensions[ext] || defaultHandler;

	extensions[ext] = function (module, filename) {
		var source = precompile(filename);

		if (source) {
			module._compile(source, filename);
			return;
		}

		oldExtension(module, filename);
	};
}
