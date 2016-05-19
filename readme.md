# require-precompiled [![Build Status](https://travis-ci.org/avajs/require-precompiled.svg?branch=master)](https://travis-ci.org/avajs/require-precompiled) [![Coverage Status](https://coveralls.io/repos/github/avajs/require-precompiled/badge.svg?branch=master)](https://coveralls.io/github/avajs/require-precompiled?branch=master)

> Require extension that allows for caching/precompiling


## Install

```
$ npm install --save require-precompiled
```


## Usage

```js
const installPrecompiler = require('require-precompiled');
const cache = require('my-cache-implementation');

installPrecompiler(filename => {
	if (cache.hasEntryFor(filename)) {
		return cache.getPrecompiledCode(filename);
	}
	// fall through to underlying extension chain
	return null;
});

// any module required from this point on will be checked against the cache
const foo = require('some-module');
```


## API

### requirePrecompiled(callback)

#### callback

Type: `Function(string: filename)`

Return `string` contents for a cache hit, or `null` for a miss.


## License

MIT © [James Talmage](https://github.com/jamestalmage)
