/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformDataTemplates } from 'api/utils'

const getAllTemplates = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.SMART_CONTRACT_MANAGEMENT, { params })
    return TransformDataTemplates(response.data)
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const getMyTemplates = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.SMART_CONTRACT_MANAGEMENT, { params })
    return TransformDataTemplates(response.data)
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  getAllTemplates,
  getMyTemplates
}
