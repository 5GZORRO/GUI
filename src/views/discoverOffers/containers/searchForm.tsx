import React, { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { ArrowDownIcon } from 'assets/icons/externalIcons'
import { useSearchOffers } from 'hooks/api/Products'
import CIcon from '@coreui/icons-react'
import { DATETIME_FORMAT } from 'config'
import dayjs from 'dayjs'

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

interface Search {
  search: string
  category: string
  location: string
  maxPrice: number
  minPrice: number
  currency: string
  stakeholder: string
}

// /tmf-api/productCatalogManagement/v4/productOffering
interface SearchFormTypes {}

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
      maxPrice: 0.0,
      minPrice: 0.0,
      currency: '',
      stakeholder: ''
    }
  })

  const { data, mutate, isLoading, reset: mutationReset } = useSearchOffers()

  const fields = [
    'id',
    'name',
    'category',
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'owner',
      label: 'Stakeholder'
    },
    {
      key: 'productOfferingPrice',
      label: 'Price'
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
      maxPrice: 0.0,
      minPrice: 0.0,
      currency: '',
      stakeholder: ''
    })
    mutationReset()
  }

  const submit = (form: Search) => {
    mutate(form)
  }

  const arrayToStringsData = (item: any, property: string) => <td>{item?.map((el: any) => el[property]).join(', ')}</td>

  const showButton = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

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
                    <CInput placeholder={'Selection category'} onChange={onChange} onBlur={onBlur} value={value} />
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
                    <CInput
                      placeholder={'Enter stakeholder preference'}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
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
            items={data}
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
              location: (item: any) => arrayToStringsData(item?.place, 'name'),
              owner: (item: any) => arrayToStringsData(item?.owner, 'name'),
              productOfferingPrice: (item: any) => arrayToStringsData(item?.productOfferingPrice, 'name'),
              show_details: (item: any) => showButton(item)
            }}
          />
        </CContainer>
      )}

      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{`Product Offer ${modal?.id}`}</h5>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="description">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink className={'pl-0 mb-4'} data-tab="description" color={'#6C6E7E'}>
                  Description
                </CNavLink>
              </CNavItem>
              {modal?.category?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="category" color={'#6C6E7E'}>
                    Categories
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.productOfferingPrice?.length > 0 && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="price" color={'#6C6E7E'}>
                    Price
                  </CNavLink>
                </CNavItem>
              )}
              {modal?.isBundle && modal?.bundledProductOffering?.length && (
                <CNavItem>
                  <CNavLink className={'pl-0 mb-4'} data-tab="bundle" color={'#6C6E7E'}>
                    Bundle
                  </CNavLink>
                </CNavItem>
              )}
            </CNav>
            <CTabContent className={'mt-4'}>
              <CTabPane data-tab="description">
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Last Update:</p>{' '}
                    <p>{dayjs(modal?.lastUpdate).isValid() ? dayjs(modal?.lastUpdate).format(DATETIME_FORMAT) : '-'}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Sellable:</p>

                    <p>{modal?.isSellable ? 'True' : 'False'}</p>
                  </CCol>
                  <CCol xs="6">
                    <p className={'text-light mb-2'}>Bundle:</p>

                    <p>{modal?.isBundle ? 'True' : 'False'}</p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <p className={'text-light mb-2'}>Description</p>
                    <p>{modal?.description}</p>
                  </CCol>
                </CRow>
                <CRow></CRow>
              </CTabPane>
              {modal?.category?.length > 0 && (
                <CTabPane data-tab="category">
                  {modal?.category?.map((el: any) => (
                    <CContainer key={`category-${el?.id}`}>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Version:</p>
                          <p>{el?.version}</p>
                        </CCol>
                      </CRow>
                    </CContainer>
                  ))}
                </CTabPane>
              )}
              {modal?.isBundle && modal?.bundledProductOffering?.length && (
                <CTabPane data-tab="bundle">
                  {modal?.bundledProductOffering?.map((el: any) => (
                    <CContainer key={`bundle-${el?.id}`} style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Version:</p>
                          <p>{el?.version}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Last Update:</p>
                          <p>{dayjs(el?.lastUpdate).isValid() ? dayjs(el?.lastUpdate).format(DATETIME_FORMAT) : '-'}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <p className={'text-light mb-2'}>Valid for: </p>
                      </CRow>
                      {el?.validFor && (
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
                    </CContainer>
                  ))}
                </CTabPane>
              )}
              {modal?.productOfferingPrice?.length > 0 && (
                <CTabPane data-tab="price">
                  {modal?.productOfferingPrice?.map((el: any) => (
                    <CContainer key={`priceOffer-${el?.id}`} style={{ borderBottom: '1px solid #6C6E7E', marginBottom: '1rem' }}>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Id:</p>
                          <p>{el?.id}</p>
                        </CCol>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Name:</p>
                          <p>{el?.name}</p>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          <p className={'text-light mb-2'}>Description:</p>
                          <p>{el?.description}</p>
                        </CCol>
                      </CRow>
                      {el?.validFor && (
                        <CRow>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>From:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.startDateTime).isValid()
                                ? dayjs(el?.validFor?.startDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                          <CCol xs="6">
                            <p className={'text-light mb-2'}>To:</p>{' '}
                            <p>
                              {dayjs(el?.validFor?.endDateTime).isValid()
                                ? dayjs(el?.validFor?.endDateTime).format(DATETIME_FORMAT)
                                : '-'}
                            </p>
                          </CCol>
                        </CRow>
                      )}
                    </CContainer>
                  ))}
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
