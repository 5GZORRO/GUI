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
  CButton,
  CModal
} from '@coreui/react'
import ActiveTransactions from './tables/ActiveTransactions'
import ArchivedTransactions from './tables/ArchivedTransactions'
import NewBusinessTransaction from './newTransactions'

const Issm: React.FC = () => {
  const [modal, setModal] = useState<any | null>(null)

  return (
    <CContainer>
      {modal != null && (
        <CModal show={true} onClose={() => setModal(null)} size="lg">
          <NewBusinessTransaction {...{ setModal }} />
        </CModal>
      )}
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Business Transactions</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton block={false} color={'gradient'} className={'text-uppercase px-4'} onClick={() => setModal(true)}>
            New Automated Transaction
          </CButton>
        </CCol>
      </CRow>
      <CTabs activeTab="activeTransactions">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="activeTransactions" className={'text-uppercase'}>
              Active Transactions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="archiveTransactions" className={'text-uppercase'}>
              Archive Transactions
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="activeTransactions">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>Transactions</h5>
              </CCardHeader>
              <CCardBody>
                <ActiveTransactions {...{ modal }} />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="archiveTransactions">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5>Archived Transactions</h5>
              </CCardHeader>
              <CCardBody>
                <ArchivedTransactions></ArchivedTransactions>
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default Issm
