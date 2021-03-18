import instance from 'api/instance'
import { endpoints } from 'api/endpoints'

const createSpecification = async (body: any): Promise<any> => {
  try {
    const response = await instance.apiMarketPlace.post(endpoints.PRODUCT_SPECIFICATION, { body })
    const newResponse = response.data[0]
    const { id, name, version, validFor, category, lifecycleStatus, description, resourceSpecification } = newResponse
    return { id, name, version, validFor, category, lifecycleStatus, description, resourceSpecification }
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const createOffering = async (body: any): Promise<any> => {
  try {
    const response = await instance.apiMarketPlace.post(endpoints.PRODUCT_OFFERING, { body })
    console.log(response)
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  createSpecification,
  createOffering
}
