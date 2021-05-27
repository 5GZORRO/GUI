import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CLabel,
  CRow,
  CDataTable,
  CTextarea,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CInputGroupAppend,
  CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import moment from 'moment'
import { DATETIME_FORMAT } from 'config'

import Select from 'react-select'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import { useCreateCategory } from 'hooks/api/Resources'
import DateRangePicker from 'components/DateRangePicker'
import LoadingWithFade from 'components/LoadingWithFade'

interface templateForm {
  name: string
  description: string
  validFor: {
    startDateTime: string | null
    endDateTime: string | null
  }
}
const AddNewCategoryModal = (props: any) => {
  const { handleClose } = props
  const {
    formState: { errors, ...remain },
    control,
    handleSubmit,
    ...methods
  } = useForm<templateForm>({
    defaultValues: {
      name: '',
      description: '',
      validFor: {
        startDateTime: null,
        endDateTime: null
      }
    }
  })
  const { mutate, isSuccess, isLoading } = useCreateCategory()

  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  const onSubmit = (data: templateForm) => {
    mutate({ ...data })
  }

  return (
    <>
      {isLoading && <LoadingWithFade />}
      <CModal show={true} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <h5>{'Add new category'}</h5>
        </CModalHeader>
        <CModalBody>
          <FormProvider {...methods} {...{ formState: { errors, ...remain }, control, handleSubmit }}>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CRow>
                <CCol sm={12}>
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="name"
                      render={({ field }) => <CInput placeholder={'Enter Product Offer'} {...field} />}
                    />
                    {errors.name && <CFormText className="help-block">Please enter a name</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <CFormGroup>
                    <CLabel htmlFor="validFor">Valid For</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cilCalendar" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="validFor"
                        render={({ field }) => {
                          const { value, onChange, ref } = field
                          return (
                            <div className={'datepicker'}>
                              <DateRangePicker
                                startDate={
                                  moment(value?.startDateTime, DATETIME_FORMAT).isValid()
                                    ? moment(value?.startDateTime)
                                    : null
                                }
                                endDate={
                                  moment(value?.endDateTime, DATETIME_FORMAT).isValid()
                                    ? moment(value?.endDateTime)
                                    : null
                                }
                                onDatesChange={({ startDate, endDate }) =>
                                  onChange({
                                    startDateTime: moment(startDate).format(DATETIME_FORMAT),
                                    endDateTime: moment(endDate).format(DATETIME_FORMAT)
                                  })
                                }
                                ref={ref}
                              />
                            </div>
                          )
                        }}
                      />
                    </CInputGroup>
                    {errors.validFor && <CFormText className="help-block">Please enter a date range</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <CFormGroup>
                    <CLabel>Description</CLabel>
                    <CInputGroup>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="description"
                        render={({ field }) => (
                          <CTextarea placeholder={'Enter Description'} {...field} rows={4} style={{ resize: 'none' }} />
                        )}
                      />
                    </CInputGroup>
                    {errors.description && <CFormText className="help-block">Please insert a description</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
              <div className={'mt-5 d-flex justify-content-between mb-5'}>
                <div className={'d-flex'}>
                  <CButton
                    className={'text-uppercase px-5 mr-3'}
                    variant="outline"
                    color={'white'}
                    onClick={handleClose}
                  >
                    Cancel
                  </CButton>
                  <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                    Submit
                  </CButton>
                </div>
              </div>
            </CForm>
          </FormProvider>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddNewCategoryModal
