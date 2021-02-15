import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import chalk from 'chalk'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import { ENV, VERSION } from './config'

React.icons = icons
const log = console.log;
log(chalk.blueBright.bold(`APP Enviroment: ${ENV}`))
log(chalk.red.bold(`Version: ${VERSION}`))

 // Create a client
 const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
