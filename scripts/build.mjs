import { babel } from '@rollup/plugin-babel'
import { rollup, watch } from 'rollup'

const input = {
  input: 'src/index.js',
  external: ['react', '@emotion/core'],
  plugins: [babel({
    babelHelpers: 'bundled',
    babelrc: false,
    configFile: false,
    // Preserve the original Microbundle output's ES5 syntax and loose templates.
    assumptions: { mutableTemplateObject: true },
    presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: false }]],
    plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]]
  })]
}
const output = {
  format: 'cjs',
  file: 'dist/emotion-nanoreset.js',
  exports: 'default',
  interop: 'compat',
  strict: false,
  generatedCode: 'es5',
  sourcemap: false
}

if (process.argv.includes('--watch')) {
  const watcher = watch({ ...input, output })
  watcher.on('event', async event => {
    if (event.code === 'ERROR') console.error(event.error)
    if (event.code === 'BUNDLE_END') await event.result.close()
  })
} else {
  const bundle = await rollup(input)
  try {
    await bundle.write(output)
  } finally {
    await bundle.close()
  }
}
