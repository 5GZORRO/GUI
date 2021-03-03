/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiInstance from 'api/instance'
import { endpoints } from 'api/endpoints'

const get = async (params?: any): Promise<any> => {
  try {
    const response = await apiInstance.get(endpoints.RESOURCES, { params })
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const create = async (body: any): Promise<any> => {
  try {
    const response = await apiInstance.post(endpoints.RESOURCES, body)
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  get,
  create
}
