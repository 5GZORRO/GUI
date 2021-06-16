import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CTextarea
} from '@coreui/react'
/** Components */
import { PlusCircle } from 'assets/icons/externalIcons'

interface FormVirtualResource {
  key: string
  value: string
  unit: string
  quota: string
}

interface FormPhysical {
  name: string
  description: string
  version: string
  href: string
  type: string
  virtualResource: FormVirtualResource[]
}

const NewPhysicalResource: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormPhysical>({
    defaultValues: {
      name: '',
      description:
        '',
      href: '',
      type: '',
      virtualResource: [
        {
          key: '',
          value: '',
          unit: '',
          quota: ''
        }
      ]
    }
  })
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'virtualResource'
  })

  const onSubmit = (data: FormPhysical) => {
  }

  const addVirtualResource = () => append({ key: '', value: '', unit: '', quota: '' })

  return (
    <CContainer style={{ marginBottom: '200px' }}>
      <div
        className={'d-flex justify-content-flex-start align-items-center mb-5'}
      >
        <Link style={{ color: 'rgba(255,255,255,0.87)' }} to='/resource/new-resource'>
          <CIcon className={'mr-3'} size={'xl'} name='cilArrowLeft' />
        </Link>
        <h1 className={'m-0'}>New Resource - Physical Capabilities</h1>
      </div>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCard>
          <CCardHeader>
            <h5>Physical Capabilities Details</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor='name'>Name</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='name'
                    render={({ field }) => (
                      <CInput
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <CFormText className='help-block'>
                      Please enter your email
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs={12}>
                <CFormGroup>
                  <CLabel htmlFor='description'>Description</CLabel>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name='description'
                    render={({ field }) => (
                      <CTextarea
                        rows={4}
                        {...field}
                      />
                    )}
                  />
                  {errors.description && (
                    <CFormText className='help-block'>
                      Please enter your email
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <div className={'bg-dark-light p-4 rounded-sm'}>
          {fields.map((field, index) => (
            <CCard key={field.id} className={'mb-0'}>
              <CCardHeader>
                <div className={'d-flex justify-content-between align-items-center'}>
                  <h5>Create Resource Virtual Capabilities</h5>
                  {index > 0 && (
                    <CButton
                      variant={'ghost'}
                      className='d-flex justify-content-center align-items-center'
                      onClick={() => remove(index)}
                    >
                      <CIcon name='cilTrash' size={'lg'} className={'mr-2'} />
                      <span className={'text-gray'}>Delete Resource</span>
                    </CButton>
                  )}
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor='key'>Hardware Cap Key</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.key}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].key` as any}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CInput
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      {errors.virtualResource?.[index] &&
                      <CFormText className='help-block'>
                        Please enter href
                      </CFormText>
                      }
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor='value'>Hardware Cap Value</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.value}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].value` as any}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CInput
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      {errors?.virtualResource?.[index] &&
                      <CFormText className='help-block'>
                        Please enter a valid hardware cap value
                      </CFormText>
                      }
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor='unit'>Hardware Cap Unit</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.unit}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].unit` as any}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CInput
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                    {errors?.virtualResource?.[index] &&
                      <CFormText className='help-block'>
                        Please enter unit
                      </CFormText>
                    }
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor='quota'>Hardware Cap Quota</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.quota}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].quota` as any}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CInput
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      {errors?.virtualResource?.[index] &&
                      <CFormText className='help-block'>
                        Please enter a valid quota
                      </CFormText>
                      }
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          ))}
          <div className='d-flex justify-content-center align-items-center pt-2'>
            <CButton
              className='d-flex justify-content-center align-items-center'
              variant={'ghost'}
              onClick={addVirtualResource}
            >
              <PlusCircle className={'mr-2'} /> Add Resource Virtual Capabilities
            </CButton>
          </div>
        </div>
        <CCard className={'mt-5'}>
          <CCardHeader>
            <h5>Features</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CFormGroup>
                  <CLabel htmlFor='href'>Href</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='href'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.href && (
                  <CFormText className='help-block'>
                    Please enter your email
                  </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs={6}>
                <CFormGroup>
                  <CLabel htmlFor='type'>Type</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='type'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {/*  {errors.type && (
                  <CFormText className='help-block'>
                    Please enter your email
                  </CFormText>
                )} */}
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CRow className={'d-flex flex-row-reverse mt-5'}>
          <CCol xs={6} className={'d-flex justify-content-end'}>
            <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
            <CButton color={'gradient'} className='px-5 text-uppercase' type='submit'>Submit</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
  )
}

export default NewPhysicalResource
