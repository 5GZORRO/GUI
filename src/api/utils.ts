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

export const TransformResourcesToProduct = (resources: any, offer: any, user: any): any => {
  const newData = {
    name: `${offer?.name}`,
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
    resourceSpecification: resources?.filter(el => !el?.isService),
    serviceSpecification: resources?.filter(el => el?.isService),
    relatedParty: [
      {
        id: user?.id_token,
        name: user?.stakeholderClaim?.stakeholderProfile?.name
      }
    ]
  }

  return newData
}

export const cleanEmptyparams = (obj: any) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
  return obj
}

export const TransformToParentPOP = (pops: any, offer: any) => {
  return {
    bundledPopRelationship: [...pops.map((el: any) => ({ id: el.id }))],
    isBundle: true,
    name: `${offer?.name}`,
    validFor: offer.validFor
  }
}
