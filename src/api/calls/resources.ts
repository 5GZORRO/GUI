/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformDataResourceCandidate } from 'api/utils'
/** Types */
import { ApiResourceCandidate } from 'types/api'

const getAllCandidates = async (params?: any): Promise<ApiResourceCandidate[]> => {
  try {
    const response = await axios.get(endpoints.RESOURCE_CANDIDATE, { params })
    return TransformDataResourceCandidate(response.data)
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const getCandidateById = async (candidateIds: string): Promise<ApiResourceCandidate[]> => {
  try {
    const ids = candidateIds.split(',')
    const response = await Promise.allSettled(
      ids.map(id => axios.get(`${endpoints.RESOURCE_CANDIDATE}/${id}`))
    )

    const newResponse = response.reduce((acc: any, item: any) => {
      if (item.status === 'fulfilled') {
        acc.push(...TransformDataResourceCandidate(item.value.data))
      }
      return acc
    }, [])

    return newResponse
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  getAllCandidates,
  getCandidateById
}
