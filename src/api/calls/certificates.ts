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

const getAllApprovedCertificates = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_APPROVED_CERTIFICATES)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response.data.forEach((element: any) => {
        newArr.push({
          stakeholderDID: element?.stakeholderClaim?.stakeholderDID,
          ledgerIdentity: element?.stakeholderClaim?.stakeholderProfile?.ledgerIdentity,
          name: element?.stakeholderClaim?.stakeholderProfile?.name,
          role: element?.stakeholderClaim?.stakeholderRoles[0]?.role,
          stakeholderRoles: element?.stakeholderClaim?.stakeholderRoles[0]?.assets
            ?.map((el: any) => {
              return el
            })
            ?.join(', '),
          state: element?.state,
          timestamp: element?.timestamp
        })
      })
      return newArr
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getAllPendingCertificates = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_PENDING_CERTIFICATES)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response.data.forEach((element: any) => {
        newArr.push({
          stakeholderDID: element?.stakeholderClaim?.stakeholderDID,
          ledgerIdentity: element?.stakeholderClaim?.stakeholderProfile?.ledgerIdentity,
          name: element?.stakeholderClaim?.stakeholderProfile?.name,
          role: element?.stakeholderClaim?.stakeholderRoles[0]?.role,
          stakeholderRoles: element?.stakeholderClaim?.stakeholderRoles[0]?.assets
            ?.map((el: any) => {
              return el
            })
            ?.join(', '),
          state: element?.state,
          timestamp: element?.timestamp
        })
      })
      return newArr
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getStakeholderCertificates = async (params: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_HOLDER_CERTIFICATES, { params: { stakeholder_did: params } })
    if (response) {
      let status = ''
      switch (response.data?.state) {
        case 'Stakeholder Registered':
          status = 'Approved'
          break
        case 'Stakeholder Registration Requested':
          status = 'Pending'
          break
      }
      return [
        {
          stakeholderDID: response.data?.stakeholderClaim?.stakeholderDID,
          ledgerIdentity: response.data?.stakeholderClaim?.stakeholderProfile?.ledgerIdentity,
          name: response.data?.stakeholderClaim?.stakeholderProfile?.name,
          role: response.data?.stakeholderClaim?.stakeholderRoles[0]?.role,
          stakeholderRoles: response.data?.stakeholderClaim?.stakeholderRoles[0]?.assets
            ?.map((el: any) => {
              return el
            })
            ?.join(', '),
          state: status,
          timestamp: response.data?.timestamp
        }
      ]
    }
    return []
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const resolveOffer = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.CERTIFICATE_ADMIN_RESOLVE_OFFER, body)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const resolveStakeholder = async (body: any): Promise<any> => {
  try {
    const response = await axios.put(endpoints.CERTIFICATE_ADMIN_RESOLVE, body)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const revokeCertificate = async (body: any): Promise<any> => {
  try {
    const response = await axios.put(endpoints.CERTIFICATE_ADMIN_REVOKE, body)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  registerStakeholder,
  getAllApprovedOffers,
  getAllPendingOffers,
  getAllRejectedOffers,
  getAllApprovedCertificates,
  getAllPendingCertificates,
  getStakeholderCertificates,
  resolveOffer,
  resolveStakeholder,
  revokeCertificate
}
