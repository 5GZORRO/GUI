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
  CInputCheckbox,
  CTextarea
} from '@coreui/react'
/** Components */
import { PlusCircle } from 'assets/icons/externalIcons'

interface FormVirtualResource {
  key: string
  value: string
  unit: string
}

interface FormPhysical {
  name: string
  description: string
  isMaster: boolean
  type: string
  virtualResource: FormVirtualResource[]
}

const NewVirtualResource: React.FC = () => {
  const { control, handleSubmit, errors } = useForm<FormPhysical>({
    defaultValues: {
      name: 'test',
      description:
        'asdkasjdkasdjsakldjasdkasjdaksdjakdasjdkasjdaskldjaskdljsadlkjaskldjaskdlasjdaskldjasdkasjdaksldjaskldjvcbxnvbcxnvmbxcvnmsdbfrnmsdvhjsdfbdhjb',
      type: 'false',
      virtualResource: [
        {
          key: '34',
          value: '43242342342',
          unit: 'MB'
        }
      ]
    }
  })
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'virtualResource'
  })

  const onSubmit = (data: FormPhysical) => {
    console.log('data FormPhysical', data)
  }

  const addVirtualResource = () => append({ key: '', value: '', unit: '' })

  console.log('errors', errors)
  return (
    <CContainer style={{ marginBottom: '200px' }}>
      <div
        className={'d-flex justify-content-flex-start align-items-center mb-5'}
      >
        <Link style={{ color: 'rgba(255,255,255,0.87)' }} to="/resource/new-resource">
          <CIcon className={'mr-3'} size={'xl'} name="cilArrowLeft" />
        </Link>
        <h1 className={'m-0'}>New Resource - Virtual Capabilities</h1>
      </div>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCard>
          <CCardHeader>
            <h2>Virtual Capabilities Details</h2>
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
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.name && (
                    <CFormText className='help-block'>
                      Please enter a name
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
                    defaultValue={''}
                    name='description'
                    render={({ onChange, onBlur, value }) => (
                      <CTextarea
                        rows={4}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.description && (
                    <CFormText className='help-block'>
                      Please a descritpion
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor='type'>Type</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='type'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.type && (
                    <CFormText className='help-block'>
                      Please enter a type
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor='isMaster'>isMaster</CLabel>
                  <Controller
                    control={control}
                    defaultValue={false}
                    name='isMaster'
                    render={({ onChange, onBlur, value }) => {
                      console.log(value)
                      return (
                      <CInputCheckbox
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                      )
                    }
                  }
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <div className={'bg-backgroundLight p-4 rounded-sm'}>
          {fields.map((field, index) => (
            <CCard key={field.id}>
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
                      <CLabel htmlFor='key'>Virtual Cap Key</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.key}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].key`}
                        render={({ onChange, onBlur, value }) => (
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
                      <CLabel htmlFor='value'>Virtual Cap Value</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.value}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].value`}
                        render={({ onChange, onBlur, value }) => (
                          <CInput
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      {errors?.virtualResource?.[index] &&
                      <CFormText className='help-block'>
                        Please enter a valid Virtual cap value
                      </CFormText>
                      }
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor='unit'>Virtual Cap Unit</CLabel>
                      <Controller
                        control={control}
                        defaultValue={field.unit}
                        rules={{ required: true }}
                        name={`virtualResource[${index}].unit`}
                        render={({ onChange, onBlur, value }) => (
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
                </CRow>
              </CCardBody>
            </CCard>
          ))}
          <div className='d-flex justify-content-center align-items-center'>
            <CButton
              className='d-flex justify-content-center align-items-center'
              variant={'ghost'}
              onClick={addVirtualResource}
            >
              <PlusCircle className={'mr-2'} /> <span className={'text-uppercase'}>Add Resource Virtual Capabilities</span>
            </CButton>
          </div>
        </div>
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

export default NewVirtualResource
