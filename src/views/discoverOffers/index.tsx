/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CButton,
  CButtonClose,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import SearchForm from './containers/searchForm'

const DiscoverOffers:React.FC = () => {
  const [modal, setModal] = useState(false)

  const history = useHistory()

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Discover Offers</h1>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton
            block={false}
            color={'gradient'}
            className={'text-uppercase'}
            onClick={() => history.push('/discover-offers/new-product')}
          >
            create product offer
          </CButton>
        </CCol>
      </CRow>
        <CTabs activeTab='allOffers'>
          <CNav variant='tabs'>
            <CNavItem>
              <CNavLink data-tab='allOffers' className={'text-uppercase'}>
                All offers
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab='myOffers' className={'text-uppercase'}>
                My offers
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab='allOffers'>
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>All Offers</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <SearchForm />
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab='myOffers'>
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>My Offers</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <SearchForm />
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
        <CModal
          show={modal}
          onClose={() => setModal(false)}
          size='lg'
        >
          <CModalHeader>
            Resource Candidate Details
            <CButtonClose onClick={() => setModal(false)}/>
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
                      <p>Name Label Resource</p>
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
    </CContainer>
  )
}

export default DiscoverOffers
