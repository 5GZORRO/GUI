import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const TransformDataResourceCandidate = (data: any) => {
  return data.map((item: any) => {
    const { id, name, version, validFor, category, lifecycleStatus, resourceSpecification, serviceSpecification } = item

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
      resourceSpecification,
      serviceSpecification

    }
  })
}

export const TransformDataTemplates = (data:any) => {
  return []
}
