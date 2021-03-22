/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import instance from 'api/instance'
import { endpoints } from 'api/endpoints'

const registerClient = async (body: any): Promise<any> => {
  try {
    const response = await instance.apiGovernance.post(endpoints.REGISTER, { body })
    const newResponse = response.data
    console.log(newResponse)
    return newResponse
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  registerClient
}
