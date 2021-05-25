import React, { useEffect } from 'react'
import { CButton, CContainer, CForm } from '@coreui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

/* Assets */
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

/** Container */
import FormCreateOffer from './containers/FormCreateOffer'
import CardProdDetail from './containers/CardProdDetail'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegister, transformForm } from './utils'

/** hooks */
import { useCreateOffering } from 'hooks/api/Products'
import { useGetResourceSpecificationsBundle } from 'hooks/api/Resources'
import { ApiResourceSpecification } from 'types/api'
import LoadingWithFade from 'components/LoadingWithFade'
import { useAuthContext } from 'context/AuthContext'

interface formOfferCreation {
  name: string
  description: string
  country: string
  serviceLevelAgreement: []
  productOfferPrice: []
  owner: string
  resourceSpecifications: ApiResourceSpecification[]
  validFor: {
    startDateTime: string | null
    endDateTime: string | null
  },
  category: []
}

const ProductDetail: React.FC = () => {
  const methods = useForm<formOfferCreation>({
    defaultValues: {
      name: '',
      description: '',
      country: '',
      serviceLevelAgreement: [],
      productOfferPrice: [],
      validFor: {
        startDateTime: null,
        endDateTime: null
      },
      category: []
    },
    resolver: yupResolver(schemaRegister)
  })
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const { user } = useAuthContext()

  const { mutate, isSuccess, isLoading } = useCreateOffering()
  const { data: resourcesData, isLoading: resourceLoading } = useGetResourceSpecificationsBundle(id)

  useEffect(() => {
    if (isSuccess) {
      history.push('/offers/')
    }
  }, [isSuccess])

  const onSubmit = (data: formOfferCreation) => {
    const formData = transformForm(data, resourcesData)
    mutate({ ...formData, resourceSpecifications: resourcesData, currentUser: user })
  }
  return (
    <>
      {isLoading && <LoadingWithFade />}
      <CContainer>
        <h1 className={'mb-5'}>New Product Offer</h1>
        <FormProvider {...methods}>
          <CForm onSubmit={methods.handleSubmit(onSubmit)}>
            <FormCreateOffer />
            {!resourceLoading &&
              resourcesData?.map((el, index) => <CardProdDetail item={el} key={`${el?.id} - ${index}`} />)}

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
                <CButton className={'text-uppercase px-5 mr-3'} variant="outline" color={'white'}>
                  Cancel
                </CButton>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </div>
          </CForm>
        </FormProvider>
      </CContainer>
    </>
  )
}

export default ProductDetail
