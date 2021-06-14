import React, { useState } from 'react'
import {
  CDataTable,
  CButton,
  CTabContent,
  CTabPane,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CTabs,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CContainer
} from '@coreui/react'

import { useAllProductOfferingPrices } from 'hooks/api/Resources'
import { DATETIME_FORMAT, DATETIME_FORMAT_SHOW } from 'config'
import dayjs from 'dayjs'

const AllTemplates = () => {
  const { data, isLoading } = useAllProductOfferingPrices()
  const [modal, setModal] = useState<any | null>(null)

  const fields = [
    'name',
    'description',
    { key: 'priceType', label: 'Type' },
    { key: 'unit', label: 'Unit' },
    { key: 'value', label: 'Value' },
    'isBundle',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const showDetails = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  const showPropertyOrDefault = (property: any) => <td>{property ?? '-'}</td>

  return (
    <>
      <CDataTable
        cleaner
        loading={isLoading}
        items={data?.filter((el) => el != null) ?? []}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        scopedSlots={{
          show_details: (item: any) => showDetails(item),
          value: (item: any) => showPropertyOrDefault(item?.price?.value),
          unit: (item: any) => showPropertyOrDefault(item?.price?.unit),
          isBundle: (item: any) => showPropertyOrDefault(item?.isBundle ? 'True' : 'False')
        }}
        sorter
        hover
        pagination
      />
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{`Product Offer Price ${modal?.id}`}</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="description">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="description" color={'#6C6E7E'}>
                  Description
                </CNavLink>
              </CNavItem>
              <CNavItem>
                {modal?.prodSpecCharValueUse?.length > 0 && (
                  <CNavLink className={'pl-0 mb-4'} data-tab="advanced" color={'#6C6E7E'}>
                    Advanced
                  </CNavLink>
                )}
              </CNavItem>
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description</p>
                    <p>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Price:</p>
                    <p>{modal?.price?.value}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Price Unit:</p>
                    <p>{modal?.price?.unit}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Price Type:</p>
                    <p>{modal?.priceType}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Lifecycle Status:</p>
                    <p>{modal?.lifecycleStatus}</p>
                  </CCol>
                </CRow>

                {modal?.unitOfMeasure?.units != null &&
                  modal?.unitOfMeasure?.units !== '' &&
                  modal?.unitOfMeasure?.amount != null && (
                    <CRow className={'mt-2'}>
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Unit Of Measure:</p>
                        <p>{modal?.unitOfMeasure?.amount}</p>
                      </CCol>
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Units:</p>
                        <p>{modal?.unitOfMeasure?.units}</p>
                      </CCol>
                    </CRow>
                )}
                {modal?.recurringChargePeriodType != null &&
                  modal?.recurringChargePeriodType !== '' &&
                  modal?.recurringChargePeriodLength != null && (
                    <CRow className={'mt-2'}>
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Recurring Charge Period Type:</p>
                        <p>{modal?.recurringChargePeriodType}</p>
                      </CCol>
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Recurring Charge Period Length:</p>
                        <p>{modal?.recurringChargePeriodLength}</p>
                      </CCol>
                    </CRow>
                )}
                <CRow className={'p-3'}>
                  <p className={'text-light mb-2'}>Valid for: </p>
                </CRow>
                {modal?.validFor && (
                  <CRow className={'pl-3 pr-3'}>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>From:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.startDateTime).isValid()
                          ? dayjs(modal?.validFor?.startDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>To:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.endDateTime).isValid()
                          ? dayjs(modal?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  </CRow>
                )}
              </CTabPane>
              <CTabPane data-tab="advanced">
                {modal?.prodSpecCharValueUse?.length > 0 &&
                  modal?.prodSpecCharValueUse.map((el, index) => (
                    <CContainer
                      key={`modal?.prodSpecCharValueUse-${index}`}
                      style={{ borderBottom: '1px solid #6C6E7E' }}
                    >
                      <CRow className={'mt-2'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p> <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs="12">
                          <p className={'text-light mb-2'}>Description</p>
                          <p>{el?.description}</p>
                        </CCol>
                      </CRow>
                      <CContainer className={'mt-4 p-0'}>
                        <CRow>
                          <CCol xs="12">
                            <p className={'text-light mb-2'}>Value</p>
                            <p>{el?.productSpecCharacteristicValue?.map((prod) => prod?.value?.value).join(', ')}</p>
                          </CCol>
                        </CRow>
                      </CContainer>
                    </CContainer>
                  ))}
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AllTemplates
