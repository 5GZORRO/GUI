import React from 'react'
import { CButton, CContainer, CForm } from '@coreui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'

/* Assets */
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

/** Container */
import FormCreateOffer from './containers/FormCreateOffer'
import CardProdDetail from './containers/CardProdDetail'

/** hooks */
// import { useCreateOffering } from 'hooks/api/Products'
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

  const onSubmit = (data: formOfferCreation) => {
    console.log('data FormPhysical', data)
  }

  return (
    <CContainer>
      <h1 className={'mb-5'}>New Product Offer</h1>
      {id &&
        <CardProdDetail id={id} />
      }
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
