import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { IconRAM } from 'assets/icons/externalIcons'
interface CardResourceProps {
  height?: number
}

const CardResource:React.FC<CardResourceProps> = ({ height }) => {
  return (
    <CCard style={{ minHeight: height || 320, minWidth: 322 }}>
      <CCardHeader>
        <div className={'d-flex justify-content-between'}>
          <div className={'d-flex align-items-center justify-content-center'}>
            <p className={'mb-0'}>Name Resource</p>
          </div>
          <CIcon style={{ cursor: 'pointer' }} name='cilTrash' width={18} height={18} onClick={() => console.log('remove resource')} />
        </div>
      </CCardHeader>
      <CCardBody>
        <p className={'mb-1'}><small><strong className={'text-light'}>Description</strong></small></p>
        <p className={'mb-3'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <CRow className={'mb-3'}>
          <CCol xs={12}>
            <p className={'mb-1'} ><small><strong className={'text-light'}>Hardware Capabilities</strong></small></p>
          </CCol>
          <CCol sm={6}>
            <IconRAM fill={'#fff'} />
            <span className={'ml-2 font-weight-bold'}>RAM</span>
            <span className={'ml-2 font-weight-bold text-gradient'}>64G</span>
          </CCol>
          <CCol sm={6}>
            <CIcon name='cilStorage' />
            <span className={'ml-2 font-weight-bold'}>Memory</span>
            <span className={'ml-2 font-weight-bold text-gradient'}>8G</span>
          </CCol>
          <CCol sm={6}>
            <CIcon name='cilMemory' />
            <span className={'ml-2 font-weight-bold'}>CPU</span>
            <span className={'ml-2 font-weight-bold text-gradient'}>4G</span>
          </CCol>
          <CCol sm={6}>
            <CIcon name='cilOptions' />
            <span className={'ml-2 text-light'}>Others...</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <p className={'mb-1'}><small><strong className={'text-light'}>Features</strong></small></p>
          </CCol>
          <CCol sm={4}>
            <span className={'ml-2 text-light'}>Type</span>
          </CCol>
          <CCol sm={8}>
            <span className={'ml-2'}>Label Type</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={4}>
            <span className={'ml-2 text-light'}>Type</span>
          </CCol>
          <CCol sm={8}>
            <span className={'ml-2'}>Label Type</span>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CardResource
