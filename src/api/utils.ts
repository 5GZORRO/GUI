import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const TransformDataResourceCandidate = (data: any) => {
  return data.map((item: any) => {
    const { id, name, version, validFor, category, lifecycleStatus, resourceSpecification, serviceSpecification } = item

    const valid =
      validFor?.endDateTime && dayjs(validFor.endDateTime).isValid() ? dayjs(validFor?.endDateTime).fromNow() : null

    const categories = category.length
      ? category.reduce((acc: any[], item: { namem: any; name: any }) => {
        item.name && acc.push(item.name)
        return acc
      }, [])
      : []

    return {
      id,
      name,
      version,
      valid,
      categories,
      lifecycleStatus,
      resourceSpecification,
      serviceSpecification
    }
  })
}

export const TransformDataTemplates = (data: any) => {
  return []
}

export const TransformResourcesToProduct = (resources: any, offer: any): any => {
  const newData = {
    name: `productOfferProductSpecification-${offer?.name}`,
    description: '',
    brand: null,
    bundledProductSpecification: null,
    isBundle: null,
    lastUpdate: null,
    productNumber: null,
    productSpecCharacteristic: null,
    productSpecificationRelationship: null,
    validFor: null,
    version: null,
    resourceSpecification: resources,
    serviceSpecification: [],
    relatedParty: resources?.reduce((acc: any, resource: any) => {
      return [...acc, ...resource?.relatedParty]
    }, [])
  }

  return newData
}
