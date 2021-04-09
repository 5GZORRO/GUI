import React from 'react'
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router'
/* import { Spline } from 'react-spline' */
import 'react-spline/dist/react-spline.modern.css'
/* import { SCENE_OBJECT } from '../views/register/utils' */

const RegisterSuccess = () => {
  const history = useHistory()
  return (
    <CRow className='justify-content-center'>
      {/* <Spline scene={SCENE_OBJECT} /> */}
      <CCol xs='5'>
        <CCard>
          <CCardBody className={'p-5'}>
            <h1 className={'text-center mb-5'}> Great News</h1>
            <p className={'text-gray-500 text-uppercase font-weight-bold'}>Complete Registration!</p>
            <p className={'mb-5 text-gray-500'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className={'d-flex justify-content-center'}>
              <CButton
                variant={'outline'}
                color={'light'}
                className={'px-5 text-uppercase'}
                onClick={() => history.push('/login')}
              >
                <CIcon name='cilArrowLeft' style={{ marginRight: '10px' }} />
                back to login
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterSuccess
