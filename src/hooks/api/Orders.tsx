import { useMutation, useQuery } from 'react-query'
import { api } from 'api'

export const useMyOrders = (params?: any) =>
  useQuery(['myOrders', params], () => api.orders.getMyOrders(params), { keepPreviousData: true })

export const useCreateOrder = () => useMutation(['createOrder'], (body: any) => api.orders.createOrder(body))

export const getOrderedItems = (params?: any) =>
  useQuery(['orderedItems', params], () => api.orders.getOrderedItems(params), { keepPreviousData: true })

export const getAllProductOrders = (params?: any) =>
  useQuery(['getAllProductOrders', params], () => api.orders.getAllProductOrders(params), { keepPreviousData: true })
