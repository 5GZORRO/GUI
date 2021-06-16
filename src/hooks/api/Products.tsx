/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'

import { api } from 'api'

// Define a default query function that will receive the query key
export const useCreateSpecification = (body: any) => {
  return useMutation(['allCandidates', body], () => api.products.createSpecification(body))
}

export const useCreateOffering = () => {
  return useMutation(['createOffer'], (body: any) => api.products.createOffering(body))
}

// change later
export const useSearchOffers = () => useMutation<any, any, any>((params: any) => api.products.getProductOffers(params))

export const useSearchOffersNoParams = (params: any) =>
  useQuery(['searchOffers', params], () => api.products.getProductOffers(params), { keepPreviousData: true })
