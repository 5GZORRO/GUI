import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CInput,
  CRow
} from '@coreui/react'
import { TheFooter } from 'containers/index'
import { useHistory } from 'react-router'
import CIcon from '@coreui/icons-react'

const RegisterSuccess:React.FC = () => {
  const history = useHistory()

  return (
    <div className='c-app c-default-layout'>
      <div className='c-wrapper'>
        <div className='c-body flex-row align-items-center'>
          <CContainer>
            <CRow className='justify-content-center'>
            <CCol xs='5'>
              <CCard>
                <CCardBody className={'p-5'}>
                  <h1 className={'text-center mb-5'}> Great News</h1>
                  <p className={'text-gray-500 text-uppercase font-weight-bold'}>Complete Registration!</p>
                  <p className={'mb-4 text-gray-500'}>Request submitted and will be processed manually. To check the status of this request, <b className='text-white'>please Log-in with this new DID.</b></p>
                    <CRow>
                      <CCol xs='12'>
                        <CInput
                          readOnly
                          value={'asdkasdkasd mkasdjmfaskjnfd'}
                        />
                      </CCol>
                    </CRow>
                    <CRow className={'mt-4'}>
                      <CCol xs='12' className={'d-flex justify-content-center'}>
                        <CButton
                          variant={'outline'}
                          color={'light'}
                          className={'px-5 text-uppercase'}
                          onClick={() => history.push('/login')}
                        >
                          <CIcon name='cilArrowLeft' style={{ marginRight: '10px' }} />
                          back to login
                        </CButton>
                    </CCol>
                    </CRow>
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
}

export default RegisterSuccess
