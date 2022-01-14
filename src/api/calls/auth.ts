/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiRegisterBody, ApiLoginBody, ApiOrganizationBody, StackeholderResponse } from 'types/api'

const registerClient = async (body: ApiRegisterBody) => {
  try {
    const response = await axios.post<StackeholderResponse>(endpoints.REGISTER, { ...body })
    const newResponse = response.data
    // if ((await newResponse?.stakeholderClaim?.stakeholderDID) && newResponse?.id_token) {
    //   await axios.post(endpoints.REGISTER_ORGANIZATION, <ApiOrganizationBody>{
    //     organizationCreate: { name: newResponse?.stakeholderClaim?.stakeholderProfile?.name },
    //     stakeholderDID: newResponse?.stakeholderClaim?.stakeholderDID,
    //     token: newResponse?.id_token
    //   })
    // }
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

const verifyClient = async (params: any, data: any) => {
  await deleteOrganization()
  try {
    const response = await axios.get(endpoints.LOGIN, { params: { stakeholder_did: params !== null ? params : data } })

    if ((await response?.data?.stakeholderClaim?.stakeholderDID) && response?.data?.id_token) {
      try {
        await axios.post(endpoints.REGISTER_ORGANIZATION, <ApiOrganizationBody>{
          organizationCreate: { name: response?.data?.stakeholderClaim?.stakeholderProfile?.name },
          stakeholderDID: response?.data?.stakeholderClaim?.stakeholderDID,
          token: response?.data?.id_token
        })
      } catch (err) {}
    }
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
