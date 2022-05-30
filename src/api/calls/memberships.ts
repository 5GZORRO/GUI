import { endpoints } from 'api/endpoints'
import { MemberbershipAPIResponse } from 'types/api'
import axios from 'api/instance'

const getMembers = async (): Promise<MemberbershipAPIResponse[]> => {
  try {
    const response = await axios.get(endpoints.MEMBERSHIPS)
    if (response?.data?.pagedMembers?.content) {
      return response?.data?.pagedMembers?.content
    }
    return []
  } catch (e) {
    throw new Error('error')
  }
}

export default {
  getMembers
}
