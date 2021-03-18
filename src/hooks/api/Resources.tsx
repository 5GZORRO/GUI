/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'
import { api } from 'api'
/** Types */
import { ApiResourceCandidate } from 'types/api'

// Define a default query function that will receive the query key
export const useAllCandidates = (params?: any) => {
  return useQuery(['allCandidates', params], () => api.resources.getAllCandidates(params), { keepPreviousData: true })
}

export const useCandidate = (ids: string) => {
  return useQuery(['candidate', ids], () => api.resources.getCandidateById(ids), { keepPreviousData: true })
}
