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
  CTabs,
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DATETIME_FORMAT } from 'config'
import moment from 'moment'

import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useAuthContext } from 'context/AuthContext'
import { useGetProductOffersBundle, useAllCategories } from 'hooks/api/Resources'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateOrder } from 'hooks/api/Orders'

import { PlusCircle, MinusCircle, ArrowLeftIcon } from 'assets/icons/externalIcons'
import AddNewCategoryModal from 'containers/AddNewCategoryModal'
import SingleDatePicker from 'components/SingleDatePicker'

import SelectedOffers from './tables/SelectedOffers'
import LoadingWithFade from 'components/LoadingWithFade'
import { schemaRegister, transformForm } from './utils'
import Select from 'react-select'

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: '#32333A', borderColor: '#3C3C43', color: 'white' }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#3C3C43',
      backgroundColor: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':hover': {
        backgroundColor: '#3C3C43',
        color: 'white'
      },

      ':active': {
        ...styles[':active'],
        backgroundColor: '#3C3C43'
      }
    }
  },
  singleValue: (styles, { data }) => ({ ...styles, color: 'white', backgroundColor: '#32333A' })
}

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
  const [priorityState, setPriorityState] = useState(0)

  const { user } = useAuthContext()

  const { mutate, isSuccess, isLoading } = useCreateOrder()

  const methods = useForm<formOrderCreation>({
    defaultValues: {
      description: '',
      category: null,
      requestedStartDate: null,
      requestedCompletionDate: null,
      externalId: '',
      priority: 0
    },
    resolver: yupResolver(schemaRegister)
  })

  const startDate = methods?.watch('requestedStartDate')

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = methods

  useEffect(() => {
    if (isSuccess) {
      history.push('/orders/')
    }
  }, [isSuccess])

  useEffect(() => {
    setValue('priority', priorityState)
  }, [priorityState])

  const handleMinus = () => {
    if (priorityState > 0) {
      setPriorityState((previous) => previous - 1)
    }
  }

  const handlePlus = () => {
    if (priorityState < 5) {
      setPriorityState((previous) => previous + 1)
    }
  }

  const onSubmit = (data: formOrderCreation) => {
    const formData = transformForm(data, { productOrderItem: offersData })
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
                <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="externalId">External Id</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{}}
                        name="externalId"
                        render={({ field }) => <CInput placeholder={'Enter an external id'} {...field} />}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="category">Category</CLabel>
                      <CInputGroup style={{ display: 'grid', gridTemplateColumns: '1fr 2.5rem', columnGap: '0.5rem' }}>
                          <Controller
                            control={control}
                            defaultValue={null}
                            name="category"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Select
                                onChange={(e: any) => {
                                  onChange(JSON.stringify(e))
                                }}
                                value={JSON.parse(value)}
                                ref={ref}
                                /* eslint-disable */
                                options={!isLoadingCategories ? categories?.map((el) => {
                                  let resp = ''
                                  switch (el?.name) {
                                    case 'VNF':
                                      resp = 'Virtual Network Function'
                                      break
                                    case 'Network Service':
                                      resp = 'Network Service'
                                      break
                                    case 'Slice':
                                      resp = 'Network Slice'
                                      break
                                    case 'Spectrum':
                                      resp = 'Spectrum'
                                      break
                                    case 'RAN':
                                      resp = 'Radio Access Network'
                                      break
                                    case 'Edge':
                                      resp = 'Edge'
                                      break
                                    case 'Cloud':
                                      resp = 'Cloud'
                                      break
                                    default:
                                      resp = el?.name
                                      break
                                  }
                                  return { value: el, label: resp }
                                }) : []}
                                className={'select'}
                                styles={colourStyles}
                              ></Select>
                            )}
                          />
                        {/* <CInputGroupAppend>
                          <CButton type="button" color="transparent" onClick={() => setAddCategoryModal(true)}>
                            <PlusCircle />
                          </CButton>
                        </CInputGroupAppend> */}
                      </CInputGroup>
                      {errors.category && (
                        <CFormText className="help-block">Please select at least a category</CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CLabel>Priority</CLabel>
                    <CRow>
                      <CCol sm="6" className="pl-1 pr-1">
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CButton type="button" color="transparent" onClick={handleMinus}>
                              <MinusCircle />
                            </CButton>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name="priority"
                            render={({ field }) => (
                              <CInput
                                placeholder={'0'}
                                {...field}
                                value={priorityState}
                                min={0}
                                onChange={(e: any) => setPriorityState(Number(e?.target?.value))}
                              />
                            )}
                          />

                          <CInputGroupAppend>
                            <CButton type="button" color="transparent" onClick={() => handlePlus()}>
                              <PlusCircle />
                            </CButton>
                          </CInputGroupAppend>
                          {errors.priority && <CFormText className="help-block">Please enter a number</CFormText>}
                        </CInputGroup>
                      </CCol>
                    </CRow>
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
