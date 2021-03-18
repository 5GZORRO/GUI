import instance from 'api/instance'
import { endpoints } from 'api/endpoints'
import { MemberbershipAPIResponse, ApiParamsMembership } from 'types/api'

const get = async (params: ApiParamsMembership): Promise<MemberbershipAPIResponse> => {
  try {
    const response = await instance.apiMarketPlace.get(endpoints.MEMBERSHIPS, { params })
    return response.data.pagedMembers
  } catch (e) {
    throw new Error('error')
  }
}

export default {
  get
}
