/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { endpoints } from 'api/endpoints'
import { FormProvider, useForm } from 'react-hook-form'

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
  CInput,
  CSelect
} from '@coreui/react'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

import { useCreateSLA } from 'hooks/api/SLA'

import LoadingWithFade from 'components/LoadingWithFade'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'
import { useAuthContext } from 'context/AuthContext'

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
  const { user } = useAuthContext()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetLegalTemplate(id)
  const href = `${endpoints.LEGAL_PROSE_TEMPLATES}/${id}`

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
  const [renderTemplateText, setNewTemplateText] = useState('')
  const [json, setJson] = useState(null)

  useEffect(() => {
    if (isSuccess) {
      history.push('/templates/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (data && data?.templateFileData) {
      const zip = new JSZip()
      zip.loadAsync(data?.templateFileData, { base64: true }).then(function (zip) {
        if (zip !== null) {
          zip
            .file(Object.keys(zip.files)[0])
            .async('string')
            .then(function (data) {
              try {
                const json = JSON.parse(data)
                setJson(json)
                setFlag((currentPageData) => {
                  return Object.assign({}, currentPageData)
                })
              } catch (e) {
                setJson({})
              }
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
      version: '',
      validFor: {
        endDateTime: values?.['{{endDateTime}}']?.toString(),
        startDateTime: values?.['{{startDateTime}}']?.toString()
      },
      templateRef: {
        href,
        name: data?.name?.toString(),
        description: data?.description?.toString()
      },
      state: 'ACTIVE',
      approved: true,
      approvalDate: data?.created?.toString(),
      autoscalingPolicies: [
        {
          id: '',
          metric: '',
          unit: '',
          referenceValue: '',
          operator: '',
          consequence: '',
          allowThirdPartyDeployment: values?.['{{allowThirdPartyDeployment}}']?.toString(),
          excludedThirdParties: [values?.['{{excludedThirdParties}}']?.toString()]
        }
      ],
      rule: [
        {
          metric: values?.['{{metric}}']?.toString(),
          unit: values?.['{{unit}}']?.toString(),
          referenceValue: values?.['{{referenceValue}}']?.toString(),
          operator: values?.['{{operator}}']?.toString(),
          tolerance: values?.['{{tolerance}}']?.toString(),
          consequence: values?.['{{consequence}}']?.toString()
        }
      ],
      relatedParty: [
        {
          role: user?.stakeholderClaim?.stakeholderRoles[0]?.role,
          name: user?.stakeholderClaim?.stakeholderProfile?.name,
          validFor: {
            endDateTime: '',
            startDateTime: ''
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

    setNewTemplateText(str)
  }, [flag, json])

  useEffect(() => {
    if (!json) {
      return
    }
    setValues((currentValues) => {
      const newValues = json?.data?.reduce((obj, field) => {
        if (field.id === '{{stakeholderName}}') {
          obj[field.id] = user?.stakeholderClaim?.stakeholderProfile?.name
        } else {
          obj[field.id] = ''
        }
        return obj
      }, {})

      return Object.assign({}, newValues, currentValues)
    })
  }, [json])

  const fieldChangedSelect = (fieldId: any, value: any) => {
    setValues((currentValues) => {
      currentValues[fieldId] = value === 'true' ? true : false
      return currentValues
    })

    setFlag((currentPageData) => {
      return Object.assign({}, currentPageData)
    })
  }

  console.log(values)

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
                            {json.data !== undefined &&
                              json?.data
                                ?.filter((field) => field.id !== '{{stakeholderName}}')
                                .map((field) => {
                                  return (
                                    <CRow key={field.id} className={'mb-2 '}>
                                      <CCol>
                                        <CLabel htmlFor={field.id}>{field.label}</CLabel>

                                        <CInputGroup>
                                          {field.type === 'boolean' ? (
                                            <CSelect
                                              {...field}
                                              id="allowThirdPartyDeployment"
                                              onChange={(e) => fieldChangedSelect(field.id, e.target.value)}
                                            >
                                              <option value="" disabled>
                                                Select one
                                              </option>

                                              <option value="true">True</option>
                                              <option value="false">False</option>
                                            </CSelect>
                                          ) : (
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
                                          )}
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
                          {renderTemplateText !== '' ? <ReactMarkdown>{renderTemplateText}</ReactMarkdown> : <div />}
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
