'use strict';
module.exports = install;

function install(precompile, ext = '.js', extensions = require.extensions) { // eslint-disable-line node/no-deprecated-api
	const {[ext]: oldExtension} = extensions;

	extensions[ext] = function (module, filename) {
		const source = precompile(filename);
		if (source === null) {
			Reflect.apply(oldExtension, extensions, [module, filename]);
		} else {
			module._compile(source, filename);
		}
	};
}
