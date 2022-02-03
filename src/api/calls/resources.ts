/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { XRM_DISCOVERY_API_KEY, XRM_TRANSLATOR_API_KEY, RAPP_DISCOVERY_API_KEY, API_MARKET_PLACE } from 'config'

/** Types */
import { ApiProductSpecification, ApiResourceSpecification, ApiProductOfferPrice, ApiCategory, ApiServiceSpecification } from 'types/api'

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

const getResourceSpecificationsBatch = async (
  resourceIds: string,
  servicesIndex: any
): Promise<ApiResourceSpecification[]> => {
  try {
    const ids = resourceIds.split(',')
    const response = await Promise.allSettled(
      ids.map((id, index) => {
        if (servicesIndex.includes(index)) {
          return axios.get(`${endpoints.SERVICE_SPECIFICATION}/${id}`)
        }
        return axios.get(`${endpoints.RESOURCE_SPECIFICATION}/${id}`)
      })
    )

    const newResponse = response.reduce((acc: any, item: any) => {
      if (item?.status === 'fulfilled') {
        if (Array.isArray(item?.value?.data)) {
          return [...acc, ...item?.value?.data]
        } else {
          return [...acc, { isService: true, ...item?.value?.data }]
        }
      }
      return acc
    }, [])

    const nestedResourcesResponse = await Promise.allSettled(
      newResponse
        ?.filter((el) => el?.isService === true)
        ?.map((ss) =>
          ss?.resourceSpecification
            ?.map((rs) => rs?.href != null && rs?.href !== 'string' && axios.get(rs?.href))
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

    return newResponse?.map((el) => {
      if (el?.isService) {
        return {
          ...el,
          resourceSpecification: el?.resourceSpecification?.map((rs) =>
            nestedResources?.find((ns) => ns?.id === rs?.id)
          )
        }
      }
      return el
    })
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const getProductOffersBatch = async (offersIds: string) => {
  const ids = offersIds.split(',')
  const response = await Promise.allSettled(ids.map((id, index) => axios.get(`${endpoints.PRODUCT_OFFERING}/${id}`)))

  const data = response?.reduce((acc: any, item: any) => {
    if (item?.status === 'fulfilled') {
      return [...acc, item?.value?.data]
    }
    return acc
  }, [])

  const productSpecificationResponses = await Promise.allSettled(
    data?.map(
      (offer, index) =>
        offer?.productSpecification?.href != null &&
        offer?.productSpecification?.href !== 'string' &&
        axios.get(offer?.productSpecification?.href)
    )
  )
  const locationsResponses = await Promise.allSettled(
    data
      ?.map((offer, index) =>
        offer?.place?.map((el) => el?.href != null && el?.href !== 'string' && axios.get(el?.href))
      )
      .flat()
  )

  const productOfferingPricesResponses = await Promise.allSettled(
    data
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
      ?.filter((el) => el != null && el?.isService === true)
      ?.map((ss) =>
        ss?.resourceSpecification?.map((rs) => axios.get(rs?.href != null && rs?.href !== 'string' && rs?.href))?.flat()
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

  return data?.map((el) => {
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
}

const useAllCategories = async (params?: any): Promise<ApiCategory[]> => {
  try {
    const response = await axios.get(endpoints.CATEGORIES, { params })
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const useAllResourceSpecifications = async (params?: any): Promise<ApiResourceSpecification[]> => {
  try {
    const response = await axios.get(endpoints.RESOURCE_SPECIFICATION, { params })
    const filteredData = response?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
    const filteredFunction = filteredData.filter((el: any) => el?.resourceSpecCharacteristic?.[0]?.resourceSpecCharacteristicValue?.[0]?.value?.alias === 'vnfdId')
    return filteredFunction
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const useAllServicesSpecifications = async (params?: any): Promise<ApiServiceSpecification[]> => {
  try {
    const response = await axios.get(endpoints.SERVICE_SPECIFICATION, { params })
    const filteredData = response?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
    const filteredFunction = filteredData.filter((el: any) => el?.serviceSpecCharacteristic?.[0]?.serviceSpecCharacteristicValue?.[0]?.value?.alias === 'nsdId')
    return filteredFunction
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const useAllResourceAndServiceSpecifications = async (params?: any): Promise<any[]> => {
  // const categories = await useAllCategories()
  let resourceCandidatesResults: any
  let serviceCandidatesResults: any

  try {
    const resourceCandidateRequest = axios.get(endpoints.RESOURCE_CANDIDATE, { params })
    const serviceCandidateRequest = axios.get(endpoints.SERVICE_CANDIDATE, { params })

    const [resourceCandidates, serviceCandidates] = await axios.all([resourceCandidateRequest, serviceCandidateRequest])
    resourceCandidatesResults = resourceCandidates?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
    serviceCandidatesResults = serviceCandidates?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
  } catch (e) {
    console.log({ e })
  }

  try {
    const resourceRequest = axios.get(endpoints.RESOURCE_SPECIFICATION, { params })
    const serviceRequest = axios.get(endpoints.SERVICE_SPECIFICATION, { params })

    const responses = await axios.all([resourceRequest, serviceRequest])
    const resourceRequestResult = responses?.[1]?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
    const nestedResourcesResponse = await Promise.allSettled(
      resourceRequestResult
        ?.map((ss) =>
          ss?.resourceSpecification
            ?.map((rs) => rs?.href != null && rs?.href !== 'string' && axios.get(rs?.href, { params }))
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

    return [].concat.apply(
      [],
      responses.map((el, index) => {
        const filteredResp = el?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
        if (index === 1) {
          return filteredResp.map((serv) => ({
            ...serv,
            isService: true,
            category: serviceCandidatesResults?.find((cand) => cand?.serviceSpecification?.id === serv?.id)?.category,
            resourceSpecification: serv?.resourceSpecification?.map((rs) =>
              nestedResources?.find((ns) => ns?.id === rs?.id)
            )
          }))
        }
        return filteredResp.map((res) => ({
          ...res,
          category: resourceCandidatesResults?.find((cand) => cand?.resourceSpecification?.id === res?.id)?.category
        }))
      })
    )
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getResourceSpecificationsById = async (id: string): Promise<ApiResourceSpecification> => {
  try {
    const response = await axios.get(`${endpoints.RESOURCE_SPECIFICATION}/${id}`)
    return response?.data?.[0]
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getProductPrices = async (params?: any, onlyChildren = false): Promise<ApiProductOfferPrice[]> => {
  try {
    const response = await axios.get(endpoints.PRODUCT_OFFER_PRICE, { params })
    // return onlyChildren ? response.data.filter((el: any) => !el?.isBundle) : response.data
    return response?.data.filter((el: any) => el?.href.includes(API_MARKET_PLACE))
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createProductOfferingPrice = async (body: any): Promise<ApiProductOfferPrice> => {
  try {
    const response = await axios.post(endpoints.PRODUCT_OFFER_PRICE, body)
    return response.data
  } catch (err) {
    console.log({ err })
    throw new Error('error')
  }
}

const useAllLocations = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.LOCATIONS, { params })
    const filteredResp = response?.data.filter((loc: any) => loc?.href.includes(API_MARKET_PLACE))
    return filteredResp
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createCategory = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.CATEGORIES, body)
    return response.data
  } catch (err) {
    console.log({ err })
    throw new Error('error')
  }
}

const createLocation = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.LOCATION_CREATE, body)
    return response.data
  } catch (err) {
    console.log({ err })
    throw new Error('error')
  }
}

const useAllXrmResources = async (params?: any): Promise<any[]> => {
  try {
    const vnfRequest = axios.get(endpoints.XRM_VNF_DISCOVERY_ENDPOINT, {
      params,
      headers: { 'X-Gravitee-Api-Key': XRM_DISCOVERY_API_KEY }
    })
    const nsdRequest = axios.get(endpoints.XRM_NSD_DISCOVERY_ENDPOINT, {
      params,
      headers: { 'X-Gravitee-Api-Key': XRM_DISCOVERY_API_KEY }
    })

    const spcRequest = axios.get(endpoints.RAPP_SPC_DISCOVERY_ENDPOINT, {
      params,
      headers: { 'X-Gravitee-Api-Key': RAPP_DISCOVERY_API_KEY }
    })

    const radRequest = axios.get(endpoints.RAPP_RAD_DISCOVERY_ENDPOINT, {
      params,
      headers: { 'X-Gravitee-Api-Key': RAPP_DISCOVERY_API_KEY }
    })

    const responses = await axios.all([vnfRequest, nsdRequest, spcRequest, radRequest])

    return [
      ...responses[0]?.data?.map((el) => ({ ...el, contentType: 'VNF' })),
      ...responses[1]?.data?.map((el) => ({ ...el, contentType: 'NSD' })),
      ...responses[2]?.data?.map((el) => ({ ...el, contentType: 'SPC' })),
      ...responses[3]?.data?.radios?.map((el) => ({ ...el, contentType: 'RAD' }))
    ]
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const translateResource = async (params: any): Promise<any> => {
  let endpoint = ''
  switch (params?.type) {
    case 'VNF':
      endpoint = endpoints.XRM_VNF_TRANSLATOR_ENDPOINT
      break
    case 'NSD':
      endpoint = endpoints.XRM_NSD_TRANSLATOR_ENDPOINT
      break
    case 'SPC':
      endpoint = endpoints.XRM_SPC_TRANSLATOR_ENDPOINT
      break
    case 'RAD':
      endpoint = endpoints.XRM_RAD_TRANSLATOR_ENDPOINT
      break
    default:
      endpoint = endpoints.XRM_NSD_TRANSLATOR_ENDPOINT
      break
  }

  let paramName = ''
  switch (params?.type) {
    case 'VNF':
      paramName = 'functionType'
      break
    case 'NSD':
      paramName = 'serviceType'
      break
  }

  if (params?.input !== undefined && params?.input !== '') {
    try {
      const response = await axios.post(endpoint + `${params?.id}`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Gravitee-Api-Key': XRM_TRANSLATOR_API_KEY
        },
        params: { [paramName]: params?.input }
      })
      return response.data
    } catch (err) {
      console.log({ err })
      throw new Error('error')
    }
  } else if (params?.type === 'RAD') {
    try {
      const response = await axios.post(endpoint + `${params?.id}`, params?.body?.[0], {
        headers: {
          'Content-Type': 'application/json',
          'X-Gravitee-Api-Key': XRM_TRANSLATOR_API_KEY
        }
      })
      return response.data
    } catch (err) {
      console.log({ err })
      throw new Error('error')
    }
  } else {
    try {
      const response = await axios.post(endpoint + `${params?.id}`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Gravitee-Api-Key': XRM_TRANSLATOR_API_KEY
        }
      })
      return response.data
    } catch (err) {
      console.log({ err })
      throw new Error('error')
    }
  }
}

export default {
  useAllProductSpecification,
  getProductSpecificationById,
  useAllResourceSpecifications,
  useAllServicesSpecifications,
  getResourceSpecificationsById,
  getProductPrices,
  createProductOfferingPrice,
  getResourceSpecificationsBatch,
  useAllCategories,
  createCategory,
  useAllLocations,
  createLocation,
  useAllResourceAndServiceSpecifications,
  getProductOffersBatch,
  useAllXrmResources,
  translateResource
}
