/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'
import { ApiCertificatesBody } from 'types/api'
import { api } from 'api'
import { AxiosError } from 'axios'

// Define a default query function that will receive the query key
export const registerStakeholder = () =>
  useMutation<any, AxiosError, ApiCertificatesBody>((data) => api.certificates.registerStakeholder(data))

export const getAllApprovedOffers = () => {
  return useQuery('allApprovedOffers', () => api.certificates.getAllApprovedOffers(), {
    keepPreviousData: true
  })
}

export const getAllPendingOffers = () => {
  return useQuery('allPendingOffers', () => api.certificates.getAllPendingOffers(), {
    keepPreviousData: true
  })
}

export const getAllRejectedOffers = () => {
  return useQuery('allRevokedOffers', () => api.certificates.getAllRejectedOffers(), {
    keepPreviousData: true
  })
}

export const getAllApprovedCertificatesAdmin = () => {
  return useQuery('allApprovedCertificatesAdmin', () => api.certificates.getAllApprovedCertificatesAdmin(), {
    keepPreviousData: false
  })
}

export const getAllPendingCertificatesAdmin = () => {
  return useQuery('allPendingCertificatesAdmin', () => api.certificates.getAllPendingCertificatesAdmin(), {
    keepPreviousData: true
  })
}

export const getAllRejectedCertificatesAdmin = () => {
  return useQuery('allRejectedCertificatesAdmin', () => api.certificates.getAllRejectedCertificatesAdmin(), {
    keepPreviousData: false
  })
}

export const getAllApprovedCertificatesRegulator = () => {
  return useQuery('allApprovedCertificatesRegulator', () => api.certificates.getAllApprovedCertificatesRegulator(), {
    keepPreviousData: true
  })
}

export const getAllPendingCertificatesRegulator = () => {
  return useQuery('allPendingCertificatesRegulator', () => api.certificates.getAllPendingCertificatesRegulator(), {
    keepPreviousData: true
  })
}

export const getAllRejectedCertificatesRegulator = () => {
  return useQuery('allRejectedCertificatesRegulator', () => api.certificates.getAllRejectedCertificatesRegulator(), {
    keepPreviousData: true
  })
}

export const getAllLicenceCertificates = () => {
  return useQuery('allLicenceCertificates', () => api.certificates.getAllLicenceCertificates(), {
    keepPreviousData: true
  })
}

export const getStakeholderCertificates = (params: any) => {
  return useQuery('stakeholderCertificates', () => api.certificates.getStakeholderCertificates(params), {
    keepPreviousData: true
  })
}

export const resolveOffer = () => {
  return useMutation(['resolveOffer'], (body: any) => api.certificates.resolveOffer(body))
}

export const resolveStakeholder = (params: any) => {
  return useMutation(['resolveStakeholder'], (body: any) => api.certificates.resolveStakeholder(body, params))
}

export const resolveLicence = (params: any) => {
  return useMutation(['resolveLicence'], (body: any) => api.certificates.resolveLicense(body, params))
}

export const revokeCertificate = () => {
  return useMutation(['revokeCertificate'], (body: any) => api.certificates.revokeCertificate(body))
}
