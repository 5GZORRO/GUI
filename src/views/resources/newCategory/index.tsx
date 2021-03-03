import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CForm,
  CButton
} from '@coreui/react'

interface FormCategory {
  name: string;
  type: string;
  version: string;
}

const NewCategory: React.FC = () => {
  const { handleSubmit, errors, control } = useForm<FormCategory>()

  const onSubmit = (data: FormCategory) => {
    console.log('data new category', data)
  }

  return (
    <CContainer>
      <CRow
        className={'d-flex justify-content-flex-start align-items-center mb-5'}
      >
        <Link to='/resource/new-resource'>
          <CIcon className={'mr-3'} size={'xl'} name='cilArrowLeft' />
        </Link>
        <h1>New Category</h1>
      </CRow>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCard>
          <CCardHeader>
            <h2>Category Creation</h2>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={12}>
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
                      Please enter name
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
                      Please enter type
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs={6}>
                <CFormGroup>
                  <CLabel htmlFor='version'>Version</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='version'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.version && (
                    <CFormText className='help-block'>
                      Please enter version
                    </CFormText>
                  )}
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

export default NewCategory
