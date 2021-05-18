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

import { useAllProductSpecification } from 'hooks/api/Resources'
import { useHistory, Link } from 'react-router-dom'
import { IconRAM } from 'assets/icons/externalIcons'

const fields = [
  { key: 'select', label: '', filter: false, sorter: false },
  'productNumber',
  'name',
  'version',
  'isBundle',
  'lastUpdate',
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
  const { data, isLoading } = useAllProductSpecification()
  const [modal, setModal] = useState(false)
  const [modalInfo, setModalInfo] = useState<any>(null)

  const check = (id: string) => {
    const found = selected.find((itemId) => itemId === id)

    if (!found) {
      setSelected((previous) => [id])
    }
  }

  const openModal = (data: any) => {
    setModalInfo(data)
    setModal(true)
  }

  const arrayToStringsData = (item: any, property: string) => <td>{item?.map((el: any) => el[property]).join(', ')}</td>

  return (
    <CContainer>
      <CModal show={modal} onClose={() => setModal(false)} size="lg">
        <CModalHeader closeButton>
          <h5>Resource Details</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="resourceSpecification">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="resourceSpecification" color={'#6C6E7E'}>
                  Resource Specification
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="physicalCap" color={'#6C6E7E'}>
                  Resource - Physical Capabilities
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="virtualCap" color={'#6C6E7E'}>
                  Resource - Virtual Capabilities
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="resourceCharacteristics" color={'#6C6E7E'}>
                  Resource Characteristics
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="resourceSpecification">
                <CRow className={'mt-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>{modalInfo?.name}</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>{modalInfo?.description}</p>
                    {modalInfo?.valideFor && (
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>From:</p>{' '}
                          <p>
                            {dayjs(modalInfo?.validFor?.startDateTime).isValid()
                              ? dayjs(modalInfo?.validFor?.startDateTime).format('YYYY-MM-DD HH:mm:ss')
                              : '-'}
                          </p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>To:</p>{' '}
                          <p>
                            {dayjs(modalInfo?.validFor?.endDateTime).isValid()
                              ? dayjs(modalInfo?.validFor?.endDateTime).format('YYYY-MM-DD HH:mm:ss')
                              : '-'}
                          </p>
                        </CCol>
                      </CRow>
                    )}
                    <CRow>
                      <CCol>
                        {modalInfo?.version && (
                          <>
                            <p className={'text-light mb-1'}>Version</p>
                            <p className={'font-16 text-white'}>{modalInfo?.version}</p>
                          </>
                        )}
                        {modalInfo?.category &&
                          modalInfo?.category?.map((el: any) => (
                            <CRow key={`resourceDetail-category-${el?.id}`}>
                              <p className={'text-light mb-1'}>Name</p>
                              <p className={'font-16 text-white'}>{el?.name}</p>
                            </CRow>
                          ))}
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab="physicalCap">
                <CRow className={'my-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>Name Label Resource- Physical Capabilities</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                    <CRow>
                      <CCol>
                        <p className={'text-light mb-1'}>Cloud Id</p>
                        <p className={'font-16 text-white'}>Cloud Id Label</p>
                        <p className={'text-light mb-1'}>Node Id</p>
                        <p className={'font-16 text-white'}>Node Id Label</p>
                        <p className={'text-light mb-1'}>Resource Specification</p>
                        <p className={'font-16 text-white'}>Resource Specification Label</p>
                      </CCol>
                      <CCol>
                        <p className={'text-light mb-1'}>Data Center Id</p>
                        <p className={'font-16 text-white'}>Data Center Id Label</p>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow className={'mb-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-16 text-light mb-4'}>Hardware Capabilities</p>
                    <IconRAM fill={'#fff'} />
                    <span className={'ml-2 font-weight-bold'}>RAM</span>
                    <div className={'mt-3'}>
                      <CRow>
                        <CCol xs={4} className={'text-light'}>
                          <span>Hardware Cap Value</span>
                        </CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold text-gradient'}>64G</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}>
                          <span>Hardware Cap Unit</span>
                        </CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold'}>4 unit</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}>
                          <span>Hardware Cap Quota</span>
                        </CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold'}>8G</span>
                        </CCol>
                      </CRow>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p className={'font-weight-bold font-16 text-light'}>Feature</p>
                    <p className={'text-light'}>Href</p>
                    <p className={'text-light'}>www.ubiwhere.com</p>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab="virtualCap">
                <CRow className={'my-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>Name Label Resource - Virtual Capabilities</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                    <CRow>
                      <CCol>
                        <p className={'text-light mb-1'}>Cloud Id</p>
                        <p className={'font-16 text-white'}>Cloud Id Label</p>
                        <p className={'text-light mb-1'}>Node Id</p>
                        <p className={'font-16 text-white'}>Node Id Label</p>
                        <p className={'text-light mb-1'}>Type</p>
                        <p className={'font-16 text-white'}>Type Label</p>
                      </CCol>
                      <CCol>
                        <p className={'text-light mb-1'}>Data Center Id</p>
                        <p className={'font-16 text-white'}>Data Center Id Label</p>
                        <p className={'text-light mb-1'}>Is Master</p>
                        <p className={'font-16 text-white'}>False</p>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow className={'mb-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-16 text-light mb-4'}>Virtual Capabilities</p>
                    <IconRAM fill={'#fff'} />
                    <span className={'ml-2 font-weight-bold'}>Cloud</span>
                    <div className={'mt-3'}>
                      <CRow>
                        <CCol xs={4} className={'text-light'}>
                          <span>Virtual Cap Value</span>
                        </CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold text-gradient'}>64G</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}>
                          <span>Virtual Cap Unit</span>
                        </CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold'}>4 unit</span>
                        </CCol>
                      </CRow>
                    </div>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab="resourceCharacteristics">
                <CRow className={'mt-4'}>
                  <CCol>
                    <CRow>
                      <CCol>
                        <p className={'text-light mb-1'}>Name</p>
                        <p className={'font-weight-bold font-18 mb-4'}>{modalInfo?.resourceSpecification?.name}</p>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        {modalInfo?.resourceSpecification?.id && (
                          <>
                            <p className={'text-light mb-1'}>ID</p>
                            <p className={'font-16 text-white'}>{modalInfo?.resourceSpecification?.id}</p>
                          </>
                        )}
                      </CCol>
                      <CCol>
                        {modalInfo?.resourceSpecification?.version && (
                          <>
                            <p className={'text-light mb-1'}>Version</p>
                            <p className={'font-16 text-white'}>{modalInfo?.resourceSpecification?.version}</p>
                          </>
                        )}
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CTabPane>
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
            items={data}
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
                      type="radio"
                      checked={selected?.find((el) => item?.id === el) != null}
                      onChange={() => check(item?.id)}
                    />
                  </td>
                )
              },
              version: (item: any) => {
                return <td className="py-2">{item?.version ? item?.version : '-'}</td>
              },
              lifecycleStatus: (item: any) => {
                return <td className="py-2">{item?.lifecycleStatus ? item?.lifecycleStatus : '-'}</td>
              },
              validFor: (item: any) => {
                return <td className="py-2">{item?.validFor ? item?.validFor : '-'}</td>
              },
              category: (item: any) => arrayToStringsData(item?.category, 'name'),
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
      <div className={'d-flex flex-row-reverse mb-5'}>
        <CButton
          className={'text-uppercase px-5'}
          color={'gradient'}
          disabled={!selected?.length}
          onClick={() => history.push(`/offers/new-offer/${selected}`)}
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
