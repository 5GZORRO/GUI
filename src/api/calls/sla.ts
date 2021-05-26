/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'api/instance'
import { endpoints } from 'api/endpoints'
import { TransformDataTemplates } from 'api/utils'

const getAllTemplates = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.LEGAL_PROSE_TEMPLATES, { params })
    if (response?.data?.pagedTemplates?.content) {
      return response?.data?.pagedTemplates?.content
    } else {
      throw new Error('error')
    }
    // return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const createTemplate = async (body: any): Promise<any> => {
  const formData = new FormData()

  Object.keys(body).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      if (key === 'proposeTemplateRequest') {
        formData.append(key, new Blob([JSON.stringify(body[key])], { type: 'application/json' }))
        // formData.append(key, JSON.stringify(body[key]))
      } else {
        formData.append(key, body[key])
      }
    }
  })

  try {
    const response = await axios.post(endpoints.LEGAL_PROSE_TEMPLATES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (err) {
    console.log({ err })
    throw new Error('error')
  }
}

const getAllSLAs = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.SERVICE_LEGAL_AGREEMENT, { params })
    if (response?.data?.pagedSLAs?.content) {
      return response?.data?.pagedSLAs?.content
    } else {
      throw new Error('error')
    }
    // return response.data
  } catch (e) {
    console.log({ e })
    throw new Error('error')
  }
}

const getMyTemplates = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.SERVICE_LEGAL_AGREEMENT, { params })
    return TransformDataTemplates(response.data)
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

const getAllLicences = async (params?: any): Promise<any[]> => {
  try {
    const response = await axios.get(endpoints.SERVICE_LEGAL_AGREEMENT, { params })
    return TransformDataTemplates(response.data)
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}

export default {
  getAllTemplates,
  getMyTemplates,
  getAllSLAs,
  createTemplate,
  getAllLicences
}
