import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { ApiOrders } from 'types/api'

const getMyOrders = async (params: any): Promise<ApiOrders[]> => {
  try {
    const response = await axios.get(endpoints.PRODUCT_ORDERS)

    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createOrder = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.PRODUCT_ORDERS, body)
    return response.data
  } catch (error) {
    console.log({ error })
    throw new Error('error')
  }
}

const getOrderedItems = async (params: any): Promise<ApiOrders[]> => {
  try {
    const response = await axios.get(endpoints.PRODUCT_ORDERS)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getAllProductOrders = async (params: any): Promise<any> => {
  try {
    const resp = await axios.get(endpoints.PRODUCT_ORDERS)
    const newArray: any[] = []

    resp?.data?.forEach((productOrderItem: any) =>
      productOrderItem?.productOrderItem.forEach((item: any) => {
        if (item?.productOffering?.href != null && item?.productOffering?.href !== 'string') {
          newArray.push(item?.productOffering?.href)
        }
      })
    )

    const productOrdemItem = await Promise.all(
      newArray.map(async (item) => {
        try {
          const rep = await axios.get(item)
          return rep?.data
        } catch (e) {}
      })
    )

    const filteredArr = productOrdemItem.filter((el) => el !== undefined)
    const newResponse = filteredArr.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name && item.description === current.description)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])

    const productSpecificationResponses = await Promise.allSettled(
      newResponse?.map(
        (offer, index) =>
          offer?.productSpecification?.href != null &&
          offer?.productSpecification?.href !== 'string' &&
          axios.get(offer?.productSpecification?.href)
      )
    )

    const locationsResponses = await Promise.allSettled(
      newResponse
        ?.map((offer, index) =>
          offer?.place?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
        )
        .flat()
    )

    const productOfferingPricesResponses = await Promise.allSettled(
      newResponse
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

    return newResponse?.map((el) => {
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
  } catch (e) {}
}

export default {
  getMyOrders,
  createOrder,
  getOrderedItems,
  getAllProductOrders
}
