/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from 'react-query'
import { api } from 'api'

export const useAllTemplates = (params?: any) => {
  return useQuery(['allTemplates', params], () => api.sla.getAllTemplates(params), { keepPreviousData: true })
}

export const useMyTemplates = (ids: string) => {
  return useQuery(['myTemplates', ids], () => api.sla.getAllTemplates(ids), { keepPreviousData: true })
}

export const useAllSLAs = (params?: any) => {
  return useQuery(['allSLAs', params], () => api.sla.getAllSLAs(params), { keepPreviousData: true })
}

export const useCreateTemplate = () => useMutation<any, any, any>((params: any) => api.sla.createTemplate(params))

export const useCreateSLA = () => useMutation<any, any, any>((params: any) => api.sla.createSLA(params))

export const useAllLicences = (params?: any) => {
  return useQuery(['allLicences', params], () => api.sla.getAllLicences(params), { keepPreviousData: true })
}

export const useAllSLATemplates = (params?: any) =>
  useQuery(['AllSLATemplates', params], () => api.sla.getAllSLATemplates(params), { keepPreviousData: true })
