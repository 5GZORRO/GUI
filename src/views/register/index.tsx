import React from 'react'
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
interface InputRegister {
  governanceDID: string
  role: string
  assets: string[]
  name: string
  address: string
  key: number | string
}

/* const assestsArray = [
  {
    label: 'Information Resource',
    key: 'InforResource'
  },
  {
    label: 'Physical Resource',
    key: 'phyResource'
  },
  {
    label: 'Spectrum Resource',
    key: 'specResource'
  },
  {
    label: 'Network Function',
    key: 'netFunction'
  }
] */

const Register:React.FC = () => {
  const { handleSubmit, errors, control } = useForm<InputRegister>()

  const onSubmit = (form: InputRegister) => {
    console.log(form)
  }

  /* const handleSelect = (checkedName) => {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter(name => name !== checkedName)
      : [...(checkedValues ?? []), checkedName]
    setCheckedValues(newNames)
    return newNames
  } */

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
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
                        <CFormGroup variant='checkbox' className='checkbox'>
                          <Controller
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            name='infoResource'
                            data-testid={'infoResource'}
                            render={({ onChange, onBlur, value }) => (
                              <CInputCheckbox
                                custom
                                id='checkbox1'
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                              />
                            )}
                          />
                          <CLabel variant='checkbox' className='form-check-label' htmlFor='checkbox1'>Information Resource</CLabel>
                        </CFormGroup>
                        <CFormGroup variant='checkbox' className='checkbox'>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name='assets'
                            data-testid={'assets'}
                            render={({ onChange, onBlur, value }) => (
                              <CInputCheckbox
                                custom
                                id='checkbox2'
                                onBlur={onBlur}
                                onChange={(e: any) => e.target.checked ? 'Physical Resource' : '' }
                                value={value}
                              />
                            )}
                          />
                          <CLabel variant='checkbox' className='form-check-label' htmlFor='checkbox2'>Physical Resource</CLabel>
                        </CFormGroup>
                      </CCol>
                      <CCol xs='5'>
                        <CFormGroup variant='checkbox' className='checkbox'>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name='assets'
                            data-testid={'assets'}
                            render={({ onChange, onBlur, value }) => (
                              <CInputCheckbox
                                custom
                                id='checkbox3'
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                              />
                            )}
                          />
                          <CLabel variant='checkbox' className='form-check-label' htmlFor='checkbox3'>Spectrum Resource</CLabel>
                        </CFormGroup>
                        <CFormGroup variant='checkbox' className='checkbox'>
                          <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name='assets'
                              data-testid={'assets'}
                              render={({ onChange, onBlur, value }) => (
                                <CInputCheckbox
                                  custom
                                  id='checkbox4'
                                  onBlur={onBlur}
                                  onChange={onChange}
                                  value={value}
                                />
                              )}
                            />
                          <CLabel variant='checkbox' className='form-check-label' htmlFor='checkbox4'>Network Function</CLabel>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    {errors.key &&
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
  )
}

export default Register
