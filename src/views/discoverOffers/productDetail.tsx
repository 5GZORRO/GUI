import React, { useEffect, useState } from 'react'
import { CButton, CContainer, CForm } from '@coreui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams, useLocation } from 'react-router-dom'

/* Assets */
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

/** Container */
import FormCreateOffer from './containers/FormCreateOffer'
import CardProdDetail from './containers/CardProdDetail'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegister, transformForm } from './utils'

/** hooks */
import { useCreateOffering, useSearchOffers, useSearchOffersById } from 'hooks/api/Products'
import { useGetResourceSpecificationsBundle } from 'hooks/api/Resources'
import { ApiResourceSpecification } from 'types/api'
import LoadingWithFade from 'components/LoadingWithFade'
import { useAuthContext } from 'context/AuthContext'
import { getOrderedItems } from 'hooks/api/Orders'

interface formOfferCreation {
  name: string
  description: string
  location: string
  serviceLevelAgreement: []
  productOfferPrice: []
  owner: string
  resourceSpecifications: ApiResourceSpecification[]
  validFor: {
    startDateTime: string | null
    endDateTime: string | null
  }
  category: []
}

const ProductDetail: React.FC = () => {
  const methods = useForm<formOfferCreation>({
    defaultValues: {
      name: '',
      description: '',
      location: '',
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

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const { user } = useAuthContext()
  const { data: dataOffer, mutate: mutateOffer, isLoading: isLoadingMutate } = useSearchOffers()
  const { mutate, isSuccess, isLoading, isError } = useCreateOffering()
  const servicesIndex = useQuery().get('services')
  const orderItemsIndex = useQuery().get('orderItems')
  const { data: resourcesData, isLoading: resourceLoading } = useGetResourceSpecificationsBundle(
    id,
    servicesIndex != null ? JSON.parse(servicesIndex) : []
  )

  const [bundledItems, setBundledItems] = useState<any>([])

  useEffect(() => {
    mutateOffer({})
  }, [])

  useEffect(() => {
    if (orderItemsIndex != null && dataOffer) {
      const newArr: any[] = []
      JSON.parse(orderItemsIndex)?.forEach((item) => {
        newArr.push(dataOffer.find((el) => el?.id === item))
      })
      setBundledItems(newArr)
    }
  }, [orderItemsIndex, dataOffer])

  useEffect(() => {
    if (isSuccess) {
      history.push('/offers/')
    }
  }, [isSuccess])

  const onSubmit = (data: formOfferCreation) => {
    const formData = transformForm(data, resourcesData, bundledItems)
    mutate({ ...formData, resourceSpecifications: resourcesData, currentUser: user })
  }
  return (
    <>
      {isLoading && <LoadingWithFade />}
      {!isLoading && isError && (
        <p style={{ color: 'red', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)' }}>
          An error has occurred, please try again later
        </p>
      )}
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
