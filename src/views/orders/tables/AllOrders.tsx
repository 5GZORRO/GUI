import React, { useState } from 'react'
import {
  CDataTable,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CContainer
} from '@coreui/react'
import { DATETIME_FORMAT_SHOW } from 'config'
import dayjs from 'dayjs'

import { ApiOrders } from 'types/api'

import { useMyOrders } from 'hooks/api/Orders'
import { Link } from 'react-router-dom'

const fields = [
  'externalId',
  { key: 'requestedStartDate', label: 'Start Date' },
  { key: 'requestedCompletionDate', label: 'Completion Date' },
  'category',
  'priority',
  'description',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

export const AllOrders: React.FC = () => {
  const { data, isLoading } = useMyOrders()
  const [modal, setModal] = useState<ApiOrders | null>(null)

  const showButton = (item: ApiOrders) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  const showProductOffering = (item: ApiOrders) => {
    if (item?.productOrderItem?.length) {
      // return
      return <td className="py-2">{item?.productOrderItem?.map((el) => el?.productOffering?.name)?.join(', ')}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

  const showDate = (item: ApiOrders, field: any) => {
    return <td>{dayjs(item?.[field])?.isValid() ? dayjs(item?.[field]).format(DATETIME_FORMAT_SHOW) : '-'}</td>
  }

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
        sorter
        hover
        pagination
        scopedSlots={{
          requestedStartDate: (item: ApiOrders) => showDate(item, 'requestedStartDate'),
          requestedCompletionDate: (item: ApiOrders) => showDate(item, 'requestedCompletionDate'),
          productItem: (item: ApiOrders) => showProductOffering(item),
          show_details: (item: ApiOrders) => showButton(item)
        }}
      />
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Product Order'}</h5>
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
                <CNavLink className={'pl-0 mb-4'} data-tab="products" color={'#6C6E7E'}>
                  Product Offering
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="price" color={'#6C6E7E'}>
                  Total Price
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>External Id:</p> <p>{modal?.externalId}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Category:</p> <p>{modal?.category}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description:</p> <p>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Priority:</p> <p>{modal?.priority}</p>
                  </CCol>
                </CRow>
                <CRow className={' mt-2'}>
                  {modal?.requestedStartDate && (
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>Start Date:</p>{' '}
                      <p>
                        {dayjs(modal?.requestedStartDate).isValid()
                          ? dayjs(modal?.requestedStartDate).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  )}
                  {modal?.requestedCompletionDate && (
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>Completion Date:</p>{' '}
                      <p>
                        {dayjs(modal?.requestedCompletionDate).isValid()
                          ? dayjs(modal?.requestedCompletionDate).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  )}
                </CRow>
                {modal?.cancellationDate && (
                  <CRow className={' mt-2'}>
                    {modal?.cancellationDate && (
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Cancellation Date:</p>{' '}
                        <p>
                          {dayjs(modal?.cancellationDate).isValid()
                            ? dayjs(modal?.cancellationDate).format(DATETIME_FORMAT_SHOW)
                            : '-'}
                        </p>
                      </CCol>
                    )}
                    {modal?.cancellationReason && (
                      <CCol xs="6">
                        <p className={'text-light mb-2'}>Cancellation Reason:</p> <p>{modal?.cancellationReason}</p>
                      </CCol>
                    )}
                  </CRow>
                )}
              </CTabPane>
              <CTabPane data-tab="products">
                {modal?.productOrderItem != null && modal?.productOrderItem?.length > 0 && (
                  <CContainer className={'pl-0 pr-0'}>
                    {modal?.productOrderItem?.map((el, index) => (
                      <>
                        <h4>{el?.productOffering?.name}</h4>
                        <p>
                          {el?.productOffering?.id && (
                            <>
                            <Link to={{ pathname: '/offers', search: `?id=${el?.productOffering?.id}` }}>
                              See details
                            </Link>
                            </>
                          )}
                        </p>
                      </>
                    ))}
                  </CContainer>
                )}
              </CTabPane>
              {modal?.orderTotalPrice != null && modal?.orderTotalPrice?.length > 0 && (
                <CTabPane data-tab="price">
                  {modal?.orderTotalPrice?.map((el: any) => (
                    <CContainer key={`priceOffer-${el?.id}`} className={'pl-0 pr-0'}>
                      <CRow className={'mt-2'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p> <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="12">
                          <p className={'text-light mb-2'}>Description</p>
                          <p>{el?.description}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price (Tax Included):</p>
                          <p>{el?.price?.taxIncludedAmount?.value}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Unit:</p>
                          <p>{el?.price?.taxIncludedAmount?.unit}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Type:</p>
                          <p>{el?.priceType}</p>
                        </CCol>
                      </CRow>

                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Unit Of Measure:</p>
                          <p>{el?.unitOfMeasure}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Recurring Charge Period:</p>
                          <p>{el?.recurringChargePeriod}</p>
                        </CCol>
                      </CRow>
                      <CContainer className={'mt-4 pl-0 pr-0'}>
                        <h4>Product Offering Price</h4>
                        <CRow className={'mt-4'}>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>Name:</p> <p>{el?.productOfferingPrice?.name}</p>
                          </CCol>
                        </CRow>
                        <CRow className={'mt-4'}>
                          <CCol xs="12">
                            <p className={'text-light mb-2'}>Description</p>
                            <p>{el?.productOfferingPrice?.description}</p>
                          </CCol>
                        </CRow>
                        <CRow className={'p-3 mt-4'}>
                          <p className={'text-light mb-2'}>Valid for: </p>
                        </CRow>
                        {el?.productOfferingPrice?.validFor && (
                          <CRow className={'pl-3 pr-3'}>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>From:</p>{' '}
                              <p>
                                {dayjs(el?.productOfferingPrice?.validFor?.startDateTime).isValid()
                                  ? dayjs(el?.productOfferingPrice?.validFor?.startDateTime).format(
                                    DATETIME_FORMAT_SHOW
                                  )
                                  : '-'}
                              </p>
                            </CCol>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>To:</p>{' '}
                              <p>
                                {dayjs(el?.productOfferingPrice?.validFor?.endDateTime).isValid()
                                  ? dayjs(el?.productOfferingPrice?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                                  : '-'}
                              </p>
                            </CCol>
                          </CRow>
                        )}
                      </CContainer>
                    </CContainer>
                  ))}
                </CTabPane>
              )}
            </CTabContent>
          </CTabs>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AllOrders
