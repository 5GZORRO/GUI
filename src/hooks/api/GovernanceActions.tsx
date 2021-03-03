/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from 'react-query'

import { api } from 'api'
import { ApiParamsGovernanceActions } from 'types/api'

// Define a default query function that will receive the query key
export const useGovernances = (params?: ApiParamsGovernanceActions) => {
  return useQuery(['result', params], () => api.governanceActions.get(), { keepPreviousData: true })
}

export const useProposal = (id: string) => {
  return useQuery(['resultById', id], () => api.governanceActions.getProposal(id), { keepPreviousData: true })
}
