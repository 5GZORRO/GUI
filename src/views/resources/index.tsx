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
import { IconRAM } from 'assets/icons/externalIcons'
import { DATETIME_FORMAT } from 'config'

import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

import { useAllProductSpecification } from 'hooks/api/Resources'

const fields = [
  'name',
  'version',
  {
    key: 'category',
    label: 'Categories'
  },
  'lifecycleStatus',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const Resources: React.FC = () => {
  const history = useHistory()
  const { data, isLoading } = useAllProductSpecification()

  const [modal, setModal] = useState<any | null>(null)

  const openModal = (data: any) => {
    setModal(() => data)
  }

  const arrayToStringsData = (item: any, property: string) => <td>{item?.map((el: any) => el[property]).join(', ')}</td>

  return (
    <CContainer>
      <CModal show={modal != null} onClose={() => setModal(false)} size="lg">
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
                    <p className={'font-weight-bold font-18 mb-4'}>{modal?.name}</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>{modal?.description}</p>
                    {modal?.valideFor && (
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>From:</p>{' '}
                          <p>
                            {dayjs(modal?.validFor?.startDateTime).isValid()
                              ? dayjs(modal?.validFor?.startDateTime).format(DATETIME_FORMAT)
                              : '-'}
                          </p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>To:</p>{' '}
                          <p>
                            {dayjs(modal?.validFor?.endDateTime).isValid()
                              ? dayjs(modal?.validFor?.endDateTime).format(DATETIME_FORMAT)
                              : '-'}
                          </p>
                        </CCol>
                      </CRow>
                    )}
                    <CRow>
                      <CCol>
                        {modal?.version && (
                          <>
                            <p className={'text-light mb-1'}>Version</p>
                            <p className={'font-16 text-white'}>{modal?.version}</p>
                          </>
                        )}
                        {modal?.category &&
                          modal?.category?.map((el: any) => (
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
                        <p className={'font-weight-bold font-18 mb-4'}>{modal?.resourceSpecification?.name}</p>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        {modal?.resourceSpecification?.id && (
                          <>
                            <p className={'text-light mb-1'}>ID</p>
                            <p className={'font-16 text-white'}>{modal?.resourceSpecification?.id}</p>
                          </>
                        )}
                      </CCol>
                      <CCol>
                        {modal?.resourceSpecification?.version && (
                          <>
                            <p className={'text-light mb-1'}>Version</p>
                            <p className={'font-16 text-white'}>{modal?.resourceSpecification?.version}</p>
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
          <h2>Resources & Services</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton
            block={false}
            color={'gradient'}
            className={'text-uppercase'}
            onClick={() => history.push('/resource/new-resource')}
          >
            New Resource
          </CButton>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          <h5>Resource Candidate</h5>
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
              version: (item: any) => {
                return <td className="py-2">{item?.version ? item?.version : '-'}</td>
              },
              lifecycleStatus: (item: any) => {
                return <td className="py-2">{item?.lifecycleStatus ? item?.lifecycleStatus : '-'}</td>
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
    </CContainer>
  )
}

export default Resources
