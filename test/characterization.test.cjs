const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const vm = require('node:vm')
const { test } = require('node:test')

const root = path.resolve(__dirname, '..')
const css = fs.readFileSync(path.join(__dirname, 'fixtures/nanoreset.css'), 'utf8')
const upstreamCSS = fs.readFileSync(path.join(__dirname, 'fixtures/nanoreset-4.0.0.css'), 'utf8')
const bundlePath = process.env.NANORESET_BUNDLE || path.join(root, 'dist/emotion-nanoreset.js')
const bundle = fs.readFileSync(bundlePath, 'utf8')

test('the reviewed upstream and shipped CSS retain their exact bytes', () => {
  assert.equal(createHash('sha256').update(upstreamCSS).digest('hex'), '13a0cb3011fa5bf0b4e09d9233278e23898b2daa3d4a9945303c4ac83b7dc64e')
  assert.equal(createHash('sha256').update(css).digest('hex'), '83d89cc00ae8111f530523633c80897038313538651993987fe53558f69f2590')
  assert.equal(fs.readFileSync(path.join(root, 'src/reset.js'), 'utf8'), `\nexport default \`\n${css}\n\`\n`)
})

test('generation is deterministic and leaves the reviewed source CSS untouched', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'nanoreset-generator-'))
  try {
    fs.mkdirSync(path.join(temp, 'node_modules/nanoreset'), { recursive: true })
    fs.mkdirSync(path.join(temp, 'src'))
    fs.copyFileSync(path.join(root, 'inject.js'), path.join(temp, 'inject.js'))
    fs.writeFileSync(path.join(temp, 'node_modules/nanoreset/nanoreset.css'), upstreamCSS)
    for (let i = 0; i < 2; i++) {
      const result = spawnSync(process.execPath, ['inject.js'], { cwd: temp, encoding: 'utf8' })
      assert.equal(result.status, 0, result.stderr)
      assert.equal(fs.readFileSync(path.join(temp, 'src/reset.js'), 'utf8'), `\nexport default \`\n${css}\n\`\n`)
      assert.equal(fs.readFileSync(path.join(temp, 'node_modules/nanoreset/nanoreset.css'), 'utf8'), upstreamCSS)
    }
    // Fail before touching the last valid generated file, even for whitespace drift.
    fs.writeFileSync(path.join(temp, 'node_modules/nanoreset/nanoreset.css'), `${upstreamCSS}\n`)
    const rejected = spawnSync(process.execPath, ['inject.js'], { cwd: temp, encoding: 'utf8' })
    assert.notEqual(rejected.status, 0)
    assert.match(rejected.stderr, /Unexpected nanoreset CSS/)
    assert.equal(fs.readFileSync(path.join(temp, 'src/reset.js'), 'utf8'), `\nexport default \`\n${css}\n\`\n`)
  } finally {
    fs.rmSync(temp, { recursive: true, force: true })
  }
})

for (const wrapped of [false, true]) test(`CommonJS exports one component with external peers (React default wrapper: ${wrapped})`, () => {
  const required = []
  const Global = Symbol('Global')
  const calls = []
  const React = { createElement: (type, props) => ({ type, props }) }
  const core = {
    Global,
    css: (strings, ...values) => {
      assert.deepEqual(Array.from(strings), ['', ''])
      assert.deepEqual(Array.from(strings.raw), ['', ''])
      assert.deepEqual(values, [`\n${css}\n`])
      calls.push(values)
      return 'serialized-reset'
    }
  }
  const context = { module: { exports: {} }, require: id => {
    required.push(id)
    assert.ok(['react', '@emotion/core'].includes(id), `Unexpected bundled dependency: ${id}`)
    return id === 'react' ? (wrapped ? { default: React } : React) : core
  } }
  vm.runInNewContext(bundle, context)
  const Nanoreset = context.module.exports
  assert.equal(typeof Nanoreset, 'function')
  assert.equal(Nanoreset.length, 0)
  assert.deepEqual(Object.keys(Nanoreset), [])
  assert.deepEqual(required.sort(), ['@emotion/core', 'react'])
  assert.equal(calls.length, 0, 'importing does not inject or serialize CSS')
  for (let i = 0; i < 3; i++) {
    const element = Nanoreset({ children: 'ignored', styles: 'ignored' })
    assert.equal(element.type, Global)
    assert.equal(element.props.styles, 'serialized-reset')
    assert.deepEqual(Object.keys(element.props), ['styles'])
  }
  assert.equal(calls.length, 3)
})
