/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'
import { api } from 'api'
/** Types */
// import { ApiResourceCandidate } from 'types/api'

// Define a default query function that will receive the query key
export const useAllTemplates = (params?: any) => {
  return useQuery(['allTemplates', params], () => api.sla.getAllTemplates(params), { keepPreviousData: true })
}

export const useMyTemplates = (ids: string) => {
  return useQuery(['myTemplates', ids], () => api.sla.getAllTemplates(ids), { keepPreviousData: true })
}
