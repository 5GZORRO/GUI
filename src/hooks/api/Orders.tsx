import { useMutation, useQuery } from 'react-query'
import { api } from 'api'

export const useMyOrders = (params?: any) =>
  useQuery(['myOrders', params], () => api.orders.getMyOrders(params), { keepPreviousData: true })

export const useCreateOrder = () => useMutation(['createOrder'], (body: any) => api.orders.createOrder(body))
