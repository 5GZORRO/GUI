import React from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs
} from '@coreui/react'
import AllTemplates from './tables/AllTemplates'

const Licences = () => {
  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Licences</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton block={false} color={'gradient'} className={'text-uppercase px-4'}>
            add licence
          </CButton>
        </CCol>
      </CRow>
      <CTabs activeTab="allTemplates">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="allTemplates" className={'text-uppercase'}>
              all templates
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="myTemplates" className={'text-uppercase'}>
              my templates
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="allTemplates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5 className={'font-18'}>All Licences</h5>
              </CCardHeader>
              <CCardBody>
                <AllTemplates />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="myTemplates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>My Licences</h5>
              </CCardHeader>
              <CCardBody></CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default Licences
