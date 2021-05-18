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
  CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { PlusCircle } from 'assets/icons/externalIcons'
import { Controller, useFormContext } from 'react-hook-form'
import { useAllTemplates } from 'hooks/api/SLA'

const FormCreateOffer: React.FC = () => {
  const {
    formState: { errors },
    control,
    setValue
  } = useFormContext()
  const [selected, setSelected] = useState<any>([])

  useEffect(() => {
    setValue('serviceLevelAgreements', selected)
  }, [selected])

  const check = (item: any) => {
    const found = selected.find((sla: any) => sla?.id === item?.id)

    if (!found) {
      setSelected((previous: any) => [...previous, item])
    } else {
      setSelected((previous: any) => previous.filter((sla: any) => sla?.id !== item?.id))
    }
  }
  const { data: slas, isLoading: isLoadingSlas } = useAllTemplates()

  const slaFields = [
    { key: 'select', label: '', filter: false, sorter: false },
    'name',
    'publisher',
    'status',
    'version',
    'DID',
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

  console.log(errors)

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
              <CLabel>Prices</CLabel>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cilEuro" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="price"
                  render={({ field }) => (
                    // <CSelect {...field}>
                    //   <option value='0'>Please select</option>
                    //   <option value='1'>Option #1</option>
                    //   <option value='2'>Option #2</option>
                    //   <option value='3'>Option #3</option>
                    // </CSelect>
                    <CInput placeholder={'Enter Product Offer Price'} {...field} />
                  )}
                />
                <CInputGroupAppend>
                  <CButton type="button" color="transparent" onClick={() => console.log('Prices')}>
                    <PlusCircle width={20} height={20} />
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
              {errors.price && <CFormText className="help-block">Please select a price</CFormText>}
            </CFormGroup>
          </CCol>
          <CCol sm={6}>
            <CFormGroup>
              <CLabel>Description</CLabel>
              <CInputGroup>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="description"
                  render={({ field }) => <CInput placeholder={'Enter Description'} {...field} type="textarea" />}
                />
              </CInputGroup>
              {errors.description && <CFormText className="help-block">Please insert a description</CFormText>}
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormGroup>
              <CLabel>Service Level Agreements</CLabel>
              <CInputGroup>
                <CCard className={'p-4'}>
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
