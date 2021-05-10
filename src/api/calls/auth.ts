/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiRegisterBody, ApiLoginBody } from 'types/api'

const registerClient = async (body: ApiRegisterBody) => {
  try {
    const response = await axios.post(endpoints.REGISTER, { ...body })
    const newResponse = response.data
    return newResponse
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const verifyClient = async (body: ApiLoginBody) => {
  try {
    const response = await axios.post(endpoints.LOGIN, { ...body })
    const newResponse = response.data
    return newResponse
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  registerClient,
  verifyClient
}
