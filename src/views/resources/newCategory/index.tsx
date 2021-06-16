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
  const { handleSubmit, formState: { errors }, control, reset } = useForm<FormCategory>()

  const onSubmit = (data: FormCategory) => {
  }

  const clearForm = () => {
    reset({
      name: '',
      type: '',
      version: ''
    })
  }

  return (
    <CContainer>
      <CRow
        className={'mb-5'}
      >
        <CCol className={'d-flex justify-content-flex-start align-items-center'}>
          <Link style={{ color: 'rgba(255,255,255,0.87)' }} to="/resource/new-resource">
            <CIcon className={'mr-3'} size={'xl'} name="cilArrowLeft" />
          </Link>
          <h1>New Category</h1>
        </CCol>
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
                    render={({ field }) => (
                      <CInput
                        placeholder={'Enter Name'}
                        {...field}
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
                    render={({ field }) => (
                      <CInput
                        placeholder={'Enter Type'}
                        {...field}
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
                    render={({ field }) => (
                      <CInput
                        placeholder={'Enter Version'}
                        {...field}
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
            <CButton
              className={'text-uppercase px-5 mr-3'}
              variant='outline'
              color={'white'}
              onClick={clearForm}
            >
              Cancel
            </CButton>
            <CButton
              color={'gradient'}
              className='px-5 text-uppercase'
              type='submit'
            >
              Submit
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
  )
}

export default NewCategory
