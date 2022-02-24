import React, { useEffect } from 'react'
import {
  CButton,
  CForm,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CSelect,
  CTextarea
} from '@coreui/react'

import { Controller, useForm } from 'react-hook-form'
import { registerNewSpectrumResource } from 'hooks/api/Resources'
import LoadingWithFade from 'components/LoadingWithFade'
import { string } from 'yup/lib/locale'

interface formSepctrumResource {
  startDlFreq: string
  endDlFreq: string
  startUlFreq: string
  endUlFreq: string
  band: string
  duplexMode: string
  area: any
}

const RegisterNewResource = (props: any) => {
  const { setModalNewSpectrumResource } = props
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<formSepctrumResource>({
    defaultValues: {
      startDlFreq: '',
      endDlFreq: '',
      startUlFreq: '',
      endUlFreq: '',
      band: '',
      duplexMode: '',
      area: ''
    }
  })

  const { mutate, isSuccess, isLoading } = registerNewSpectrumResource()

  const onSubmit = (data: formSepctrumResource) => {
    try {
      JSON.parse(data.area)
    } catch (e) {
      setError('area', { type: 'manual', message: 'Invalid json object' })
      return
    }
    const newData = {
      ...data,
      startDlFreq: parseInt(data.startDlFreq),
      endDlFreq: parseInt(data.endDlFreq),
      startUlFreq: parseInt(data.startUlFreq),
      endUlFreq: parseInt(data.endUlFreq)
    }
    mutate(newData)
  }

  useEffect(() => {
    if (isSuccess) {
      setModalNewSpectrumResource(false)
    }
  }, [isSuccess])

  return (
    <>
      {isLoading && <LoadingWithFade />}
      <CModal show={true} onClose={() => setModalNewSpectrumResource(false)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Register New Spectrum Resource'}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="startDlFreq">Start DL Frequency</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="startDlFreq"
                        render={({ field }) => <CInput type={'number'} placeholder={'Enter a frequency'} {...field} />}
                      />
                      {errors?.startDlFreq && <CFormText className="help-block">Please enter a frequency</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="endDlFreq">End DL Frequency</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="endDlFreq"
                        render={({ field }) => <CInput type={'number'} placeholder={'Enter a frequency'} {...field} />}
                      />
                      {errors?.endDlFreq && <CFormText className="help-block">Please enter a frequency</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="startUlFreq">Start UL Frequency</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="startUlFreq"
                        render={({ field }) => <CInput type={'number'} placeholder={'Enter a frequency'} {...field} />}
                      />
                      {errors?.startUlFreq && <CFormText className="help-block">Please enter a frequency</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="endUlFreq">End UL Frequency</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="endUlFreq"
                        render={({ field }) => <CInput type={'number'} placeholder={'Enter a frequency'} {...field} />}
                      />
                      {errors?.endUlFreq && <CFormText className="help-block">Please enter a frequency</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="band">Band</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="band"
                        render={({ field }) => <CInput placeholder={'Enter a band'} {...field} />}
                      />
                      {errors?.band && <CFormText className="help-block">Please enter a band</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="duplexMode">Duplex Mode</CLabel>
                      <Controller
                        control={control}
                        name="duplexMode"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                            <option value="" disabled>
                              Duplex Mode
                            </option>
                            <option value="TDD">TDD</option>
                            <option value="FDD">FDD</option>
                          </CSelect>
                        )}
                      />
                      {errors.duplexMode && <CFormText className="help-block">Please choose a duplex mode</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel htmlFor="area">Area</CLabel>
                      <Controller
                        defaultValue={''}
                        rules={{ required: true }}
                        control={control}
                        name="area"
                        render={({ field }) => <CTextarea rows={10} placeholder={'Enter a json object'} {...field} />}
                      />
                      {errors?.area && <CFormText className="help-block">Please enter a valid json object</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <div className={'mt-5 d-flex justify-content-end mb-5'}>
              <div className={'d-flex'}>
                <CButton className={'text-uppercase px-5'} color={'gradient'} onClick={handleSubmit(onSubmit)}>
                  Submit
                </CButton>
              </div>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default RegisterNewResource
