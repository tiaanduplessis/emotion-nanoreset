import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  { ignores: ['dist/**', 'src/reset.js'] },
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    commaDangle: 'never',
    arrowParens: false,
    braceStyle: '1tbs',
    jsx: false
  }),
  { rules: {
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/quote-props': ['error', 'as-needed']
  } },
  {
    files: ['src/index.js'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    // These imports are used by classic JSX; no hooks or other JSX lint plugin
    // is needed for this single component. Render tests validate both references.
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^(React|Global)$' }] }
  },
  {
    files: ['inject.js', 'test/**/*.cjs', 'scripts/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { __dirname: 'readonly', process: 'readonly', console: 'readonly' }
    }
  },
  {
    files: ['scripts/*.mjs'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } }
  }
]
