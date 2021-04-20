import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const TransformDataResourceCandidate = (data: any) => {
  return data.map((item: {id: string, name: string; version: string; validFor: any; category: any; lifecycleStatus: any, resourceSpecification: any }) => {
    const { id, name, version, validFor, category, lifecycleStatus, resourceSpecification } = item

    const valid = validFor?.endDateTime &&
    dayjs(validFor.endDateTime).isValid()
      ? dayjs(validFor?.endDateTime).fromNow()
      : null

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
      resourceSpecification: {
        id: resourceSpecification.id,
        name: resourceSpecification.name,
        href: resourceSpecification.href,
        version: resourceSpecification.version
      }
    }
  })
}

export const TransformDataOrganization = (data: any) => {
  return data.stakeholderDID
}
