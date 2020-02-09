'use strict';
module.exports = install;

// We need to save it before it gets overriden by install
const defaultHandler = require.extensions['.js']; // eslint-disable-line node/no-deprecated-api

function install(precompile, ext = '.js', extensions = require.extensions) { // eslint-disable-line node/no-deprecated-api
	const {[ext]: oldExtension = defaultHandler} = extensions;

	extensions[ext] = function (module, filename) {
		const source = precompile(filename);
		if (source === null) {
			Reflect.apply(oldExtension, extensions, [module, filename]);
		} else {
			module._compile(source, filename);
		}
	};
}
