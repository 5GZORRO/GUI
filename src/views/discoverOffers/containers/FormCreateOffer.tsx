import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow, CSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { PlusCircle } from 'assets/icons/externalIcons'
import { Controller, useFormContext } from 'react-hook-form'

const FormCreateOffer:React.FC = () => {
  const { errors, control } = useFormContext()
  return (
    <CCard>
      <CCardHeader>
        <h5>Product offer creation</h5>
      </CCardHeader>
      <CCardBody>
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
      </CCardBody>
    </CCard>
  )
}

export default FormCreateOffer
