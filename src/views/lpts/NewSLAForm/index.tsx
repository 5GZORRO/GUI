import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { endpoints } from 'api/endpoints'
import { FormProvider, useForm } from 'react-hook-form'
import fs from 'fs'

import {
  CCard,
  CButton,
  CCardBody,
  CRow,
  CContainer,
  CForm,
  CSpinner,
  CCol,
  CCardHeader,
  CInputGroup,
  CLabel,
  CInput
} from '@coreui/react'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

import { DATETIME_FORMAT } from 'config'
import { useCreateSLA, useCreateTemplate } from 'hooks/api/SLA'

import LoadingWithFade from 'components/LoadingWithFade'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { useAuthContext } from 'context/AuthContext'
import dayjs from 'dayjs'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'

interface NewSLA {
  id: string
  href: string
  name: string
  description: string
  version: string
  validFor: {
    endDateTime: string
    startDateTime: string
  }
  templateRef: {
    href: string
    name: string
    description: string
  }
  state: string
  approved: true
  approvalDate: string
  autoscalingPolicies: [
    {
      id: string
      metric: string
      unit: string
      referenceValue: string
      operator: string
      consequence: string
      allowThirdPartyDeployment: true
      excludedThirdParties: [string]
    }
  ]
  rule: [
    {
      id: string
      metric: string
      unit: string
      referenceValue: string
      operator: string
      tolerance: string
      consequence: string
    }
  ]
  relatedParty: [
    {
      href: string
      role: string
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
    }
  ]
}

const NewSLAForm = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetLegalTemplate(id)
  const href = `${endpoints.LEGAL_PROSE_TEMPLATES}/${id}`
  const { user } = useAuthContext()

  const {
    formState: { errors, ...remain },
    control,
    handleSubmit,
    setValue,
    ...methods
  } = useForm<NewSLA>({
    defaultValues: {}
  })
  const { mutate, isSuccess, isLoading: isLoadingCreate } = useCreateSLA()

  const history = useHistory()
  const [values, setValues] = useState<any>({})
  const [flag, setFlag] = useState({})
  const [newString, setNewString] = useState('')
  const [json, setJson] = useState(null)

  console.log(values)

  useEffect(() => {
    if (isSuccess) {
      history.push('/templates/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (data && data?.templateFileData) {
      const zip = new JSZip()

      zip.loadAsync(data?.templateFileData, { base64: true }).then(function (zip) {
        if (zip) {
          zip
            .file(Object.keys(zip.files)[0])
            .async('string')
            .then(function (data) {
              const json = JSON.parse(data)
              setJson(json)
            })
        }
      })
    }
  }, [data])

  const mutateData = () => {
    const form = {
      id: data?.id,
      href: '',
      name: values?.['{{name}}'],
      description: values?.['{{description}}'],
      version: (values?.['{{version}}']).toString(),
      validFor: {
        endDateTime: (values?.['{{endDateTime}}']).toString(),
        startDateTime: (values?.['{{startDateTime}}']).toString()
      },
      templateRef: {
        href,
        name: (data?.name).toString(),
        description: (data?.description).toString()
      },
      state: 'ACTIVE',
      approved: true,
      approvalDate: (data?.created).toString(),
      autoscalingPolicies: [
        {
          id: '',
          metric: '',
          unit: '',
          referenceValue: '',
          operator: '',
          consequence: '',
          allowThirdPartyDeployment: true,
          excludedThirdParties: []
        }
      ],
      rule: [
        {
          id: values?.['{{id}}'],
          metric: (values?.['{{metric}}']).toString(),
          unit: (values?.['{{unit}}']).toString(),
          referenceValue: (values?.['{{referenceValue}}']).toString(),
          operator: (values?.['{{operator}}']).toString(),
          tolerance: (values?.['{{tolerance}}']).toString(),
          consequence: (values?.['{{consequence}}']).toString()
        }
      ],
      relatedParty: [
        {
          href: (values?.['{{href}}']).toString(),
          role: (values?.['{{role}}']).toString(),
          name: (values?.['{{name_party}}']).toString(),
          validFor: {
            endDateTime: (values?.['{{endDateTime_party}}']).toString(),
            startDateTime: (values?.['{{startDateTime_party}}']).toString()
          }
        }
      ]
    }
    mutate(form)
  }

  useEffect(() => {
    if (!json) {
      return
    }

    if (Object.keys(values).length === 0) {
      return
    }

    let str = json.text

    Object.keys(values).forEach((key) => {
      str = str.replace(key, values[key])
    })

    setNewString(str)
  }, [flag, json])

  useEffect(() => {
    if (!json) {
      return
    }
    setValues((currentValues) => {
      const newValues = json.data.reduce((obj, field) => {
        obj[field.id] = ''
        return obj
      }, {})

      return Object.assign({}, newValues, currentValues)
    })
  }, [json])

  const fieldChanged = (fieldId: any, value: any) => {
    setValues((currentValues) => {
      currentValues[fieldId] = value
      return currentValues
    })

    setFlag((currentPageData) => {
      return Object.assign({}, currentPageData)
    })
  }

  const onSubmit = () => {
    mutateData()
    // const data = JSON.stringify(json)
    // const blob = new Blob([data], { type: 'application/json' })
    // const file = new File([blob], 'file.json')

    // const zip = new JSZip()
    // const allZip = zip.file(file.name, file, { createFolders: false })

    // allZip
    //   .generateAsync({ type: 'blob' }) // blob -> nodebuffer
    //   .then(function (content) {
    //     const file = new File([content], 'file.json', {
    //       type: 'application/x-zip-compressed'
    //     })
    //     mutateData(file)
    //   })
  }

  if (!isLoading && json && data?.templateFileData) {
    return (
      <>
        {isLoadingCreate && <LoadingWithFade />}

        <CContainer>
          <h1 className={'mb-5'}>New SLA</h1>
          <FormProvider {...methods} {...{ formState: { errors, ...remain }, control, handleSubmit }}>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol xs="6">
                      <CCard className={'mt-4'}>
                        <CCardHeader>
                          <h2>Template Fields</h2>
                        </CCardHeader>
                        <CCardBody>
                          <div style={{ width: '100%' }}>
                            {json.data.map((field) => {
                              return (
                                <CRow key={field.id} className={'mb-2 '}>
                                  <CCol>
                                    <CLabel htmlFor={field.id}>{field.label}</CLabel>

                                    <CInputGroup>
                                      <CInput
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        value={values[field.id]}
                                        onChange={(e) => {
                                          // Notify the main state list of the new value
                                          fieldChanged(field.id, e.target.value)
                                        }}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                </CRow>
                              )
                            })}
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol xs="6">
                      <CCard className={'mt-4'}>
                        <CCardHeader>
                          <h2>Preview</h2>
                        </CCardHeader>
                        <CCardBody>
                          <ReactMarkdown>{newString}</ReactMarkdown>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <div className={'mt-5 d-flex justify-content-between mb-5'}>
                <CButton
                  className={'text-uppercase px-5 d-flex align-items-center'}
                  color={'gradient'}
                  variant={'ghost'}
                  onClick={() => history.goBack()}
                >
                  <ArrowLeftIcon fill={'#fff'} />
                  Previous
                </CButton>
                <CButton className={'text-uppercase px-5 d-flex align-items-center'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </CForm>
          </FormProvider>
        </CContainer>
      </>
    )
  }
  return <CSpinner color="#fff" />
}

export default NewSLAForm
