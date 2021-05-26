import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CLabel,
  CRow,
  CDataTable,
  CTextarea,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import Select from 'react-select'

import { Controller, useFormContext } from 'react-hook-form'
import { useAllSLAs } from 'hooks/api/SLA'
import { useAllProductOfferingPrices, useAllCategories } from 'hooks/api/Resources'

import DateRangePicker from 'components/DateRangePicker'
import moment from 'moment'
import { DATETIME_FORMAT } from 'config'
import dayjs from 'dayjs'

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: '#3C3C43', borderColor: '#3C3C43' }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#3C3C43',
      backgroundColor: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':hover': {
        backgroundColor: '#3C3C43',
        color: 'white'
      },

      ':active': {
        ...styles[':active'],
        backgroundColor: '#3C3C43'
      }
    }
  },
  multiValue: (styles: any, { data }) => {
    return {
      ...styles,
      backgroundColor: '#32333A'
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    backgroundColor: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white'
    }
  })
}

const FormCreateOffer: React.FC = () => {
  const {
    formState: { errors },
    control,
    setValue
  } = useFormContext()
  const [selected, setSelected] = useState<any>([])
  const [selectedPOP, setSelectedPOP] = useState<any>([])

  const [modalProductOfferingPrice, setModalProductOfferingPrice] = useState<any | null>(null)
  const [modalSLA, setModalSLA] = useState<any | null>(null)

  useEffect(() => {
    setValue('serviceLevelAgreement', selected)
  }, [selected])

  useEffect(() => {
    setValue('productOfferPrice', selectedPOP)
  }, [selectedPOP])

  const check = (item: any) => {
    const found = selected.find((sla: any) => sla?.id === item?.id)

    if (!found) {
      setSelected(() => [item])
    }
  }

  const checkPO = (item: any) => {
    const found = selectedPOP.find((pop: any) => pop?.id === item?.id)

    if (!found) {
      setSelectedPOP((previous: any) => [...previous, item])
    } else {
      setSelectedPOP((previous: any) => previous.filter((pop: any) => pop?.id !== item?.id))
    }
  }

  const { data: slas, isLoading: isLoadingSlas } = useAllSLAs()
  const { data: productOfferPrice, isLoading: isLoadingProductOfferPrice } = useAllProductOfferingPrices()
  const { data: categories, isLoading: isLoadingCategories } = useAllCategories()

  const slaFields = [
    { key: 'select', label: '', filter: false, sorter: false },
    'name',
    'publisher',
    'status',
    'version',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const productOfferPriceFields = [
    { key: 'select', label: '', filter: false, sorter: false },
    'name',
    'percentage',
    {
      key: 'price',
      label: 'Price'
    },
    {
      key: 'unit',
      label: 'Unit'
    },
    'version',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const showSLADetails = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModalSLA(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  const showProductOfferPriceDetails = (item: any) => (
    <td className="py-2">
      <CButton
        color="primary"
        className={'text-uppercase'}
        shape="square"
        onClick={() => setModalProductOfferingPrice(item)}
      >
        {'Show'}
      </CButton>
    </td>
  )

  const slaSelectComponent = (item: any) => {
    return (
      <td>
        <input
          className={'product-offer--checkbox'}
          type={'radio'}
          name={`serviceLevelAgreements[${item?.id}]`}
          defaultValue={JSON.stringify(item)}
          checked={selected.find((sla: any) => sla?.id === item?.id)}
          onChange={() => check(item)}
        />
      </td>
    )
  }

  const productOfferPriceSelectComponent = (item: any) => (
    <td>
      <input
        className={'product-offer--checkbox'}
        type={'checkbox'}
        name={`productOfferPrice[${item?.id}]`}
        defaultValue={JSON.stringify(item)}
        checked={selectedPOP.find((pop: any) => pop?.id === item?.id)}
        onChange={() => checkPO(item)}
      />
    </td>
  )

  const showPropertyOrDefault = (property: any) => <td>{property ?? '-'}</td>

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5>Product offer creation</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="name"
                  render={({ field }) => <CInput placeholder={'Enter Product Offer'} {...field} />}
                />
                {errors.name && <CFormText className="help-block">Please enter a name</CFormText>}
              </CFormGroup>
            </CCol>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel>Country</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="country"
                  render={({ field }) => <CInput placeholder={'Enter Country'} {...field} />}
                />
                {errors.country && <CFormText className="help-block">Please select a country</CFormText>}
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
                    name="description"
                    render={({ field }) => (
                      <CTextarea placeholder={'Enter Description'} {...field} rows={4} style={{ resize: 'none' }} />
                    )}
                  />
                </CInputGroup>
                {errors.description && <CFormText className="help-block">Please insert a description</CFormText>}
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="validFor">Valid For</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cilCalendar" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="validFor"
                    render={({ field }) => {
                      const { value, onChange, ref } = field
                      return (
                        <div className={'datepicker'}>
                          <DateRangePicker
                            startDate={
                              moment(value?.startDateTime, DATETIME_FORMAT).isValid()
                                ? moment(value?.startDateTime)
                                : null
                            }
                            endDate={
                              moment(value?.endDateTime, DATETIME_FORMAT).isValid() ? moment(value?.endDateTime) : null
                            }
                            onDatesChange={({ startDate, endDate }) =>
                              onChange({
                                startDateTime: moment(startDate).format(DATETIME_FORMAT),
                                endDateTime: moment(endDate).format(DATETIME_FORMAT)
                              })
                            }
                            ref={ref}
                          />
                        </div>
                      )
                    }}
                  />
                </CInputGroup>
                {errors.validFor && <CFormText className="help-block">Please enter a date range</CFormText>}
              </CFormGroup>
            </CCol>

            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="category">Category</CLabel>
                <CInputGroup>
                  {!isLoadingCategories && (
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="category"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          onChange={(e: any) => {
                            onChange(e)
                          }}
                          name={'category'}
                          onBlur={onBlur}
                          value={value}
                          isMulti
                          closeMenuOnSelect={false}
                          ref={ref}
                          options={categories?.map((el) => ({ value: el, label: el?.name }))}
                          className={'select'}
                          styles={colourStyles}
                        ></Select>
                      )}
                    />
                  )}
                </CInputGroup>
                {errors.category && <CFormText className="help-block">Please select at least a category</CFormText>}
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow className={'mt-4'}>
            <CCol>
              <CFormGroup>
                <CLabel>Product Offering Price</CLabel>
                <CInputGroup>
                  <CCard className={'p-4'} style={{ width: '100%' }}>
                    <CDataTable
                      cleaner
                      loading={isLoadingProductOfferPrice}
                      items={productOfferPrice}
                      columnFilter
                      tableFilter
                      clickableRows
                      fields={productOfferPriceFields}
                      itemsPerPage={5}
                      scopedSlots={{
                        select: (item: any) => productOfferPriceSelectComponent(item),
                        price: (item: any) => showPropertyOrDefault(item?.price?.value),
                        unit: (item: any) => showPropertyOrDefault(item?.price?.unit),

                        show_details: (item: any) => showProductOfferPriceDetails(item)
                      }}
                      sorter
                      hover
                      pagination
                    />
                  </CCard>
                </CInputGroup>
                {errors.productOfferPrice && <CFormText className="help-block">Please select a price offer</CFormText>}
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow className={'mt-4'}>
            <CCol>
              <CFormGroup>
                <CLabel>Service Level Agreements</CLabel>
                <CInputGroup>
                  <CCard className={'p-4'} style={{ width: '100%' }}>
                    <CDataTable
                      cleaner
                      loading={isLoadingSlas}
                      items={slas}
                      columnFilter
                      tableFilter
                      clickableRows
                      fields={slaFields}
                      itemsPerPage={5}
                      scopedSlots={{
                        select: (item: any) => slaSelectComponent(item),
                        show_details: (item: any) => showSLADetails(item)
                      }}
                      sorter
                      hover
                      pagination
                    />
                  </CCard>
                </CInputGroup>
                {errors.serviceLevelAgreement && (
                  <CFormText className="help-block">Please select an agreement</CFormText>
                )}
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal show={modalSLA != null} onClose={() => setModalSLA(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{`Legal Prose Template ${modalSLA?.id}`}</h5>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs="6">
              <p className={'text-light mb-2'}>Name:</p> <p>{modalSLA?.name}</p>
            </CCol>
            <CCol xs="6">
              <p className={'text-light mb-2'}>Last Update:</p>{' '}
              <p>
                {dayjs(modalSLA?.statusUpdated).isValid()
                  ? dayjs(modalSLA?.statusUpdated).format(DATETIME_FORMAT)
                  : '-'}
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <p className={'text-light mb-2'}>Description</p>
              <p>{modalSLA?.description}</p>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="6">
              <p className={'text-light mb-2'}>Status:</p>

              <p>{modalSLA?.status}</p>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  )
}

export default FormCreateOffer
