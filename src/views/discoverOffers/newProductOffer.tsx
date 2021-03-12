/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CDataTable,
  CButton,
  CFormGroup,
  CInputCheckbox,
  CLabel,
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
import { useResources } from 'hooks/api/Resources'
import { useHistory } from 'react-router-dom'
import { IconRAM } from 'assets/icons/externalIcons'

const fields = [
  { key: 'select', label: '', filter: false, sorter: false },
  'name',
  { key: 'categoryType', label: 'Type' },
  { key: 'categoryName', label: 'Category' },
  { key: 'resourceSpecificationName', label: 'Resource Specification' },
  'validFor',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const NewProductOffer:React.FC = () => {
  const history = useHistory()
  const [selected, setSelected] = useState<number | null>(null)
  const { data, isLoading } = useResources()
  const [modal, setModal] = useState(false)

  const check = (e: any, id: number) => setSelected(e.target.checked ? id : null)

  return (
    <CContainer>
      <CModal
        show={modal}
        onClose={() => setModal(false)}
        size='lg'
      >
        <CModalHeader closeButton>
          <h5>Resource Candidate Details</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab='resourceDetail'>
            <CNav variant='pills'>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab='resourceDetail' color={'#6C6E7E'}>Resource Details</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab='physicalCap'>Resource - Physical Capabilities</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab='virtualCap'>Resource - Virtual Capabilities</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab='resourceDetail'>
                <CRow className={'mt-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>Name Label Resource</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <CRow>
                      <CCol>
                        <p className={'text-light mb-1'}>Type</p>
                        <p className={'font-16 text-white'}>Type Label</p>
                        <p className={'text-light mb-1'}>Valid For</p>
                        <p className={'font-16 text-white'}>22-02-2010</p>
                        <p className={'text-light mb-1'}>Resource Specification</p>
                        <p className={'font-16 text-white'}>Resource Specification Label</p>
                      </CCol>
                      <CCol>
                        <p className={'text-light mb-1'}>Version</p>
                        <p className={'font-16 text-white'}>Version Label</p>
                        <p className={'text-light mb-1'}>Category</p>
                        <p className={'font-16 text-white'}>Category Label</p>
                        <p className={'text-light mb-1'}>Owner Did</p>
                        <p className={'font-16 text-white'}>Owner Did Label</p>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab='physicalCap'>
              <CRow className={'my-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>Name Label Resource- Physical Capabilities</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                        <CCol xs={4} className={'text-light'}><span>Hardware Cap Value</span></CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold text-gradient'}>64G</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}><span>Hardware Cap Unit</span></CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold'}>4 unit</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}><span>Hardware Cap Quota</span></CCol>
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
              <CTabPane data-tab='virtualCap'>
              <CRow className={'my-4'}>
                  <CCol>
                    <p className={'font-weight-bold font-18 mb-4'}>Name Label Resource - Virtual Capabilities</p>
                    <p className={'text-light mb-2'}>Description</p>
                    <p className={'font-16 mb-4'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                        <CCol xs={4} className={'text-light'}><span>Virtual Cap Value</span></CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold text-gradient'}>64G</span>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol xs={4} className={'text-light'}><span>Virtual Cap Unit</span></CCol>
                        <CCol xs={8}>
                          <span className={'font-weight-bold'}>4 unit</span>
                        </CCol>
                      </CRow>
                    </div>
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
              select: (item: { id: any; _selected: boolean | undefined }) => {
                return (
                  <td>
                    <CFormGroup variant='custom-checkbox'>
                      <CInputCheckbox
                        custom
                        id={`checkbox${item.id}`}
                        checked={item._selected}
                        onChange={(e) => check(e, item.id)}
                      />
                      <CLabel
                        variant='custom-checkbox'
                        htmlFor={`checkbox${item.id}`}
                      />
                    </CFormGroup>
                  </td>
                )
              },
              show_details:
                () => {
                  return (
                <td className='py-2'>
                  <CButton
                    color='primary'
                    className={'shadow-none text-uppercase'}
                    onClick={() => setModal(true)}
                  >
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
          disabled={!selected}
          onClick={() => history.push(`/discover-offers/detail-product/${selected}`)}
        >
          next
        </CButton>
        <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
      </div>
    </CContainer>
  )
}

export default NewProductOffer
