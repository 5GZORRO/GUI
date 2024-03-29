/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'

import { api } from 'api'

export const useCreateSpecification = (body: any) => {
  return useMutation(['allCandidates', body], () => api.products.createSpecification(body))
}

export const useCreateOffering = () => {
  return useMutation(['createOffer'], (body: any) => api.products.createOffering(body))
}

export const useSearchOffers = () => useMutation<any, any, any>((params?: any) => api.products.getProductOffers(params))

export const useSearchOffersAdvanced = () =>
  useMutation<any, any, any>((params?: any) => api.products.getProductOffersAdvanced(params))

export const useSearchOffersNoParams = (params?: any) =>
  useQuery(['searchOffers', params], () => api.products.getProductOffers(params), { keepPreviousData: true })

export const useSearchOffersById = () =>
  useMutation<any, any, any>((params?: any) => api.products.getProductOffersById(params))
