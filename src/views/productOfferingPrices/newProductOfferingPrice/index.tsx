import React, { useEffect } from 'react'
import {
  CButton,
  CContainer,
  CForm,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CTextarea,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'

import { ArrowLeftIcon } from 'assets/icons/externalIcons'

import { useCreateProductOfferingPrice } from 'hooks/api/Resources'
import { schemaRegister } from './util'

import DateRangePicker from 'components/DateRangePicker'
import moment from 'moment'
import { DATETIME_FORMAT } from 'config'

interface formProductOfferingPriceCreation {
  name: string
  description: string
  validFor: {
    endDateTime: string | null
    startDateTime: string | null
  }
}

const NewProductOfferingPrice = () => {
  const history = useHistory()

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<formProductOfferingPriceCreation>({
    defaultValues: {
      name: '',
      description: '',
      validFor: {
        startDateTime: null,
        endDateTime: null
      }
    },
    resolver: yupResolver(schemaRegister)
  })

  const { mutate, isSuccess } = useCreateProductOfferingPrice()

  const onSubmit = (data: formProductOfferingPriceCreation) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      history.push('/prices/')
    }
  }, [isSuccess])

  return (
    <CContainer>
      <h1 className={'mb-5'}>New Product Offer</h1>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCard>
          <CCardHeader>
            <h5>Product offering Price creation</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="name"
                    render={({ field }) => <CInput placeholder={'Enter a name'} {...field} />}
                  />
                  {errors.name && <CFormText className="help-block">Please enter a name</CFormText>}
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12}>
                <CFormGroup>
                  <CLabel htmlFor="description">Description</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="description"
                    render={({ field }) => <CTextarea placeholder={'Enter a description'} {...field} />}
                  />
                  {errors.description && <CFormText className="help-block">Please enter a description</CFormText>}
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6}>
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
                          <DateRangePicker
                            startDate={
                              moment(value?.startDateTime, DATETIME_FORMAT).isValid()
                                ? moment(value?.startDateTime)
                                : null
                            }
                            endDate={
                              moment(value?.endDateTime, DATETIME_FORMAT).isValid() ? moment(value?.endDateTime) : null
                            }
                            onDatesChange={({ startDate, endDate }) =>
                              onChange({
                                startDateTime: moment(startDate).format(DATETIME_FORMAT),
                                endDateTime: moment(endDate).format(DATETIME_FORMAT)
                              })
                            }
                            ref={ref}
                          />
                        )
                      }}
                    />
                  </CInputGroup>
                  {errors.description && <CFormText className="help-block">Please enter a date range</CFormText>}
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <div className={'mt-5 d-flex justify-content-between mb-5'}>
          <CButton
            className={'text-uppercase px-5 d-flex align-items-center'}
            color={'gradient'}
            variant={'ghost'}
            onClick={() => history.goBack()}
          >
            <ArrowLeftIcon fill={'#fff'} />
            Previous
          </CButton>
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

export default NewProductOfferingPrice
