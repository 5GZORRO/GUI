/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'
import { api } from 'api'
/** Types */
// import { ApiResourceCandidate } from 'types/api'

// Define a default query function that will receive the query key
export const useAllProductSpecification = (params?: any) => {
  return useQuery(['allProductSpecification', params], () => api.resources.useAllProductSpecification(params), {
    keepPreviousData: true
  })
}

export const useProductSpecification = (id: string) => {
  return useQuery(['productSpecification', id], () => api.resources.getProductSpecificationById(id), {
    keepPreviousData: true
  })
}

export const useGetMembers = (params?: any) => {
  return useQuery(['allMembers', params], () => api.memberships.getMembers(params), {
    keepPreviousData: true
  })
}
