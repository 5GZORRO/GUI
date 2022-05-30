import React, { useState } from 'react'
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
  CSelect,
  CInputGroupAppend
} from '@coreui/react'

import LoadingWithFade from 'components/LoadingWithFade'

import { useQueryClient } from 'react-query'
import { useAllLocations, useAllXrmResources, useTranslateResource } from 'hooks/api/Resources'
import CIcon from '@coreui/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { PlusCircle, MinusCircle } from 'assets/icons/externalIcons'
import AddNewLocation from 'containers/AddNewLocation'
import RegisterNewResource from 'containers/RegisterNewResource'
import { HOST } from 'config'

const FetchResources: React.FC = () => {
  const [modal, setModal] = useState<any | null>(null)
  const [modalRadio, setModalRadio] = useState<any | null>(null)
  const [modalNewSpectrumResource, setModalNewSpectrumResource] = useState<boolean>(false)
  const [addNewLocation, setAddnewLocation] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const { data: locations, isLoading: isLoadingLocations, refetch: refetchLocation } = useAllLocations()
  const history = useHistory()

  const queryClient = useQueryClient()
  const { data, isLoading } = useAllXrmResources()

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm<any>({
    defaultValues: {
      location: '',
      function: '',
      option: 'no'
    }
  })

  const option = watch('option')
  const func = watch('function')

  const {
    mutate,
    isLoading: isMutating,
    isError
  } = useTranslateResource({
    onSuccess: () => {
      queryClient.refetchQueries('useAllXrmResources')
      history.push('/resource')
    }
  })

  const fields = [
    'id',
    { key: 'name', label: 'Name' },
    'description',
    { key: 'contentType', label: 'Category' },
    {
      key: 'fetch_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const onSubmit = (data: any) => {
    if (selectedItem.contentType === 'RAD') {
      const objectData = JSON.parse(data?.location)
      const body = [
        {
          name: objectData?.geographicLocation?.name,
          city: objectData?.city,
          country: objectData?.country,
          locality: objectData?.locality,
          lat: objectData?.geographicLocation?.geometry?.[0]?.y,
          lon: objectData?.geographicLocation?.geometry?.[0]?.x,
          radius: objectData?.geographicLocation?.geometry?.[0]?.z
        }
      ]
      mutate({
        id: selectedItem.id,
        type: selectedItem.contentType,
        body
      })
    } else {
      mutate({
        id: selectedItem.id,
        type: selectedItem.contentType,
        input: func
      })
    }
  }

  const showButton = (item: any) => (
    <td className="py-2">
      <CButton
        color="primary"
        className={'text-uppercase'}
        shape="square"
        disabled={isMutating}
        onClick={() => {
          if (item.contentType === 'VNF' || item.contentType === 'NSD') {
            setSelectedItem(item)
            setModal(true)
          } else if (item.contentType === 'RAD') {
            setSelectedItem(item)
            setModalRadio(true)
          } else {
            mutate({
              id: item?.id,
              type: item?.contentType,
              input: ''
            })
          }
        }}
      >
        {'Add'}
      </CButton>
    </td>
  )

  const showByType = (item: any, key: string, keyNSD?: string, keySPC?: string, keyRAD?: string, keySlice?: string) => {
    switch (item.contentType) {
      case 'VNF':
        return <td className="py-2">{item?.[`vnf${key}`] ?? item?.[`${key}`] ?? '-'}</td>
      case 'NSD':
        return <td className="py-2">{item?.[`nsd${keyNSD}`] ?? item?.[`${key}`] ?? '-'}</td>
      case 'SPC':
        return <td className="py-2">{item?.[`${keySPC ?? key}`] ?? '-'}</td>
      case 'RAD':
        return <td className="py-2">{item?.[`${keyRAD ?? key}`] ?? '-'}</td>
      case 'Edge':
        return <td className="py-2">{item?.[`${keySlice ?? key}`] ?? '-'}</td>
      case 'Cloud':
        return <td className="py-2">{item?.[`${keySlice ?? key}`] ?? '-'}</td>
      case 'Slice':
        return <td className="py-2">{item?.[`${keySlice ?? key}`] ?? '-'}</td>
      default:
        return <td className="py-2">{item?.[key] ?? '-'}</td>
    }
  }

  const showCategory = (item: any) => {
    switch (item.contentType) {
      case 'VNF':
        return <td className="py-2">Virtual Network Function</td>
      case 'NSD':
        return <td className="py-2">Network Service</td>
      case 'SPC':
        return <td className="py-2">Spectrum</td>
      case 'RAD':
        return <td className="py-2">Radio Access Network</td>
      case 'Edge':
        return <td className="py-2">Edge</td>
      case 'Cloud':
        return <td className="py-2">Cloud</td>
      case 'Slice':
        return <td className="py-2">Network Slice</td>
    }
  }

  return (
    <CContainer fluid={false}>
      {modalNewSpectrumResource && <RegisterNewResource {...{ setModalNewSpectrumResource }} />}
      {modalRadio !== null && (
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
                          rules={{ required: true }}
                          name="location"
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
                        <CButton type="button" color="transparent" onClick={() => setAddnewLocation(true)}>
                          {addNewLocation ? <MinusCircle /> : <PlusCircle />}
                        </CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                    {errors.location && <CFormText className="help-block">Please select a location</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
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
          </CForm>
          {addNewLocation && (
            <AddNewLocation
              radio={true}
              handleClose={() => {
                setAddnewLocation(false)
                refetchLocation()
              }}
            ></AddNewLocation>
          )}
        </CModal>
      )}
      {modal !== null && (
        <CModal
          show={true}
          onClose={() => {
            setValue('option', 'no')
            setModal(null)
          }}
          size="lg"
        >
          <CContainer className={'p-0'}>
            {false && <LoadingWithFade />}
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CCardHeader>
                {selectedItem.contentType === 'VNF' ? <h5>Function Type </h5> : <h5>Service Type </h5>}
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {selectedItem.contentType === 'VNF' ? 'Add function type' : 'Add service type'}
                      </CLabel>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="option"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </CSelect>
                        )}
                      />
                      {errors.option && <CFormText className="help-block">Please choose a option</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                {option === 'yes' && (
                  <CRow className={'mt-2'}>
                    <CCol sm={12}>
                      <CFormGroup>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cilInfo" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name="function"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <CInput
                                placeholder={
                                  selectedItem.contentType === 'VNF'
                                    ? 'Insert input Function ex: vFirewall e NAT'
                                    : 'Insert Service Type ex: DPI, vCDN, UPF'
                                }
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                              />
                            )}
                          />
                        </CInputGroup>
                        <CFormText className="help-block" data-testid="error-message">
                          <ErrorMessage errors={errors} name="function" />
                        </CFormText>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                )}
              </CCardBody>
              <div className={'mt-3 d-flex justify-content-end mb-3 mr-4'}>
                <div className={'d-flex'}>
                  <CButton
                    className={'text-uppercase px-5 mr-4'}
                    type="cancel"
                    variant="outline"
                    color={'white'}
                    onClick={() => {
                      setValue('option', '')
                      setModal(null)
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
            </CForm>
          </CContainer>
        </CModal>
      )}
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Translate xRM Resources</h2>
        </CCol>
        {HOST === 'BCN' && (
          <CCol className={'d-flex justify-content-end align-items-center'}>
            <CButton
              block={false}
              color={'gradient'}
              className={'text-uppercase'}
              onClick={() => setModalNewSpectrumResource(true)}
            >
              Register New Spectrum Resource
            </CButton>
          </CCol>
        )}
      </CRow>
      <CCard>
        {isMutating && !isError && <LoadingWithFade />}
        {!isMutating && isError && (
          <p style={{ color: 'red', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)' }}>
            An error has occurred, please try again
          </p>
        )}
        <CCardBody>
          <CDataTable
            cleaner
            loading={isLoading}
            items={data?.filter((el) => el != null) ?? []}
            columnFilter
            tableFilter
            clickableRows
            fields={fields}
            itemsPerPage={5}
            sorter
            hover
            pagination
            scopedSlots={{
              // band and technology no the correct fields to show name
              name: (item: any) => showByType(item, 'ProductName', 'Name', 'band', 'technology', 'name'),
              description: (item: any) => showByType(item, 'description'),
              fetch_details: (item: any) => showButton(item),
              contentType: (item: any) => showCategory(item)
            }}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default FetchResources
