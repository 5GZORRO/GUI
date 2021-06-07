import React, { useEffect, useState } from 'react'
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
  CInputGroup,
  CInputGroupAppend,
  CCollapse,
  CSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CDataTable,
  CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'

import { ArrowLeftIcon, PlusCircle, MinusCircle, ArrowDownIcon } from 'assets/icons/externalIcons'

import { useCreateProductOfferingPrice } from 'hooks/api/Resources'
import { schemaRegister, TransformFormData } from './util'
import LoadingWithFade from 'components/LoadingWithFade'

import DateRangePicker from 'components/DateRangePicker'
import moment from 'moment'
import { DATETIME_FORMAT, DATETIME_FORMAT_SHOW } from 'config'
import { useAllLicences } from 'hooks/api/SLA'
import dayjs from 'dayjs'
import SLATemplateAccordViewer from 'components/SLATemplateAccordViewer'

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: '#3C3C43', borderColor: '#3C3C43' }),
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
  multiValue: (styles: any, { data }) => {
    return {
      ...styles,
      backgroundColor: '#32333A'
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    backgroundColor: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white'
    }
  })
}

interface formProductOfferingPriceCreation {
  name: string
  description: string
  validFor: {
    endDateTime: string | null
    startDateTime: string | null
  }
  recurringChargePeriodLength: number
  recurringChargePeriodType: string
  lifecycleStatus: string
  unitOfMeasure: {
    amount: number
    units: string
  }
  priceType: string
  price: {
    unit: string
    value: number
  }
  pricingLogicAlgorithm: []
  prodSpecCharValueUse: [
    {
      name: string
      description: string
      valueType: string
      configurable: boolean
      isUnique: boolean
      productSpecCharacteristicValue: [
        {
          isDefault: boolean
          valueType: string
          value: string
        }
      ]
    },
    {
      name: string
      description: string
      valueType: string
      configurable: boolean
      isUnique: boolean
      productSpecCharacteristicValue: [
        {
          isDefault: boolean
          valueType: string
          value: string
        }
      ]
    },
    {
      name: string
      description: string
      valueType: string
      configurable: boolean
      isUnique: boolean
      productSpecCharacteristicValue: [
        {
          isDefault: boolean
          valueType: string
          value: string
        }
      ]
    },
    {
      name: string
      description: string
      valueType: string
      configurable: boolean
      isUnique: boolean
      productSpecCharacteristicValue: [
        {
          isDefault: boolean
          valueType: string
          value: string
        }
      ]
    }
  ]
}

