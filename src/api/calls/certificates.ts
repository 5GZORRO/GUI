/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiIssuerOffers, ApiCertificatesBody, ApiOrganizationBody } from 'types/api'

const registerStakeholder = async (body: ApiCertificatesBody) => {
  try {
    await axios.post(endpoints.CERTIFICATE_HOLDER_REGISTER, { ...body })
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

const getAllApprovedCertificatesRegulator = async (): Promise<any[]> => {
  try {
    const responseApproved = await axios.get(endpoints.CERTIFICATE_REGULATOR_APPROVED_LICENSE)
    const responseRejected = await axios.get(endpoints.CERTIFICATE_REGULATOR_REJECTED_LICENSE)
    const response = await axios.all([responseApproved, responseRejected])
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.[0]?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          state: element?.state
        })
      })
      response?.[1]?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          state: element?.state
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

const getAllPendingCertificatesRegulator = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_REGULATOR_PENDING_LICENSE)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
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

const getAllRejectedCertificatesRegulator = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_REGULATOR_REJECTED_LICENSE)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
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

const getAllApprovedCertificatesAdmin = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_APPROVED)
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

const getAllPendingCertificatesAdmin = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_PENDING_CERTIFICATES)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          roles: element?.stakeholderClaim?.stakeholderRoles[0]?.assets,
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
          timestamp: element?.timestamp,
          handler_url: element?.handler_url
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

const getAllRejectedCertificatesAdmin = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_REJECTED)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          roles: element?.stakeholderClaim?.stakeholderRoles[0]?.assets,
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
          timestamp: element?.timestamp,
          handler_url: element?.handler_url
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

const getAllLicenceCertificates = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ALL_LICENSE)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          state: element?.state
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

const resolveStakeholder = async (body: any, params: any): Promise<any> => {
  try {
    await axios.delete(body?.user?.handler_url + '/party/v4/organization')
  } catch (e) {}
  try {
    const response = await axios.put(endpoints.CERTIFICATE_ADMIN_RESOLVE, {
      stakeholder_did: body?.user?.stakeholderDID,
      approval: body?.approval
    })
    if (
      (params?.stakeholderClaim?.stakeholderRoles?.[0]?.role === 'Regulator' ||
        params?.stakeholderClaim?.stakeholderRoles?.[0]?.role === 'Administrator') &&
      body?.approval === true
    ) {
      body?.user?.roles.forEach(async (element: any) => {
        let category = ''
        switch (element) {
          case 'Edge':
            category = 'Edge'
            break
          case 'Cloud':
            category = 'Cloud'
            break
          case 'Spectrum':
            category = 'Spectrum'
            break
          case 'RadioAccessNetwork':
            category = 'RAN'
            break
          case 'VirtualNetworkFunction':
            category = 'VNF'
            break
          case 'NetworkSlice':
            category = 'Slice'
            break
          case 'NetworkService':
            category = 'Network Service'
            break
        }
        try {
          await axios.post(body?.user?.handler_url + '/productCatalogManagement/v4/category', { name: category })
        } catch (e) {}
      })

      try {
        await axios.post(body?.user?.handler_url + '/party/v4/organization', <ApiOrganizationBody>{
          organizationCreate: { name: body?.user?.name },
          stakeholderDID: body?.user?.stakeholderDID,
          token: response?.data?.id_token
        })
      } catch (err) {}
    }
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const resolveLicense = async (body: any, params: any): Promise<any> => {
  try {
    console.log(body)
    const response = await axios.put(endpoints.CERTIFICATE_REGULATOR_RESOLVE, {
      id_token: params,
      license_did: body?.license_did,
      approval: body?.approval
    })

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
  getAllApprovedCertificatesAdmin,
  getAllPendingCertificatesAdmin,
  getAllRejectedCertificatesAdmin,
  getStakeholderCertificates,
  resolveOffer,
  resolveStakeholder,
  revokeCertificate,
  resolveLicense,
  getAllApprovedCertificatesRegulator,
  getAllPendingCertificatesRegulator,
  getAllRejectedCertificatesRegulator,
  getAllLicenceCertificates
}
