/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query'

import { api } from 'api'

// Define a default query function that will receive the query key
export const useCreateSpecification = (body: any) => {
  return useMutation(['allCandidates', body], () => api.products.createSpecification(body))
}

export const useCreateOffering = () => {
  return useMutation(['candidate'], (body: any) => api.products.createOffering(body))
}

// change later
export const useSearchOffers = () => useMutation<any, any, any>((params: any) => api.products.getProductOffers(params))
