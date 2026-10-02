const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { createRequire } = require('node:module')
const { pathToFileURL } = require('node:url')

async function main () {
  const target = path.resolve(process.env.NANORESET_PACKAGE || path.join(__dirname, '..'))
  const requireTarget = createRequire(path.join(target, 'package.json'))
  const manifest = requireTarget('./package.json')
  assert.equal(manifest.version, '1.0.0')
  assert.equal(manifest.main, 'dist/emotion-nanoreset.js')
  assert.equal(manifest.source, 'src/index.js')
  assert.deepEqual(manifest.files, ['dist'])
  assert.deepEqual(manifest.peerDependencies, { '@emotion/core': '^10', react: '^16' })
  assert.deepEqual(manifest.engines, { node: '>=8.0.0' })
  assert.equal(manifest.dependencies, undefined)
  const filename = path.join(target, manifest.main)
  const Nanoreset = requireTarget(filename)
  assert.equal(requireTarget(target), Nanoreset, 'package-root require resolves the declared main')
  const imported = await import(pathToFileURL(filename).href)
  assert.equal(imported.default, Nanoreset)
  assert.equal(typeof Nanoreset, 'function')
  assert.deepEqual(Object.keys(Nanoreset), [])
  assert.equal(Nanoreset.length, 0)
  const React = requireTarget('react')
  const core = requireTarget('@emotion/core')
  const { renderToStaticMarkup } = requireTarget('react-dom/server')
  const expected = fs.readFileSync(path.join(__dirname, '../test/fixtures/rendered.html'), 'utf8').trimEnd()
  for (let i = 0; i < 3; i++) {
    const element = Nanoreset({ children: 'ignored', styles: 'ignored' })
    assert.equal(element.type, core.Global)
    assert.equal(element.props.styles.name, '777g6z')
    assert.deepEqual(Object.keys(element.props), ['styles'])
    assert.equal(renderToStaticMarkup(React.createElement(Nanoreset)), expected)
    assert.equal(renderToStaticMarkup(React.createElement(Nanoreset, { children: 'ignored' })), expected)
    assert.equal(renderToStaticMarkup(React.createElement(React.Fragment, null,
      React.createElement(Nanoreset), React.createElement('p', null, 'content'))), `${expected}<p>content</p>`)
  }
  assert.equal(renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Nanoreset), React.createElement(Nanoreset))), expected + expected)
  console.log(`CommonJS, native ESM default import and real Emotion ${requireTarget('@emotion/core/package.json').version}/React ${React.version} rendering passed`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
