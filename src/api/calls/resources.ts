/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
/** Types */
import { ApiProductSpecification } from 'types/api'

const useAllProductSpecification = async (params?: any): Promise<ApiProductSpecification[]> => {
  try {
    const response = await axios.get(endpoints.PRODUCT_SPECIFICATION, { params })
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getProductSpecificationById = async (id: string): Promise<ApiProductSpecification> => {
  try {
    const response = await axios.get(`${endpoints.PRODUCT_SPECIFICATION}/${id}`)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  useAllProductSpecification,
  getProductSpecificationById
}
