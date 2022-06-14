import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import {
  CContainer,
  CForm,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CInputGroup,
  CLabel,
  CRow,
  CTextarea,
  CInputGroupPrepend,
  CInputGroupText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DATETIME_FORMAT } from 'config'
import moment from 'moment'

import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useGetProductOffersBundle, useAllCategories } from 'hooks/api/Resources'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateOrder } from 'hooks/api/Orders'

import { ArrowLeftIcon } from 'assets/icons/externalIcons'
import AddNewCategoryModal from 'containers/AddNewCategoryModal'
import SingleDatePicker from 'components/SingleDatePicker'

import SelectedOffers from './tables/SelectedOffers'
import LoadingWithFade from 'components/LoadingWithFade'
import { schemaRegister, transformForm } from './utils'
import { useAuthContext } from 'context/AuthContext'

interface formOrderCreation {
  description: string
  requestedStartDate: string | null
  requestedCompletionDate: string | null
  externalId: string | null
  category: string | null
  priority: number
}

const FormCreateOrder: React.FC = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data: offersData, isLoading: offersLoading } = useGetProductOffersBundle(id)
  const { data: categories, isLoading: isLoadingCategories, refetch: refetchCategory } = useAllCategories()
  const [addCategoryModal, setAddCategoryModal] = useState<any>(false)
  const { user } = useAuthContext()
  const { mutate, isSuccess, isLoading } = useCreateOrder()

  const methods = useForm<formOrderCreation>({
    defaultValues: {
      description: '',
      requestedStartDate: null,
      requestedCompletionDate: null
    },
    resolver: yupResolver(schemaRegister)
  })

  const startDate = methods?.watch('requestedStartDate')

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  useEffect(() => {
    if (isSuccess) {
      history.push('/orders/')
    }
  }, [isSuccess])

  const onSubmit = (data: formOrderCreation) => {
    const formData = transformForm(data, { productOrderItem: offersData }, user)
    mutate({ ...formData })
  }

  return (
    <>
      {isLoading && <LoadingWithFade />}
      <CContainer>
        <h1 className={'mb-5'}>New Product Order</h1>
        <FormProvider {...methods}>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CCard>
              <CCardHeader>
                <h5>Product Order creation</h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="requestedStartDate">Requested Start Date</CLabel>
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
                          name="requestedStartDate"
                          render={({ field }) => {
                            const { value, onChange, ref } = field
                            return (
                              <div className={'datepicker'}>
                                <SingleDatePicker
                                  date={moment(value, DATETIME_FORMAT).isValid() ? moment(value) : null}
                                  onDateChange={(date) => onChange(moment(date).toISOString())}
                                  ref={ref}
                                />
                              </div>
                            )
                          }}
                        />
                      </CInputGroup>
                      {errors.requestedStartDate && <CFormText className="help-block">Please enter a date</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="requestedCompletionDate">Requested Completion Date</CLabel>
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
                          name="requestedCompletionDate"
                          render={({ field }) => {
                            const { value, onChange, ref } = field
                            return (
                              <div className={'datepicker'}>
                                <SingleDatePicker
                                  date={moment(value, DATETIME_FORMAT).isValid() ? moment(value) : null}
                                  onDateChange={(date) => onChange(moment(date).toISOString())}
                                  isOutsideRange={(date) =>
                                    moment(startDate).isValid()
                                      ? moment(date).isBefore(moment(startDate))
                                      : moment(date).isBefore(moment())
                                  }
                                  ref={ref}
                                />
                              </div>
                            )
                          }}
                        />
                      </CInputGroup>
                      {errors.requestedStartDate && <CFormText className="help-block">Please enter a date</CFormText>}
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
                          rules={{}}
                          name="description"
                          render={({ field }) => (
                            <CTextarea
                              placeholder={'Enter description'}
                              {...field}
                              rows={4}
                              style={{ resize: 'none' }}
                            />
                          )}
                        />
                      </CInputGroup>
                      {errors.description && <CFormText className="help-block">Please insert a description</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <SelectedOffers data={offersData} isLoading={offersLoading}></SelectedOffers>

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
                <Link to={'/orders/'}>
                  <CButton className={'text-uppercase px-5 mr-3'} variant="outline" color={'white'}>
                    Cancel
                  </CButton>
                </Link>
                <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                  Submit
                </CButton>
              </div>
            </div>
          </CForm>
        </FormProvider>
      </CContainer>
      {addCategoryModal && (
        <AddNewCategoryModal
          handleClose={() => {
            setAddCategoryModal(false)
            refetchCategory()
          }}
        ></AddNewCategoryModal>
      )}
    </>
  )
}

export default FormCreateOrder
