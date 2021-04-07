/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { endpoints } from 'api/endpoints'
import axios from 'api/instance'
import { ApiRegisterBody } from 'types/api'

interface DataProps {
  key: string,
  body: ApiRegisterBody
}

const registerClient = async ({ key, body }: DataProps) => {
  try {
    const response = await axios.post(endpoints.REGISTER, { ...body }, { params: { key } })
    const newResponse = response.data
    console.log(newResponse)
    return newResponse
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  registerClient
}
