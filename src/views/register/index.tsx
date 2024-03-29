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
  CInputCheckbox,
  CInputRadio
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ErrorMessage } from '@hookform/error-message'
import { LogoVerticalWhite } from 'assets/icons/logos'
import { TheFooter } from 'containers/index'
import { useHistory } from 'react-router'
import { transformForm, assestsArray, schemaRegister } from './utils'
import { SESSION_TOKEN, API_MARKET_PLACE } from 'config'
/** Hooks */
import { useRegister } from 'hooks/api/Auth'
/** Components */
// import { KeyLogin } from 'assets/icons/externalIcons'
/** Type */
import { InputRegister } from 'types/forms'
import LoadingWithFade from 'components/LoadingWithFade'
import { endpoints } from 'api'

const Register: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm<InputRegister>({
    defaultValues: {
      name: '',
      governanceDID: '',
      address: '',
      email: '',
      handler_url: API_MARKET_PLACE + '/onboardHandler'
    },
    // import from utils
    resolver: yupResolver(schemaRegister)
  })

  const regulator = watch('roles.regulator.isSelect')
  const trader = watch('roles.trader.isSelect')

  const removeRemain = (currentActive: string) => {
    const allValues = {
      regulator: 'roles.regulator.isSelect',
      trader: 'roles.trader.isSelect'
    }

    Object.keys(allValues)
      .filter((el) => el !== currentActive)
      .forEach((value, index) => {
        setValue(allValues[value], false)
      })
  }

  const { data, mutate, isSuccess, isLoading, isError } = useRegister()
  const history = useHistory()

  const onSubmit = (form: InputRegister) => {
    const formData = transformForm(form)
    mutate(formData)
  }

  useEffect(() => {
    if (isSuccess && data) {
      window.localStorage.setItem(SESSION_TOKEN, data?.stakeholderClaim?.stakeholderDID)
      history.push('/register/success')
    }
  }, [isSuccess])

  return (
    <>
      {isLoading && <LoadingWithFade />}
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <CRow className="justify-content-center mt-5">
            <CCol xs="4" className={'d-flex justify-content-center align-items-center mb-5'}>
              <CButton
                variant={'outline'}
                color={'light'}
                className={'px-5 text-uppercase'}
                onClick={() => history.push('/login')}
              >
                <CIcon name="cilArrowLeft" style={{ marginRight: '10px' }} />
                back to login
              </CButton>
            </CCol>
            <CCol xs="4" className={'d-flex mb-5 justify-content-center align-items-center'}>
              <LogoVerticalWhite />
            </CCol>
            <CCol xs="4" className={'d-flex mb-5 justify-content-center align-items-center'}></CCol>
          </CRow>
          <div className="c-body flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol xs="5">
                  <CCard className="px-4 py-5 w-100">
                    <CCardBody className={'p-0'}>
                      <CForm onSubmit={handleSubmit(onSubmit)}>
                        {isError && (
                          <p style={{ color: 'red', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)' }}>
                            An error has occurred
                          </p>
                        )}
                        <h1 className={'mb-4'}>Sign up</h1>
                        <p className="text-muted">It´s quick and easy</p>

                        <CRow className={'mb-4'}>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="governanceDID">Governance Board DID</CLabel>
                              <CInputGroup>
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    <CIcon name="cilInfo" />
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                  control={control}
                                  defaultValue={''}
                                  rules={{ required: 'Please enter a valid DID' }}
                                  name="governanceDID"
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
                              <CFormText className="help-block" data-testid="error-message">
                                <ErrorMessage errors={errors} name="governanceDID" />
                              </CFormText>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="5" className={'mb-2'}>
                            <div
                              className={`${
                                regulator ? 'bg-gradient' : 'bg-primary'
                              } p-2 mb-2 rounded-sm cursor-pointer`}
                            >
                              <Controller
                                control={control}
                                defaultValue={false}
                                name="roles.regulator.isSelect"
                                render={({ field: { onChange, onBlur, value } }) => (
                                  <>
                                    <CInputRadio
                                      id={'regulator'}
                                      onBlur={onBlur}
                                      checked={value}
                                      className={'m-0'}
                                      onChange={(e: any) => {
                                        onChange(e.target.checked)
                                        if (e.target.checked) {
                                          removeRemain('regulator')
                                        }
                                      }}
                                    />
                                    <CLabel className="mb-0 font-14 ml-4" htmlFor={'regulator'}>
                                      Regulator
                                    </CLabel>
                                  </>
                                )}
                              />
                            </div>
                          </CCol>
                          {regulator && (
                            <CCol xs="10" className="ml-3">
                              <CLabel>Assets</CLabel>
                              <CRow>
                                {assestsArray.map((item) => (
                                  <CCol key={item.id} xs={6}>
                                    <CFormGroup variant="checkbox" className="checkbox p-0">
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
                                            <CLabel
                                              variant="checkbox"
                                              className="form-check-label"
                                              htmlFor={`regulator_${item.id}`}
                                            >
                                              {item.label}
                                            </CLabel>
                                          </>
                                        )}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                ))}
                                <CCol>
                                  <CFormText className="help-block" data-testid="error-message">
                                    <ErrorMessage errors={errors} name={'roles.regulator'} />
                                  </CFormText>
                                </CCol>
                              </CRow>
                            </CCol>
                          )}
                        </CRow>
                        <CRow>
                          <CCol xs="5" className={'mb-2'}>
                            <div
                              className={`${trader ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}
                            >
                              <Controller
                                control={control}
                                defaultValue={false}
                                name={'roles.trader.isSelect'}
                                data-testid={'role'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                  <>
                                    <CInputRadio
                                      id={'trader'}
                                      onBlur={onBlur}
                                      className={'m-0'}
                                      checked={value}
                                      onChange={(e: any) => {
                                        onChange(e.target.checked)
                                        if (e.target.checked) {
                                          removeRemain('trader')
                                        }
                                      }}
                                    />
                                    <CLabel className="mb-0 font-14 ml-4" htmlFor={'trader'}>
                                      Trader
                                    </CLabel>
                                  </>
                                )}
                              />
                            </div>
                          </CCol>
                          {trader && (
                            <CCol xs="10" className="ml-3">
                              <CLabel>Assets</CLabel>
                              <CRow>
                                {assestsArray.map((item) => {
                                  return (
                                    <CCol key={item.id} xs={6}>
                                      <CFormGroup variant="checkbox" className="checkbox p-0">
                                        <Controller
                                          control={control}
                                          defaultValue={false}
                                          name={`roles.trader.${item.id}` as any}
                                          data-testid={'role'}
                                          render={({ field: { onChange, onBlur } }) => (
                                            <>
                                              <CInputCheckbox
                                                id={`trader_${item.id}`}
                                                onChange={(e: any) => onChange(e.target.checked)}
                                                onBlur={onBlur}
                                              />
                                              <CLabel
                                                variant="checkbox"
                                                className="form-check-label"
                                                htmlFor={`trader_${item.id}`}
                                              >
                                                {item.label}
                                              </CLabel>
                                            </>
                                          )}
                                        />
                                      </CFormGroup>
                                    </CCol>
                                  )
                                })}
                                <CCol>
                                  <CFormText className="help-block" data-testid="error-message">
                                    <ErrorMessage errors={errors} name={'roles.resourceProvider'} />
                                  </CFormText>
                                </CCol>
                              </CRow>
                            </CCol>
                          )}
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CFormText className="help-block" data-testid="error-message">
                              <ErrorMessage errors={errors} name="roles" />
                            </CFormText>
                          </CCol>
                        </CRow>
                        {/* <CFormGroup className={'mb-2'}>
                          <CLabel>Company</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cilInstitution" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name="company"
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
                          {errors.company && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a valid company
                            </CFormText>
                          )}
                        </CFormGroup> */}
                        <CFormGroup className={'mb-2'}>
                          <CLabel>Name</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cilUser" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name="name"
                              data-testid={'name'}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <CInput placeholder={'Insert name'} onChange={onChange} value={value} onBlur={onBlur} />
                              )}
                            />
                          </CInputGroup>
                          {errors.name && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a valid name
                            </CFormText>
                          )}
                        </CFormGroup>
                        <CFormGroup className={'mb-2'}>
                          <CLabel>Email(s)</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cilNewspaper" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name="email"
                              data-testid={'email'}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <CInput
                                  placeholder={'email@example.com, secondemail@example.com'}
                                  onChange={onChange}
                                  value={value}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                          </CInputGroup>
                          {errors.email && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a valid email list (separated with commas)
                            </CFormText>
                          )}
                        </CFormGroup>
                        {/* <CFormGroup className={'mb-2'}>
                          <CLabel>DID Status handler</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cilLink" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name="handler_url"
                              data-testid={'handler_url'}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <CInput
                                  placeholder={'https://example.site/'}
                                  onChange={onChange}
                                  value={value}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                          </CInputGroup>
                          {errors.handler_url && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a url
                            </CFormText>
                          )}
                        </CFormGroup> */}
                        <CFormGroup className={'mb-4'}>
                          <CLabel>Address</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cilAddressBook" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              rules={{ required: true }}
                              name="address"
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
                          {errors.address && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a valid address
                            </CFormText>
                          )}
                        </CFormGroup>
                        <CButton color="gradient" type="submit" className={'px-5 text-uppercase'}>
                          Register
                        </CButton>
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
    </>
  )
}

export default Register
