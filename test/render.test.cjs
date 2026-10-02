const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')
const { spawnSync } = require('node:child_process')
const { transformSync } = require('@babel/core')
const { parse } = require('acorn')
const React = require('react')
const core = require('@emotion/core')
const { renderToStaticMarkup } = require('react-dom/server')

const root = path.resolve(__dirname, '..')
const expected = fs.readFileSync(path.join(__dirname, 'fixtures/rendered.html'), 'utf8').trimEnd()

function loadSource (name) {
  const filename = path.join(root, 'src', name)
  const { code } = transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { node: '22' }, modules: 'commonjs' }]],
    plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]]
  })
  const exports = {}
  vm.runInNewContext(code, { exports, require: id => id === './reset' ? loadSource('reset.js') : require(id) }, { filename })
  return exports
}

test('the unchanged JSX source produces the original real Emotion/React render', () => {
  const Nanoreset = loadSource('index.js').default
  const element = Nanoreset()
  assert.equal(element.type, core.Global)
  assert.equal(element.props.styles.name, '777g6z')
  assert.equal(renderToStaticMarkup(React.createElement(Nanoreset)), expected)
})

test('the only declared built output preserves ES5 syntax and has no bundled peers', () => {
  const manifest = require('../package.json')
  assert.equal(manifest.main, 'dist/emotion-nanoreset.js')
  for (const field of ['module', 'browser', 'unpkg', 'exports']) assert.equal(manifest[field], undefined)
  const code = fs.readFileSync(path.join(root, manifest.main), 'utf8')
  const ast = parse(code, { ecmaVersion: 5, sourceType: 'script' })
  assert.ok(ast.body.length > 0)
  const dependencies = Array.from(code.matchAll(/require\(['"]([^'"]+)['"]\)/g), match => match[1])
  assert.deepEqual(dependencies.sort(), ['@emotion/core', 'react'])
  assert.ok(code.length < 6000, 'React and Emotion must remain external')
  assert.doesNotMatch(code, /sourceMappingURL/)
})

test('rebuilding produces byte-identical distribution and generated CSS', () => {
  const output = path.join(root, 'dist/emotion-nanoreset.js')
  const generated = path.join(root, 'src/reset.js')
  const before = fs.readFileSync(output)
  const cssBefore = fs.readFileSync(generated)
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: root, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(fs.readFileSync(output), before)
  assert.deepEqual(fs.readFileSync(generated), cssBefore)
})
