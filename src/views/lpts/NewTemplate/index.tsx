import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CLabel,
  CRow,
  CTextarea,
  CContainer,
  CForm,
  CSelect
} from '@coreui/react'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'
import LoadingWithFade from 'components/LoadingWithFade'
import { useCreateTemplate } from 'hooks/api/SLA'

import { useHistory } from 'react-router-dom'

interface templateForm {
  proposeTemplateRequest: {
    name: string
    description: string
    category: string
  }
  templateFile: any
}

const NewTemplate = () => {
  const {
    formState: { errors, ...remain },
    control,
    watch,
    handleSubmit,
    ...methods
  } = useForm<templateForm>({
    defaultValues: {
      proposeTemplateRequest: {
        name: '',
        description: '',
        category: 'SLA'
      },
      templateFile: ''
    }
  })
  const { mutate, isSuccess, isLoading } = useCreateTemplate()

  console.log(watch('templateFile'))

  const history = useHistory()

  useEffect(() => {
    if (isSuccess) {
      history.push('/templates/')
    }
  }, [isSuccess])

  const onSubmit = (data: templateForm) => {
    console.log(data)
    mutate({ ...data })
  }

  const handleFileUpload = (e: any, onChange: any, name: any) => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      onChange({
        target: {
          value: file
        }
      })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {isLoading && <LoadingWithFade />}

      <CContainer>
        <h1 className={'mb-5'}>New Legal Prose Template</h1>
        <FormProvider {...methods} {...{ formState: { errors, ...remain }, control, handleSubmit }}>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="name">Name</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="proposeTemplateRequest.name"
                        render={({ field }) => <CInput placeholder={'Enter name'} {...field} />}
                      />
                      {errors?.proposeTemplateRequest?.name && (
                        <CFormText className="help-block">Please enter a name</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="proposeTemplateRequest.category">Type</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="proposeTemplateRequest.category"
                        render={({ field }) => (
                          <CSelect {...field}>
                            <option value="SLA">SLA</option>
                            <option value="LICENSE">Licence</option>
                            {/* <option value='AGREEMENT'>Agreement</option> */}
                          </CSelect>
                        )}
                      />
                      {errors?.proposeTemplateRequest?.category && (
                        <CFormText className="help-block">Please select a category</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel>Description</CLabel>
                      <CInputGroup>
                        <Controller
                          control={control}
                          defaultValue={''}
                          rules={{ required: true }}
                          name="proposeTemplateRequest.description"
                          render={({ field }) => (
                            <CTextarea
                              placeholder={'Enter Description'}
                              {...field}
                              rows={4}
                              style={{ resize: 'none' }}
                            />
                          )}
                        />
                      </CInputGroup>
                      {errors?.proposeTemplateRequest?.description && (
                        <CFormText className="help-block">Please insert a description</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel>Template</CLabel>
                      <CInputGroup>
                        <Controller
                          control={control}
                          defaultValue={''}
                          rules={{ required: true }}
                          name="templateFile"
                          render={({ field: { onChange, value, ref } }) => (
                            <input
                              ref={ref}
                              type={'file'}
                              accept={'.zip'}
                              onChange={(e: any) => {
                                handleFileUpload(e, onChange, 'templateFile')
                              }}
                            />
                          )}
                        />
                      </CInputGroup>
                      {errors?.templateFile && (
                        <CFormText className="help-block">Please insert a template file in a .zip</CFormText>
                      )}
                    </CFormGroup>
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
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </div>
          </CForm>
        </FormProvider>
      </CContainer>
    </>
  )
}

export default NewTemplate
