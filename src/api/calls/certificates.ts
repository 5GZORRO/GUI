/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiCertificatesBody } from 'types/api'

const registerStakeholder = async (body: ApiCertificatesBody) => {
  try {
    await axios.post(endpoints.CERTIFICATE_HOLDER_REGISTER, { ...body })
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
          state: element?.state,
          stakeholderDID: element?.stakeholderDID,
          connection_id: element?.connection_id,
          credential_definition_id: element?.credential_definition_id
        })
      })
      response?.[1]?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          state: element?.state,
          stakeholderDID: element?.stakeholderDID,
          connection_id: element?.connection_id,
          credential_definition_id: element?.credential_definition_id
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
          timestamp: element?.timestamp,
          stakeholderDID: element?.stakeholderDID,
          connection_id: element?.connection_id,
          credential_definition_id: element?.credential_definition_id
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
          timestamp: element?.timestamp,
          stakeholderDID: element?.stakeholderDID,
          connection_id: element?.connection_id,
          credential_definition_id: element?.credential_definition_id
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

const getAllRevokedCertificatesRegulator = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_REGULATOR_REVOKED_LICENSE)
    const newArr: any[] | PromiseLike<any[]> = []
    if (response) {
      response?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          stakeholderDID: element?.stakeholderDID,
          connection_id: element?.connection_id,
          credential_definition_id: element?.credential_definition_id
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
          timestamp: element?.timestamp,
          idToken: element?.id_token
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

const getAllRevokedCertificatesAdmin = async (): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.CERTIFICATE_ADMIN_REVOKE_CERTIFICATES)
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
    const responseApproved = await axios.get(endpoints.CERTIFICATE_APPROVED_LICENSE)
    const responsePending = await axios.get(endpoints.CERTIFICATE_PENDING_LICENSE)
    const responseRejected = await axios.get(endpoints.CERTIFICATE_REJECTED_LICENSE)
    const responseRevoked = await axios.get(endpoints.CERTIFICATE_REVOKED_LICENSE)

    const response = await axios.all([responseApproved, responseRejected, responsePending, responseRevoked])
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
      response?.[2]?.data.forEach((element: any) => {
        newArr.push({
          idToken: element?.id_token,
          licenseDID: element?.licenseDID,
          stakeholderServices: element?.stakeholderServices?.[0],
          timestamp: element?.timestamp,
          state: element?.state
        })
      })
      response?.[3]?.data.forEach((element: any) => {
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

const resolveStakeholder = async (body: any, params: any): Promise<any> => {
  try {
    await axios.delete(body?.user?.handler_url + '/party/v4/organization')
  } catch (e) {}
  try {
    const response = await axios.put(endpoints.CERTIFICATE_ADMIN_RESOLVE, {
      stakeholder_did: body?.user?.stakeholderDID,
      approval: body?.approval
    })
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const resolveLicense = async (body: any, params: any): Promise<any> => {
  try {
    const response = await axios.put(endpoints.CERTIFICATE_REGULATOR_RESOLVE, {
      id_token: params,
      license_did: body?.license_did,
      approval: body?.approval
    })

    if (response && body?.approval === true) {
      if (body?.licenseObject) {
        const obj = {
          startDl: 0,
          endDl: 0,
          startUl: 0,
          endUl: 0,
          startDate: '',
          endDate: '',
          duplexMode: '',
          band: 0,
          technology: '',
          country: '',
          ownerDid: body?.stakeholderDID,
          license: body?.license_did
        }
        Object.entries(body?.licenseObject).forEach((el: any, index) => {
          switch (el[0]) {
            case 'Commencement Date':
              obj.startDate = el[1]
              break
            case 'Expiry Date':
              obj.endDate = el[1]
              break
            case 'Radio Spectrum - Start UL Frequency':
              obj.startUl = Number(el[1].replace(/\D/g, ''))
              break
            case 'Radio Spectrum - End UL Frequency':
              obj.endUl = Number(el[1].replace(/\D/g, ''))
              break
            case 'Radio Spectrum - Start DL Frequency':
              obj.startDl = Number(el[1].replace(/\D/g, ''))
              break
            case 'Radio Spectrum - End DL Frequency':
              obj.endDl = Number(el[1].replace(/\D/g, ''))
              break
            case 'Duplex Mode Of Operation':
              obj.duplexMode = el[1]
              break
            case 'Country':
              obj.country = el[1]
              break
            case 'Band':
              obj.band = Number(el[1].replace(/\D/g, ''))
              break
            case 'Technology':
              obj.technology = el[1]
              break
          }
        })
        await axios.post(endpoints.SPECTOKEN_PRIMITIVE, obj)
      }
    }

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
  getAllApprovedCertificatesAdmin,
  getAllPendingCertificatesAdmin,
  getAllRejectedCertificatesAdmin,
  getAllRevokedCertificatesAdmin,
  resolveStakeholder,
  revokeCertificate,
  resolveLicense,
  getAllApprovedCertificatesRegulator,
  getAllPendingCertificatesRegulator,
  getAllRejectedCertificatesRegulator,
  getAllRevokedCertificatesRegulator,
  getAllLicenceCertificates
}
