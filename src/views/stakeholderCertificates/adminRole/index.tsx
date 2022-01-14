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
  CTabPane,
  CModal,
  CButton
} from '@coreui/react'
import ApprovedCertificates from './tablesCertificates/TableApprovedCertificates'
import RejectedCertificates from './tablesCertificates/TableRejectedCertificates'
import PendingCertificates from './tablesCertificates/TablePendingCertificates'
import { useLocation } from 'react-router-dom'
import OfferApprovedCertificates from './tablesOffers/TableApprovedCertificates'
import OfferPendingCertificates from './tablesOffers/TablePendingCertificates'
import OfferRejectedCertificates from './tablesOffers/TableRejectedCertificates'
import AddCertificate from '../normalRole/AddCertificate'

const AdminCertificates: React.FC = () => {
  const location = useLocation()
  const [modal, setModal] = useState<any | null>(null)

  return (
    <CContainer>
       {modal != null && (
        <CModal show={true} onClose={() => setModal(null)} size="lg">
          <AddCertificate {...{ setModal }} />
        </CModal>
       )}
      <CRow className={'mb-5'}>
        <CCol>
          {location.pathname === '/stakeholdercertificates'
            ? (<h2>Stakeholder Certificates</h2>)
            : (<h2>Offer Certificates</h2>)}
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton block={false} color={'gradient'} className={'text-uppercase px-4'} onClick={() => setModal(true)}>
            Add Certificate
          </CButton>
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
                {location.pathname === '/stakeholdercertificates'
                  ? (<h5>Approved Stakeholder Certificates</h5>)
                  : (<h5>Approved Offer Certificates</h5>)}
              </CCardHeader>
              <CCardBody>
                {location.pathname === '/stakeholdercertificates'
                  ? (<ApprovedCertificates />)
                  : (<OfferApprovedCertificates />)}
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="pendingCertificates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                {location.pathname === '/stakeholdercertificates'
                  ? (<h5>Pending Stakeholder Certificates</h5>)
                  : (<h5>Pending Offer Certificates</h5>)}
              </CCardHeader>
              <CCardBody>
                {location.pathname === '/stakeholdercertificates'
                  ? (<PendingCertificates />)
                  : (<OfferPendingCertificates />)}
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="rejectedCertificates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                {location.pathname === '/stakeholdercertificates'
                  ? (<h5>Rejected Stakeholder Certificates</h5>)
                  : (<h5>Rejected Offer Certificates</h5>)}
              </CCardHeader>
              <CCardBody>
                {location.pathname === '/stakeholdercertificates'
                  ? (<RejectedCertificates />)
                  : (<OfferRejectedCertificates />)}
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default AdminCertificates
