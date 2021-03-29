import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CFormGroup,
  CFormText,
  CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useForm, Controller } from 'react-hook-form'
import { KeyLogin } from 'assets/icons/externalIcons'
import MaskedInput from 'react-text-mask'
import { LogoVerticalWhite } from 'assets/icons/logos'
import { TheFooter } from 'containers/index'
interface InputRegister {
  governanceDID: string
  role: string
  assets: string[]
  name: string
  address: string
  key: number | string
}

const assestsArray = ['Information Resource', 'Physical Resource', 'Spectrum Resource', 'Network Function']

const Register:React.FC = () => {
  const { handleSubmit, errors, control } = useForm<InputRegister>()
  const [checkedValues, setCheckedValues] = useState<string[]>([])

  const onSubmit = (form: InputRegister) => {
    console.log(form)
  }

  const handleSelect = (checkedName: string) => {
    const newNames: any = checkedValues?.includes(checkedName)
      ? checkedValues?.filter((name: any) => name !== checkedName)
      : [...checkedValues, checkedName]
    setCheckedValues(newNames)
    return newNames
  }

  const columns = assestsArray.length

  return (
    <div className='c-app c-default-layout'>
      <div className='c-wrapper'>
        <div className='c-body flex-row align-items-center'>
          <CContainer>
            <CRow className='justify-content-center'>
              <CCol xs='5' className={'d-flex justify-content-center align-items-center mb-5'}>
                <LogoVerticalWhite />
              </CCol>
            </CRow>
            <CRow className='justify-content-center'>
              <CCol xs='5'>
                <CCard className='px-4 py-5 w-100'>
                  <CCardBody>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                      <h1 className={'mb-4'}>Sign up</h1>
                      <p className='text-muted'>It´s quick and easy</p>
                      <CRow className={'mb-4'}>
                        <CCol xs='6'>
                          <CFormGroup>
                              <CLabel htmlFor='governanceDID'>Governance Board DID</CLabel>
                              <CInputGroup>
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    <CIcon name='cilInfo' />
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                  control={control}
                                  defaultValue={''}
                                  rules={{ required: true }}
                                  name='governanceDID'
                                  data-testid={'governanceDID'}
                                  render={({ onChange, onBlur, value }) => (
                                    <CInput
                                      onChange={onChange}
                                      placeholder={'Insert governance'}
                                      onBlur={onBlur}
                                      value={value}
                                    />
                                  )}
                                />
                              </CInputGroup>
                            {errors.key &&
                              <CFormText
                                className='help-block'
                                data-testid='error-message'
                              >
                                Please enter a valid DID
                              </CFormText>
                            }
                          </CFormGroup>
                        </CCol>
                        <CCol xs='6'>
                          <CFormGroup>
                              <CLabel>Role</CLabel>
                              <CInputGroup>
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    <CIcon name='cilFeaturedPlaylist' />
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                  control={control}
                                  defaultValue={''}
                                  rules={{ required: true }}
                                  name='role'
                                  data-testid={'role'}
                                  render={({ onChange, onBlur, value }) => (
                                    <CInput
                                      onChange={onChange}
                                      placeholder={'Insert role'}
                                      onBlur={onBlur}
                                      value={value}
                                    />
                                  )}
                                />
                              </CInputGroup>
                            {errors.key &&
                              <CFormText
                                className='help-block'
                                data-testid='error-message'
                              >
                                Please enter a valid Role
                              </CFormText>
                            }
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CFormGroup className={'mb-4'}>
                        <CLabel>Checkboxes</CLabel>
                        <CRow>
                          <CCol xs='5'>
                            {assestsArray.slice(0, Math.ceil(columns / 2)).map((item, index) =>
                              <CFormGroup key={index} variant='checkbox' className='checkbox'>
                                <Controller
                                  control={control}
                                  defaultValue={false}
                                  rules={{ required: true }}
                                  name='assets'
                                  data-testid={'assets'}
                                  render={({ onChange, onBlur, value }) => (
                                    <CInputCheckbox
                                      custom
                                      id={`checkbox-left-${index}`}
                                      onBlur={onBlur}
                                      onChange={() => onChange(handleSelect(item))}
                                      checked={checkedValues.includes(item)}
                                    />
                                  )}
                                />
                                <CLabel variant='checkbox' className='form-check-label' htmlFor={`checkbox-left-${index}`}>{item}</CLabel>
                              </CFormGroup>
                            )}
                          </CCol>
                          <CCol xs='5'>
                            {assestsArray.slice(Math.ceil(columns / 2), columns).map((item, index) =>
                              <CFormGroup key={index} variant='checkbox' className='checkbox'>
                                <Controller
                                  control={control}
                                  defaultValue={false}
                                  rules={{ required: true }}
                                  name='assets'
                                  data-testid={'assets'}
                                  render={({ onChange, onBlur, value }) => (
                                    <CInputCheckbox
                                      custom
                                      id={`checkbox-right-${index}`}
                                      onBlur={onBlur}
                                      onChange={() => onChange(handleSelect(item))}
                                      checked={checkedValues.includes(item)}
                                    />
                                  )}
                                />
                                <CLabel variant='checkbox' className='form-check-label' htmlFor={`checkbox-right-${index}`}>{item}</CLabel>
                              </CFormGroup>
                            )}
                          </CCol>
                        </CRow>
                        {errors.assets &&
                        <CFormText
                          className='help-block'
                          data-testid='error-message'
                        >
                          Please select one asset
                        </CFormText>
                        }
                      </CFormGroup>
                      <CFormGroup className={'mb-4'}>
                        <CLabel>Name</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name='cilUser' />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name='name'
                            data-testid={'name'}
                            render={({ onChange, onBlur, value }) => (
                              <CInput
                                onChange={onChange}
                                placeholder={'Insert name'}
                                onBlur={onBlur}
                                value={value}
                              />
                            )}
                          />
                        </CInputGroup>
                        {errors.key &&
                          <CFormText
                            className='help-block'
                            data-testid='error-message'
                          >
                            Please enter a valid name
                          </CFormText>
                        }
                      </CFormGroup>
                      <CFormGroup className={'mb-4'}>
                        <CLabel>Address</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name='cilAddressBook' />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name='address'
                            data-testid={'address'}
                            render={({ onChange, onBlur, value }) => (
                              <CInput
                                onChange={onChange}
                                placeholder={'Insert address'}
                                onBlur={onBlur}
                                value={value}
                              />
                            )}
                          />
                        </CInputGroup>
                        {errors.key &&
                          <CFormText
                            className='help-block'
                            data-testid='error-message'
                          >
                            Please enter a valid address
                          </CFormText>
                        }
                      </CFormGroup>
                      <CFormGroup className={'mb-5'}>
                          <CLabel>Enter Key</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <KeyLogin />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name='key'
                              data-testid={'key'}
                              render={({ onChange, onBlur, value }) => (
                                <MaskedInput
                                  placeholder={'999 999 999'}
                                  mask={[/[1-9]/, /[1-9]/, /[1-9]/, ' ', /[1-9]/, /[1-9]/, /[1-9]/, ' ', /[1-9]/, /[1-9]/, /[1-9]/, ' ', /[1-9]/, /[1-9]/, /[1-9]/]}
                                  className='form-control'
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  render={(ref, props) => (
                                    <CInput
                                      innerRef={ref}
                                      {...props}
                                    />
                                  )}
                                />
                              )}
                            />
                          </CInputGroup>
                          <CFormText color='muted' className={'mt-2'}>
                            ex. 999 999 999 999
                          </CFormText>
                        {errors.key &&
                          <CFormText
                            className='help-block'
                            data-testid='error-message'
                          >
                            Please enter a valid key
                          </CFormText>
                        }
                        </CFormGroup>
                      <CButton color='gradient' type='submit' className={'px-5 text-uppercase'}>Register</CButton>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
          </div>
          <TheFooter />
          </div>
    </div>
  )
}

export default Register
