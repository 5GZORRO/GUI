/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from 'react-query'
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

export const useAllResourceSpecifications = (params?: any) => {
  return useQuery(['allResourceSpecifications', params], () => api.resources.useAllResourceSpecifications(params), {
    keepPreviousData: true
  })
}

export const useResourceSpecifications = (id: string) => {
  return useQuery(['resourceSpecifications', id], () => api.resources.getResourceSpecificationsById(id), {
    keepPreviousData: true
  })
}

export const useAllProductOfferingPrices = (params?: any) => {
  return useQuery(['allProductPrices', params], () => api.resources.getProductPrices(params), {
    keepPreviousData: true
  })
}

export const useCreateProductOfferingPrice = (params?: any) =>
  useMutation<any, any, any>((params: any) => api.resources.createProductOfferingPrice(params))

export const useGetResourceSpecificationsBundle = (ids: string) =>
  useQuery(['resourceSpecifications', ids], () => api.resources.getResourceSpecificationsBatch(ids), {
    keepPreviousData: true
  })

export const useAllCategories = (params?: any) =>
  useQuery(['allCategories', params], () => api.resources.useAllCategories(params), {
    keepPreviousData: true
  })

export const useGetLegalTemplate = (id: string) => {
  return useQuery(['getTemplate', id], () => api.sla.getLegalTemplate(id), {
    keepPreviousData: true
  })
}

export const useCreateCategory = (body?: any) =>
  useMutation<any, any, any>((params: any) => api.resources.createCategory(params))

export const useGetSLA = (id: string) =>
  useQuery(['getSLA', id], () => api.sla.getSLA(id), {
    keepPreviousData: true
  })
