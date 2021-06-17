import React, { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { ArrowDownIcon } from 'assets/icons/externalIcons'
import CIcon from '@coreui/icons-react'
import { DATETIME_FORMAT, DATETIME_FORMAT_SHOW } from 'config'
import dayjs from 'dayjs'
import SLAAccordViewer from 'components/SLAAccordViewer'

import {
  CForm,
  CFormGroup,
  CRow,
  CCol,
  CLabel,
  CButton,
  CTextarea,
  CFormText,
  CCollapse,
  CInputGroup,
  CContainer,
  CInput,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CTabs,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react'
import { useAllCategories, useGetMembers } from 'hooks/api/Resources'
import { useSearchOffers } from 'hooks/api/Products'
import Autosuggest from 'react-autosuggest'

interface Search {
  search: string
  category: string
  location: string
  maxPrice: number | ''
  minPrice: number | ''
  currency: string
  stakeholder: string
}

// /tmf-api/productCatalogManagement/v4/productOffering
interface SearchFormTypes {}

const escapeRegexCharacters = (str: any) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const SearchForm: React.FC<SearchFormTypes> = (props: any) => {
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [modal, setModal] = useState<any | null>(null)

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<Search>({
    defaultValues: {
      category: '',
      location: '',
      maxPrice: '',
      minPrice: '',
      currency: '',
      stakeholder: ''
    }
  })

  const [suggestions, setSuggestions] = useState<any>([])
  const [suggestionsMembers, setSuggestionsMembers] = useState<any>([])

  const { data, mutate, isLoading, reset: mutationReset } = useSearchOffers()
  const { data: categories, isLoading: isLoadingCategories } = useAllCategories()
  const { data: members, isLoading: isLoadingMembers } = useGetMembers()

  const fields = [
    'name',
    'description',
    'category',
    {
      key: 'place',
      label: 'Location'
    },
    {
      key: 'stakeholder',
      label: 'Stakeholder'
    },
    {
      key: 'productOfferingPrice',
      label: 'Price Type'
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const clearForm = () => {
    reset({
      search: '',
      category: '',
      location: '',
      maxPrice: '',
      minPrice: '',
      currency: '',
      stakeholder: ''
    })
    mutationReset()
  }

  const submit = (form: Search) => {
    mutate(form)
  }

  const getSuggestions = (value: any) => {
    const escapedValue = escapeRegexCharacters(value?.trim())

    if (escapedValue === '') {
      return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    return !isLoadingCategories ? categories?.filter((category) => regex.test(category?.name)) : []
  }

  const getSuggestionsMembers = (value: any) => {
    const escapedValue = escapeRegexCharacters(value?.trim())

    if (escapedValue === '') {
      return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    return !isLoadingMembers ? members?.filter((member) => regex.test(member?.legalName)) : []
  }

  const onSuggestionsFetchRequestedMembers = ({ value }) => {
    setSuggestionsMembers(getSuggestionsMembers(value))
  }

  const onSuggestionsClearRequestedMembers = () => {
    setSuggestionsMembers([])
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const arrayToStringsData = (item: any, property: string) => (
    <td>{item?.map((el: any) => el?.[property])?.join(', ')}</td>
  )

  const stakeholderRender = (item: any) => (
    <td>{item?.productSpecification?.relatedParty?.map((el) => el.name)?.join(', ')}</td>
  )
  const locationRender = (item: any) => (
    <td>
      {item?.place
        ?.map((el) => {
          return el?.geographicLocation?.name
        })
        ?.join(', ')}
    </td>
  )

  const showButton = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  const splitResourceCaract = (value: string) => {
    const splitted = value.split(',')
    if (splitted.length > 1) {
      return splitted.map((el, key) => <p key={key}>{el}</p>)
    }
    return <p>{value}</p>
  }

  return (
    <>
      <CForm onSubmit={handleSubmit(submit)}>
        {data && (
          <CRow>
            <CCol className={'d-flex justify-content-end align-items-center mb-1'}>
              <CButton variant={'ghost'} className="d-flex align-items-center" onClick={clearForm}>
                <CIcon name="cilTrash" size={'lg'} className={'mr-2'} />
                Clear Search
              </CButton>
            </CCol>
          </CRow>
        )}
        <CRow className={'mb-4'}>
          <CCol xs="6">
            <CFormGroup>
              <CLabel>Category</CLabel>
              <CInputGroup>
                <Controller
                  control={control}
                  defaultValue={''}
                  name="category"
                  data-testid={'category'}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      getSuggestionValue={(selected: any) => selected?.name}
                      renderSuggestion={(sugg: any) => <span>{sugg?.name}</span>}
                      id={'category-autosuggestion'}
                      inputProps={{
                        placeholder: 'Selection category',
                        onChange: (event, { newValue }) => onChange(newValue),
                        onBlur: onBlur,
                        value: value
                      }}
                    />
                  )}
                />
              </CInputGroup>
              {errors.category && (
                <CFormText className="help-block" data-testid="error-message">
                  Please enter a valid category
                </CFormText>
              )}
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol>
                  <CLabel>Currency</CLabel>
                  <CInputGroup>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name="currency"
                      data-testid={'currency'}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CInput placeholder={'Euro'} onChange={onChange} onBlur={onBlur} value={value} />
                      )}
                    />
                  </CInputGroup>
                  {errors.currency && (
                    <CFormText className="help-block" data-testid="error-message">
                      Please enter a valid currency
                    </CFormText>
                  )}
                </CCol>
                <CCol>
                  <CLabel>Min Price</CLabel>
                  <CInputGroup>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name="minPrice"
                      data-testid={'minPrice'}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CInput placeholder={'000'} onChange={onChange} onBlur={onBlur} value={value} type={'number'} />
                      )}
                    />
                  </CInputGroup>
                  {errors.minPrice && (
                    <CFormText className="help-block" data-testid="error-message">
                      Please enter a valid number
                    </CFormText>
                  )}
                </CCol>
                <CCol>
                  <CLabel>Max Price</CLabel>
                  <CInputGroup>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name="maxPrice"
                      data-testid={'maxPrice'}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CInput placeholder={'000'} onChange={onChange} onBlur={onBlur} value={value} type={'number'} />
                      )}
                    />
                  </CInputGroup>
                  {errors.maxPrice && (
                    <CFormText className="help-block" data-testid="error-message">
                      Please enter a valid number
                    </CFormText>
                  )}
                </CCol>
              </CRow>
            </CFormGroup>
          </CCol>
          <CCol xs="6">
            <CFormGroup>
              <CLabel>Location</CLabel>
              <CInputGroup>
                <Controller
                  control={control}
                  defaultValue={''}
                  name="location"
                  data-testid={'location'}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CInput placeholder={'Enter location'} onChange={onChange} onBlur={onBlur} value={value} />
                  )}
                />
              </CInputGroup>
              {errors.location && (
                <CFormText className="help-block" data-testid="error-message">
                  Please enter a valid location
                </CFormText>
              )}
            </CFormGroup>
            <CFormGroup>
              <CLabel>Stakeholder Preference</CLabel>
              <CInputGroup>
                <Controller
                  control={control}
                  defaultValue={''}
                  name="stakeholder"
                  data-testid={'stakeholder'}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Autosuggest
                      suggestions={suggestionsMembers}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequestedMembers}
                      onSuggestionsClearRequested={onSuggestionsClearRequestedMembers}
                      getSuggestionValue={(selected: any) => selected?.legalName}
                      renderSuggestion={(sugg: any) => <span>{sugg?.legalName}</span>}
                      id={'stakeholder-autosuggestion'}
                      inputProps={{
                        placeholder: 'Selection stakeholder',
                        onChange: (event, { newValue }) => onChange(newValue),
                        onBlur: onBlur,
                        value: value
                      }}
                    />
                  )}
                />
              </CInputGroup>
              {errors.stakeholder && (
                <CFormText className="help-block" data-testid="error-message">
                  Please enter a valid stakeholder
                </CFormText>
              )}
            </CFormGroup>
          </CCol>
        </CRow>
        <button
          type="button"
          onClick={() => setAdvancedSearch((previous) => !previous)}
          className={'btn btn-link d-flex search-offers--advanced align-items-center'}
        >
          <p>Advanced Search</p>
          <ArrowDownIcon height={'1.5rem'} />
        </button>
        <CCollapse show={advancedSearch}>
          <CContainer>
            <CFormGroup>
              <CRow className={'d-flex align-items-center justify-content-space-between mb-4'}>
                <CCol className={'d-flex justify-content-start '}>
                  <CLabel htmlFor="search" className={'mb-0'}>
                    Insert your search
                  </CLabel>
                </CCol>
              </CRow>
              <Controller
                control={control}
                defaultValue={''}
                name="search"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CTextarea rows={8} onChange={onChange} onBlur={onBlur} value={value} />
                )}
              />
              {errors.search && <CFormText className="help-block">Please enter a search</CFormText>}
            </CFormGroup>
          </CContainer>
        </CCollapse>
        <CButton
          type="submit"
          block={false}
          variant={'outline'}
          color={'white'}
          className="text-uppercase px-5 float-right mt-4 mb-4"
        >
          Search
        </CButton>
      </CForm>

      {data && (
        <CContainer className={'p-0 mt-4 '}>
          <CDataTable
            cleaner
            loading={isLoading}
            items={data?.filter((el) => el != null) ?? []}
            columnFilter
            tableFilter
            clickableRows
            fields={fields}
            itemsPerPage={5}
            sorter
            hover
            pagination
            scopedSlots={{
              category: (item: any) => arrayToStringsData(item?.category, 'name'),
              place: (item: any) => locationRender(item),
              stakeholder: (item: any) => stakeholderRender(item),
              productOfferingPrice: (item: any) => arrayToStringsData(item?.productOfferingPrice, 'priceType'),
              show_details: (item: any) => showButton(item)
            }}
          />
        </CContainer>
      )}

      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Product Offer'}</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="description">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="description" color={'#6C6E7E'}>
                  Description
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="specifications" color={'#6C6E7E'}>
                  Specifications
                </CNavLink>
              </CNavItem>
              {modal?.productOfferingPrice?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="price" color={'#6C6E7E'}>
                    Price
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.serviceLevelAgreement && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="sla" color={'#6C6E7E'}>
                    SLA
                  </CNavLink>
                </CNavItem>
              )}
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow className={'mt-2'}>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
                  </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description</p>
                    <p>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Location:</p>{' '}
                    <p>
                      {modal?.place
                        ?.map((el) => {
                          return el?.geographicLocation?.name
                        })
                        ?.join(', ')}
                    </p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Category</p>
                    <p> {modal?.category?.map((el: any) => el?.name)?.join(', ')}</p>
                  </CCol>
                </CRow>
                <CRow className={'p-3 mt-4'}>
                  <p className={'text-light mb-2'}>Valid for: </p>
                </CRow>
                {modal?.validFor && (
                  <CRow className={'pl-3 pr-3'}>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>From:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.startDateTime).isValid()
                          ? dayjs(modal?.validFor?.startDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>To:</p>{' '}
                      <p>
                        {dayjs(modal?.validFor?.endDateTime).isValid()
                          ? dayjs(modal?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  </CRow>
                )}
              </CTabPane>
              <CTabPane data-tab="specifications">
                <CContainer>
                  <CContainer
                    className={'pl-0 pr-0'}
                    style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                  >
                    <CRow className={'mt-4'}>
                      <CCol>
                        <p className={'text-light mb-2'}>Name</p>
                        <p className={'font-18 mb-4'}>{modal?.productSpecification?.name}</p>
                      </CCol>
                      {modal?.productSpecification?.lifecycleStatus != null &&
                        modal?.productSpecification?.lifecycleStatus !== '' && (
                          <CCol>
                            <p className={'text-light mb-2'}>Status</p>
                            <p className={'font-16 mb-4'}>{modal?.productSpecification?.lifecycleStatus}</p>
                          </CCol>
                      )}
                    </CRow>
                    {modal?.productSpecification?.description != null &&
                      modal?.productSpecification?.description !== '' && (
                        <CRow className={'mt-2'}>
                          <CCol>
                            <p className={'text-light mb-2'}>Description</p>
                            <p className={'font-16 mb-4'}>{modal?.productSpecification?.description}</p>
                          </CCol>
                        </CRow>
                    )}
                  </CContainer>
                  {modal?.productSpecification?.serviceSpecification?.length > 0 && (
                    <CContainer
                      className={'pl-0 pr-0'}
                      style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}
                    >
                      <h5>Service Specification</h5>
                      {modal?.productSpecification?.serviceSpecification?.map((ss: any, index: number) => (
                        <CContainer key={`serviceSpecification-${index}`} className={'pl-0 pr-0'}>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-16 mb-4'}>{ss?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{ss?.description}</p>
                            </CCol>
                          </CRow>
                          {ss?.serviceSpecCharacteristic?.length > 0 && <h5>Service Characteristics</h5>}
                          {ss?.serviceSpecCharacteristic?.map((el, index) => (
                            <CContainer key={`serviceSpecCharacteristic-${index}`} className={''}>
                              <CRow className={'mt-2'}>
                                <CCol>
                                  <p className={'text-light mb-2'}>Name</p>
                                  <p className={'font-16 mb-4'}>{el?.name}</p>
                                </CCol>
                              </CRow>
                              <CRow className={'mt-2'}>
                                <CCol>
                                  <p className={'text-light mb-2'}>Description</p>
                                  <p className={'font-16 mb-4'}>{el?.description}</p>
                                </CCol>
                              </CRow>
                              {el?.serviceSpecCharacteristicValue?.map((resource, index) => (
                                <CRow className={'mt-2'} key={`serviceSpecCharacteristicValue-${index}`}>
                                  {resource?.value?.alias && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                      <div className={'font-16 mb-4'}>
                                        {splitResourceCaract(resource?.value?.value)}
                                      </div>
                                    </CCol>
                                  )}
                                  {resource?.unitOfMeasure && (
                                    <CCol>
                                      <p className={'text-light mb-2'}>Unit Of Measure</p>
                                      <p className={'font-16 mb-4'}>{resource?.unitOfMeasure}</p>
                                    </CCol>
                                  )}
                                </CRow>
                              ))}
                            </CContainer>
                          ))}
                        </CContainer>
                      ))}
                    </CContainer>
                  )}
                  {modal?.productSpecification?.resourceSpecification?.length > 0 && <h5>Resource Specification</h5>}
                  {modal?.productSpecification?.resourceSpecification?.map((rs: any, rsIndex: number) => (
                    <CContainer key={`offer-rs-${rsIndex}`} className={'pl-0 pr-0'}>
                      <CRow className={'mt-2'}>
                        <CCol>
                          <p className={'text-light mb-2'}>Name</p>
                          <p className={'font-18 mb-4'}>{rs?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-2'}>
                        <CCol>
                          <p className={'text-light mb-2'}>Description</p>
                          <p className={'font-16 mb-4'}>{rs?.description}</p>
                        </CCol>
                      </CRow>
                      {rs?.resourceSpecCharacteristic?.length && (
                        <h5>Resource Characteristics</h5>
                      )}

                      {rs?.resourceSpecCharacteristic?.map((el: any, index: number) => (
                        <CContainer key={`resourceCharacteristics-${index}`} className={''}>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Name</p>
                              <p className={'font-16 mb-4'}>{el?.name}</p>
                            </CCol>
                          </CRow>
                          <CRow className={'mt-2'}>
                            <CCol>
                              <p className={'text-light mb-2'}>Description</p>
                              <p className={'font-16 mb-4'}>{el?.description}</p>
                            </CCol>
                          </CRow>
                          {el?.resourceSpecCharacteristicValue?.map((resource, index) => (
                            <CRow className={'mt-2'} key={`resourceSpecCharacteristicValue-${index}`}>
                              {resource?.value?.alias && (
                                <CCol>
                                  <p className={'text-light mb-2'}>{resource?.value?.alias}</p>
                                  <div className={'font-16 mb-4'}>{splitResourceCaract(resource?.value?.value)}</div>
                                </CCol>
                              )}
                              {resource?.unitOfMeasure && (
                                <CCol>
                                  <p className={'text-light mb-2'}>Unit Of Measure</p>
                                  <p className={'font-16 mb-4'}>{resource?.unitOfMeasure}</p>
                                </CCol>
                              )}
                            </CRow>
                          ))}
                        </CContainer>
                      ))}
                    </CContainer>
                  ))}
                </CContainer>
              </CTabPane>
              {modal?.productOfferingPrice?.length > 0 && (
                <CTabPane data-tab="price">
                  {modal?.productOfferingPrice?.map((el: any) => (
                    <CContainer
                      key={`priceOffer-${el?.id}`}
                    >
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p> <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="12">
                          <p className={'text-light mb-2'}>Description</p>
                          <p>{el?.description}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price:</p>
                          <p>{el?.price?.value}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Unit:</p>
                          <p>{el?.price?.unit}</p>
                        </CCol>
                      </CRow>
                      <CRow className={'mt-4'}>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Price Type:</p>
                          <p>{el?.priceType}</p>
                        </CCol>
                      </CRow>

                      {el?.unitOfMeasure?.units != null &&
                        el?.unitOfMeasure?.units !== '' &&
                        el?.unitOfMeasure?.amount != null && (
                          <CRow className={'mt-4'}>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Unit Of Measure:</p>
                              <p>{el?.unitOfMeasure?.amount}</p>
                            </CCol>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Units:</p>
                              <p>{el?.unitOfMeasure?.units}</p>
                            </CCol>
                          </CRow>
                      )}
                      {el?.recurringChargePeriodType != null &&
                        el?.recurringChargePeriodType !== '' &&
                        el?.recurringChargePeriodLength != null && (
                          <CRow className={'mt-4'}>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Recurring Charge Period Type:</p>
                              <p>{el?.recurringChargePeriodType}</p>
                            </CCol>
                            <CCol xs="6">
                              <p className={'text-light mb-2'}>Recurring Charge Period Length:</p>
                              <p>{el?.recurringChargePeriodLength}</p>
                            </CCol>
                          </CRow>
                      )}
                      <CRow className={'p-3 mt-4'}>
                        <p className={'text-light mb-2'}>Valid for: </p>
                      </CRow>
                      {el?.validFor && (
                        <CRow className={'pl-3 pr-3'}>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT_SHOW)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT_SHOW)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
                    </CContainer>
                  ))}
                </CTabPane>
              )}
              {modal?.serviceLevelAgreement != null && (
                <CTabPane data-tab="sla">
                  <CRow>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>Name:</p> <p>{modal?.serviceLevelAgreement?.name}</p>
                    </CCol>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>Last Update:</p>{' '}
                      <p>
                        {dayjs(modal?.serviceLevelAgreement?.statusUpdated).isValid()
                          ? dayjs(modal?.serviceLevelAgreement?.statusUpdated).format(DATETIME_FORMAT_SHOW)
                          : '-'}
                      </p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <p className={'text-light mb-2'}>Description</p>
                      <p>{modal?.serviceLevelAgreement?.description}</p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <p className={'text-light mb-2'}>Status:</p>

                      <p>{modal?.serviceLevelAgreement?.status}</p>
                    </CCol>
                  </CRow>
                  <CRow className={'p-3'}>
                    <SLAAccordViewer
                      id={modal?.serviceLevelAgreement?.id}
                      templateHref={modal?.serviceLevelAgreement?.templateRef?.href}
                      readOnly={true}
                    ></SLAAccordViewer>
                  </CRow>
                </CTabPane>
              )}
            </CTabContent>
          </CTabs>
        </CModalBody>
      </CModal>
    </>
  )
}

export default SearchForm
