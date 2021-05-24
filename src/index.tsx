import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import { APP_ENV, VERSION, BUILD_DATE } from './config'
import { makeServer } from 'server'
import 'moment/locale/en-gb'

React.icons = icons
// Version info for debugging
const logMessage = `
5GZorro by @ubiwhere
%cVersion: ${VERSION}
%cEnvironment ${APP_ENV}
Build date: ${BUILD_DATE}\n`
console.log(logMessage, 'color:#4d5a72; font-weight:bold', 'color:#3d3d3d; font-weight:bold')

// Create a client
const queryClient = new QueryClient()

if (APP_ENV === 'fake') {
  makeServer()
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
      {(APP_ENV === 'fake' || APP_ENV === 'development') && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
