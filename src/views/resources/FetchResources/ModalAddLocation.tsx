import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import {
  CButton,
  CDataTable,
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CModal,
  CForm,
  CCardHeader,
  CFormGroup,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CFormText,
  CInputCheckbox,
  CSelect,
  CInputGroupAppend
} from '@coreui/react'

import LoadingWithFade from 'components/LoadingWithFade'

import { useAllLocations, useCreateLocation, useTranslateResource } from 'hooks/api/Resources'
import CIcon from '@coreui/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { PlusCircle, MinusCircle } from 'assets/icons/externalIcons'
import { useQueryClient } from 'react-query'

interface formLocation {
  location: string
  city: string
  country: string
  locality: string
  name: string
  lat: string
  lon: string
  radius: string
}

function ModalAddLocation (props: any) {
  const { modalRadio, setModalRadio, selectedItem } = props
  const [addLocation, setAddLocation] = useState<any>(false)
  const { data: locations, isLoading: isLoadingLocations, refetch: refetchLocation } = useAllLocations()
  const history = useHistory()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<formLocation>({
    defaultValues: {
      location: '',
      city: '',
      country: '',
      locality: '',
      name: '',
      lat: '',
      lon: '',
      radius: ''
    }
  })

  const { mutate, isSuccess, isLoading } = useCreateLocation()

  const {
    mutate: translate,
    isLoading: isMutating,
    isError
  } = useTranslateResource({
    onSuccess: () => {
      queryClient.refetchQueries('useAllXrmResources')
      history.push('/resource')
    }
  })

  const onSubmit = (data: formLocation) => {
    if (data.location !== '') {
      const loc = JSON.parse(data.location)
      const body = {
        city: loc?.city,
        country: loc?.country,
        locality: loc?.locality,
        name: loc?.geographicLocation?.name,
        lat: loc?.geographicLocation?.geometry?.[0]?.x,
        lon: loc?.geographicLocation?.geometry?.[0]?.y,
        radius: loc?.geographicLocation?.geometry?.[0]?.z
      }
      translate({
        id: selectedItem.id,
        type: selectedItem.contentType,
        body
      })
    } else {
      mutate({ data })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      refetchLocation()
    }
  }, [isSuccess])

  return (
    <>
      <CModal
        show={true}
        onClose={() => {
          setModalRadio(null)
        }}
        size="lg"
      >
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CCardHeader>Radio Access Network</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel>Location</CLabel>
                  <CInputGroup>
                    {!isLoadingLocations && (
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="location"
                        rules={{ required: !addLocation }}
                        render={({ field }) => (
                          <CSelect {...field} id="location">
                            <option value="" disabled>
                              Select one
                            </option>

                            {locations?.map((el, index) => (
                              <option value={JSON.stringify(el)} key={el?.id}>
                                {el?.geographicLocation?.name}
                              </option>
                            ))}
                          </CSelect>
                        )}
                      />
                    )}
                    <CInputGroupAppend>
                      <CButton type="button" color="transparent" onClick={() => setAddLocation(!addLocation)}>
                        {!addLocation ? <PlusCircle /> : <MinusCircle />}
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                  {errors.location && <CFormText className="help-block">Please select a location</CFormText>}
                </CFormGroup>
              </CCol>
            </CRow>
            {addLocation && (
              <>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="name">Name</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="name"
                        render={({ field }) => <CInput placeholder={'Enter a name'} {...field} />}
                      />
                      {errors?.name && <CFormText className="help-block">Please enter a name</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="locality">Locality</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="locality"
                        render={({ field }) => <CInput placeholder={'Enter a locality'} {...field} />}
                      />
                      {errors?.locality && <CFormText className="help-block">Please enter a locality</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="submittedGeographicAddress.city">City</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="city"
                        rules={{ required: true }}
                        render={({ field }) => <CInput placeholder={'Enter a city'} {...field} />}
                      />
                      {errors?.city && <CFormText className="help-block">Please enter a city</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="country">Country</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="country"
                        render={({ field }) => <CInput placeholder={'Enter a country'} {...field} />}
                      />
                      {errors?.country && <CFormText className="help-block">Please enter a country</CFormText>}
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
                        name="lat"
                        rules={{ required: true }}
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
                        name="lon"
                        rules={{ required: true }}
                        render={({ field }) => <CInput placeholder={'Enter a longitude'} {...field} />}
                      />
                      {errors?.lon && <CFormText className="help-block">Please enter a longitude</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="country">Radius</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="radius"
                        render={({ field }) => <CInput placeholder={'Enter a radius'} {...field} />}
                      />
                      {errors?.radius && <CFormText className="help-block">Please enter a radius</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </>
            )}
          </CCardBody>
          {addLocation && (
            <div className={'mt-3 d-flex justify-content-end mb-3 mr-4'}>
              <div className={'d-flex'}>
                <CButton
                  className={'text-uppercase px-5 mr-4'}
                  type="cancel"
                  variant="outline"
                  color={'white'}
                  onClick={() => {
                    setModalRadio(null)
                  }}
                >
                  Cancel
                </CButton>
              </div>
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Add Location
                </CButton>
              </div>
            </div>
          )}
          {!addLocation && (
            <div className={'mt-3 d-flex justify-content-end mb-3 mr-4'}>
              <div className={'d-flex'}>
                <CButton
                  className={'text-uppercase px-5 mr-4'}
                  type="cancel"
                  variant="outline"
                  color={'white'}
                  onClick={() => {
                    setModalRadio(null)
                  }}
                >
                  Cancel
                </CButton>
              </div>
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </div>
          )}
        </CForm>
      </CModal>
    </>
  )
}

export default ModalAddLocation
