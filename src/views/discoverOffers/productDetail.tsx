import React from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'

const ProductDetail: React.FC = () => {
  return (
    <CContainer>
      <h1 className={'mb-5'}>New Product Offer</h1>
      <CCard className={'mb-5'}>
        <CCardHeader>
          <h5>Resource Candidate</h5>
        </CCardHeader>
        <CCardBody>
          <h6>Name Label Resource</h6>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <h5>Product offer creation</h5>
        </CCardHeader>
        <CCardBody>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default ProductDetail
