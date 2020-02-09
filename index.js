'use strict';
module.exports = install;

function install(precompile, ext, extensions) {
	ext = ext || '.js';
	extensions = extensions || require.extensions; // eslint-disable-line node/no-deprecated-api

	const oldExtension = extensions[ext];

	extensions[ext] = function (module, filename) {
		const source = precompile(filename);

		if (source) {
			module._compile(source, filename);
			return;
		}

		oldExtension(module, filename);
	};
}
