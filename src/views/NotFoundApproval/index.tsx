import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CModalBody, CModalHeader, CRow } from '@coreui/react'
import { TheFooter, TheHeader } from 'containers/index'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { useAuthContext } from 'context/AuthContext'

const NotFoundApproval = (props: any) => {
  const { setShowModal } = props
  return (
    <CModalBody className={'p-5'}>
      <h1 className={'text-center mb-5'}>Credential Not Found</h1>
      <p className={' text-center mb-4 text-gray-500'}>
        <b className="text-white">Make sure you entered the correct credential.</b>
      </p>
      <div className={'d-flex justify-content-center'}>
        <CButton
          variant={'outline'}
          color={'light'}
          className={'px-5 text-uppercase'}
          onClick={() => setShowModal(false)}
        >
          <CIcon name="cilArrowLeft" style={{ marginRight: '10px' }} />
          back to login
        </CButton>
      </div>
    </CModalBody>
  )
}

export default NotFoundApproval
