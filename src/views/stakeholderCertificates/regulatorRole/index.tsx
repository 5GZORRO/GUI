import React, { useState } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react'
import ApprovedCertificates from './tablesCertificates/TableApprovedCertificates'
import RejectedCertificates from './tablesCertificates/TableRejectedCertificates'
import PendingCertificates from './tablesCertificates/TablePendingCertificates'

const RegulatorCertificates: React.FC = () => {
  const [triggerRefetch, setTriggerRefetch] = useState(false)

  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Licence Certificates</h2>
        </CCol>
      </CRow>
      <CTabs activeTab="approvedCertificates">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="approvedCertificates" className={'text-uppercase'}>
              Approved certificates
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="pendingCertificates" className={'text-uppercase'}>
              Pending certificates
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="rejectedCertificates" className={'text-uppercase'}>
              Rejected certificates
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="approvedCertificates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>Approved Licences Certificates</h5>
              </CCardHeader>
              <CCardBody>
                <ApprovedCertificates {...{ triggerRefetch }}/>
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="pendingCertificates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>Pending Licences Certificates</h5>
              </CCardHeader>
              <CCardBody>
                <PendingCertificates {...{ triggerRefetch, setTriggerRefetch }} />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="rejectedCertificates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>Rejected Licences Certificates</h5>
              </CCardHeader>
              <CCardBody>
                <RejectedCertificates {...{ triggerRefetch }} />
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default RegulatorCertificates
