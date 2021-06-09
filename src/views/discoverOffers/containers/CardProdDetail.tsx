import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CButton, CRow, CContainer, CModal, CModalHeader } from '@coreui/react'
/** Hooks */
import dayjs from 'dayjs'

import { DATETIME_FORMAT } from 'config'
import { ApiResourceSpecification } from 'types/api'

interface CardProps {
  item: ApiResourceSpecification
}

const CardProdDetail: React.FC<CardProps> = ({ item }) => {
  const [modal, setModal] = useState<any | null>(null)

  const showResourceCharacteristics = (item: any) => {
    setModal(item)
  }

  return (
    <CCard className={'mb-5'}>
      <CCardHeader className={'d-flex justify-content-between align-items-center'}>
        <h5>Resource Details</h5>
        {/* <CButton className={'d-flex align-items-center'} variant={'ghost'}>
          <CIcon className={'mr-2'} name="cilSync" />
          Switch Selection
        </CButton> */}
      </CCardHeader>
      <CCardBody>
        <CContainer className={'mt-4'} key={item?.id}>
          <CRow className={'mt-4'}>
            <CCol>
              <p className={'text-light mb-2'}>Name</p>
              <p className={'font-weight-bold font-18 mb-4'}>{item?.name}</p>
            </CCol>
            <CCol>
              <p className={'text-light mb-2'}>Category</p>
              <p className={'font-16 mb-4'}>{item?.category}</p>
            </CCol>
          </CRow>
          <CRow className={'mt-2'}>
            <CCol>
              <p className={'text-light mb-2'}>Description</p>
              <p className={'font-16 mb-4'}>{item?.description}</p>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <p className={'text-light mb-2'}>Bundle</p>
              <p className={'font-16 mb-4'}>{item?.isBundle ? 'True' : 'False'}</p>
            </CCol>
            <CCol>
              {item?.version && (
                <>
                  <p className={'text-light mb-1'}>Version</p>
                  <p className={'font-16 text-white'}>{item?.version}</p>
                </>
              )}
            </CCol>
          </CRow>
          {item?.validFor && (
            <CRow>
              <CCol xs="6">
                <p className={'text-light mb-2'}>From:</p>{' '}
                <p>
                  {dayjs(item?.validFor?.startDateTime).isValid()
                    ? dayjs(item?.validFor?.startDateTime).format(DATETIME_FORMAT)
                    : '-'}
                </p>
              </CCol>
              <CCol xs="6">
                <p className={'text-light mb-2'}>To:</p>{' '}
                <p>
                  {dayjs(item?.validFor?.endDateTime).isValid()
                    ? dayjs(item?.validFor?.endDateTime).format(DATETIME_FORMAT)
                    : '-'}
                </p>
              </CCol>
            </CRow>
          )}
          <CButton
            disabled={!item?.resourceSpecCharacteristic?.length}
            className={'text-uppercase mr-3'}
            color={'white'}
            variant={'outline'}
            onClick={() => showResourceCharacteristics(item)}
          >
            Show Resource Characteristics
          </CButton>
        </CContainer>
      </CCardBody>
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>Resource Characteristics</h5>
        </CModalHeader>
        <CContainer
          style={{
            maxHeight: '24rem',
            overflowY: 'scroll'
          }}
        >
          {modal?.resourceSpecCharacteristic?.map((el: any, index: number) => (
            <CContainer
              key={`resourceCharacteristics-${index}`}
              style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
            >
              <CRow className={'mt-4'}>
                <CCol>
                  <p className={'text-light mb-2'}>Name</p>
                  <p className={'font-16 mb-4'}>{el?.name}</p>
                </CCol>
              </CRow>
              <CRow className={'mt-4'}>
                <CCol>
                  <p className={'text-light mb-2'}>Description</p>
                  <p className={'font-16 mb-4'}>{el?.description}</p>
                </CCol>
              </CRow>
              {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                <CRow className={'mt-4'} key={`resourceSpecCharacteristicValue-${index}`}>
                  {resource?.value?.alias && (
                    <CCol>
                      <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                      <p className={'font-16 mb-4'}>{resource?.value?.value}</p>
                    </CCol>
                  )}
                  <CCol>
                    <p className={'text-light mb-2'}>Unit Of Measure</p>
                    <p className={'font-16 mb-4'}>{resource?.unitOfMeasure?.unitOfMeasure}</p>
                  </CCol>
                </CRow>
              ))}
            </CContainer>
          ))}
        </CContainer>
      </CModal>
    </CCard>
  )
}

export default CardProdDetail
