/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformDataTemplates } from 'api/utils'

const getAllTemplates = async (params?: any): Promise<any[]> => {
  try {
    return new Promise((resolve, reject) => resolve([]))
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getMyTemplates = async (params?: any): Promise<any[]> => {
  try {
    // const response = await axios.get(endpoints.LICENCES_MANAGEMENT, { params })
    // return TransformDataTemplates(response.data)
    return new Promise((resolve, reject) => resolve([]))
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  getAllTemplates,
  getMyTemplates
}
