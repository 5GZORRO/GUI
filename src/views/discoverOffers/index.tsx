/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
/** Containers */
import SearchForm from './containers/searchForm'

const DiscoverOffers:React.FC = () => {
  const history = useHistory()

  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Discover Offers</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton
            block={false}
            color={'gradient'}
            className={'text-uppercase'}
            onClick={() => history.push('/offers/new-offer')}
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
                  <h5>Search offers</h5>
                </CCardHeader>
                <CCardBody>
                  <SearchForm />
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab='myOffers'>
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <h5>My offers</h5>
                </CCardHeader>
                <CCardBody>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
    </CContainer>
  )
}

export default DiscoverOffers
