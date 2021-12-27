/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'

import { api } from 'api'

// change later
export const getAllTransactions = (params?: any) => {
  let operator: any
  switch (params) {
    case 'Operator_A':
      operator = '/operator-a'
      break
    case 'Operator_B':
      operator = '/operator-b'
      break

    case 'Operator C ':
      operator = '/operator-c'
      break
  }
  return useQuery(['allTransactions', operator], () => api.issm.getAllTransactions(operator), {
    keepPreviousData: false
  })
}

export const getArchivedTransactions = (params?: any) => {
  let operator: any
  switch (params) {
    case 'Operator_A':
      operator = 'operator-a'
      break
    case 'Operator_B':
      operator = 'operator-b'
      break

    case 'Operator C ':
      operator = 'operator-c'
      break
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
