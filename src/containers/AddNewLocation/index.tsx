import React, { useEffect } from 'react'
import {
  CButton,
  CForm,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CModal,
  CModalBody,
  CModalHeader
} from '@coreui/react'

import { Controller, useForm } from 'react-hook-form'
import { useCreateLocation } from 'hooks/api/Resources'
import LoadingWithFade from 'components/LoadingWithFade'

interface formLocation {
  submittedGeographicAddress: {
    city: string
    country: string
    locality: string
  }
}

const AddNewLocation = (props: any) => {
  const { handleClose } = props
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<formLocation>({
    defaultValues: {
      submittedGeographicAddress: {
        city: '',
        country: '',
        locality: ''
      }
    }
  })
  const { mutate, isSuccess, isLoading } = useCreateLocation()

  const onSubmit = (data: formLocation) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  return (
    <>
      {isLoading && <LoadingWithFade />}
      <CModal show={true} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <h5>{'Add new location'}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="locality">Locality</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="submittedGeographicAddress.locality"
                        render={({ field }) => <CInput placeholder={'Enter a locality'} {...field} />}
                      />
                      {errors?.submittedGeographicAddress?.locality && (
                        <CFormText className="help-block">Please enter a locality</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="city">City</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="submittedGeographicAddress.city"
                        render={({ field }) => <CInput placeholder={'Enter a city'} {...field} />}
                      />
                      {errors?.submittedGeographicAddress?.city && (
                        <CFormText className="help-block">Please enter a city</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="country">Country</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="submittedGeographicAddress.country"
                        render={({ field }) => <CInput placeholder={'Enter a country'} {...field} />}
                      />
                      {errors?.submittedGeographicAddress?.country && (
                        <CFormText className="help-block">Please enter a country</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <div className={'mt-5 d-flex justify-content-end mb-5'}>
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddNewLocation
