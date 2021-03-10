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
                <CNavLink data-tab='resourceDetail' color={'#6C6E7E'}>Resource Details</CNavLink>
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
                    <p className={'font-weight-bold'}>Name Label Resource</p>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab='physicalCap'>
                PROFILE
              </CTabPane>
              <CTabPane data-tab='virtualCap'>
                Messages
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
