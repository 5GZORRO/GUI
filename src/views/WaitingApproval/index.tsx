import React from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { TheFooter, TheHeader } from 'containers/index'

const WaitingApproval = (props: any) => (
  <div className="c-app c-default-layout">
    <div className="c-wrapper">
      <TheHeader />
      <div className="c-body flex-row align-items-center position-relative">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs="5">
              <CCard>
                <CCardBody className={'p-5'}>
                  <h1 className={'text-center mb-5'}>Waiting for approval</h1>
                  <p className={'mb-4 text-gray-500'}>
                    <b className="text-white">Your account is not approved. Wait until someone activates it.</b>
                  </p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      <TheFooter />
    </div>
  </div>
)

export default WaitingApproval
