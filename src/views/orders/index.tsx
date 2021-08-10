import React from 'react'
import { CContainer, CRow, CCol, CButton, CCard, CCardHeader, CCardBody } from '@coreui/react'
import AllOrders from './tables/AllOrders'
import { useHistory } from 'react-router-dom'

const Orders: React.FC = () => {
  const history = useHistory()
  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Orders</h2>
        </CCol>
        <CCol className={'d-flex justify-content-end align-items-center'}>
          <CButton block={false} color={'gradient'} className={'text-uppercase px-4'} onClick={() => history.push('/orders/new-order')}>
            new order
          </CButton>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
        <AllOrders></AllOrders>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Orders
