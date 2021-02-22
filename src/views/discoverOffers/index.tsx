import React from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'
import { Link } from 'react-router-dom'

const DiscoverOffers:React.FC = () => {
  return (
    <CContainer fluid={false}>
      <CRow>
        <CCol>
          <h1>Discover Offers</h1>
        </CCol>
        <CCol className='d-flex justify-content-end'>
          <Link to='/discover-offers/new-offer'>
            <CButton
              variant={'outline'}
              block={false}
              color={'primary'}
            >
              create product offer
            </CButton>
          </Link>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default DiscoverOffers