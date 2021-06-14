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

export const useAllResourceAndServiceSpecifications = (params?: any) => {
  return useQuery(['allResourceSpecifications', params], () => api.resources.useAllResourceAndServiceSpecifications(params), {
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

export const useGetResourceSpecificationsBundle = (ids: string, servicesIndex: any) =>
  useQuery(['resourceSpecifications', ids, servicesIndex], () => api.resources.getResourceSpecificationsBatch(ids, servicesIndex), {
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

export const useAllLocations = (params?: any) =>
  useQuery(['allLocations', params], () => api.resources.useAllLocations(params), { keepPreviousData: true })

export const useCreateLocation = (params?: any) =>
  useMutation<any, any, any>((params: any) => api.resources.createLocation(params))

export const useAllProductOfferingPricesChildren = (params?: any) => {
  return useQuery(['allProductPricesChildren', params], () => api.resources.getProductPrices(params, true), {
    keepPreviousData: true
  })
}
