/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
/** Types */
import { ApiProductSpecification, ApiResourceSpecification, ApiProductOfferPrice, ApiCategory } from 'types/api'

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

    return newResponse
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
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
    return response.data
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
    resourceCandidatesResults = resourceCandidates?.data
    serviceCandidatesResults = serviceCandidates?.data
  } catch (e) {
    console.log({ e })
  }

  try {
    const resourceRequest = axios.get(endpoints.RESOURCE_SPECIFICATION, { params })
    const serviceRequest = axios.get(endpoints.SERVICE_SPECIFICATION, { params })

    const responses = await axios.all([resourceRequest, serviceRequest])

    return [].concat.apply(
      [],
      responses.map((el, index) => {
        if (index === 1) {
          return el?.data?.map((serv) => ({
            ...serv,
            isService: true,
            category: serviceCandidatesResults?.find((cand) => cand?.serviceSpecification?.id === serv?.id)?.category
          }))
        }
        return el?.data?.map((res) => ({
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
    return onlyChildren ? response.data.filter((el: any) => !el?.isBundle) : response.data
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
    const response = await axios.get(endpoints.LOCATIONS, {
      params: {
        fields: 'city,country,id,href,locality'
      }
    })
    return response.data
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

export default {
  useAllProductSpecification,
  getProductSpecificationById,
  useAllResourceSpecifications,
  getResourceSpecificationsById,
  getProductPrices,
  createProductOfferingPrice,
  getResourceSpecificationsBatch,
  useAllCategories,
  createCategory,
  useAllLocations,
  createLocation,
  useAllResourceAndServiceSpecifications
}
