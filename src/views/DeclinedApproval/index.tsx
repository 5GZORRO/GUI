import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { TheFooter, TheHeader } from 'containers/index'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { useAuthContext } from 'context/AuthContext'

const WaitingApproval = (props: any) => {
  const { signout } = useAuthContext()
  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <div className="c-body flex-row align-items-center position-relative">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol xs="5">
                <CCard>
                  <CCardBody className={'p-5'}>
                    <h1 className={'text-center mb-4'}>Approval Declined</h1>
                    <p className={'text-center mb-4 text-gray-500'}>
                      <b className={'text-white'}>Your account has been declined.</b>
                    </p>
                    <div className={'d-flex justify-content-center'}>
                      <CButton
                        variant={'outline'}
                        color={'light'}
                        className={'px-5 text-uppercase'}
                        onClick={() => signout()}
                      >
                        <CIcon name="cilArrowLeft" style={{ marginRight: '10px' }} />
                        back to login
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    </div>
  )
}

export default WaitingApproval
