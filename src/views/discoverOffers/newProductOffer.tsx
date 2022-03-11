/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CDataTable,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs
} from '@coreui/react'
import dayjs from 'dayjs'

import { useAllResourceAndServiceSpecifications } from 'hooks/api/Resources'
import { useHistory, Link } from 'react-router-dom'
import { DATETIME_FORMAT, DATETIME_FORMAT_SHOW } from 'config'

const fields = [
  { key: 'select', label: '', filter: false, sorter: false },
  'name',
  'description',
  { key: 'lifecycleStatus', label: 'Status' },
  { key: 'lastUpdate', label: 'Created' },
  'type',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const fieldsOrder = [
  { key: 'select', label: '', filter: false, sorter: false },
  'name',
  'description',
  { key: 'provider', label: 'Provider' },
  { key: 'validity', label: 'Validity' },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const NewProductOffer: React.FC = () => {
  const history = useHistory()
  const [selected, setSelected] = useState<string[]>([])
  const [selectedOrderedItem, setSelectedOrderedItem] = useState<string[]>([])
  const { data, isLoading } = useAllResourceAndServiceSpecifications()
  const [modal, setModal] = useState<any | null>(null)

  const check = (item: any) => {
    const found = selected.find((rs: any) => rs === item?.id)

    if (!found) {
      setSelected((previous: any) => [...previous, item?.id])
    } else {
      setSelected((previous: any) => previous.filter((rs: any) => rs !== item?.id))
    }
  }

  const checkOrderedItem = (item: any) => {
    const found = selectedOrderedItem.find((rs: any) => rs === item?.id)

    if (!found) {
      setSelectedOrderedItem((previous: any) => [...previous, item?.id])
    } else {
      setSelectedOrderedItem((previous: any) => previous.filter((rs: any) => rs !== item?.id))
    }
  }

  const openModal = (data: any) => {
    setModal(data)
  }

  const splitResourceCaract = (value: string) => {
    const splitted = value.split(',')
    if (splitted.length > 1) {
      return splitted.map((el, key) => <p key={key}>{el}</p>)
    }
    return <p>{value}</p>
  }

  return (
    <CContainer>
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
      <CModalHeader closeButton>
          <h5>{modal?.isService ? 'Service Details' : 'Resource Details'}</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="resourceSpecification">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="resourceSpecification" color={'#6C6E7E'}>
                  {modal?.isService ? 'Service Specification' : 'Resource Specification'}
                </CNavLink>
              </CNavItem>
              {modal?.resourceSpecCharacteristic?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="resourceCharacteristics" color={'#6C6E7E'}>
                    Resource Characteristics
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.serviceSpecCharacteristic?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="resourceCharacteristics" color={'#6C6E7E'}>
                    Service Characteristics
                  </CNavLink>
                </CNavItem>
              )}

              {modal?.resourceSpecification?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="serviceResourceSpecification" color={'#6C6E7E'}>
                    Resource Specification
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.resourceSpecification?.some((el) => el?.resourceSpecCharacteristic?.length > 0) && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="serviceResourceCharacteristics" color={'#6C6E7E'}>
                    Resource Characteristics
                  </CNavLink>
                </CNavItem>
              )}
            </CNav>
            <CTabContent>
              <CTabPane data-tab="resourceSpecification">
                <CRow className={'mt-4'}>
                  <CCol>
                    <p className={'text-light mb-2'}>Name</p>
                    <p className={'font-weight-bold font-18 mb-4'}>{modal?.name}</p>
                  </CCol>
                  <CCol>
                    <p className={'text-light mb-2'}>Status</p>
                    <p className={'font-16 mb-4'}>{modal?.lifecycleStatus}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p className={'text-light mb-2'}>Created</p>
                    <p className={'font-16 mb-4'}>
                      {dayjs(modal?.lastUpdate).isValid() ? dayjs(modal?.lastUpdate).format(DATETIME_FORMAT_SHOW) : '-'}
                    </p>
                  </CCol>
                  <CCol>
                    {modal?.version && (
                      <>
                        <p className={'text-light mb-1'}>Version</p>
                        <p className={'font-16 text-white'}>{modal?.version}</p>
                      </>
                    )}
                  </CCol>
                </CRow>
                {modal?.validFor && (
                  <CRow>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>From:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.startDateTime).isValid()
                          ? dayjs(modal?.validFor?.startDateTime).toISOString()
                          : '-'}
                      </p>
                    </CCol>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>To:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.endDateTime).isValid()
                          ? dayjs(modal?.validFor?.endDateTime).toISOString()
                          : '-'}
                      </p>
                    </CCol>
                  </CRow>
                )}
              </CTabPane>
              <CTabPane
                data-tab="resourceCharacteristics"
                style={{
                  maxHeight: '24rem',
                  overflowY: 'scroll'
                }}
              >
                {modal?.resourceSpecCharacteristic?.map((el: any, index: number) => (
                  <CContainer
                    key={`resourceCharacteristics-${index}`}
                    style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                  >
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Name</p>
                        <p className={'font-16 mb-4'}>{el?.name}</p>
                      </CCol>
                    </CRow>
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Description</p>
                        <p className={'font-16 mb-4'}>{el?.description}</p>
                      </CCol>
                    </CRow>
                    {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                      <CRow className={'mt-4'} key={`resourceSpecCharacteristicValue-${index}`}>
                        {resource?.value?.alias && (
                          <CCol>
                            <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                            <div className={'font-16 mb-4'}>{splitResourceCaract(resource?.value?.value)}</div>
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
                {modal?.serviceSpecCharacteristic?.map((el: any, index: number) => (
                  <CContainer
                    key={`serviceSpecCharacteristic-${index}`}
                    style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                  >
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Name</p>
                        <p className={'font-16 mb-4'}>{el?.name}</p>
                      </CCol>
                    </CRow>
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Description</p>
                        <p className={'font-16 mb-4'}>{el?.description}</p>
                      </CCol>
                    </CRow>
                    {el?.serviceSpecCharacteristicValue?.map((resource, index) => (
                      <CRow className={'mt-4'} key={`resourceSpecCharacteristicValue-${index}`}>
                        {resource?.value?.alias && (
                          <CCol>
                            <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                            <div className={'font-16 mb-4'}>{splitResourceCaract(resource?.value?.value)}</div>
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
              </CTabPane>
              {modal?.resourceSpecification?.length > 0 && (
                <CTabPane data-tab="serviceResourceSpecification">
                  {modal?.resourceSpecification?.map((rs) => (
                    <CContainer key={`serviceResourceSpecification-${rs?.id}`} className={'pl-0 pr-0'}>
                      <CRow className={'mt-4'}>
                        <CCol>
                          <p className={'text-light mb-2'}>Name</p>
                          <p className={'font-18 mb-4'}>{rs?.name}</p>
                        </CCol>
                        <CCol>
                          <p className={'text-light mb-2'}>Status</p>
                          <p className={'font-16 mb-4'}>{rs?.lifecycleStatus}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol>
                          <p className={'text-light mb-2'}>Description</p>
                          <p className={'font-16 mb-4'}>{rs?.description}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <p className={'text-light mb-2'}>Created</p>
                          <p className={'font-16 mb-4'}>
                            {dayjs(rs?.lastUpdate).isValid() ? dayjs(rs?.lastUpdate).format(DATETIME_FORMAT_SHOW) : '-'}
                          </p>
                        </CCol>
                        <CCol>
                          {rs?.version && (
                            <>
                              <p className={'text-light mb-1'}>Version</p>
                              <p className={'font-16 text-white'}>{rs?.version}</p>
                            </>
                          )}
                        </CCol>
                      </CRow>
                      {rs?.validFor && (
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(rs?.validFor?.startDateTime).isValid()
                                ? dayjs(rs?.validFor?.startDateTime).toISOString()
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(rs?.validFor?.endDateTime).isValid()
                                ? dayjs(rs?.validFor?.endDateTime).toISOString()
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
                    </CContainer>
                  ))}
                </CTabPane>
              )}

              {modal?.resourceSpecification?.some((el) => el?.resourceSpecCharacteristic?.length > 0) && (
                <CTabPane
                  data-tab="serviceResourceCharacteristics"
                  style={{
                    maxHeight: '24rem',
                    overflowY: 'scroll'
                  }}
                >
                  {modal?.resourceSpecification?.map((rs) => (
                    <CContainer key={`serviceResourceCharacteristics-${rs?.id}`} className={'pl-0 pr-0'}>
                      {rs?.resourceSpecCharacteristic?.map((el: any, index: number) => (
                        <CContainer
                          key={`resourceCharacteristics-${index}`}
                          style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                        >
                          <CRow className={'mt-4'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-16 mb-4'}>{el?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-4'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{el?.description}</p>
                            </CCol>
                          </CRow>
                          {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                            <CRow className={'mt-4'} key={`resourceSpecCharacteristicValue-${index}`}>
                              {resource?.value?.alias && (
                                <CCol>
                                  <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                  <div className={'font-16 mb-4'}>{splitResourceCaract(resource?.value?.value)}</div>
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
                      {modal?.serviceSpecCharacteristic?.map((el: any, index: number) => (
                        <CContainer
                          key={`serviceSpecCharacteristic-${index}`}
                          style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                        >
                          <CRow className={'mt-4'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-16 mb-4'}>{el?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-4'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{el?.description}</p>
                            </CCol>
                          </CRow>
                          {el?.serviceSpecCharacteristicValue?.map((resource, index) => (
                            <CRow className={'mt-4'} key={`resourceSpecCharacteristicValue-${index}`}>
                              {resource?.value?.alias && (
                                <CCol>
                                  <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                  <div className={'font-16 mb-4'}>{splitResourceCaract(resource?.value?.value)}</div>
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
                </CTabPane>
              )}
            </CTabContent>
          </CTabs>
        </CModalBody>
      </CModal>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>New Product Offer</h2>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          <h5>Resource</h5>
        </CCardHeader>
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
            scopedSlots={{
              select: (item: { id: any; _selected: boolean | undefined }) => {
                return (
                  <td>
                    <input
                      className={'product-offer--checkbox'}
                      type="checkbox"
                      checked={selected?.find((el) => item?.id === el) != null}
                      onChange={() => check(item)}
                    />
                  </td>
                )
              },
              lastUpdate: (item: any) => {
                return (
                  <td className="py-2">
                    {dayjs(item?.lastUpdate).isValid() ? dayjs(item?.lastUpdate).format(DATETIME_FORMAT_SHOW) : '-'}
                  </td>
                )
              },
              lifecycleStatus: (item: any) => {
                return <td className="py-2">{item?.lifecycleStatus ? item?.lifecycleStatus : '-'}</td>
              },
              type: (item: any) => {
                return <td className="py-2">{item?.isService ? 'Service' : 'Resource'}</td>
              },
              show_details: (item: any) => {
                return (
                  <td className="py-2">
                    <CButton color="primary" className={'shadow-none text-uppercase'} onClick={() => openModal(item)}>
                      {'Show'}
                    </CButton>
                  </td>
                )
              }
            }}
            sorter
            hover
            pagination
          />
        </CCardBody>
      </CCard>
      {/* <CCard>
        <CCardHeader>
          <h5>Product Order Item</h5>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            cleaner
            loading={isLoading}
            items={[]}
            columnFilter
            tableFilter
            clickableRows
            fields={fieldsOrder}
            itemsPerPage={5}
            scopedSlots={{
              select: (item: { id: any; _selectedOrderedItem: boolean | undefined }) => {
                return (
                  <td>
                    <input
                      className={'product-offer--checkbox'}
                      type="checkbox"
                      checked={selectedOrderedItem?.find((el) => item?.id === el) != null}
                      onChange={() => checkOrderedItem(item)}
                    />
                  </td>
                )
              },
              validity: (item: any) => {
                return (
                  <td className="py-2">
                    {dayjs(item?.lastUpdate).isValid() ? dayjs(item?.lastUpdate).format(DATETIME_FORMAT_SHOW) : '-'}
                  </td>
                )
              },
              show_details: (item: any) => {
                return (
                  <td className="py-2">
                    <CButton color="primary" className={'shadow-none text-uppercase'} onClick={() => openModal(item)}>
                      {'Show'}
                    </CButton>
                  </td>
                )
              }
            }}
            sorter
            hover
            pagination
          />
        </CCardBody>
      </CCard> */}
      <div className={'d-flex flex-row-reverse mb-5'}>
        <CButton
          className={'text-uppercase px-5'}
          color={'gradient'}
          disabled={!selected?.length}
          onClick={() =>
            history.push(
              `/offers/new-offer/${selected}?services=[${selected
                ?.map((el, index) =>
                  data?.find((resourceOrService) => resourceOrService.id === el).isService ? index : null
                )
                .filter((el) => el != null)}]`
            )
          }
        >
          next
        </CButton>
        <Link to={'/offers/'}>
          <CButton className={'text-uppercase px-5 mr-3'} variant="outline" color={'white'}>
            Cancel
          </CButton>
        </Link>
      </div>
    </CContainer>
  )
}

export default NewProductOffer
