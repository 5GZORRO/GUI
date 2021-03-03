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
import MaskedInput from 'react-text-mask'
import { KeyLogin } from 'assets/icons/externalIcons'
import Input from 'components/input'

interface InputsLogin {
  key: string
  file: string
  name: string
}

const Login:React.FC = () => {
  const { handleSubmit, errors, control } = useForm<InputsLogin>()

  const onSubmit = (data: InputsLogin) => {
    console.log(data)
  }

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CRow className='justify-content-center'>
            <CCol md='8' className={'d-flex justify-content-center align-items-center'}>
              <CCard className='p-4' accentColor='#0403'>
                <CCardBody>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>
                    <CFormGroup>
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
                          render={({ onChange, onBlur, value }) => (
                            <MaskedInput
                              guide={true}
                              placeholder={'999 999 999'}
                              mask={[/[1-9]/, /[1-9]/, /[1-9]/, ' ', /[1-9]/, /[1-9]/, /[1-9]/, ' ', /[1-9]/, /[1-9]/, /[1-9]/]}
                              className='form-control'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              data-testid='key'
                              render={(ref, props) => (
                                <CInput innerRef={ref} {...props} />
                              )}
                            />
                          )}
                        />
                      </CInputGroup>
                      <CFormText color='muted'>
                        ex. 999 999 999
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
                        <Input />
                      </CFormGroup>
                    <CRow>
                      <CCol xs={12} className='text-right'>
                        <CButton
                          color='link'
                          className='px-0 text-uppercase'
                        >
                          did you have any problem?
                        </CButton>
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
      </CContainer>
    </div>
  )
}

export default Login
