/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'

import { api } from 'api'

export const getAllTransactions = (profile?: string) => {
  let operator: any
  if (profile) {
    operator = '/' + profile
  }
  return useQuery(['allTransactions', operator], () => api.issm.getAllTransactions(operator), {
    keepPreviousData: false
  })
}

export const getArchivedTransactions = (profile?: string) => {
  let operator: any
  if (profile) {
    operator = '/' + profile
  }
  return useQuery(['archivedTransactions', operator], () => api.issm.getArchivedTransactions(operator), {
    keepPreviousData: true
  })
}

export const getTransactionsTypes = () => {
  return useQuery('transactionTypes', () => api.issm.getTransactionTypes(), {
    keepPreviousData: true
  })
}

export const scaleOutOp = () => useMutation<any, any, any>((params?: any) => api.issm.scaleOut(params))

export const deleteTransaction = () => useMutation<any, any, any>((params?: any) => api.issm.deleteTransaction(params))
