import React, { useEffect, useState } from 'react'
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
  CModal,
  CModalBody,
  CRow
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'
// import MaskedInput from 'react-text-mask'
// import Input from 'components/input'
import { LogoVerticalWhite } from 'assets/icons/logos'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router'
/** Container */
import { TheFooter } from 'containers'
/** Hooks */
import { useLogin } from 'hooks/api/Auth'
import { useAuthContext } from 'context/AuthContext'

import { InputLogin } from 'types/forms'

import LoadingWithFade from 'components/LoadingWithFade'
import { KeyLogin } from 'assets/icons/externalIcons'
import NotFoundApproval from 'views/NotFoundApproval'

const Login: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<InputLogin>()
  const history = useHistory()
  const { data, mutate, isSuccess, isLoading, isError } = useLogin()
  const { user, signin } = useAuthContext()
  const [showModal, setShowModal] = useState(false)

  const onSubmit = (data: InputLogin) => {
    mutate(data.stakeholderDID)
  }

  useEffect(() => {
    if (user != null) {
      history.push('/')
    }
  }, [user])

  useEffect(() => {
    if (isSuccess && data?.stakeholderClaim) {
      signin(data)
      history.push('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setShowModal(true)
    }
  }, [isError])

  return (
    <>
      {showModal && (
        <CModal show={showModal} onClose={() => setShowModal(false)}>
          <NotFoundApproval {...{ setShowModal }} />
        </CModal>
      )}
      {isLoading && <LoadingWithFade />}
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <div className="c-body flex-row align-items-center">
            <CContainer>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <CRow className="justify-content-center">
                  <CCol xs="5" className={'d-flex justify-content-center align-items-center mb-5'}>
                    <LogoVerticalWhite />
                  </CCol>
                </CRow>
                <CRow className="justify-content-center">
                  <CCol xs="5" className={'d-flex justify-content-center align-items-center'}>
                    <CCard className="p-5 w-100" accentColor="#0403">
                      <CCardBody className={'p-0'}>
                        <h1 className={'mb-4'}>Login</h1>
                        <p className="text-muted">Sign In to your account</p>

                        <CFormGroup className={'mb-4'}>
                          <CLabel>Stakeholder DID</CLabel>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <KeyLogin />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              name="stakeholderDID"
                              rules={{ required: true }}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <CInput
                                  data-testid={'stakeholderDID-input'}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              )}
                            />
                          </CInputGroup>
                          <CFormText color="muted" className={'mt-2'}>
                            ex. QxacVyyX7AvLDZyqbnZL3e
                          </CFormText>
                          {errors.stakeholderDID && (
                            <CFormText className="help-block" data-testid="error-message">
                              Please enter a valid key
                            </CFormText>
                          )}
                        </CFormGroup>

                        <CRow>
                          <CCol xs={12}>
                            <CButton
                              color={'gradient'}
                              className="px-5 text-uppercase"
                              data-testid="submit"
                              type="submit"
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CForm>
              <CRow className="justify-content-center">
                <CCol xs="5" className={'d-flex justify-content-center align-items-center w-63'}>
                  <CButton
                    color={'secondary'}
                    size="lg"
                    className={'p-3'}
                    block
                    onClick={() => history.push('/register')}
                  >
                    <div className={'d-flex justify-content-between align-items-center'}>
                      <div className={'d-flex align-items-center'}>
                        <CIcon name="cilGlobeAlt" className={'m-0 mr-3'} />
                        Create new Account
                      </div>
                      <CIcon name="cilArrowRight" className={'m-0'} />
                    </div>
                  </CButton>
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

export default Login
