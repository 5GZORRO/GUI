import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow, CSelect } from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { PlusCircle, ArrowLeftIcon } from 'assets/icons/externalIcons'
import { useHistory } from 'react-router'
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
  const { control, handleSubmit, errors } = useForm<formOfferCreation>()
  const history = useHistory()

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
          <p className={'font-18'}>Name Label Resource</p>
          <p className={'text-light mb-2'}>Description</p>
          <p className={'mb-4'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <CRow>
            <CCol>
              <p className={'text-light mb-2'}>Type</p>
              <p>Type Label</p>
              <p className={'text-light mb-2'}>Valid For</p>
              <p>22-02-2022</p>
              <p className={'text-light mb-2'}>Resource Specification</p>
              <p>Resource Specification Label</p>
            </CCol>
            <CCol>
              <p className={'text-light mb-2'}>Version</p>
              <p>Version Label</p>
              <p className={'text-light mb-2'}>Category</p>
              <p>Category Label</p>
              <p className={'text-light mb-2'}>Owner Did</p>
              <p>Owner Did Label</p>
            </CCol>
          </CRow>
          <CButton className={'text-uppercase mr-3'} color={'white'} variant={'outline'} onClick={() => console.log('show physical capabilities')}>show physical capabilities</CButton>
          <CButton className={'text-uppercase'} color={'white'} variant={'outline'} onClick={() => console.log('show virtual capabilities')}>show virtual capabilities</CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <h5>Product offer creation</h5>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CRow>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor='identifier'>Identifier</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='identifier'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        placeholder={'Enter Unique Identifier'}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.identifier && (
                    <CFormText className='help-block'>
                      Please enter a identifier
                    </CFormText>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Country</CLabel>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='country'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value='0'>Please select</option>
                          <option value='1'>Option #1</option>
                          <option value='2'>Option #2</option>
                          <option value='3'>Option #3</option>
                        </CSelect>
                      )}
                    />
                  {errors.country &&
                    <CFormText className='help-block'>Please select a country</CFormText>
                  }
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Product Offer Terms</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name='cilPenAlt' /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='productOfferTerms'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value='0'>Please select</option>
                          <option value='1'>Option #1</option>
                          <option value='2'>Option #2</option>
                          <option value='3'>Option #3</option>
                        </CSelect>
                      )}
                    />
                    <CInputGroupAppend>
                      <CButton
                        type='button'
                        color='transparent'
                        onClick={() => console.log('Product offer terms')}
                      >
                        <PlusCircle width={20} height={20} />
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                  {errors.productOfferTerms &&
                    <CFormText className='help-block'>Please select a product</CFormText>
                  }
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor='serviceCandidate'>Service Candidate</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='serviceCandidate'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        placeholder={'Enter Service Candidate'}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.serviceCandidate && (
                    <CFormText className='help-block'>
                      Please enter a Service Candidate
                    </CFormText>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor='owner'>Owner</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='owner'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        placeholder={'Enter Owner'}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.owner && (
                    <CFormText className='help-block'>
                      Please enter a owner
                    </CFormText>
                  )}
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor='name'>Name</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='name'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        placeholder={'Enter Product Offer'}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.name && (
                    <CFormText className='help-block'>
                      Please enter a name
                    </CFormText>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor='city'>City</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='city'
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        placeholder={'Enter City'}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.name && (
                    <CFormText className='help-block'>
                      Please enter a city
                    </CFormText>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Prices</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name='cilEuro' /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='price'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value='0'>Please select</option>
                          <option value='1'>Option #1</option>
                          <option value='2'>Option #2</option>
                          <option value='3'>Option #3</option>
                        </CSelect>
                      )}
                    />
                    <CInputGroupAppend>
                      <CButton
                        type='button'
                        color='transparent'
                        onClick={() => console.log('Prices')}
                      >
                        <PlusCircle width={20} height={20} />
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                  {errors.price &&
                    <CFormText className='help-block'>Please select a price</CFormText>
                  }
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Service Level Agreements</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cilFlagAlt' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='serviceLevelAgreements'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value='0'>Please select</option>
                          <option value='1'>Option #1</option>
                          <option value='2'>Option #2</option>
                          <option value='3'>Option #3</option>
                        </CSelect>
                      )}
                    />
                    <CInputGroupAppend>
                      <CButton
                        type='button'
                        color='transparent'
                        onClick={() => console.log('Service Level Agreements')}
                      >
                        <PlusCircle width={20} height={20} />
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                  {errors.serviceLevelAgreements &&
                    <CFormText className='help-block'>Please select a agreement</CFormText>
                  }
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
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
    </CContainer>
  )
}

export default ProductDetail
