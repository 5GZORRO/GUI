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
  CInputCheckbox,
  CCardSubtitle,
  CSelect,
  CSwitch,
  CInputFile
} from '@coreui/react'

import { Controller, useForm } from 'react-hook-form'

// import { TransformFormData } from './util'
import LoadingWithFade from 'components/LoadingWithFade'

import { assestsArray } from './utils'
import { getTransactionsTypes, scaleOutOp } from 'hooks/api/ISSM'
import CIcon from '@coreui/icons-react'
import { useAuthContext } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'

interface formNewTransaction {
  transactionType: string
  file: any
  operator: string
}

const NewBusinessTransaction = (props: any) => {
  const { setModal } = props
  const history = useHistory()
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<formNewTransaction>({
    defaultValues: {
      transactionType: '',
      file: null,
      operator: ''
    }
  })

  const { user } = useAuthContext()
  const { data, isLoading: types } = getTransactionsTypes()
  const { mutate, isSuccess, isLoading } = scaleOutOp()

  useEffect(() => {
    if (user) {
      let operator: any
      switch (user?.stakeholderClaim?.stakeholderProfile?.name) {
        case 'Operator_A':
          operator = 'operator-a'
          break
        case 'Operator_B':
          operator = 'operator-b'
          break

        case 'Operator C ':
          operator = 'operator-c'
          break
      }
      setValue('operator', operator)
    }
  }, [user])

  const onSubmit = (data: formNewTransaction) => {
    // const newData = TransformFormData(data)
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      setModal(null)
    }
  }, [isSuccess])

  const handleFileUpload = (e: any, onChange: any, name: any) => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      onChange({
        target: {
          value: file
        }
      })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <CContainer className={'p-0'}>
      {false && <LoadingWithFade />}
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCardHeader>
          <h5>New Automated Transaction</h5>
        </CCardHeader>
        <CCardBody>
          <CCardSubtitle className={'mb-3 mt-3'}>Create Transaction</CCardSubtitle>
          <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="name">Transaction Type</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="transactionType"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                      <option value="" disabled>
                        Transaction Type
                      </option>
                      {data?.map((type: any) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </CSelect>
                  )}
                />
                {errors.transactionType && (
                  <CFormText className="help-block">Please choose a transaction type</CFormText>
                )}
              </CFormGroup>
            </CCol>
          </CRow>
          <CCardSubtitle className={'mb-3 mt-3'}>Intent File</CCardSubtitle>
          <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel>Intent File Upload</CLabel>
                <CInputGroup>
                  <Controller
                    control={control}
                    defaultValue={''}
                    // rules={{ required: true }}
                    name="file"
                    render={({ field: { onChange, value, ref } }) => (
                      <CContainer
                        className="m-1 d-flex align-items-center p-3"
                        style={{ background: '#32333A', borderRadius: 4 }}
                      >
                        <label className={'d-flex align-items-center btn btn-dark btn-rounded m-0'}>
                          <CIcon name="cilFile" />
                          <input
                            id="file-input"
                            type="file"
                            name="file"
                            accept=".yaml"
                            style={{ display: 'none' }}
                            onChange={(e: any) => {
                              handleFileUpload(e, onChange, 'file')
                            }}
                          />
                        </label>

                        <CFormGroup className="d-flex flex-column align-items-flex-start m-0 ml-2">
                          <CLabel className="m-0">UPLOAD FILE</CLabel>
                          <CLabel className="m-0 pt-1" style={{ fontSize: 12, color: '#8A93A2' }}>
                            Type File: <span style={{ fontWeight: 'bold' }}>.yaml</span>
                          </CLabel>
                        </CFormGroup>
                        <label
                          className="mb-0"
                          style={{
                            color: '#9DA5B1',
                            textDecorationLine: 'underline',
                            cursor: 'pointer',
                            marginLeft: 80
                          }}
                        >
                          <strong>Choose File</strong>
                          <input
                            id="file-input"
                            type="file"
                            name="file"
                            accept=".yaml"
                            style={{ display: 'none' }}
                            onChange={(e: any) => {
                              handleFileUpload(e, onChange, 'file')
                            }}
                          />
                        </label>
                      </CContainer>
                    )}
                  />
                </CInputGroup>
                {errors?.file && <CFormText className="help-block">Please insert a template file (.cta)</CFormText>}
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

export default NewBusinessTransaction
