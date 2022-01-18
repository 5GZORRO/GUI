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
  lat: string
  lon: string
  radius: string
  submittedGeographicAddress: {
    city: string
    country: string
    locality: string
    geographicLocation: {
      name: ''
    }
  }
}

const AddNewLocation = (props: any) => {
  const { handleClose, radio } = props
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<formLocation>({
    defaultValues: {
      lat: '',
      lon: '',
      radius: '',
      submittedGeographicAddress: {
        city: '',
        country: '',
        locality: '',
        geographicLocation: {
          name: ''
        }
      }
    }
  })

  const { mutate, isSuccess, isLoading } = useCreateLocation()

  const onSubmit = (data: formLocation) => {
    mutate({
      submittedGeographicAddress: {
        city: data?.submittedGeographicAddress?.city,
        country: data?.submittedGeographicAddress?.country,
        locality: data?.submittedGeographicAddress?.locality,
        geographicLocation: {
          name: data?.submittedGeographicAddress?.geographicLocation.name,
          geometry: [{ x: data?.lat, y: data?.lon, z: data?.radius !== '' ? data?.radius : '0' }],
          geometryType: 'string'
        }
      }
    })
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
          <CForm>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="submittedGeographicAddress.geographicLocation.name">Name</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="submittedGeographicAddress.geographicLocation.name"
                        render={({ field }) => <CInput placeholder={'Enter a name'} {...field} />}
                      />
                      {errors?.submittedGeographicAddress?.geographicLocation?.name && (
                        <CFormText className="help-block">Please enter a name</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="submittedGeographicAddress.locality">Locality</CLabel>
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
                      <CLabel htmlFor="submittedGeographicAddress.city">City</CLabel>
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
                      <CLabel htmlFor="submittedGeographicAddress.country">Country</CLabel>
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
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="lat">Latitude</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="lat"
                        render={({ field }) => <CInput placeholder={'Enter a latitude'} {...field} />}
                      />
                      {errors?.lat && <CFormText className="help-block">Please enter a latitude</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="lon">Longitude</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="lon"
                        render={({ field }) => <CInput placeholder={'Enter a longitude'} {...field} />}
                      />
                      {errors?.lon && <CFormText className="help-block">Please enter a longitude</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="radius">Radius</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: radio !== undefined && radio === true }}
                        name="radius"
                        render={({ field }) => <CInput placeholder={'Enter a radius'} {...field} />}
                      />
                      {errors?.radius && <CFormText className="help-block">Please enter a radius</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <div className={'mt-5 d-flex justify-content-end mb-5'}>
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} color={'gradient'} onClick={handleSubmit(onSubmit)}>
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
