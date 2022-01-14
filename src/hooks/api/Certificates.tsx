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

export const getAllApprovedCertificates = () => {
  return useQuery('allApprovedCertificates', () => api.certificates.getAllApprovedCertificates(), {
    keepPreviousData: true
  })
}

export const getAllPendingCertificates = () => {
  return useQuery('allPendingCertificates', () => api.certificates.getAllPendingCertificates(), {
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

export const resolveStakeholder = () => {
  return useMutation(['resolveStakeholder'], (body: any) => api.certificates.resolveStakeholder(body))
}

export const revokeCertificate = () => {
  return useMutation(['revokeCertificate'], (body: any) => api.certificates.revokeCertificate(body))
}
