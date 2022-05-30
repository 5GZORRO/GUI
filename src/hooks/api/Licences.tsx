/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'
import { api } from 'api'

export const useAllTemplates = (params?: any) => {
  return useQuery(['allTemplates', params], () => api.licences.getAllTemplates(params), { keepPreviousData: true })
}

export const useMyTemplates = (ids: string) => {
  return useQuery(['myTemplates', ids], () => api.licences.getAllTemplates(ids), { keepPreviousData: true })
}
