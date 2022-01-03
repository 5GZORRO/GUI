/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiIssuerOffers, ApiCertificatesBody } from 'types/api'

const registerStakeholder = async (body: ApiCertificatesBody) => {
  try {
    const response = await axios.post(endpoints.CERTIFICATE_HOLDER_REGISTER, { ...body })
    console.log(response)
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getAllApprovedOffers = async (): Promise<ApiIssuerOffers[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_ALL_OFFER)
    const newArr:
      | PromiseLike<ApiIssuerOffers[]>
      | { type: any; id: any; claims: any; timestamp: any; 'credential_definition_id': any }[] = []
    if (response) {
      response.data.forEach(
        (element: {
          type: any
          credentialSubject: { id: any; claims: any[] }
          timestamp: any
          'credential_definition_id': any
        }) => {
          newArr.push({
            type: element?.type,
            id: element?.credentialSubject?.id,
            claims: element?.credentialSubject?.claims?.map((el) => el)?.join(', '),
            timestamp: element?.timestamp,
            credential_definition_id: element?.credential_definition_id
          })
        }
      )
      return newArr
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getAllPendingOffers = async (): Promise<ApiIssuerOffers[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_PENDING_OFFER)
    const newArr:
      | PromiseLike<ApiIssuerOffers[]>
      | { type: any; id: any; claims: any; timestamp: any; 'credential_definition_id': any }[] = []
    if (response) {
      response.data.forEach(
        (element: {
          type: any
          credentialSubject: { id: any; claims: any[] }
          timestamp: any
          'credential_definition_id': any
        }) => {
          newArr.push({
            type: element?.type,
            id: element?.credentialSubject?.id,
            claims: element?.credentialSubject?.claims?.map((el) => el)?.join(', '),
            timestamp: element?.timestamp,
            credential_definition_id: element?.credential_definition_id
          })
        }
      )
      return newArr
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getAllRejectedOffers = async (): Promise<ApiIssuerOffers[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_REVOKED_OFFER)
    console.log(response.data)
    const newArr: { type: any; id: any; claims: any; timestamp: any; 'credential_definition_id': any }[] = []
    if (response) {
      response.data.forEach(
        (element: {
          type: any
          credentialSubject: { id: any; claims: any[] }
          timestamp: any
          'credential_definition_id': any
        }) => {
          newArr.push({
            type: element?.type,
            id: element?.credentialSubject?.id,
            claims: element?.credentialSubject?.claims?.map((el) => el)?.join(', '),
            timestamp: element?.timestamp,
            credential_definition_id: element?.credential_definition_id
          })
        }
      )
      return newArr
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  registerStakeholder,
  getAllApprovedOffers,
  getAllPendingOffers,
  getAllRejectedOffers
}
