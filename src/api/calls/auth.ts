/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiRegisterBody, ApiLoginBody, ApiOrganizationBody, StackeholderResponse } from 'types/api'

const registerClient = async (body: ApiRegisterBody) => {
  try {
    const response = await axios.post<StackeholderResponse>(endpoints.REGISTER, { ...body })
    const newResponse = response.data
    return newResponse
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const registerOrganization = async (body: ApiOrganizationBody) => {
  try {
    const response = await axios.post(endpoints.REGISTER_ORGANIZATION, { ...body })
    const newResponse = response.data
    return newResponse
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const deleteOrganization = async () => {
  try {
    const response = await axios.delete(endpoints.REGISTER_ORGANIZATION)
    return response
  } catch (e) {}
}

const verifyClient = async (data: any) => {
  try {
    const response = await axios.get(endpoints.LOGIN + '/' + data)
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  registerClient,
  verifyClient,
  registerOrganization,
  deleteOrganization
}
