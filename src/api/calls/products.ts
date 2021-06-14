import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformResourcesToProduct, cleanEmptyparams, TransformToParentPOP } from '../utils'

const createSpecification = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.PRODUCT_SPECIFICATION, body)
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createFinalPOP = async (body: any, info: any): Promise<any> => {
  if (body?.length > 1) {
    try {
      const parentPOP = TransformToParentPOP(body, info)
      const response = await axios.post(endpoints.PRODUCT_OFFER_PRICE, parentPOP)
      return response?.data
    } catch (e) {
      console.log({ e })
      throw new Error('error')
    }
  } else {
    return body
  }
}

const createOffering = async (body: any): Promise<any> => {
  const { resourceSpecifications, currentUser, productOfferingPrice, ...remain } = body
  const finalPOP = await createFinalPOP(productOfferingPrice, remain)

  try {
    const productSpecification = TransformResourcesToProduct(resourceSpecifications, remain, currentUser)
    const newProductSpecification = await createSpecification(productSpecification)
    if (newProductSpecification != null) {
      try {
        const response = await axios.post(endpoints.PRODUCT_OFFERING, {
          ...remain,
          bundledProductOffering: productOfferingPrice.length > 1 ? [finalPOP] : [],
          productOfferingPrice: productOfferingPrice.length === 1 ? productOfferingPrice : [],
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
    const newParams = cleanEmptyparams(params)
    const response = await axios.get(endpoints.PRODUCT_OFFERING_FILTERED, { params: { ...newParams } })
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
