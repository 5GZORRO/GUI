/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiRegisterBody } from 'types/api'

const registerClient = async (body: ApiRegisterBody) => {
  try {
    const response = await axios.post(endpoints.REGISTER, { ...body })
    const newResponse = response.data
    console.log(newResponse)
    return newResponse
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const verifyClient = async (key: string):Promise<any> => {
  try {
    const response = await axios.post(endpoints.LOGIN, { key })
    if (response.data.idToken) {
      throw new Error('cannot access')
    }
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  registerClient,
  verifyClient
}
