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
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow,
  CDataTable,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { PlusCircle } from 'assets/icons/externalIcons'
import { Controller, useFormContext } from 'react-hook-form'
import { useAllTemplates } from 'hooks/api/SLA'
import { useAllProductPrice } from 'hooks/api/Resources'

const FormCreateOffer: React.FC = () => {
  const {
    formState: { errors },
    control,
    setValue
  } = useFormContext()
  const [selected, setSelected] = useState<any>([])
  const [selectedPO, setSelectedPO] = useState<any>([])

  useEffect(() => {
    setValue('serviceLevelAgreements', selected)
  }, [selected])

  useEffect(() => {
    setValue('productOfferPrice', selectedPO)
  }, [selectedPO])

  const check = (item: any) => {
    const found = selected.find((sla: any) => sla?.id === item?.id)

    if (!found) {
      setSelected((previous: any) => [...previous, item])
    } else {
      setSelected((previous: any) => previous.filter((sla: any) => sla?.id !== item?.id))
    }
  }

  const checkPO = (item: any) => {
    const found = selectedPO.find((po: any) => po?.id === item?.id)

    if (!found) {
      setSelectedPO((previous: any) => [...previous, item])
    } else {
      setSelectedPO((previous: any) => previous.filter((po: any) => po?.id !== item?.id))
    }
  }

  const { data: slas, isLoading: isLoadingSlas } = useAllTemplates()
  const { data: productOfferPrice, isLoading: isLoadingProductOfferPrice } = useAllProductPrice()

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
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => console.log('sla', item)}>
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
        onClick={() => console.log('productofferprice', item)}
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
          type={'checkbox'}
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
        checked={selectedPO.find((sla: any) => sla?.id === item?.id)}
        onChange={() => checkPO(item)}
      />
    </td>
  )

  const showPropertyOrDefault = (property: any) => <td>{property ?? '-'}</td>

  return (
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
          <CCol sm={6}>
            <CFormGroup>
              <CLabel>Description</CLabel>
              <CInputGroup>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="description"
                  render={({ field }) => <CTextarea placeholder={'Enter Description'} {...field} />}
                />
              </CInputGroup>
              {errors.description && <CFormText className="help-block">Please insert a description</CFormText>}
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow className={'mt-4'}>
          <CCol>
            <CFormGroup>
              <CLabel>Price</CLabel>
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
              {errors.serviceLevelAgreements && (
                <CFormText className="help-block">Please select an agreement</CFormText>
              )}
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
              {errors.serviceLevelAgreements && (
                <CFormText className="help-block">Please select an agreement</CFormText>
              )}
            </CFormGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default FormCreateOffer
