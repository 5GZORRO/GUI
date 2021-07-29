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
  console.log(body)
}

export default {
  getMyOrders,
  createOrder
}
