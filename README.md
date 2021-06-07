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

### Deploy to Kubernetes instance

This deploy consists of two separate nginx images, each one with the files for one specific deploy (operator-a or operator-b). These images are pushed to Ubiwhere's docker hub repo and they are used by the k8s repo.

In order to deploy to the existing Kubernetes instance, you'll need to connect to the project's VPN.

After that, you will need to:

* Setup kubectl: 

    * Install kubectl (client version should be at least 21.1)
    * Move/copy the platcmpk8sconfig file to the kubectl config (usually the ~/.kube/config file).
    * After this, you should be able to access the cluster. You can test this by running something like `kubectl get pods`, which should return the list of pods running in the cluster.
 
* Generate the nginx image containing the frontend files:

    * Build the image: `docker build -f Dockerfile . --build-arg DEPLOY_DIR=/operator-a/ --build-arg SRC_DIR=fe-files/ --tag=ubiwhere/5gzorro-operator-a-dashboard`. The DEPLOY_DIR should be either `/operator-a/` or `/operator-b/`, and is the destination folder where the frontend files will be placed in the nginx image. The `SRC_DIR` defaults to `src/` and is the local directory containing the frontend files. The image name (`tag`) should be either `ubiwhere/5gzorro-operator-a-dashboard` or `ubiwhere/5gzorro-operator-b-dashboard`

    * Login to docker hub with an account with privileges to push images under the Ubiwhere organization: `docker login https://index.docker.io/v1/ --username <username>`

    * Push the image: `docker push ubiwhere/5gzorro-operator-a-dashboard`

* Deploy in the cluster (there probably is a better way of doing this but it works since deleting the existing deployment isn't a problem in this case) using deployment-a or deployment-b:

    * Delete the previous deploy: `kubectl delete -f deployment-a.yml` or `kubectl delete -f deployment-b.yml`
    * Create a new deploy: `kubectl create -f deployment-a.yml` or `kubectl create -f deployment-b.yml`
    * Check if everything is ok. A pod, service and deployment should have been created, which you can test by running:
        * `kubectl get pods` (should have a pod like `operator-dashboard-a-<random_string>`)
        * `kubectl get services` (should have a service `operator-service-a` or `operator-service-b`)
        * `kubectl get deployments` (should have a deployment `operator-dashboard-a` or `operator-dashboard-b`)

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
