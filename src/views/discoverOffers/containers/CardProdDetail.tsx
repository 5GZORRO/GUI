import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CButton, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
/** Hooks */
import { useCandidate } from 'hooks/api/Resources'

interface CardProps {
  id: string
}

const CardProdDetail:React.FC<CardProps> = ({ id }) => {
  const candidate = useCandidate(id)

  return (
    <CCard className={'mb-5'}>
      <CCardHeader className={'d-flex justify-content-between align-items-center'}>
        <h5>Resource Candidate</h5>
        <CButton className={'d-flex align-items-center'} variant={'ghost'}>
          <CIcon className={'mr-2'} name='cilSync' />
          Switch Selection
        </CButton>
      </CCardHeader>
      <CCardBody>
      {candidate.data && candidate.data.map((item: any) =>
        <React.Fragment key={item.id}>
        <p className={'font-18'}>{item.name}</p>
        <p className={'text-light mb-2'}>Description</p>
        <p className={'mb-4'}>{item.description}</p>
        <CRow>
          <CCol>
            <p className={'text-light mb-2'}>Type</p>
            <p>{item.category?.type}</p>
            {item.validFor &&
            <>
              <p className={'text-light mb-2'}>Valid For</p>
              <p>{item.validFor?.endDateTime}</p>
            </>
            }
            {item.resourceSpecification &&
            <>
              <p className={'text-light mb-2'}>Resource Specification</p>
              <p>{item.resourceSpecification?.name}</p>
            </>
            }
          </CCol>
          <CCol>
            <p className={'text-light mb-2'}>Version</p>
            <p>{item?.version}</p>
            <p className={'text-light mb-2'}>Category</p>
            <p>{item?.category?.name}</p>
            <p className={'text-light mb-2'}>Owner Did</p>
            <p>{item?.ownerdid}</p>
          </CCol>
        </CRow>
        <CButton disabled className={'text-uppercase mr-3'} color={'white'} variant={'outline'} onClick={() => console.log('show physical capabilities')}>show physical capabilities</CButton>
        <CButton disabled className={'text-uppercase'} color={'white'} variant={'outline'} onClick={() => console.log('show virtual capabilities')}>show virtual capabilities</CButton>
        </React.Fragment>
      )}
      </CCardBody>
    </CCard>
  )
}

export default CardProdDetail
