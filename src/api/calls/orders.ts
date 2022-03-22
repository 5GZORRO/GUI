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
  // console.log(params && JSON.parse(params))
  try {
    if (params) {
      const responses: any[] | PromiseLike<ApiOrders[]> = []
      params.map(async (el: any) => {
        try {
          const response = await axios.get(endpoints.PRODUCT_ORDERS + '/' + { el })
          responses.push(response.data)
        } catch (error) {}
      })
      return responses
    } else {
      const response = await axios.get(endpoints.PRODUCT_ORDERS)
      console.log(response)
      return response.data
    }
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  getMyOrders,
  createOrder,
  getOrderedItems
}
