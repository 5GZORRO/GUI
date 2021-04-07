import { endpoints } from 'api/endpoints'
import { MemberbershipAPIResponse, ApiParamsMembership } from 'types/api'
import axios from 'api/instance'

const get = async (params: ApiParamsMembership): Promise<MemberbershipAPIResponse> => {
  try {
    const response = await axios.get(endpoints.MEMBERSHIPS, { params })
    return response.data.pagedMembers
  } catch (e) {
    throw new Error('error')
  }
}

export default {
  get
}
