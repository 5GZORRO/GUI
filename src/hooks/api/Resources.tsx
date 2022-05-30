/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from 'react-query'
import { api } from 'api'

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

export const useGetMembers = () => {
  return useQuery(['allMembers'], () => api.memberships.getMembers(), {
    keepPreviousData: true
  })
}

export const useAllResourceAndServiceSpecifications = (params?: any) => {
  return useQuery(
    ['allResourceSpecifications', params],
    () => api.resources.useAllResourceAndServiceSpecifications(params),
    {
      keepPreviousData: true
    }
  )
}

export const useAllResourceSpecifications = (params?: any) => {
  return useQuery(['allResourceSpecifications', params], () => api.resources.useAllResourceSpecifications(params), {
    keepPreviousData: true
  })
}

export const useAllServicesSpecifications = (params?: any) => {
  return useQuery(['useAllServicesSpecifications', params], () => api.resources.useAllServicesSpecifications(params), {
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
  useQuery(
    ['resourceSpecifications', ids, servicesIndex],
    () => api.resources.getResourceSpecificationsBatch(ids, servicesIndex),
    {
      keepPreviousData: true
    }
  )

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

export const useGetSLA = (id: string, templateHref: string) =>
  useQuery(['getSLA', id, templateHref], () => api.sla.getSLA(id, templateHref), {
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

export const useGetProductOffersBundle = (ids: string) =>
  useQuery(['GetProductOffers', ids], () => api.resources.getProductOffersBatch(ids), {
    keepPreviousData: true
  })

export const useAllXrmResources = (params?: any) =>
  useQuery(['useAllXrmResources', params], () => api.resources.useAllXrmResources(params), { keepPreviousData: true })

export const useTranslateResource = (options?: any) =>
  useMutation((params: any) => api.resources.translateResource(params), options)

export const registerNewSpectrumResource = () =>
  useMutation<any, any, any>((body?: any) => api.resources.registerNewSpectrumResource(body))
