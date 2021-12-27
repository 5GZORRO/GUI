import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { ApiBusinessTransactions } from 'types/api'

const getAllTransactions = async (params: any): Promise<ApiBusinessTransactions[]> => {
  try {
    const response = await axios.get(endpoints.ISSM_ALL_BUSINESS_TRANSACTIONS + `${params}`)
    return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getArchivedTransactions = async (params: any): Promise<any> => {
  try {
    const response = await axios.post(endpoints.ISSM_ARCHIVED + `${params}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log({ error })
    throw new Error('error')
  }
}

const getTransactionTypes = async (): Promise<any> => {
  try {
    const response = await axios.get(endpoints.ISSM_TRANSACTIONS_TYPES)
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const scaleOut = async (params: any): Promise<any> => {
  const formData = new FormData()

  Object.keys(params).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (key === 'file') {
        formData.append(key, params[key])
      }
    }
  })
  try {
    const response = await axios.post(
      endpoints.ISSM_SCALE_OUT + `/${params.operator}` + `/${params.transactionType}`,
      formData
    )
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const deleteTransaction = async (params: any): Promise<any> => {
  try {
    const response = await axios.delete(endpoints.ISSM_DELETE + `/${params.operator}` + `/${params.transactionUuid}`)
    console.log(response)
    return response?.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

export default {
  getAllTransactions,
  getArchivedTransactions,
  scaleOut,
  deleteTransaction,
  getTransactionTypes
}
