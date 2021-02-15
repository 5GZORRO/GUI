import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

const decamelizeKeysTransformer = (data: Record<string, unknown>): string => {
	return data && JSON.stringify(decamelizeKeys(data))
}

const apiInstance = axios.create({
	baseURL: process.env.REACT_APP_API
})

apiInstance.interceptors.request.use((config) => {
	const authToken = localStorage.getItem('vas')
	if (authToken) {
		config.headers.Authorization = `${process.env.REACT_APP_TOKEN}`
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

		// Converts URL get params to underscored
		if (config.params) {
			config.params = decamelizeKeys(config.params)
		}

		if (!currentContentType) {
			config.headers['Content-Type'] = 'application/json'
			config.transformRequest = [decamelizeKeysTransformer]
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default apiInstance
