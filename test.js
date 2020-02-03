import path from 'path';
import test from 'ava';
import System from 'fake-module-system';
import install from './';

test('module is compiled with source returned from precompiler', t => {
	const system = new System({
		'/foo.js': 'normal foo'
	});

	install(filename => {
		t.is(filename, '/foo.js');
		return 'precompiled foo';
	}, '.js', system.extensions);

	const module = system.load('/foo.js');

	t.is(module.code, 'precompiled foo');
	t.is(module.file, '/foo.js');
});

test('passes through to underlying extension precompiler returns undefined', t => {
	const system = new System({
		'/foo.js': 'normal foo'
	});

	install(filename => {
		t.is(filename, '/foo.js');
		return;
	}, '.js', system.extensions);

	const module = system.load('/foo.js');

	t.is(module.code, 'normal foo');
	t.is(module.file, '/foo.js');
});

test('allows extensions beyond `.js`', t => {
	const system = new System({
		'/foo.coffee': 'coffee foo'
	});

	install(filename => {
		t.is(filename, '/foo.coffee');
		return 'precompiled coffee';
	}, '.coffee', system.extensions);

	const module = system.load('/foo.coffee');

	t.is(module.code, 'precompiled coffee');
	t.is(module.file, '/foo.coffee');
});

test('test actual require', t => {
	const fixtureFile = path.join(__dirname, 'fixture.js');

	install(filename => {
		if (filename === fixtureFile) {
			return 'module.exports = "foobar"';
		}

		return null;
	});

	t.is(require('./fixture'), 'foobar');
});

test('test require extension without previous handler extension', t => {
	install(
		() => null,
		'.cjs'
	);

	t.is(require('./fixture.cjs'), 'foobar-cjs');
});
