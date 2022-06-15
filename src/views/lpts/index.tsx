import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'
import AllTemplates from './tables/AllTemplates'
import MySLAs from './tables/MySLAs'
import MyLicences from './tables/MyLicences'

const SLA = () => {
  const [activeTab, setActiveTab] = useState('allTemplates')
  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Legal Prose Templates</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          {activeTab === 'allTemplates' && (
            <Link to={'/templates/new/'}>
              <CButton block={false} color={'gradient'} className={'text-uppercase px-4'}>
                add lpt template
              </CButton>
            </Link>
          )}
          {activeTab === 'mySLAs' && (
            <Link to={'/templates/new/sla'}>
              <CButton block={false} color={'gradient'} className={'text-uppercase px-4 mr-2'}>
                add SLA
              </CButton>
            </Link>
          )}

          {activeTab === 'myLicences' && (
            <Link to={'/templates/new/licence'}>
              <CButton block={false} color={'gradient'} className={'text-uppercase px-4 mr-2'}>
                add Licence
              </CButton>
            </Link>
          )}
        </CCol>
      </CRow>
      <CTabs activeTab={activeTab} onActiveTabChange={(tab: string) => setActiveTab(tab)}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="allTemplates" className={'text-uppercase'}>
              all templates
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="mySLAs" className={'text-uppercase'}>
              {'SlAs'}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="myLicences" className={'text-uppercase'}>
              {'LICENCEs'}
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="allTemplates">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <h5 className={'font-18'}>All Legal Prose Templates</h5>
              </CCardHeader>
              <CCardBody>
                <AllTemplates />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="mySLAs">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <CRow style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h5 className={'m-0'}>{'Service Level Agreements'}</h5>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <MySLAs />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane data-tab="myLicences">
            <CCard className={'mt-4'}>
              <CCardHeader>
                <CRow style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h5 className={'m-0'}>{'Licences'}</h5>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <MyLicences />
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  )
}

export default SLA
