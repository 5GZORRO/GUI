import React, { useEffect } from 'react'
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
  CTextarea
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'

import LoadingWithFade from 'components/LoadingWithFade'

import { transformForm } from './utils'
import { registerStakeholder } from 'hooks/api/Certificates'
import { useAuthContext } from 'context/AuthContext'
import { InputAddCertificate } from 'types/forms'

const AddCertificate = (props: any) => {
  const { setModal } = props
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<InputAddCertificate>({
    defaultValues: {
      id_token: '',
      stakeholderObject: ''
    }
  })

  const { mutate, isSuccess, isLoading, isError } = registerStakeholder()
  const { user } = useAuthContext()

  const onSubmit = (data: InputAddCertificate) => {
    const newData = transformForm(data)
    mutate(newData)
  }

  useEffect(() => {
    if (user) {
      setValue('id_token', user?.id_token)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      setModal(null)
    }
  }, [isSuccess])

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
