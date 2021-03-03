/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CButton,
  CButtonClose,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
  CTextarea
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

interface Search {
  search: string
}

const DiscoverOffers:React.FC = () => {
  const [modal, setModal] = useState(false)

  const { handleSubmit, errors, control } = useForm<Search>()

  const onSubmit = (form: Search) => {
    console.log('search', form)
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Discover Offers</h1>
        </CCol>
        <CCol className='d-flex justify-content-end'>
          <Link to='/discover-offers'>
            <CButton
              block={false}
              color={'gradient'}
              className={'text-uppercase'}
            >
              create product offer
            </CButton>
          </Link>
        </CCol>
      </CRow>
        <CTabs activeTab='allOffers'>
          <CNav variant='tabs'>
            <CNavItem>
              <CNavLink data-tab='allOffers' className={'text-uppercase'}>
                All offers
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab='myOffers' className={'text-uppercase'}>
                My offers
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab='allOffers'>
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>All Offers</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CFormGroup>
                    <CLabel htmlFor='search'>Insert your search</CLabel>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='search'
                      render={({ onChange, onBlur, value }) => (
                        <CTextarea
                          rows={4}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    />
                    {errors.search &&
                    <CFormText className='help-block'>Please enter your email</CFormText>
                    }
                    <CFormText color='muted'>
                    <p className='mb-0'>ex. SELECT;</p>
                    <p className='mb-0'>call.*,</p>
                    <p className='mb-0'>DATEDIFF(SECOND, call.start_time, call.end_time) AS call_duration</p>
                    <p className='mb-0'>FROM call</p>
                    <p className='mb-0'>ORDER BY</p>
                    <p className='mb-0'>call.employee_id ASC,</p>
                    <p className='mb-0'>call.start_time ASC;</p>
                    </CFormText>
                    </CFormGroup>
                    <CButton
                      block={false}
                      variant={'outline'}
                      color={'white'}
                      className='text-uppercase px-5 float-right'
                    >
                      Search
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab='myOffers'>
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>My Offers</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup>
                  <CLabel htmlFor='search'>Insert your search</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='search'
                    render={({ onChange, onBlur, value }) => (
                      <CTextarea
                        rows={4}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                  />
                  {errors.search &&
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                  <CFormText color='muted'>
                  <p className='mb-0'>ex. SELECT;</p>
                  <p className='mb-0'>call.*,</p>
                  <p className='mb-0'>DATEDIFF(SECOND, call.start_time, call.end_time) AS call_duration</p>
                  <p className='mb-0'>FROM call</p>
                  <p className='mb-0'>ORDER BY</p>
                  <p className='mb-0'>call.employee_id ASC,</p>
                  <p className='mb-0'>call.start_time ASC;</p>
                  </CFormText>
                  </CFormGroup>
                  <CButton
                    block={false}
                    variant={'outline'}
                    color={'white'}
                    className='justify-content-end text-uppercase'
                  >
                    Search
                  </CButton>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
        <CModal
          show={modal}
          onClose={() => setModal(false)}
          size='lg'
        >
          <CModalHeader>
            Resource Candidate Details
            <CButtonClose onClick={() => setModal(false)}/>
          </CModalHeader>
          <CModalBody>
            <CTabs activeTab='resourceDetail'>
              <CNav variant='pills'>
                <CNavItem>
                  <CNavLink data-tab='resourceDetail' color={'#6C6E7E'}>Resource Details</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab='physicalCap'>Resource - Physical Capabilities</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab='virtualCap'>Resource - Virtual Capabilities</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab='resourceDetail'>
                  <CRow className={'mt-4'}>
                    <CCol>
                      <p>Name Label Resource</p>
                    </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane data-tab='physicalCap'>
                  PROFILE
                </CTabPane>
                <CTabPane data-tab='virtualCap'>
                  Messages
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CModalBody>
      </CModal>
    </CContainer>
  )
}

export default DiscoverOffers
