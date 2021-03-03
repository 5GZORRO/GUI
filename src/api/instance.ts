import axios from 'axios'
import { camelizeKeys } from 'humps'
import { AUTH_TOKEN_SLUG, BASE_API } from 'config'

const apiInstance = axios.create({
  baseURL: BASE_API
})

apiInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('5gzorro')
  if (authToken) {
    config.headers.Authorization = `${AUTH_TOKEN_SLUG} ${authToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Converts all responses for CamelCase
apiInstance.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Converts all requests to under-cased
apiInstance.interceptors.request.use(
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

export default apiInstance
