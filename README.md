
# emotion-nanoreset
[![package version](https://img.shields.io/npm/v/emotion-nanoreset.svg?style=flat-square)](https://npmjs.org/package/emotion-nanoreset)
[![package downloads](https://img.shields.io/npm/dm/emotion-nanoreset.svg?style=flat-square)](https://npmjs.org/package/emotion-nanoreset)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/emotion-nanoreset.svg?style=flat-square)](https://npmjs.org/package/emotion-nanoreset)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> [Nanoreset](https://github.com/tiaanduplessis/nanoreset/) + [Emotion](https://emotion.sh)

## Table of Contents

- [emotion-nanoreset](#emotion-nanoreset)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Similar](#similar)
  - [Contribute](#contribute)
  - [License](#license)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com).

```sh
$ npm install emotion-nanoreset
$ # OR
$ yarn add emotion-nanoreset
```

## Usage

```jsx
import * as React from 'react'
import Nanoreset from 'emotion-nanoreset'

const App = () => (
  <>
    <Nanoreset />
    <div>Hi, I'm the app!</div>
  </>
}

export default App
```

## Similar

Also see [styled-normalize](https://www.npmjs.com/package/styled-normalize)
from [Sergey Sova](https://github.com/sergeysova).


## Contribute

Development uses Node 22.13+ or Node 24 and Yarn 1.22.22. The tooling refresh
was tested on Node 22.23.3 and 24.19.0. This development requirement does not
change the package's Node >=8 runtime declaration or its Emotion 10 / React 16
peer ranges. The package still exposes one CommonJS default component at
`dist/emotion-nanoreset.js`, with React and Emotion external and ES5 output.

```sh
yarn install --frozen-lockfile --ignore-scripts
yarn run check
```

`check` runs non-mutating ESLint, the build, characterization tests and real
Emotion/React server-render and import checks. Use `yarn run check`, since
`yarn check` is a different built-in Yarn command. `yarn dev` watches source
changes. The generated CSS and distribution are committed; rebuild before
committing. No dependency installation scripts are needed to build or test.

### CSS compatibility

The generator still pins nanoreset 4.0.0. Its upstream stylesheet includes
`font-family: inherit` for button/input/select/textarea, but the originally
committed source and distributed component did not contain that declaration.
To preserve the shipped reset exactly, the generator explicitly removes only
that declaration after verifying the complete upstream SHA-256, then verifies
the complete compatibility CSS SHA-256 before writing. Unexpected input fails
without overwriting the generated file.

- Upstream nanoreset 4.0.0 CSS: `13a0cb3011fa5bf0b4e09d9233278e23898b2daa3d4a9945303c4ac83b7dc64e`
- Preserved shipped CSS: `83d89cc00ae8111f530523633c80897038313538651993987fe53558f69f2590`

Both stylesheets and the original server-rendered markup are test fixtures.
Adopting the upstream form-control font inheritance would be a separate
intentional behavior change, with reviewed fixtures and hashes.

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
