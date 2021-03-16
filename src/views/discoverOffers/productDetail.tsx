import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow, CSelect } from '@coreui/react'
import { FormProvider, useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { PlusCircle, ArrowLeftIcon } from 'assets/icons/externalIcons'
import { useHistory, useParams } from 'react-router'
import { useResource } from 'hooks/api/Resources'
import FormCreateOffer from './containers/FormCreateOffer'
interface formOfferCreation {
  identifier: string
  name: string
  country: string
  city: string
  productOfferTerms: string
  price: number
  serviceCandidate: string
  serviceLevelAgreements: string
  owner: string
}

const ProductDetail: React.FC = () => {
  const methods = useForm<formOfferCreation>()
  const history = useHistory()
  const { id } = useParams<{id?: string | undefined}>()
  const { data } = useResource(id)

  const onSubmit = (data: formOfferCreation) => {
    console.log('data FormPhysical', data)
  }

  return (
    <CContainer>
      <h1 className={'mb-5'}>New Product Offer</h1>
      <CCard className={'mb-5'}>
        <CCardHeader className={'d-flex justify-content-between align-items-center'}>
          <h5>Resource Candidate</h5>
          <CButton className={'d-flex align-items-center'} variant={'ghost'}>
            <CIcon className={'mr-2'} name='cilSync' />
            Switch Selection
          </CButton>
        </CCardHeader>
        <CCardBody>
          {data &&
          <>
          <p className={'font-18'}>{data.name}</p>
          <p className={'text-light mb-2'}>Description</p>
          <p className={'mb-4'}>{data.description}</p>
          <CRow>
            <CCol>
              <p className={'text-light mb-2'}>Type</p>
              <p>{data.category.type}</p>
              <p className={'text-light mb-2'}>Valid For</p>
              <p>{data.validFor}</p>
              <p className={'text-light mb-2'}>Resource Specification</p>
              <p>{data.resourceSpecification.name}</p>
            </CCol>
            <CCol>
              <p className={'text-light mb-2'}>Version</p>
              <p>{data.version}</p>
              <p className={'text-light mb-2'}>Category</p>
              <p>{data.category.name}</p>
              <p className={'text-light mb-2'}>Owner Did</p>
              <p>{data.ownerdid}</p>
            </CCol>
          </CRow>
          <CButton className={'text-uppercase mr-3'} color={'white'} variant={'outline'} onClick={() => console.log('show physical capabilities')}>show physical capabilities</CButton>
          <CButton className={'text-uppercase'} color={'white'} variant={'outline'} onClick={() => console.log('show virtual capabilities')}>show virtual capabilities</CButton>
          </>
          }
        </CCardBody>
      </CCard>
      <FormProvider {...methods}>
        <CForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormCreateOffer />
        <div className={'mt-5 d-flex justify-content-between mb-5'}>
          <CButton
            className={'text-uppercase px-5 d-flex align-items-center'}
            color={'gradient'}
            variant={'ghost'}
            onClick={() => history.goBack()}
          >
            <ArrowLeftIcon fill={'#fff'} />
            Previous
          </CButton>
          <div className={'d-flex'}>
            <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
            <CButton className={'text-uppercase px-5'} type='submit' color={'gradient'}>Submit</CButton>
          </div>
        </div>
        </CForm>
      </FormProvider>
    </CContainer>
  )
}

export default ProductDetail
