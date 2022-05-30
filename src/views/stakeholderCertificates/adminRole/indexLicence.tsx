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
import AddCertificate from '../normalRole/AddCertificate'
import CertificatesNormal from '../normalRole/TableCertificateNormal'

const AdminCertificates: React.FC = () => {
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
          <h2>Licence Certificates</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton block={false} color={'gradient'} className={'text-uppercase px-4'} onClick={() => setModal(true)}>
            Add Certificate
          </CButton>
        </CCol>
      </CRow>
      <CTabs activeTab="activeTransactions">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="activeTransactions" className={'text-uppercase'}>
              Licence certificates
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="activeTransactions">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>All Licence Certificates</h5>
              </CCardHeader>
              <CCardBody>
                <CertificatesNormal {...{ modal }} />
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default AdminCertificates
