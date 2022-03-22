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

const getProductOrderItems = async (params: any): Promise<any> => {
  // console.log(params && JSON.parse(params))
  try {
    const resp = await axios.get(endpoints.PRODUCT_ORDERS)
    const newArray: any[] = []
    resp?.data?.map(async (productOrderItem: any) => {
      productOrderItem?.productOrderItem.map(async (item: any) => {
        if (item?.productOffering?.href != null && item?.productOffering?.href !== 'string') {
          const response = await axios.get(item?.productOffering?.href)
          console.log(response?.data)
          const productSpecificationResponses = await Promise.allSettled([
            response?.data?.productSpecification?.href != null &&
              response?.data?.productSpecification?.href !== 'string' &&
              axios.get(response?.data?.productSpecification?.href)
          ])

          const locationsResponses = await Promise.allSettled(
            response?.data?.place?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)).flat()
          )

          const productOfferingPricesResponses = await Promise.allSettled(
            response?.data?.productOfferingPrice
              ?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
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
                  ...ps?.resourceSpecification?.map(
                    (el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)
                  ),
                  ...ps?.serviceSpecification?.map(
                    (el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href)
                  )
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

          console.log(productOfferingPrices)
          console.log(locations)
          console.log(nestedResources)
          // newArray.push({
          //   ...response?.data,
          //   productSpecification: {
          //     ...response?.data,
          //     resourceSpecification: response?.data?.resourceSpecification?.map((rs) =>
          //       resourceAndServices?.find((rss) => rs?.id === rss?.id)
          //     ),
          //     serviceSpecification: response?.data?.serviceSpecification?.map((ss) => {
          //       const service = resourceAndServices?.find((rss) => ss?.id === rss?.id)

          //       return {
          //         ...service,
          //         isService: true,
          //         resourceSpecification: service?.resourceSpecification?.map((rs) =>
          //           nestedResources?.find((ns) => ns?.id === rs?.id)
          //         )
          //       }
          //     })
          //   },
          //   productOfferingPrice: response?.data?.productOfferingPrice?.map((pop) =>
          //     productOfferingPrices?.find((price) => price?.id === pop?.id)
          //   ),
          //   place: response?.data?.place?.map((pl) => locations.find((lc) => lc?.id === pl?.id))
          // })
        }
      })
    })
    return newArray
  } catch (e) {}
}

export default {
  getMyOrders,
  createOrder,
  getOrderedItems,
  getProductOrderItems
}
