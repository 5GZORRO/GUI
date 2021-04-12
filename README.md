[![@coreui coreui](https://img.shields.io/badge/@coreui%20-coreui-lightgrey.svg?style=flat-square)](https://github.com/coreui/coreui)
[![npm package][npm-coreui-badge]][npm-coreui]
[![NPM downloads][npm-coreui-download]][npm-coreui]  
[![@coreui react](https://img.shields.io/badge/@coreui%20-react-lightgrey.svg?style=flat-square)](https://github.com/coreui/react)
[![npm package][npm-coreui-react-badge]][npm-coreui-react]
[![NPM downloads][npm-coreui-react-download]][npm-coreui-react]  
[![npm next][npm-next]][npm]

[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-badge]: https://img.shields.io/npm/v/@coreui/coreui.png?style=flat-square
[npm-coreui-download]: https://img.shields.io/npm/dm/@coreui/coreui.svg?style=flat-square
[npm-coreui-react]: https://www.npmjs.com/package/@coreui/react
[npm-coreui-react-badge]: https://img.shields.io/npm/v/@coreui/react.png?style=flat-square
[npm-coreui-react-download]: https://img.shields.io/npm/dm/@coreui/react.svg?style=flat-square
[npm-next]: https://img.shields.io/npm/v/@coreui/react/next.png?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/react

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<a href="https://gitlab.ubiwhere.com/5GZORRO/GUI/-/commits/develop"><img alt="pipeline status" src="https://gitlab.ubiwhere.com/5GZORRO/GUI/badges/develop/pipeline.svg" /></a>
<a href="https://gitlab.ubiwhere.com/5GZORRO/GUI/-/commits/develop"><img alt="coverage report" src="https://gitlab.ubiwhere.com/5GZORRO/GUI/badges/develop/coverage.svg" /></a>

# 5GZORRO

## Description 

> 5GZORRO's Governance and Marketplace Portal.

This repo is mirroring Ubiwhere's private repo. 
A public instance of this GUI can be found at https://5gzorro.netlify.app/.
CI/CD is in place, so this instance will always reflect the `develop` branch (may be updated in the future to reflect only `master`). 

---

### 🛠 Stack used
- [React](https://pt-br.reactjs.org/)
- [CoreUI for React](https://coreui.io/react/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactQuery](https://react-query.tanstack.com/)
- [ReactHooksForm](https://react-hook-form.com/)
## Installation
``` bash
# install app's dependencies
$ yarn install
```

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ yarn build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
CoreUI-React#v3.0.0
├── public/          #static files
│   ├── assets/      #assets
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/  
│   ├── containers/  #container source
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── _nav.js      #sidebar config
│   ├── routes.js    #routes config
│   └── store.js     #app store
│
└── package.json
```

## Documentation

The documentation for the CoreUI Admin Template is hosted at our website [CoreUI for React](https://coreui.io/react/)
