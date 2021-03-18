import axios from 'axios'
import { camelizeKeys } from 'humps'
import { AUTH_TOKEN_SLUG, API_MARKET_PLACE, API_GOVERNANCE } from 'config'

const apiMarketPlace = axios.create({
  baseURL: API_MARKET_PLACE
})

const apiGovernance = axios.create({
  baseURL: API_GOVERNANCE
})

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('5gzorro')
  if (authToken) {
    config.headers.Authorization = `${AUTH_TOKEN_SLUG} ${authToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Converts all responses for CamelCase
axios.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-debugger
    debugger
    response.data = camelizeKeys(response.data)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Converts all requests to under-cased
axios.interceptors.request.use(
  (config) => {
    const currentContentType = config.headers['Content-Type']
    /* Converts URL get params to underscored
    if (config.params) {
      config.params = decamelizeKeys(config.params)
    } */

    if (!currentContentType) {
      config.headers['Content-Type'] = 'application/json'
      // config.transformRequest = [decamelizeKeysTransformer]
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default {
  apiMarketPlace,
  apiGovernance
}
