import React, { useEffect, useState } from 'react'
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
import { useSearchOffersById } from 'hooks/api/Products'

const fields = [
  { key: 'requestedStartDate', label: 'Start Date' },
  { key: 'requestedCompletionDate', label: 'Completion Date' },
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
  const [modalOffer, setModalOffer] = useState<any | null>(null)
  const [id, setId] = useState<any>(null)
  const { data: dataOffer, mutate, isLoading: isLoadingMutate } = useSearchOffersById()

  useEffect(() => {
    if (id) {
      mutate(id)
      setId(null)
    }
  }, [id])

  useEffect(() => {
    if (dataOffer) {
      setModal(null)
      setModalOffer(dataOffer[0])
    }
  }, [dataOffer])

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

  const splitResourceCaract = (value: string) => {
    const splitted = value.split(',')
    if (splitted.length > 1) {
      return splitted.map((el, key) => <p key={key}>{el}</p>)
    }
    return <p>{value}</p>
  }
  /* eslint-disable */
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
                              <CButton
                                color="primary"
                                className={'text-uppercase'}
                                shape="square"
                                onClick={() => setId(el?.productOffering?.id)}
                              >
                                {'Show'}
                              </CButton>
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
      <CModal show={modalOffer != null && !isLoadingMutate} onClose={() => setModalOffer(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Product Offer'}</h5>
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
                <CNavLink className={'pl-0 mb-4'} data-tab="specifications" color={'#6C6E7E'}>
                  Specifications
                </CNavLink>
              </CNavItem>
              {modalOffer?.productOfferingPrice?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="price" color={'#6C6E7E'}>
                    Price
                  </CNavLink>
                </CNavItem>
              )}
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Name:</p> <p>{modalOffer?.name}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description</p>
                    <p>{modalOffer?.description}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Location:</p>{' '}
                    <p>
                      {modalOffer?.place
                        ?.map((el) => {
                          return el?.geographicLocation?.name
                        })
                        ?.join(', ')}
                    </p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Category</p>
                    <p> {modalOffer?.category?.map((el: any) => el?.name)?.join(', ')}</p>
                  </CCol>
                </CRow>
                <CRow className={'p-3 mt-4'}>
                  <p className={'text-light mb-2'}>Valid for: </p>
                </CRow>
                {modalOffer?.validFor && (
                  <CRow className={'pl-3 pr-3'}>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>From:</p>{' '}
                      <p>
                        {dayjs(modalOffer?.validFor?.startDateTime).isValid()
                          ? dayjs(modalOffer?.validFor?.startDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>To:</p>{' '}
                      <p>
                        {dayjs(modalOffer?.validFor?.endDateTime).isValid()
                          ? dayjs(modalOffer?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  </CRow>
                )}
              </CTabPane>
              <CTabPane data-tab="specifications">
                <CContainer>
                  <CContainer
                    className={'pl-0 pr-0'}
                    style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                  >
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Name</p>
                        <p className={'font-18 mb-4'}>{modalOffer?.productSpecification?.name}</p>
                      </CCol>
                      {modalOffer?.productSpecification?.lifecycleStatus != null &&
                        modalOffer?.productSpecification?.lifecycleStatus !== '' && (
                          <CCol>
                            <p className={'text-light mb-2'}>Status</p>
                            <p className={'font-16 mb-4'}>{modalOffer?.productSpecification?.lifecycleStatus}</p>
                          </CCol>
                        )}
                    </CRow>
                    {modalOffer?.productSpecification?.description != null &&
                      modalOffer?.productSpecification?.description !== '' && (
                        <CRow className={'mt-2'}>
                          <CCol>
                            <p className={'text-light mb-2'}>Description</p>
                            <p className={'font-16 mb-4'}>{modalOffer?.productSpecification?.description}</p>
                          </CCol>
                        </CRow>
                      )}
                  </CContainer>
                  {modalOffer?.productSpecification?.serviceSpecification?.length > 0 && (
                    <CContainer
                      className={'pl-0 pr-0'}
                      style={
                        modalOffer?.productSpecification?.resourceSpecification?.length > 0
                          ? { borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }
                          : {}
                      }
                    >
                      <h5>Service Specification</h5>
                      {modalOffer?.productSpecification?.serviceSpecification?.map((ss: any, index: number) => (
                        <CContainer key={`serviceSpecification-${index}`} className={'pl-0 pr-0'}>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-16 mb-4'}>{ss?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{ss?.description}</p>
                            </CCol>
                          </CRow>
                          {ss?.serviceSpecCharacteristic?.length > 0 && <h5>Service Characteristics</h5>}
                          {ss?.serviceSpecCharacteristic?.map((el, index) => (
                            <CContainer key={`serviceSpecCharacteristic-${index}`} className={''}>
                              <CRow className={'mt-2'}>
                                <CCol>
                                  <p className={'text-light mb-2'}>Name</p>
                                  <p className={'font-16 mb-4'}>{el?.name}</p>
                                </CCol>
                              </CRow>
                              <CRow className={'mt-2'}>
                                <CCol>
                                  <p className={'text-light mb-2'}>Description</p>
                                  <p className={'font-16 mb-4'}>{el?.description}</p>
                                </CCol>
                              </CRow>
                              {el?.serviceSpecCharacteristicValue?.map((resource, index) => (
                                <CRow className={'mt-2'} key={`serviceSpecCharacteristicValue-${index}`}>
                                  {resource?.value?.alias && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                      <div className={'font-16 mb-4'}>
                                        {splitResourceCaract(resource?.value?.value)}
                                      </div>
                                    </CCol>
                                  )}
                                  {resource?.unitOfMeasure && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>Unit Of Measure</p>
                                      <p className={'font-16 mb-4'}>{resource?.unitOfMeasure}</p>
                                    </CCol>
                                  )}
                                </CRow>
                              ))}
                            </CContainer>
                          ))}

                          {ss?.resourceSpecification?.length > 0 && (
                            <CContainer style={{ borderTop: '1px solid #6C6E7E', paddingTop: '1rem' }}>
                              <h5>Resource Specification</h5>

                              {ss?.resourceSpecification?.map((rs: any, rsIndex: number) => (
                                <CContainer key={`offer-rs-${rsIndex}`}>
                                  <CRow className={'mt-2'}>
                                    <CCol>
                                      <p className={'text-light mb-2'}>Name</p>
                                      <p className={'font-18 mb-4'}>{rs?.name}</p>
                                    </CCol>
                                  </CRow>
                                  <CRow className={'mt-2'}>
                                    <CCol>
                                      <p className={'text-light mb-2'}>Description</p>
                                      <p className={'font-16 mb-4'}>{rs?.description}</p>
                                    </CCol>
                                  </CRow>
                                  {rs?.resourceSpecCharacteristic?.length && <h5>Resource Characteristics</h5>}
                                  {rs?.resourceSpecCharacteristic?.map((el: any, index: number) => (
                                    <CContainer key={`resourceCharacteristics-${index}`} className={''}>
                                      <CRow className={'mt-2'}>
                                        <CCol>
                                          <p className={'text-light mb-2'}>Name</p>
                                          <p className={'font-16 mb-4'}>{el?.name}</p>
                                        </CCol>
                                      </CRow>
                                      <CRow className={'mt-2'}>
                                        <CCol>
                                          <p className={'text-light mb-2'}>Description</p>
                                          <p className={'font-16 mb-4'}>{el?.description}</p>
                                        </CCol>
                                      </CRow>
                                      {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                                        <CRow className={'mt-2'} key={`resourceSpecCharacteristicValue-${index}`}>
                                          {resource?.value?.alias && (
                                            <CCol>
                                              <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                              <div className={'font-16 mb-4'}>
                                                {splitResourceCaract(resource?.value?.value)}
                                              </div>
                                            </CCol>
                                          )}
                                          {resource?.unitOfMeasure && (
                                            <CCol>
                                              <p className={'text-light mb-2'}>Unit Of Measure</p>
                                              <p className={'font-16 mb-4'}>{resource?.unitOfMeasure}</p>
                                            </CCol>
                                          )}
                                        </CRow>
                                      ))}
                                    </CContainer>
                                  ))}
                                </CContainer>
                              ))}
                            </CContainer>
                          )}
                        </CContainer>
                      ))}
                    </CContainer>
                  )}
                  {modalOffer?.productSpecification?.resourceSpecification?.length > 0 && (
                    <CContainer className={'pl-0 pr-0'}>
                      <h5>Resource Specification</h5>
                      {modalOffer?.productSpecification?.resourceSpecification?.map((rs: any, rsIndex: number) => (
                        <CContainer key={`offer-rs-${rsIndex}`}>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-18 mb-4'}>{rs?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{rs?.description}</p>
                            </CCol>
                          </CRow>
                          {rs?.resourceSpecCharacteristic?.length && <h5>Resource Characteristics</h5>}

                          {rs?.resourceSpecCharacteristic?.map((el: any, index: number) => (
                            <CContainer key={`resourceCharacteristics-${index}`} className={''}>
                              <CRow className={'mt-2'}>
                                <CCol>
                                  <p className={'text-light mb-2'}>Name</p>
                                  <p className={'font-16 mb-4'}>{el?.name}</p>
                                </CCol>
                              </CRow>
                              <CRow className={'mt-2'}>
                                {el?.description && (
                                  <CCol>
                                    <p className={'text-light mb-2'}>Description</p>
                                    <p className={'font-16 mb-4'}>{el?.description}</p>
                                  </CCol>
                                )}
                              </CRow>
                              {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                                <CRow className={'mt-2'} key={`resourceSpecCharacteristicValue-${index}`}>
                                  {!resource?.unitOfMeasure && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>Processors</p>
                                      <div className={'font-16 mb-4'}>{resource?.value?.value}</div>
                                    </CCol>
                                  )}
                                  {resource?.value?.alias && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                      <div className={'font-16 mb-4'}>
                                        {splitResourceCaract(resource?.value?.value)}
                                      </div>
                                    </CCol>
                                  )}
                                  {resource?.unitOfMeasure && (
                                    <>
                                      <CCol xs="6">
                                        <p className={'text-light mb-2'}>Unit Of Measure</p>
                                        <p className={'font-16 mb-4'}>{resource?.unitOfMeasure}</p>
                                      </CCol>
                                      <CCol xs="6">
                                        <p className={'text-light mb-2'}>Value</p>
                                        {splitResourceCaract(resource?.value?.value)}
                                      </CCol>
                                    </>
                                  )}
                                </CRow>
                              ))}
                            </CContainer>
                          ))}
                        </CContainer>
                      ))}
                    </CContainer>
                  )}
                </CContainer>
              </CTabPane>
              {modalOffer?.productOfferingPrice?.length > 0 && (
                <CTabPane data-tab="price">
                  {modalOffer?.productOfferingPrice?.map((el: any) => (
                    <CContainer key={`priceOffer-${el?.id}`}>
                      <CRow className={'mt-4'}>
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
                          <p className={'text-light mb-2'}>Price:</p>
                          <p>{el?.price?.value}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Unit:</p>
                          <p>{el?.price?.unit}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Type:</p>
                          <p>{el?.priceType}</p>
                        </CCol>
                      </CRow>

                      {el?.unitOfMeasure?.units != null &&
                        el?.unitOfMeasure?.units !== '' &&
                        el?.unitOfMeasure?.amount != null && (
                          <CRow className={'mt-4'}>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Unit Of Measure:</p>
                              <p>{el?.unitOfMeasure?.units}</p>
                            </CCol>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Unit Of Measure Length:</p>
                              <p>{el?.unitOfMeasure?.amount}</p>
                            </CCol>
                          </CRow>
                        )}
                      {el?.recurringChargePeriodType != null &&
                        el?.recurringChargePeriodType !== '' &&
                        el?.recurringChargePeriodLength != null && (
                          <CRow className={'mt-4'}>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Recurring Charge Period Type:</p>
                              <p>{el?.recurringChargePeriodType}</p>
                            </CCol>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Recurring Charge Period Length:</p>
                              <p>{el?.recurringChargePeriodLength}</p>
                            </CCol>
                          </CRow>
                        )}
                      <CRow className={'p-3 mt-4'}>
                        <p className={'text-light mb-2'}>Valid for: </p>
                      </CRow>
                      {el?.validFor && (
                        <CRow className={'pl-3 pr-3'}>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT_SHOW)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
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
