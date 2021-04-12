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
  CInputCheckbox,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { LogoVerticalWhite } from 'assets/icons/logos'
import { TheFooter } from 'containers/index'
import { useHistory } from 'react-router'
import { transformForm } from './utils'
import { DevTool } from '@hookform/devtools'
// import RegisterSuccess from 'containers/registerSuccess'
/** Hooks */
import { useRegister } from 'hooks/api/Auth'
/** Components */
import { PlusCircle, KeyLogin } from 'assets/icons/externalIcons'
/** Type */
import { InputRegister } from 'types/forms'

const assestsArray = [
  { label: 'Information Resource', value: false, id: 'informationResource' },
  { label: 'Physical Resource', value: false, id: 'spectrumResource' },
  { label: 'Spectrum Resource', value: false, id: 'physicalResource' },
  { label: 'Network Function', value: false, id: 'networkFunction' }
]

const Register:React.FC = () => {
  const { handleSubmit, errors, control, clearErrors, setError } = useForm<InputRegister>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      governanceDID: '',
      address: '',
      key: '',
      roles: [{
        name: '',
        assets: {
          informationResource: false,
          spectrumResource: false,
          physicalResource: false,
          networkFunction: false
        }
      }]
    }
  })
  const { fields, remove, append } = useFieldArray({ control, name: 'roles' })
  const createRegister = useRegister()
  const history = useHistory()

  const onSubmit = (form: InputRegister) => {
    const checked = form.roles.reduce((acc: any, item, i) => {
      !Object.values(item.assets).includes(true) && acc.push(i)
      return acc
    }, [])
    checked.forEach((item: any) => setError(`roles[${item}].assets`, { type: 'manual', message: 'Select on asset' }))
    if (checked.length) return
    const data = transformForm(form)
    createRegister.mutate({ key: form.key, body: data })
  }

  const addNewRole = () => append({
    role: '',
    assets: {
      informationResource: false,
      spectrumResource: false,
      physicalResource: false,
      networkFunction: false
    }
  })

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
            {/* <RegisterSuccess /> */}
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
                        {fields.map((field, index) =>
                          <React.Fragment key={field.id}>
                            <CCol xs='12' className={'mb-4'}>
                              <CFormGroup>
                                  <CLabel>Role</CLabel>
                                  {index > 0 &&
                                    <div className={'float-right cursor-pointer'} onClick={() => remove(index)}>
                                      <CIcon name='cilTrash' className={'mr-2'} />
                                      <span className={'text-gray'}>Delete Resource</span>
                                    </div>
                                  }
                                  <CInputGroup>
                                    <CInputGroupPrepend>
                                      <CInputGroupText>
                                        <CIcon name='cilFeaturedPlaylist' />
                                      </CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                      control={control}
                                      defaultValue={''}
                                      rules={{ required: 'Please enter a valid Role' }}
                                      name={`roles[${index}].name`}
                                      data-testid={'roleName'}
                                      render={({ onChange, onBlur, value }) => (
                                        <CSelect
                                          onChange={onChange}
                                          onBlur={onBlur}
                                          value={value}
                                        >
                                          <option value='' disabled>Select Role</option>
                                          <option value='Regulator'>Regulator</option>
                                          <option value='Resource Provider'>Resource Provider</option>
                                          <option value='Resource Consumer'>Resource Consumer</option>
                                          <option value='Service Provider'>Service Provider</option>
                                          <option value='Service Consumer'>Service Consumer</option>
                                        </CSelect>
                                      )}
                                    />
                                  </CInputGroup>
                                  {errors.roles?.[index] &&
                                  <CFormText
                                    className='help-block'
                                    data-testid='error-message'
                                  >
                                    <ErrorMessage errors={errors} name={`roles[${index}].name`} />
                                  </CFormText>
                                  }
                              </CFormGroup>
                            </CCol>
                            <CCol xs={12}>
                            <CFormGroup className={'mb-4'}>
                            <CLabel>Assets</CLabel>
                            <CRow>
                              {assestsArray.map((item) => {
                                console.log('col')
                                return (
                                <CCol key={item.id} xs={6}>
                                  <CFormGroup variant='checkbox' className='checkbox'>
                                    <Controller
                                      control={control}
                                      defaultValue={false}
                                      name={`roles[${index}].assets.${item.id}`}
                                      data-testid={'role'}
                                      render={({ onChange, onBlur }) => (
                                        <>
                                          <CInputCheckbox
                                            id={`${item.id}-${index}`}
                                            onChange={(e: any) => {
                                              if (e.target.checked) {
                                                clearErrors(`roles[${index}].assets`)
                                              }
                                              onChange(e.target.checked)
                                            }}
                                            onBlur={onBlur}
                                          />
                                          <CLabel variant='checkbox' className='form-check-label' htmlFor={`${item.id}-${index}`}>{item.label}</CLabel>
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
                                    <ErrorMessage errors={errors} name={`roles[${index}].assets`} />
                                </CFormText>
                              </CCol>
                            </CRow>
                            </CFormGroup>
                            </CCol>
                          </React.Fragment>
                        )}
                        <div className='d-flex justify-content-center align-items-center pt-2 w-100'>
                          <CButton
                            className='d-flex justify-content-center align-items-center'
                            variant={'ghost'}
                            onClick={addNewRole}
                          >
                            <PlusCircle className={'mr-2'} /> Add new Role
                          </CButton>
                        </div>
                      </CRow>
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
                              <CInput
                                onChange={onChange}
                                placeholder={'Insert key'}
                                onBlur={onBlur}
                                value={value}
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
                        </CFormGroup>
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
