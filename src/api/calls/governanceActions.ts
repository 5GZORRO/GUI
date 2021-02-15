import apiInstance from 'api/instance'
import { endpoints } from 'api/endpoints'
import { GovernanceActionsAPIResponse, ApiParamsGovernanceActions } from 'types/api'

const get = async (params: ApiParamsGovernanceActions): Promise<GovernanceActionsAPIResponse> => {
	try {
		const response = await apiInstance.get(endpoints.GOVERNANCEACTIONS, { params })
		return response.data.pagedGovernanceProposals
	} catch (e) {
		throw new Error('error')
	}
}

export default {
	get
}
