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

export default {
  getMyOrders,
  createOrder
}
