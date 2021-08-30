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

    const nestedResourcesResponse = await Promise.allSettled(
      responses?.[1]?.data
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
        if (index === 1) {
          return el?.data?.map((serv) => ({
            ...serv,
            isService: true,
            category: serviceCandidatesResults?.find((cand) => cand?.serviceSpecification?.id === serv?.id)?.category,
            resourceSpecification: serv?.resourceSpecification?.map((rs) =>
              nestedResources?.find((ns) => ns?.id === rs?.id)
            )
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
    const response = await axios.get(endpoints.LOCATIONS, { params })
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

const useAllXrmResources = async (params?: any): Promise<any[]> => {
  // try {
  // const vnfRequest = axios.get(endpoints.XRM_VNF_ENDPOINT, { params })
  // const nsdRequest = axios.get(endpoints.XRM_NSD_ENDPOINT, { params })

  // const responses = await axios.all([vnfRequest, nsdRequest])
  return [
    ...[
      {
        id: 'a6b6238a-92a6-4da6-9a04-1fb0a1226ef9',
        nsdId: 'ae3c115c-0423-40b3-8623-a993de1e9d03',
        nsdName: 'edge_cache_nsd',
        nsdVersion: '1.0',
        nsdDesigner: 'NXW',
        nsdInvariantId: 'ae3c115c-0423-40b3-8623-a993de1e9d03',
        vnfPkgIds: ['6fcd31f4-bcee-4ff3-9779-ad45ff5d87c0'],
        pnfdInfoIds: [],
        nestedNsdInfoIds: [],
        nsdOnboardingState: 'ONBOARDED',
        onboardingFailureDetails: null,
        nsdOperationalState: 'ENABLED',
        nsdUsageState: 'NOT_IN_USE',
        userDefinedData: {
          isRetrievedFromMANO: 'yes',
          NXW_OSMR10: 'yes'
        },
        _links: {
          self: '/nsd/v1/ns_descriptors/a6b6238a-92a6-4da6-9a04-1fb0a1226ef9',
          nsd_content: '/nsd/v1/ns_descriptors/a6b6238a-92a6-4da6-9a04-1fb0a1226ef9/nsd_content'
        },
        manosOnboardingStatus: {
          NXW_OSMR10: 'ONBOARDED'
        },
        c2cOnboardingState: 'UNPUBLISHED',
        projectId: 'admin',
        type: 'NSD'
      },
      {
        id: '6fcd31f4-bcee-4ff3-9779-ad45ff5d87c0',
        vnfdId: '5d14868f-4603-4fd9-a540-ec9939d340e3',
        vnfProvider: 'NXW',
        vnfProductName: 'edge_cache_vnfd',
        vnfSoftwareVersion: null,
        vnfdVersion: '1.0',
        checksum: null,
        softwareImages: null,
        additionalArtifacts: null,
        onboardingState: 'ONBOARDED',
        operationalState: 'ENABLED',
        usageState: 'NOT_IN_USE',
        userDefinedData: {
          isRetrievedFromMANO: 'yes',
          NXW_OSMR10: 'yes'
        },
        _links: {
          self: '/vnfpkgm/v1/vnf_packages/6fcd31f4-bcee-4ff3-9779-ad45ff5d87c0',
          vnfd: '/vnfpkgm/v1/vnf_packages/6fcd31f4-bcee-4ff3-9779-ad45ff5d87c0/vnfd',
          packageContent: '/vnfpkgm/v1/vnf_packages/6fcd31f4-bcee-4ff3-9779-ad45ff5d87c0/package_content'
        },
        manosOnboardingStatus: {
          NXW_OSMR10: 'ONBOARDED'
        },
        c2cOnboardingState: 'UNPUBLISHED',
        projectId: 'admin',
        type: 'VNF'

      },
      {
        id: '2c26356d-d9e4-4f12-a799-92d8f72cecb7',
        vnfdId: 'ffa1ef83-bcbf-4214-8aa2-62f117beb22e',
        vnfProvider: 'NXW',
        vnfProductName: 'hackfest_firewall_pnf',
        vnfSoftwareVersion: null,
        vnfdVersion: '1.0',
        checksum: null,
        softwareImages: null,
        additionalArtifacts: null,
        onboardingState: 'ONBOARDED',
        operationalState: 'ENABLED',
        usageState: 'NOT_IN_USE',
        userDefinedData: {
          isRetrievedFromMANO: 'yes',
          NXW_OSMR10: 'yes'
        },
        _links: {
          self: '/vnfpkgm/v1/vnf_packages/2c26356d-d9e4-4f12-a799-92d8f72cecb7',
          vnfd: '/vnfpkgm/v1/vnf_packages/2c26356d-d9e4-4f12-a799-92d8f72cecb7/vnfd',
          packageContent: '/vnfpkgm/v1/vnf_packages/2c26356d-d9e4-4f12-a799-92d8f72cecb7/package_content'
        },
        manosOnboardingStatus: {
          NXW_OSMR10: 'ONBOARDED'
        },
        c2cOnboardingState: 'UNPUBLISHED',
        projectId: 'admin',
        type: 'VNF'
      }
    ]
  ]
  // return [
  //   ...responses[0]?.data?.map((el) => ({ ...el, type: 'VNF' })),
  //   ...responses[0]?.data?.map((el) => ({ ...el, type: 'NSD' }))
  // ]
  // } catch (e) {
  //   console.log({ e })
  //   throw new Error('error')
  // }
}

const translateResource = async ({ id, type } : {id: string, type: string}): Promise<any> => {
  let endpoint = ''
  switch (type) {
    case 'VNF':
      endpoint = endpoints.XRM_VNF_ENDPOINT
      break
    case 'NSD':
      endpoint = endpoints.XRM_NSD_ENDPOINT
      break
    default:
      endpoint = endpoints.XRM_NSD_ENDPOINT
      break
  }

  try {
    const response = await axios.post(endpoint + `${id}/`)
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
  useAllResourceAndServiceSpecifications,
  getProductOffersBatch,
  useAllXrmResources,
  translateResource
}
