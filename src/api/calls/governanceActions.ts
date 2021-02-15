/* eslint-disable @typescript-eslint/no-unused-vars */
import apiInstance from 'api/instance'
import { endpoints } from 'api/endpoints'
import { GovernanceActionsAPIResponse, ApiParamsGovernanceActions } from 'types/api'

const get = async (params?: ApiParamsGovernanceActions): Promise<GovernanceActionsAPIResponse> => {
	try {
		const response = await apiInstance.get(endpoints.GOVERNANCEACTIONS, { params })
		return response.data.pagedGovernanceProposals
	} catch (e) {
		throw new Error('error')
	}
}

const getProposal = async (id: string): Promise<GovernanceActionsAPIResponse> => {
	try {
		const response = await apiInstance.get(endpoints.GOVERNANCEACTIONS)
		return response.data.pagedGovernanceProposals
	} catch (e) {
		throw new Error('error')
	}
}

export default {
	get,
	getProposal
}