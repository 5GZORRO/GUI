import { endpoints } from 'api/endpoints'
import { ApiOrganizationResponse, ApiParamsMembership } from 'types/api'
import axios from 'api/instance'
import { AxiosResponse } from 'axios'
import { TransformDataOrganization } from 'api/utils'

const get = async (params: ApiParamsMembership): Promise<ApiOrganizationResponse> => {
  try {
    const response:AxiosResponse<ApiOrganizationResponse> = await axios.get(endpoints.ORGANIZATIONS)
    // it is simple but in the future can be  more complex
    return TransformDataOrganization(response.data)
  } catch (e) {
    throw new Error('error')
  }
}

const create = async (params: ApiParamsMembership): Promise<any> => {
  try {
    const response = await axios.post(endpoints.ORGANIZATIONS)
    return response.data.pagedMembers
  } catch (e) {
    throw new Error('error')
  }
}

const remove = async (params: ApiParamsMembership): Promise<any> => {
  try {
    const response = await axios.delete(endpoints.ORGANIZATIONS)
    return response.data.pagedMembers
  } catch (e) {
    throw new Error('error')
  }
}

const edit = async (params: ApiParamsMembership): Promise<any> => {
  try {
    const response = await axios.patch(endpoints.ORGANIZATIONS)
    return response.data.pagedMembers
  } catch (e) {
    throw new Error('error')
  }
}

export default {
  get,
  create,
  remove,
  edit
}
