/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import apiInstance from 'api/instance'
import { endpoints } from 'api/endpoints'

const get = async (params?: any): Promise<any> => {
  try {
    const response = await apiInstance.get(endpoints.RESOURCES, { params })
    const newData = response.data.resources.reduce((acc: any[], item: { [x: string]: any; category: any; resourceSpecification: any; resourcePhysicalCapabilities: any; resourceVirtualCapabilities: any }) => {
      const { category, resourceSpecification, resourcePhysicalCapabilities, resourceVirtualCapabilities, ...rest } = item
      acc.push({
        ...rest,
        categoryName: category.name,
        categoryType: category.type,
        resourceSpecificationName: resourceSpecification.name
      })
      return acc
    }, [])
    return newData
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const create = async (body: any): Promise<any> => {
  try {
    const response = await apiInstance.post(endpoints.RESOURCES, body)
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  get,
  create
}
