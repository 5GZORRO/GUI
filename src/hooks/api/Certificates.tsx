/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'
import { ApiCertificatesBody } from 'types/api'
import { api } from 'api'
import { AxiosError } from 'axios'

export const registerStakeholder = () =>
  useMutation<any, AxiosError, ApiCertificatesBody>((data) => api.certificates.registerStakeholder(data))

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

export const getAllRevokedCertificatesAdmin = () => {
  return useQuery('allRevokedCertificatesAdmin', () => api.certificates.getAllRevokedCertificatesAdmin(), {
    keepPreviousData: true
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

export const getAllRevokedCertificatesRegulator = () => {
  return useQuery('allRevekoedCertificatesRegulator', () => api.certificates.getAllRevokedCertificatesRegulator(), {
    keepPreviousData: true
  })
}

export const getAllLicenceCertificates = () => {
  return useQuery('allLicenceCertificates', () => api.certificates.getAllLicenceCertificates(), {
    keepPreviousData: true
  })
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
