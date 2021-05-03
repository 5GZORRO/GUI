import React, { useEffect } from 'react'
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
import { yupResolver } from '@hookform/resolvers/yup'

import { ErrorMessage } from '@hookform/error-message'
import { LogoVerticalWhite } from 'assets/icons/logos'
import { TheFooter } from 'containers/index'
import { useHistory } from 'react-router'
import { transformForm, assestsArray, schemaRegister } from './utils'
import { DevTool } from '@hookform/devtools'
/** Hooks */
import { useRegister } from 'hooks/api/Auth'
/** Components */
import { KeyLogin } from 'assets/icons/externalIcons'
/** Type */
import { InputRegister } from 'types/forms'

const Register:React.FC = () => {
  const { handleSubmit, formState: { errors }, control, watch } = useForm<InputRegister>({
    defaultValues: {
      name: '',
      governanceDID: '',
      address: '',
      key: '6mrzT9MPq6dfCqA6aXXzo4yyX7ppfqGq2cWzV9sR2dBg'
    },
    // import from utils
    resolver: yupResolver(schemaRegister)
  })
  const governance = watch('roles.governance.isSelect')
  const regulator = watch('roles.regulator.isSelect')
  const provider = watch('roles.provider.isSelect')
  const consumer = watch('roles.consumer.isSelect')
  const { mutate, isError, isSuccess } = useRegister()
  const history = useHistory()

  const onSubmit = (form: InputRegister) => {
    const data = transformForm(form)
    mutate(data)
    history.push('/success')
  }

  useEffect(() => {
    if (isSuccess) {
      history.push('/success')
    }
  }, [isSuccess])

  console.log('Create Register', isError)
  return (
    <div className='c-app c-default-layout'>
      <div className='c-wrapper'>
      <CRow className='justify-content-center mt-5'>
        <CCol xs='4' className={'d-flex justify-content-center align-items-center mb-5'}>
          <CButton
            variant={'outline'}
            color={'light'}
            className={'px-5 text-uppercase'}
            onClick={() => history.push('/login')}
          >
            <CIcon name='cilArrowLeft' style={{ marginRight: '10px' }} />
            back to login
          </CButton>
        </CCol>
        <CCol xs='4' className={'d-flex mb-5 justify-content-center align-items-center'}>
          <LogoVerticalWhite />
        </CCol>
        <CCol xs='4' className={'d-flex mb-5 justify-content-center align-items-center'}>
        </CCol>
      </CRow>
        <div className='c-body flex-row align-items-center'>
          <CContainer>
            <CRow className='justify-content-center'>
              <CCol xs='5'>
                <CCard className='px-4 py-5 w-100'>
                  <CCardBody className={'p-0'}>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                      <h1 className={'mb-4'}>Sign up</h1>
                      <p className='text-muted'>It´s quick and easy</p>
                      <CRow className={'mb-4'}>
                        <CCol xs='12'>
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
                                  rules={{ required: 'Please enter a valid DID' }}
                                  name='governanceDID'
                                  data-testid={'governanceDID'}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                    <CInput
                                      placeholder={'Insert governance'}
                                      onChange={onChange}
                                      value={value}
                                      onBlur={onBlur}
                                    />
                                  )}
                                />
                              </CInputGroup>
                              <CFormText
                                className='help-block'
                                data-testid='error-message'
                              >
                                <ErrorMessage errors={errors} name='governanceDID' />
                              </CFormText>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs='5' className={'mb-2'}>
                          <CLabel>Role</CLabel>
                          <div className={`${governance ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
                            <Controller
                              control={control}
                              defaultValue={false}
                              name='roles.governance.isSelect'
                              render={({ field: { onChange, onBlur } }) => (
                                <>
                                  <CInputCheckbox
                                    id={'governance'}
                                    onBlur={onBlur}
                                    onChange={(e:any) => onChange(e.target.checked)}
                                  />
                                  <CLabel className='mb-0 font-14' htmlFor={'governance'}>Governance Admin</CLabel>
                                </>
                              )}
                            />
                          </div>
                        </CCol>
                        {governance && (
                        <CCol xs='10' className='ml-3'>
                          <CLabel>Assets</CLabel>
                            <CRow>
                              {assestsArray.map((item) => {
                                return (
                                <CCol key={item.id} xs={6}>
                                  <CFormGroup variant='checkbox' className='checkbox p-0'>
                                    <Controller
                                      control={control}
                                      defaultValue={false}
                                      name={`roles.governance.${item.id}` as any}
                                      render={({ field: { onChange, onBlur } }) => (
                                        <>
                                          <CInputCheckbox
                                            id={item.id}
                                            onChange={(e: any) => onChange(e.target.checked)}
                                            onBlur={onBlur}
                                          />
                                          <CLabel variant='checkbox' className='form-check-label' htmlFor={item.id}>{item.label}</CLabel>
                                        </>
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                )
                              }
                              )}
                              <CCol>
                                <CFormText
                                  className='help-block'
                                  data-testid='error-message'
                                >
                                  <ErrorMessage errors={errors} name={'roles.governance'} />
                                </CFormText>
                              </CCol>
                            </CRow>
                        </CCol>
                        )}
                      </CRow>
                      <CRow>
                        <CCol xs='5' className={'mb-2'}>
                          <div className={`${regulator ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
                            <Controller
                              control={control}
                              defaultValue={false}
                              name='roles.regulator.isSelect'
                              render={({ field: { onChange, onBlur } }) => (
                                <>
                                 <CInputCheckbox
                                    id={'regulator'}
                                    onBlur={onBlur}
                                    onChange={(e:any) => onChange(e.target.checked)}
                                  />
                                  <CLabel className='mb-0 font-14' htmlFor={'regulator'}>Regulator</CLabel>
                                </>
                              )}
                            />
                          </div>
                        </CCol>
                        {regulator && (
                        <CCol xs='10' className='ml-3'>
                          <CLabel>Assets</CLabel>
                            <CRow>
                              {assestsArray.map((item) => (
                                <CCol key={item.id} xs={6}>
                                  <CFormGroup variant='checkbox' className='checkbox p-0'>
                                    <Controller
                                      control={control}
                                      defaultValue={false}
                                      name={`roles.regulator.${item.id}` as any}
                                      render={({ field: { onChange, onBlur } }) => (
                                        <>
                                          <CInputCheckbox
                                            id={`regulator_${item.id}`}
                                            onChange={(e: any) => onChange(e.target.checked)}
                                            onBlur={onBlur}
                                          />
                                          <CLabel variant='checkbox' className='form-check-label' htmlFor={`regulator_${item.id}`}>{item.label}</CLabel>
                                        </>
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                              ))}
                              <CCol>
                                <CFormText
                                  className='help-block'
                                  data-testid='error-message'
                                  >
                                    <ErrorMessage errors={errors} name={'roles.regulator'} />
                                </CFormText>
                              </CCol>
                            </CRow>
                        </CCol>
                        )}
                      </CRow>
                      <CRow>
                        <CCol xs='5' className={'mb-2'}>
                        <div className={`${provider ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
                        <Controller
                          control={control}
                          defaultValue={false}
                          name={'roles.provider.isSelect'}
                          data-testid={'role'}
                          render={({ field: { onChange, onBlur } }) => (
                            <>
                              <CInputCheckbox
                                id={'provider'}
                                onBlur={onBlur}
                                onChange={(e:any) => onChange(e.target.checked)}
                              />
                              <CLabel className='mb-0 font-14' htmlFor={'provider'}>Provider</CLabel>
                            </>
                          )}
                        />
                        </div>
                        </CCol>
                        {provider && (
                        <CCol xs='10' className='ml-3'>
                          <CLabel>Assets</CLabel>
                            <CRow>
                              {assestsArray.map((item) => {
                                return (
                                <CCol key={item.id} xs={6}>
                                  <CFormGroup variant='checkbox' className='checkbox p-0'>
                                    <Controller
                                      control={control}
                                      defaultValue={false}
                                      name={`roles.provider.${item.id}` as any}
                                      data-testid={'role'}
                                      render={({ field: { onChange, onBlur } }) => (
                                        <>
                                          <CInputCheckbox
                                            id={`provider_${item.id}`}
                                            onChange={(e: any) => onChange(e.target.checked)}
                                            onBlur={onBlur}
                                          />
                                          <CLabel variant='checkbox' className='form-check-label' htmlFor={`provider_${item.id}`}>{item.label}</CLabel>
                                        </>
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                )
                              }
                              )}
                              <CCol>
                                <CFormText
                                  className='help-block'
                                  data-testid='error-message'
                                >
                                  <ErrorMessage errors={errors} name={'roles.provider'} />
                                </CFormText>
                              </CCol>
                            </CRow>
                        </CCol>
                        )}
                      </CRow>
                      <CRow className={'mb-4'}>
                        <CCol xs='5' className={'mb-2'}>
                        <div className={`${consumer ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
                        <Controller
                          control={control}
                          defaultValue={false}
                          name={'roles.consumer.isSelect'}
                          data-testid={'role'}
                          render={({ field: { onChange, onBlur, value, name, ref } }) => (
                            <>
                               <CInputCheckbox
                                id={'consumer'}
                                onBlur={onBlur}
                                onChange={(e:any) => onChange(e.target.checked)}
                              />
                              <CLabel className='mb-0 font-14' htmlFor={'consumer'}>Consumer</CLabel>
                            </>
                          )}
                        />
                        </div>
                        </CCol>
                        {consumer && (
                        <CCol xs='10' className='ml-3'>
                          <CLabel>Assets</CLabel>
                            <CRow>
                              {assestsArray.map((item) => {
                                return (
                                <CCol key={item.id} xs={6}>
                                  <CFormGroup variant='checkbox' className='checkbox p-0'>
                                    <Controller
                                      control={control}
                                      defaultValue={false}
                                      name={`roles.consumer.${item.id}` as any}
                                      data-testid={'role'}
                                      render={({ field: { onChange, onBlur } }) => (
                                        <>
                                          <CInputCheckbox
                                            id={`consumer_${item.id}`}
                                            onBlur={onBlur}
                                            onChange={(e:any) => onChange(e.target.checked)}
                                          />
                                          <CLabel variant='checkbox' className='form-check-label' htmlFor={`consumer_${item.id}`}>{item.label}</CLabel>
                                        </>
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                )
                              }
                              )}
                              <CCol>
                                <CFormText
                                  className='help-block'
                                  data-testid='error-message'
                                >
                                  <ErrorMessage errors={errors} name={'roles.consumer'} />
                                </CFormText>
                              </CCol>
                            </CRow>
                        </CCol>
                        )}
                        <CCol xs='12'>
                          <CFormText
                            className='help-block'
                            data-testid='error-message'
                          >
                            <ErrorMessage errors={errors} name='roles' />
                          </CFormText>
                        </CCol>
                      </CRow>
                      <CFormGroup className={'mb-2'}>
                        <CLabel>Company</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name='cilInstitution' />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            rules={{ required: true }}
                            name='company'
                            data-testid={'company'}
                            render={({ field: { onChange, onBlur, value } }) => (
                              <CInput
                                placeholder={'Insert company'}
                                onChange={onChange}
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
                            Please enter a valid company
                          </CFormText>
                        }
                      </CFormGroup>
                      <CFormGroup className={'mb-2'}>
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
                            render={({ field: { value, onChange, onBlur } }) => (
                              <CInput
                                placeholder={'Insert name'}
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
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
                            render={({ field: { onChange, value, onBlur } }) => (
                              <CInput
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                                placeholder={'Insert address'}
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
                      {/* <CFormGroup className={'mb-5'}>
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
                            render={({ field: { onBlur, onChange, value } }) => (
                              <CInput
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={'Insert key'}
                              />
                            )}
                          />
                          </CInputGroup>
                          <CFormText color='muted' className={'mt-2'}>
                            ex. 33gf9wQR3ieDSfehtj2Wj185UmTxrijog2YuVrJ2VbyY
                          </CFormText>
                        {errors.key &&
                          <CFormText
                            className='help-block'
                            data-testid='error-message'
                          >
                            Please enter a valid key
                          </CFormText>
                        }
                        </CFormGroup> */}
                      <CButton color='gradient' type='submit' className={'px-5 text-uppercase'}>Register</CButton>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
              <DevTool control={control} />
            </CRow>
          </CContainer>
          </div>
          <TheFooter />
          </div>
    </div>
  )
}

export default Register
