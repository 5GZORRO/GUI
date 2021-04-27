import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
// import MaskedInput from 'react-text-mask'
// import Input from 'components/input'
import { KeyLogin } from 'assets/icons/externalIcons'
import { LogoVerticalWhite } from 'assets/icons/logos'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router'
/** Container */
import { TheFooter } from 'containers'
/** Hooks */
import { useLogin } from 'hooks/api/Auth'

interface InputsLogin {
  key: string
}

const Login:React.FC = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<InputsLogin>()
  const history = useHistory()
  const login = useLogin()

  const onSubmit = (data: InputsLogin) => {
    login.mutate(data.key)
  }

  return (
    <div className='c-app c-default-layout'>
       <div className='c-wrapper'>
        <div className='c-body flex-row align-items-center'>
          <CContainer>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CRow className='justify-content-center'>
                <CCol xs='5' className={'d-flex justify-content-center align-items-center mb-5'}>
                  <LogoVerticalWhite />
                </CCol>
              </CRow>
              <CRow className='justify-content-center'>
                <CCol xs='5' className={'d-flex justify-content-center align-items-center'}>
                  <CCard className='p-5 w-100' accentColor='#0403'>
                    <CCardBody className={'p-0'}>
                        <h1 className={'mb-4'}>Login</h1>
                        <p className='text-muted'>Sign In to your account</p>
                        <CFormGroup className={'mb-4'}>
                          <CLabel>Stakeholder DID</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText><KeyLogin /></CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name='key'
                              render={({ field }) => (
                              <CInput
                                data-testid={'key-input'}
                                {...field}
                              />
                              )}
                            />
                          </CInputGroup>
                          <CFormText color='muted' className={'mt-2'}>
                            ex. QxacVyyX7AvLDZyqbnZL3e
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
                       {/* <CFormGroup className={'mb-4'}>
                          <CLabel>Enter Key</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText><KeyLogin /></CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name='key'
                              data-testid={'key'}
                              render={({ onChange, onBlur, value }) => (
                                <MaskedInput
                                  placeholder={'999 999 999 9999'}
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
                            ex. 999 999 999 9999
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
                           <CFormGroup>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name='file'
                              data-testid='file'
                              render={({ onChange, onBlur, value }) => (
                                <Input
                                  value={value}
                                  onBlur={onBlur}
                                  onChange={onChange}
                                />
                              )}
                            />
                          {errors.file &&
                          <CFormText
                            className='help-block'
                            data-testid='error-message-file'
                          >
                            Please enter a file
                          </CFormText>
                          }
                          </CFormGroup> */}
                        <CRow>
                          <CCol xs={12} className='text-right mb-4'>
                            <p
                              className={'px-0 text-uppercase font-12 text-light cursor-pointer'}
                              onClick={() => console.log('did something')}
                            >
                              <u>did you have any problem?</u>
                            </p>
                          </CCol>
                          <CCol xs={12}>
                            <CButton
                              color={'gradient'}
                              className='px-5 text-uppercase'
                              data-testid='submit'
                              type='submit'
                            >
                              submit
                            </CButton>
                          </CCol>
                        </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CForm>
            <CRow className='justify-content-center'>
              <CCol xs='5' className={'d-flex justify-content-center align-items-center w-63'}>
                <CButton
                  color={'secondary'}
                  size='lg'
                  className={'p-3'}
                  block
                  onClick={() => history.push('/register')}
                >
                    <div className={'d-flex justify-content-between align-items-center'}>
                      <div className={'d-flex align-items-center'}>
                        <CIcon name='cilGlobeAlt' className={'m-0 mr-3'} />
                        Create new  Account
                      </div>
                    <CIcon name='cilArrowRight' className={'m-0'} />
                  </div>
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default Login
