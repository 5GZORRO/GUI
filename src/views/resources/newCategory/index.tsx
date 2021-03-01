import { CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CFormText, CInput, CLabel, CRow, CTextarea } from '@coreui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

interface FormCategory {
  name: string
  type: string
  version: string
}


const NewCategory:React.FC = () => {
  const { handleSubmit, errors, control } = useForm<FormCategory>()
  return (
    <CContainer>
      <CRow className={'d-flex justify-content-flex-start align-items-center mb-5'}>
        <Link to='/resource/new-resource'>
          <CIcon className={'mr-3'} size={'24px'} name="cilArrowLeft" />
        </Link>
        <h1>New Category</h1>
      </CRow>
      <CCard>
        <CCardHeader>
          <h2>Category Creation</h2>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="name"
                  render={({ onChange, onBlur, value }) => (
                    <CInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.name && 
                <CFormText className='help-block'>Please enter your email</CFormText>
                }
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
                {errors.type && 
                <CFormText className='help-block'>Please enter your email</CFormText>
                }
                </CFormGroup>
            </CCol>
            <CCol xs={6}>
              <CFormGroup>
                <CLabel htmlFor="version">Version</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="version"
                  render={({ onChange, onBlur, value }) => (
                    <CInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.version && 
                <CFormText className='help-block'>Please enter your email</CFormText>
                }
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NewCategory