const NewProductOfferingPrice = () => {
  const history = useHistory()
  const [recurringState, setRecurringState] = useState(0)
  const [unitState, setUnitState] = useState(0)
  const [advancedSearch, setAdvancedSearch] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    register
  } = useForm<formProductOfferingPriceCreation>({
    defaultValues: {
      name: '',
      description: '',
      validFor: {
        startDateTime: null,
        endDateTime: null
      },
      recurringChargePeriodType: '',
      recurringChargePeriodLength: recurringState,
      lifecycleStatus: '',
      unitOfMeasure: {
        amount: 0,
        units: ''
      },
      price: {
        unit: '',
        value: 0
      },
      priceType: '',
      pricingLogicAlgorithm: [],
      prodSpecCharValueUse: [
        {
          productSpecCharacteristicValue: [
            {
              isDefault: true,
              valueType: 'string',
              value: ''
            }
          ]
        },
        {
          productSpecCharacteristicValue: [
            {
              isDefault: true,
              valueType: 'string',
              value: ''
            }
          ]
        },
        {
          productSpecCharacteristicValue: [
            {
              isDefault: true,
              valueType: 'string',
              value: ''
            }
          ]
        },
        {
          productSpecCharacteristicValue: []
        }
      ]
    }
  })
  const [modal, setModal] = useState<any | null>(null)
  const { mutate, isSuccess, isLoading } = useCreateProductOfferingPrice()
  const { data: licences, isLoading: isLoadingLicences } = useAllLicences()

  const priceType = watch('priceType')

  const fields = [
    { key: 'select', label: '', filter: false, sorter: false },
    'id',
    'name',
    'status',
    'created',
    'category',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const onSubmit = (data: formProductOfferingPriceCreation) => {
    console.log(data)
    const newData = TransformFormData(data)
    mutate(newData)
  }

  useEffect(() => {
    if (isSuccess) {
      history.push('/prices/')
    }
  }, [isSuccess])

  useEffect(() => {
    setValue('recurringChargePeriodLength', recurringState)
  }, [recurringState])

  const handleMinus = () => {
    if (recurringState > 0) {
      setRecurringState((previous) => previous - 1)
    }
  }

  const handleUnitMinus = () => {
    if (unitState > 0) {
      setUnitState((previous) => previous - 1)
    }
  }

  const renderCreated = (item: any) => {
    return (
      <td className="py-2">
        {dayjs(item?.created).isValid() ? dayjs(item?.created).format(DATETIME_FORMAT_SHOW) : '-'}
      </td>
    )
  }
  const renderCategory = (item: any) => {
    return <td className="py-2">{item?.category ? item.category : '-'}</td>
  }

  const renderShowDetails = (item: any) => {
    return (
      <td className="py-2">
        <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
          {'Show'}
        </CButton>
      </td>
    )
  }

  const [selectedMeasures, setSelectedMeasures] = useState<any>([])

  useEffect(() => {
    setValue('prodSpecCharValueUse.3.productSpecCharacteristicValue', selectedMeasures)
  }, [selectedMeasures])

  const checkMeasure = (item: any) => {
    const found = selectedMeasures.find((measure: any) => measure?.value === item.value)

    if (!found) {
      setSelectedMeasures((previous: any) => [...previous, item])
    } else {
      setSelectedMeasures((previous: any) => previous.filter((measure: any) => measure?.value !== item?.value))
    }
  }

  const renderMeasureAggregation = () => {
    return ['MAX', 'MIN', 'CONCURRENT', 'MEAN'].map((el, index) => (
      <CCol key={el}>
        <input
          id={el}
          type={'checkbox'}
          name={'prodSpecCharValueUse.3.productSpecCharacteristicValue'}
          defaultValue={JSON.stringify({
            isDefault: false,
            valueType: 'string',
            value: el
          })}
          value={el}
          checked={selectedMeasures.find((measure: any) => measure?.value === el)}
          onChange={() =>
            checkMeasure({
              isDefault: false,
              valueType: 'string',
              value: el
            })
          }
        />
        <label htmlFor={el}>{el}</label>
      </CCol>
    ))
  }

  const [selectedLicence, setSelectedLicence] = useState<any>([])

  useEffect(() => {
    setValue('pricingLogicAlgorithm', selectedLicence)
  }, [selectedLicence])

  const checkLicence = (item: any) => {
    const found = selectedLicence.find((pop: any) => pop?.id === item?.id)

    if (!found) {
      setSelectedLicence((previous: any) => [...previous, item])
    } else {
      setSelectedLicence((previous: any) => previous.filter((licence: any) => licence?.id !== item?.id))
    }
  }

  const pricingLogicAlgorithmSelectComponent = (item: any) => (
    <td>
      <input
        style={{ opacity: 1 }}
        type={'checkbox'}
        name={`pricingLogicAlgorithm[${item?.id}]`}
        defaultValue={JSON.stringify(item)}
        checked={selectedLicence.find((licence: any) => licence?.id === item?.id)}
        onChange={() => checkLicence(item)}
      />
    </td>
  )

  return (
    <>
      {isLoading && <LoadingWithFade />}

      <CContainer>
        <h1 className={'mb-5'}>New Product Offer Price</h1>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CCard>
            <CCardHeader>
              <h5>Product Offering Price Creation</h5>
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
                <CCol sm={6}>
                  <CFormGroup>
                    <CLabel htmlFor="lifecycleStatus">Life Cycle</CLabel>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="lifecycleStatus"
                      render={({ field }) => <CInput placeholder={'Enter a name'} {...field} />}
                    />
                    {errors.lifecycleStatus && <CFormText className="help-block">Please enter a life cycle</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="priceType">Price Type</CLabel>

                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="priceType"
                      render={({ field }) => (
                        <CSelect {...field} id="priceType">
                          <option value="" disabled>
                            Select one
                          </option>

                          <option value="oneTime">One Time</option>
                          <option value="recurring">Recurring</option>
                          <option value="usage">Usage</option>
                        </CSelect>
                      )}
                    />
                    {errors.priceType && <CFormText className="help-block">Please enter a price type</CFormText>}
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="priceUnit">Price Type</CLabel>

                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="price.unit"
                      render={({ field }) => <CInput placeholder={'Enter a price unit'} id="priceUnit" {...field} />}
                    />
                    {errors?.price?.unit && <CFormText className="help-block">Please enter a price unit</CFormText>}
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="priceUnit">Price Value</CLabel>

                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name="price.value"
                      render={({ field }) => <CInput placeholder={'Enter an amount'} id="priceValue" {...field} />}
                    />
                    {errors?.price?.value && <CFormText className="help-block">Please enter an amount</CFormText>}
                  </CFormGroup>
                </CCol>
              </CRow>
              {priceType === 'recurring' && (
                <CContainer className={'p-0'}>
                  <CCol sm={6} className={'p-0'}>
                    <CLabel>Recurring Charge Period</CLabel>
                    <CRow>
                      <CCol sm={8}>
                        <CFormGroup>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name="recurringChargePeriodType"
                            render={({ field }) => <CInput placeholder={'Enter a period'} {...field} />}
                          />
                          {errors.recurringChargePeriodType && (
                            <CFormText className="help-block">Please enter a period</CFormText>
                          )}
                        </CFormGroup>
                      </CCol>
                      <CCol sm={4}>
                        <CFormGroup>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CButton type="button" color="transparent" onClick={handleMinus}>
                                <MinusCircle />
                              </CButton>
                            </CInputGroupPrepend>
                            <Controller
                              control={control}
                              defaultValue={''}
                              name="recurringChargePeriodLength"
                              render={({ field }) => (
                                <CInput
                                  placeholder={'0'}
                                  {...field}
                                  value={recurringState}
                                  min={0}
                                  onChange={(e: any) => setRecurringState(Number(e?.target?.value))}
                                />
                              )}
                            />

                            <CInputGroupAppend>
                              <CButton
                                type="button"
                                color="transparent"
                                onClick={() => setRecurringState((previous) => previous + 1)}
                              >
                                <PlusCircle />
                              </CButton>
                            </CInputGroupAppend>
                            {errors.recurringChargePeriodLength && (
                              <CFormText className="help-block">Please enter a number</CFormText>
                            )}
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCol>
                </CContainer>
              )}

              {priceType === 'usage' && (
                <CContainer>
                  <CCol>
                    <CLabel htmlFor="lifecycleStatus">Unit of Measure</CLabel>
                    <CRow>
                      <CCol sm="6">
                        <CFormGroup>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name="recurringChargePeriodType"
                            render={({ field }) => (
                              <CSelect {...field} id="lifecycleStatus">
                                <option value="Time">Time</option>
                                <option value="Users">Users</option>
                                <option value="Instances">Instances</option>
                              </CSelect>
                            )}
                          />
                          {errors.recurringChargePeriodType && (
                            <CFormText className="help-block">Please enter a period</CFormText>
                          )}
                        </CFormGroup>
                      </CCol>
                      <CCol sm="6">
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CButton type="button" color="transparent" onClick={handleUnitMinus}>
                              <MinusCircle />
                            </CButton>
                          </CInputGroupPrepend>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name="unitOfMeasure.amount"
                            render={({ field }) => (
                              <CInput
                                placeholder={'0'}
                                {...field}
                                value={unitState}
                                min={0}
                                onChange={(e: any) => setUnitState(Number(e?.target?.value))}
                              />
                            )}
                          />
                          <CInputGroupAppend>
                            <CButton
                              type="button"
                              color="transparent"
                              onClick={() => setUnitState((previous) => previous + 1)}
                            >
                              <PlusCircle />
                            </CButton>
                          </CInputGroupAppend>
                          {errors?.unitOfMeasure?.amount && (
                            <CFormText className="help-block">Please enter a number</CFormText>
                          )}
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CCol>
                </CContainer>
              )}

              <button
                type="button"
                onClick={() => setAdvancedSearch((previous) => !previous)}
                className={'btn btn-link d-flex search-offers--advanced align-items-center'}
              >
                <p>Advanced Fields</p>
                <ArrowDownIcon height={'1.5rem'} />
              </button>
              <CCollapse show={advancedSearch}>
                <CContainer className={'p-0'}>
                  <CRow>
                    <CCol sm={6}>
                      <CFormGroup>
                        <CLabel htmlFor="prodSpecCharValueUse.0.productSpecCharacteristicValue.0.value">
                          Function Descriptor Name
                        </CLabel>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name="prodSpecCharValueUse.0.productSpecCharacteristicValue.0.value"
                          render={({ field }) => <CInput placeholder={'Enter a name'} {...field} />}
                        />
                        {errors.prodSpecCharValueUse?.[0]?.productSpecCharacteristicValue?.[0]?.value && (
                          <CFormText className="help-block">Please enter a name</CFormText>
                        )}
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <CFormGroup>
                        <CLabel htmlFor="prodSpecCharValueUse.1.productSpecCharacteristicValue.0.value">
                          Function Descriptor Type
                        </CLabel>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name="prodSpecCharValueUse.1.productSpecCharacteristicValue.0.value"
                          render={({ field }) => (
                            <CSelect {...field} id="functionDescriptorType">
                              <option value="" disabled>
                                Select one
                              </option>
                              <option value="SLICE">SLICE</option>
                              <option value="NETWORK_SERVICE">NETWORK SERVICE</option>
                              <option value="VIRTUAL_NETWORK_FUNCTION">VIRTUAL NETWORK FUNCTION</option>
                            </CSelect>
                          )}
                        />
                        {errors.prodSpecCharValueUse?.[1]?.productSpecCharacteristicValue?.[0]?.value && (
                          <CFormText className="help-block">Please select a type</CFormText>
                        )}
                      </CFormGroup>
                    </CCol>
                    <CCol sm={6}>
                      <CFormGroup>
                        <CLabel htmlFor="prodSpecCharValueUse.2.productSpecCharacteristicValue.0.value">
                          Price Logic
                        </CLabel>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name="prodSpecCharValueUse.2.productSpecCharacteristicValue.0.value"
                          render={({ field }) => (
                            <CSelect {...field} id="priceLogic">
                              <option value="" disabled>
                                Select one
                              </option>
                              <option value="TIME_OF_USE">TIME OF USE</option>
                              <option value="N_OF_USER">N OF USER</option>
                              <option value="N_OF_INSTANCES">N OF INSTANCES</option>
                              <option value="SIMPLE">SIMPLE</option>
                            </CSelect>
                          )}
                        />
                        {errors.prodSpecCharValueUse?.[2]?.productSpecCharacteristicValue?.[0]?.value && (
                          <CFormText className="help-block">Please select one</CFormText>
                        )}
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={12}>
                      <CFormGroup>
                        <CLabel htmlFor="prodSpecCharValueUse.3.productSpecCharacteristicValue">
                          Unit Of Measure Aggregation
                        </CLabel>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name="prodSpecCharValueUse.3.productSpecCharacteristicValue"
                          render={({ field }) => <CRow>{renderMeasureAggregation()}</CRow>}
                        />
                        {errors.prodSpecCharValueUse?.[3]?.productSpecCharacteristicValue && (
                          <CFormText className="help-block">Please select one</CFormText>
                        )}
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CFormGroup className={'p-3'}>
                      <CLabel>Licence</CLabel>
                      <CInputGroup>
                        <CCard className={'p-4'} style={{ width: '100%' }}>
                          <CDataTable
                            cleaner
                            loading={isLoadingLicences}
                            items={licences}
                            columnFilter
                            tableFilter
                            clickableRows
                            fields={fields}
                            itemsPerPage={5}
                            scopedSlots={{
                              select: (item: any) => pricingLogicAlgorithmSelectComponent(item),
                              created: (item: any) => renderCreated(item),
                              category: (item: any) => renderCategory(item),
                              show_details: (item: any) => renderShowDetails(item)
                            }}
                            sorter
                            hover
                            pagination
                          />
                        </CCard>
                      </CInputGroup>
                      {errors.pricingLogicAlgorithm && (
                        <CFormText className="help-block">Please select a licence</CFormText>
                      )}
                    </CFormGroup>
                  </CRow>
                  {modal != null && (
                    <CModal show={true} onClose={() => setModal(null)} size="lg">
                      <CModalHeader closeButton>
                        <h5>{`Legal Prose Template ${modal?.id}`}</h5>
                      </CModalHeader>
                      <CModalBody>
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>Last Update:</p>{' '}
                            <p>
                              {dayjs(modal?.statusUpdated).isValid()
                                ? dayjs(modal?.statusUpdated).format(DATETIME_FORMAT_SHOW)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <p className={'text-light mb-2'}>Description</p>
                            <p>{modal?.description}</p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>Status:</p>

                            <p>{modal?.status}</p>
                          </CCol>
                        </CRow>
                        <CRow className={'mt-2'}>
                          <SLATemplateAccordViewer id={modal?.id} readOnly={true}></SLATemplateAccordViewer>
                        </CRow>
                      </CModalBody>
                    </CModal>
                  )}
                </CContainer>
              </CCollapse>
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
    </>
  )
}

export default NewProductOfferingPrice
