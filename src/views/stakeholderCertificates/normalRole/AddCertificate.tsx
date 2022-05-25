import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CContainer,
  CForm,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputRadio,
  CInputCheckbox,
  CSelect,
  CTextarea
} from '@coreui/react'
import { ErrorMessage } from '@hookform/error-message'
import { Controller, useForm } from 'react-hook-form'

// import { TransformFormData } from './util'
import LoadingWithFade from 'components/LoadingWithFade'

import { assestsArray, schemaAddCertificate, transformForm } from './utils'
import { registerStakeholder } from 'hooks/api/Certificates'
import CIcon from '@coreui/icons-react'
import { useAuthContext } from 'context/AuthContext'
import { InputAddCertificate } from 'types/forms'
import { yupResolver } from '@hookform/resolvers/yup'

const AddCertificate = (props: any) => {
  const { setModal, refetch } = props
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm<InputAddCertificate>({
    defaultValues: {
      id_token: '',
      stakeholderObject: ''
    }
    // resolver: yupResolver(schemaAddCertificate)
  })

  const { mutate, isSuccess, isLoading, isError } = registerStakeholder()
  const { user } = useAuthContext()

  const onSubmit = (data: InputAddCertificate) => {
    const newData = transformForm(data)
    newData.stakeholderServices[0].ownerDid = user?.stakeholderClaim?.stakeholderDID
    mutate(newData)
  }

  useEffect(() => {
    if (user) {
      setValue('id_token', user?.id_token)
      // setValue('governanceDID', user?.stakeholderClaim?.governanceBoardDID)
      // setValue('email', user?.stakeholderClaim?.stakeholderProfile?.notificationMethod?.distributionList)
      // setValue('address', user?.stakeholderClaim?.stakeholderProfile?.address)
      // setValue('roles', user?.stakeholderClaim?.stakeholderRoles)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      setModal(null)
    }
  }, [isSuccess])

  // const administrator = watch('roles.administrator.isSelect')
  // const regulator = watch('roles.regulator.isSelect')
  // const trader = watch('roles.trader.isSelect')

  // const spectrumResource = watch('spectrumResource')

  // const removeRemain = (currentActive: string) => {
  //   const allValues = {
  //     administrator: 'roles.administrator.isSelect',
  //     regulator: 'roles.regulator.isSelect',
  //     trader: 'roles.trader.isSelect'
  //   }

  //   Object.keys(allValues)
  //     .filter((el) => el !== currentActive)
  //     .forEach((value, index) => {
  //       setValue(allValues[value], false)
  //     })
  // }

  return (
    <CContainer className={'p-0'}>
      {isLoading && !isError && <LoadingWithFade />}
      {!isLoading && isError && (
        <p style={{ color: 'red', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)' }}>
          An error has occurred, please try again
        </p>
      )}
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCardHeader>
          <h5>New Licence Certificate</h5>
        </CCardHeader>
        <CCardBody>
          {/* <CRow>
            {/* <CCol sm={6}>
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
                      <CInput placeholder={'Insert governance'} onChange={onChange} value={value} onBlur={onBlur} />
                    )}
                  />
                </CInputGroup>
                <CFormText className="help-block" data-testid="error-message">
                  <ErrorMessage errors={errors} name="governanceDID" />
                </CFormText>
              </CFormGroup>
            </CCol> */}
          {/* <CCol sm={6}>
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
            </CCol>
          </CRow> */}
          {/* <CRow>
            <CCol sm={12}>
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
            </CCol>
          </CRow> */}
          {/* <CRow className={'mt-3'}>
            <CCol sm={7}>
              <CLabel>Role</CLabel>
              <CRow>
                <CCol sm={6}>
                  <div className={`${administrator ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
                    <Controller
                      control={control}
                      defaultValue={false}
                      name="roles.administrator.isSelect"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <CInputRadio
                            id={'administrator'}
                            onBlur={onBlur}
                            checked={value}
                            className={'m-0'}
                            onChange={(e: any) => {
                              onChange(e.target.checked)
                              if (e.target.checked) {
                                removeRemain('administrator')
                              }
                            }}
                          />
                          <CLabel className="mb-0 font-14 ml-4 ml-4" htmlFor={'administrator'}>
                            Administrator
                          </CLabel>
                        </>
                      )}
                    />
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className={`${regulator ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
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
                          <CLabel className="mb-0 font-14 ml-4 ml-4" htmlFor={'regulator'}>
                            Regulator
                          </CLabel>
                        </>
                      )}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6}>
                  <div className={`${trader ? 'bg-gradient' : 'bg-primary'} p-2 mb-2 rounded-sm cursor-pointer`}>
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
              </CRow>
            </CCol>
            <CCol sm={5} className={'mt-4'}>
              {(administrator || regulator || trader) && <CLabel>Assets</CLabel>}
              {administrator && (
                <CRow>
                  {assestsArray.map((item) => (
                    <CCol key={item.id} xs={6}>
                      <CFormGroup variant="checkbox" className="checkbox p-0">
                        <Controller
                          control={control}
                          defaultValue={false}
                          name={`roles.administrator.${item.id}` as any}
                          render={({ field: { onChange, onBlur } }) => (
                            <>
                              <CInputCheckbox
                                id={`administrator_${item.id}`}
                                onChange={(e: any) => onChange(e.target.checked)}
                                onBlur={onBlur}
                              />
                              <CLabel
                                variant="checkbox"
                                className="form-check-label"
                                htmlFor={`administrator_${item.id}`}
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
                      <ErrorMessage errors={errors} name={'roles.administrator'} />
                    </CFormText>
                  </CCol>
                </CRow>
              )}
              {trader && (
                <CRow>
                  {assestsArray.map((item) => (
                    <CCol key={item.id} xs={6}>
                      <CFormGroup variant="checkbox" className="checkbox p-0">
                        <Controller
                          control={control}
                          defaultValue={false}
                          name={`roles.resourceProvider.${item.id}` as any}
                          render={({ field: { onChange, onBlur } }) => (
                            <>
                              <CInputCheckbox
                                id={`resourceProvider_${item.id}`}
                                onChange={(e: any) => onChange(e.target.checked)}
                                onBlur={onBlur}
                              />
                              <CLabel
                                variant="checkbox"
                                className="form-check-label"
                                htmlFor={`resourceProvider_${item.id}`}
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
                      <ErrorMessage errors={errors} name={'roles.trader'} />
                    </CFormText>
                  </CCol>
                </CRow>
              )}
              {regulator && (
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
                              <CLabel variant="checkbox" className="form-check-label" htmlFor={`regulator_${item.id}`}>
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
              )}
            </CCol>
          </CRow> */}
          {/* <CRow className={'mt-3'}>
            <CCol sm={6}>
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
                      <CInput onChange={onChange} value={value} onBlur={onBlur} placeholder={'Insert address'} />
                    )}
                  />
                </CInputGroup>
                {errors.address && (
                  <CFormText className="help-block" data-testid="error-message">
                    Please enter a valid address
                  </CFormText>
                )}
              </CFormGroup>
            </CCol>
            <CCol sm={6}>
              <CFormGroup className={'mb-2'}>
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
                      <CInput placeholder={'Insert company'} onChange={onChange} onBlur={onBlur} value={value} />
                    )}
                  />
                </CInputGroup>
                {errors.company && (
                  <CFormText className="help-block" data-testid="error-message">
                    Please enter a valid company
                  </CFormText>
                )}
              </CFormGroup>
            </CCol>
          </CRow> */}
          {/* <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="name">Spectrum Resource</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="spectrumResource"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                      <option value="" disabled>
                        Select Option
                      </option>

                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </CSelect>
                  )}
                />
                {errors.spectrumResource && (
                  <CFormText className="help-block">Please choose a transaction type</CFormText>
                )}
              </CFormGroup>
            </CCol>
          </CRow> */}
          <CRow>
            <CCol sm={12}>
              <CFormGroup>
                <CLabel htmlFor="stakeholderObject">Spectrum Licence Object</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="stakeholderObject"
                  render={({ field }) => (
                    <CTextarea
                      placeholder={'Enter Spectrum License Object'}
                      {...field}
                      rows={10}
                      style={{ resize: 'none' }}
                    />
                  )}
                />
                {errors.stakeholderObject && <CFormText className="help-block">Please add a valid object</CFormText>}
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <div className={'mt-3 d-flex justify-content-end mb-5 mr-4'}>
          <div className={'d-flex'}>
            <CButton
              className={'text-uppercase px-5 mr-4'}
              type="cancel"
              variant="outline"
              color={'white'}
              onClick={() => setModal(null)}
            >
              Cancel
            </CButton>
          </div>
          <div className={'d-flex'}>
            <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
              Submit
            </CButton>
          </div>
        </div>
      </CForm>
    </CContainer>
  )
}

export default AddCertificate
