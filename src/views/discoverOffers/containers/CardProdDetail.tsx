import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CButton, CRow, CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
/** Hooks */
import { useProductSpecification } from 'hooks/api/Resources'
import dayjs from 'dayjs'

interface CardProps {
  id: string
  methods: any
}

const CardProdDetail: React.FC<CardProps> = ({ id, methods }) => {
  const { data: item } = useProductSpecification(id)

  useEffect(() => {
    methods?.setValue('productSpecification', item)
  }, [item])

  return (
    <CCard className={'mb-5'}>
      <CCardHeader className={'d-flex justify-content-between align-items-center'}>
        <h5>Resource</h5>
        <CButton className={'d-flex align-items-center'} variant={'ghost'}>
          <CIcon className={'mr-2'} name="cilSync" />
          Switch Selection
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CContainer className={'mt-4'} key={item?.id}>
          <p className={'font-18'}>{item?.name}</p>
          <p className={'text-light mb-2'}>Description</p>
          <p className={'mb-4'}>{item?.description}</p>

          <p className={'text-light mb-2'}>Brand</p>
          <p className={'mb-4'}>{item?.brand}</p>
          <CRow>
            <CCol>
              {item?.validFor && (
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>From:</p>{' '}
                    <p>
                      {dayjs(item?.validFor?.startDateTime).isValid()
                        ? dayjs(item?.validFor?.startDateTime).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                    </p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>To:</p>{' '}
                    <p>
                      {dayjs(item?.validFor?.endDateTime).isValid()
                        ? dayjs(item?.validFor?.endDateTime).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                    </p>
                  </CCol>
                </CRow>
              )}
              {item?.resourceSpecification?.map((el) => (
                <CContainer key={`${el?.id}`}>
                  <p className={'text-light mb-2'}>Resource Specification</p>
                  <p>{el?.name}</p>
                </CContainer>
              ))}
            </CCol>
            <CCol>
              <p className={'text-light mb-2'}>Version</p>
              <p>{item?.version}</p>
            </CCol>
          </CRow>
          <CButton
            disabled
            className={'text-uppercase mr-3'}
            color={'white'}
            variant={'outline'}
            onClick={() => console.log('show physical capabilities')}
          >
            show physical capabilities
          </CButton>
          <CButton
            disabled
            className={'text-uppercase'}
            color={'white'}
            variant={'outline'}
            onClick={() => console.log('show virtual capabilities')}
          >
            show virtual capabilities
          </CButton>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}

export default CardProdDetail
