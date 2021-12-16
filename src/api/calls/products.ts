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
      response?.data?.map(
        (offer, index) =>
          offer?.productSpecification?.href != null &&
          offer?.productSpecification?.href !== 'string' &&
          axios.get(offer?.productSpecification?.href)
      )
    )

    const locationsResponses = await Promise.allSettled(
      response?.data
        ?.map((offer, index) =>
          offer?.place?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
        )
        .flat()
    )

    const productOfferingPricesResponses = await Promise.allSettled(
      response?.data
        ?.map((offer, index) =>
          offer?.productOfferingPrice?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
        )
        .flat()
    )

    const productSpecifications = productSpecificationResponses?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        return [...acc, item?.value?.data]
      }
      return acc
    }, [])

    const resourceAndServicesSpecifications = await Promise.allSettled(
      productSpecifications
        ?.filter((el) => el != null)
        ?.map((ps, index) => {
          return [
            ...ps?.resourceSpecification?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)),
            ...ps?.serviceSpecification?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
          ]
        })
        .flat()
    )

    const resourceAndServices = resourceAndServicesSpecifications?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        if (Array.isArray(item?.value?.data)) {
          return [...acc, ...item?.value?.data]
        } else {
          return [...acc, { ...item?.value?.data, isService: true }]
        }
      }
      return acc
    }, [])

    const nestedResourcesResponse = await Promise.allSettled(
      resourceAndServices
        ?.filter((el) => el != null && el?.isService !== true)
        ?.map((ss) => axios.get(ss?.href != null && ss?.href !== 'string' && ss?.href, { params }))
        ?.flat()
    )

    const nestedResources = nestedResourcesResponse?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        if (Array.isArray(item?.value?.data)) {
          return [...acc, ...item?.value?.data]
        } else {
          return [...acc, item?.value?.data]
        }
      }
      return acc
    }, [])

    const locations = locationsResponses?.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        return [...acc, item?.value?.data]
      }
      return acc
    }, [])

    const productOfferingPrices = productOfferingPricesResponses?.reduce((acc: any, item: any) => {
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
          serviceSpecification: ps?.serviceSpecification?.map((ss) => {
            const service = resourceAndServices?.find((rss) => ss?.id === rss?.id)

            return {
              ...service,
              isService: true,
              resourceSpecification: service?.resourceSpecification?.map((rs) =>
                nestedResources?.find((ns) => ns?.id === rs?.id)
              )
            }
          })
        },
        productOfferingPrice: el?.productOfferingPrice?.map((pop) =>
          productOfferingPrices?.find((price) => price?.id === pop?.id)
        ),
        place: el?.place?.map((pl) => locations.find((lc) => lc?.id === pl?.id))
      }
    })
  } catch (e) {
    console.log(e, { e })
    throw new Error('error')
  }
}

const getProductOffersAdvanced = async (params: any): Promise<any> => {
  try {
    const newParams = cleanEmptyparams(params)
    const encodeParams = encodeURI(newParams)
    const response = await axios.get(endpoints.SRDS_INTENT_MODULE + `${encodeParams}`)
    if (response?.data) {
      const productSpecificationResponses = await Promise.allSettled(
        response?.data?.map(
          (offer, index) =>
            offer?.offer_object?.productSpecification?.href != null &&
            offer?.offer_object?.productSpecification?.href !== 'string' &&
            axios.get(offer?.offer_object?.productSpecification?.href)
        )
      )

      const locationsResponses = await Promise.allSettled(
        response?.data
          ?.map((offer, index) =>
            offer?.offer_object?.place?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
          )
          .flat()
      )

      const productOfferingPricesResponses = await Promise.allSettled(
        response?.data
          ?.map((offer, index) =>
            offer?.offer_object?.productOfferingPrice?.map(
              (el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)
            )
          )
          .flat()
      )

      const productSpecifications = productSpecificationResponses?.reduce((acc: any, item: any) => {
        if (item?.status === 'fulfilled') {
          return [...acc, item?.value?.data]
        }
        return acc
      }, [])

      const resourceAndServicesSpecifications = await Promise.allSettled(
        productSpecifications
          ?.filter((el) => el != null)
          ?.map((ps, index) => [
            ...ps?.resourceSpecification?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)),
            ...ps?.serviceSpecification?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
          ])
          .flat()
      )

      const resourceAndServices = resourceAndServicesSpecifications?.reduce((acc: any, item: any) => {
        if (item?.status === 'fulfilled') {
          if (Array.isArray(item?.value?.data)) {
            return [...acc, ...item?.value?.data]
          } else {
            return [...acc, { ...item?.value?.data, isService: true }]
          }
        }
        return acc
      }, [])

      const nestedResourcesResponse = await Promise.allSettled(
        resourceAndServices
          ?.filter((el) => el != null && el?.isService !== true)
          ?.map((ss) =>
            ss?.resourceSpecification
              ?.map((rs) => axios.get(rs?.href != null && rs?.href !== 'string' && rs?.href, { params }))
              ?.flat()
          )
          ?.flat()
      )

      const nestedResources = nestedResourcesResponse?.reduce((acc: any, item: any) => {
        if (item?.status === 'fulfilled') {
          if (Array.isArray(item?.value?.data)) {
            return [...acc, ...item?.value?.data]
          } else {
            return [...acc, item?.value?.data]
          }
        }
        return acc
      }, [])

      const locations = locationsResponses?.reduce((acc: any, item: any) => {
        if (item?.status === 'fulfilled') {
          return [...acc, item?.value?.data]
        }
        return acc
      }, [])

      const productOfferingPrices = productOfferingPricesResponses?.reduce((acc: any, item: any) => {
        if (item?.status === 'fulfilled') {
          return [...acc, item?.value?.data]
        }
        return acc
      }, [])

      return response?.data?.map((el) => {
        const ps = productSpecifications?.find((rp) => rp?.id === el?.offer_object?.productSpecification?.id)
        return {
          ...el?.offer_object,
          productSpecification: {
            ...ps,
            resourceSpecification: ps?.resourceSpecification?.map((rs) =>
              resourceAndServices?.find((rss) => rs?.id === rss?.id)
            ),
            serviceSpecification: ps?.serviceSpecification?.map((ss) => {
              const service = resourceAndServices?.find((rss) => ss?.id === rss?.id)

              return {
                ...service,
                isService: true,
                resourceSpecification: service?.resourceSpecification?.map((rs) =>
                  nestedResources?.find((ns) => ns?.id === rs?.id)
                )
              }
            })
          },
          productOfferingPrice: el?.offer_object?.productOfferingPrice?.map((pop) =>
            productOfferingPrices?.find((price) => price?.id === pop?.id)
          ),
          place: el?.offer_object?.place?.map((pl) => locations.find((lc) => lc?.id === pl?.id))
        }
      })
    }
  } catch (e) {
    console.log(e, { e })
    throw new Error('error')
  }
}

export default {
  createSpecification,
  createOffering,
  getProductOffers,
  getProductOffersAdvanced
}
