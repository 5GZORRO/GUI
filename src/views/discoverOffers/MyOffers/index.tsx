import React, { useState } from 'react'
import { DATETIME_FORMAT } from 'config'
import dayjs from 'dayjs'

import {
  CRow,
  CCol,
  CButton,
  CContainer,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CTabs,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react'

import { useSearchOffersNoParams } from 'hooks/api/Products'
import { useAuthContext } from 'context/AuthContext'

const MyOffers = () => {
  const [modal, setModal] = useState<any | null>(null)
  const { user } = useAuthContext()

  const { data, isLoading } = useSearchOffersNoParams({
    stakeholder: user?.stakeholderClaim?.stakeholderProfile?.name
  })

  const fields = [
    'id',
    'name',
    'category',
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'owner',
      label: 'Stakeholder'
    },
    {
      key: 'productOfferingPrice',
      label: 'Price'
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const arrayToStringsData = (item: any, property: string) => <td>{item?.map((el: any) => el[property]).join(', ')}</td>

  const showButton = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  return (
    <>
      <CContainer className={'p-0 mt-4 '}>
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
            category: (item: any) => arrayToStringsData(item?.category, 'name'),
            location: (item: any) => arrayToStringsData(item?.place, 'name'),
            owner: (item: any) => arrayToStringsData(item?.owner, 'name'),
            productOfferingPrice: (item: any) => arrayToStringsData(item?.productOfferingPrice, 'name'),
            show_details: (item: any) => showButton(item)
          }}
        />
      </CContainer>
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{`Product Offer ${modal?.id}`}</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="description">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="description" color={'#6C6E7E'}>
                  Description
                </CNavLink>
              </CNavItem>
              {modal?.category?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="category" color={'#6C6E7E'}>
                    Categories
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.productOfferingPrice?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="price" color={'#6C6E7E'}>
                    Price
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.isBundle && modal?.bundledProductOffering?.length && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="bundle" color={'#6C6E7E'}>
                    Bundle
                  </CNavLink>
                </CNavItem>
              )}
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Last Update:</p>{' '}
                    <p>{dayjs(modal?.lastUpdate).isValid() ? dayjs(modal?.lastUpdate).format(DATETIME_FORMAT) : '-'}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Sellable:</p>

                    <p>{modal?.isSellable ? 'True' : 'False'}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Bundle:</p>

                    <p>{modal?.isBundle ? 'True' : 'False'}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description</p>
                    <p>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow></CRow>
              </CTabPane>
              {modal?.category?.length > 0 && (
                <CTabPane data-tab="category">
                  {modal?.category?.map((el: any) => (
                    <CContainer key={`category-${el?.id}`}>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Version:</p>
                          <p>{el?.version}</p>
                        </CCol>
                      </CRow>
                    </CContainer>
                  ))}
                </CTabPane>
              )}
              {modal?.isBundle && modal?.bundledProductOffering?.length && (
                <CTabPane data-tab="bundle">
                  {modal?.bundledProductOffering?.map((el: any) => (
                    <CContainer
                      key={`bundle-${el?.id}`}
                      style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                    >
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Version:</p>
                          <p>{el?.version}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Last Update:</p>
                          <p>{dayjs(el?.lastUpdate).isValid() ? dayjs(el?.lastUpdate).format(DATETIME_FORMAT) : '-'}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <p className={'text-light mb-2'}>Valid for: </p>
                      </CRow>
                      {el?.validFor && (
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
                    </CContainer>
                  ))}
                </CTabPane>
              )}
              {modal?.productOfferingPrice?.length > 0 && (
                <CTabPane data-tab="price">
                  {modal?.productOfferingPrice?.map((el: any) => (
                    <CContainer
                      key={`priceOffer-${el?.id}`}
                      style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                    >
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Description:</p>
                          <p>{el?.description}</p>
                        </CCol>
                      </CRow>
                      {el?.validFor && (
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT)
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

export default MyOffers
