/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'

import { api } from 'api'

// Define a default query function that will receive the query key
export const useResources = (params?: any) => {
  return useQuery(['resources', params], () => api.resources.get(params), { keepPreviousData: true })
}

export const useResource = (params?: any) => {
  return useQuery(['resource', params], () => api.resources.get(params), { keepPreviousData: true })
}

export const useCreateResource = () => {
  return useMutation((body: any) => api.resources.create(body))
}
