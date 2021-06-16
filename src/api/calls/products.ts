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
    const productSpecificationResponses = await Promise.allSettled(
      response?.data?.map((offer, index) => axios.get(offer?.productSpecification?.href))
    )
    const locationsResponses = await Promise.allSettled(
      response?.data?.map((offer, index) => offer?.place?.map((el) => axios.get(el?.href))).flat()
    )

    const productSpecifications = productSpecificationResponses?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        return [...acc, item?.value?.data]
      }
      return acc
    }, [])

    const resourceAndServicesSpecifications = await Promise.allSettled(
      productSpecifications
        ?.map((ps, index) => [
          ...ps?.resourceSpecification?.map((el) => axios.get(el?.href)),
          ...ps?.serviceSpecification?.map((el) => axios.get(el?.href))
        ])
        .flat()
    )

    const resourceAndServices = resourceAndServicesSpecifications?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        if (Array.isArray(item?.value?.data)) {
          return [...acc, ...item?.value?.data]
        } else {
          return [...acc, item?.value?.data]
        }
      }
      return acc
    }, [])

    console.log(resourceAndServices)

    const locations = locationsResponses?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        return [...acc, item?.value?.data]
      }
      return acc
    }, [])
    return response?.data?.map((el) => {
      const ps = productSpecifications?.find((rp) => rp?.id === el?.productSpecification?.id)
      return {
        ...el,
        productSpecification: {
          ...ps,
          resourceSpecification: ps?.resourceSpecification?.map((rs) =>
            resourceAndServices?.find((rss) => rs?.id === rss?.id)
          ),
          serviceSpecification: ps?.serviceSpecification?.map((ss) =>
            resourceAndServices?.find((rss) => ss?.id === rss?.id)
          )
        },
        place: el?.place?.map((pl) => locations.find((lc) => lc?.id === pl?.id))
      }
    })
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
