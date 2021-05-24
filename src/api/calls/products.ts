import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformResourcesToProduct } from '../utils'

const createSpecification = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.PRODUCT_SPECIFICATION, body)
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createOffering = async (body: any): Promise<any> => {
  const { resourceSpecifications, ...remain } = body

  try {
    const productSpecification = TransformResourcesToProduct(resourceSpecifications, remain)
    const newProductSpecification = await createSpecification(productSpecification)
    if (newProductSpecification != null) {
      try {
        const response = await axios.post(endpoints.PRODUCT_OFFERING, {
          ...remain,
          productSpecification: newProductSpecification
        })
        return response.data
      } catch (e) {
        console.log({ e })
        throw new Error('error')
      }
    } else {
      throw new Error('error')
    }
  } catch (err) {
    console.log({ err })
    throw new Error('error')
  }
}

const getProductOffers = async (params: any): Promise<any> => {
  try {
    const response = await axios.get(endpoints.PRODUCT_OFFERING, { params: { ...params } })
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  createSpecification,
  createOffering,
  getProductOffers
}
