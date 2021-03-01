/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { 
  CButton,
  CButtonClose,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CCollapse, CContainer, CDataTable, CFormGroup, CFormText, CInputCheckbox, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CNav, CNavItem, CNavLink, CPagination, CRow, CTabContent, CTabPane, CTabs, CTextarea } from '@coreui/react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
/** Hooks */
import { useResources } from 'hooks/api/Resources'
import { Controller, useForm } from 'react-hook-form'

interface Search {
  search: string
}

const DiscoverOffers:React.FC = () => {
  const [items, setItems] = useState([])
  const [details, setDetails] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [selected, setSelected] = useState([2, 3])
  const [pageSize, setPageSize] = useState(5)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState('')
  const [modal, setModal] = useState(false)
  
  const params:any = {
    page,
    //columnFilterValue: JSON.stringify(columnFilterValue),
    //tableFilterValue,
    //sorterValue: JSON.stringify(sorterValue),
    pageSize
  }
  
  const { data, isPreviousData, isFetching, isLoading } = useResources(params)

  useEffect(() => {
    if (data) {
      setItems(data.resources.map((item:any) => ({...item, validFor: dayjs(item.validFor).format('DD-MM-YYYY')})))
      setPages(data.totalPages)
    }
  },[])

  const check = (e: any, id: number) => {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter(itemId => itemId !== id));
    }
  }

  const toggleDetails = (index: never) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    } 
    setDetails(newDetails)
  }

  const { handleSubmit, errors, control } = useForm<Search>()
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Discover Offers</h1>
        </CCol>
        <CCol className='d-flex justify-content-end'>
          <Link to='/discover-offers'>
            <CButton
              block={false}
              color={'gradient'}
              className={'text-uppercase'}
            >
              create product offer
            </CButton>
          </Link>
        </CCol>
      </CRow>
        <CTabs activeTab="allOffers">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="allOffers">
                All offers
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="myOffers">
                My offers
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab="allOffers">
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>All Offers</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup>
                  <CLabel htmlFor="search">Insert your search</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="search"
                    render={({ onChange, onBlur, value }) => (
                      <CTextarea
                        rows={10}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                  />
                  {errors.search && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                  <CFormText color="muted">
                  <p className='mb-0'>ex. SELECT;</p>
                  <p className='mb-0'>call.*,</p>
                  <p className='mb-0'>DATEDIFF(SECOND, call.start_time, call.end_time) AS call_duration</p>
                  <p className='mb-0'>FROM call</p>
                  <p className='mb-0'>ORDER BY</p>
                  <p className='mb-0'>call.employee_id ASC,</p>
                  <p className='mb-0'>call.start_time ASC;</p>
                  </CFormText>
                  </CFormGroup>
                  <CButton
                    block={false}
                    variant={'outline'}
                    color={'secondary'}
                    className='justify-content-end text-uppercase'
                  >
                    Search
                  </CButton>
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab="myOffers">
              <CCard className={'mt-4'}>
                <CCardHeader>
                  <CCardTitle>My Offers</CCardTitle>
                  
                </CCardHeader>
                <CCardBody>
                  <CFormGroup>
                  <CLabel htmlFor="search">Insert your search</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="search"
                    render={({ onChange, onBlur, value }) => (
                      <CTextarea
                        rows={10}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                  />
                  {errors.search && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                  <CFormText color="muted">
                  <p className='mb-0'>ex. SELECT;</p>
                  <p className='mb-0'>call.*,</p>
                  <p className='mb-0'>DATEDIFF(SECOND, call.start_time, call.end_time) AS call_duration</p>
                  <p className='mb-0'>FROM call</p>
                  <p className='mb-0'>ORDER BY</p>
                  <p className='mb-0'>call.employee_id ASC,</p>
                  <p className='mb-0'>call.start_time ASC;</p>
                  </CFormText>
                  </CFormGroup>
                  <CButton
                    block={false}
                    variant={'outline'}
                    color={'secondary'}
                    className='justify-content-end text-uppercase'
                  >
                    Search
                  </CButton>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
      <CModal
          show={modal}
          onClose={() => setModal(false)}
          size='lg'
        >
          <CModalHeader>
            Resource Candidate Details
            <CButtonClose onClick={() => setModal(false)}/>
          </CModalHeader>
          <CModalBody>
            <CTabs activeTab="resourceDetail">
              <CNav variant="pills">
                <CNavItem>
                  <CNavLink data-tab="resourceDetail" color={'#6C6E7E'}>Resource Details</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="physicalCap">Resource - Physical Capabilities</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="virtualCap">Resource - Virtual Capabilities</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="resourceDetail">
                  <p>Name Label Resource</p>
                </CTabPane>
                <CTabPane data-tab="physicalCap">
                  PROFILE
                </CTabPane>
                <CTabPane data-tab="virtualCap">
                  Messages
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CModalBody>
      </CModal>
      <CCard className="p-5">
        <h1>Resources</h1>
        <CDataTable
          items={data?.resources}
          fields={[
            { key: 'select', label: '', filter: false },
            {key: 'id', label: 'id', filter: false },
            'name',
            'version',
            'validFor',
            {
            key: 'showDetails',
            label: '',
            _style: { width: '1%' },
            filter: false
          }]}
          loading={(isFetching && isPreviousData) || isLoading}
          hover
          // cleaner
          columnFilter={{ external: true }}
          columnFilterValue={columnFilterValue}
          onColumnFilterChange={setColumnFilterValue}
          tableFilter={{ external: true }}
          tableFilterValue={tableFilterValue}
          onTableFilterChange={setTableFilterValue}
          // sorter
          scopedSlots={{
            select: (item: { id: number; _selected: boolean | undefined }) => {
              return (
                <td>
                  <CFormGroup variant="custom-checkbox">
                    <CInputCheckbox
                      custom
                      id={`checkbox${item.id}`}
                      checked={item._selected}
                      onChange={e => check(e, item.id)}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor={`checkbox${item.id}`}
                    />
                  </CFormGroup>
                </td>
              )
            },
            showDetails:
              (item: { id: never }) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => { setModal(true) }}
                    >
                      Show
                    </CButton>
                  </td>
                )
              },
              details:
                (item: { id: never; username: React.ReactNode; description: string }) => {
                    return (
                      <CCollapse show={details.includes(item.id)}>
                      {console.log(item)}
                      <CCardBody>
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">Description: {item.description}</p>
                      </CCardBody>
                    </CCollapse>
                  )
                }
          }}
          // sorterValue={sorterValue}
          // onSorterValueChange={setSorterValue}
          itemsPerPageSelect={{ external: true }}
          itemsPerPage={pageSize}
          onPaginationChange={setPageSize}
        />
        <CPagination
          pages={data?.totalPages}
          activePage={data?.currentPage}
          onActivePageChange={setPage}
          className={data?.totalPages < 2 ? 'd-none' : ''}
        />
      </CCard>
        <CButtonToolbar justify='end'>
          <CButton
            className='justify-content-end'
            variant={'outline'}
            block={false}
            color={'primary'}
          >
            Cancel
          </CButton>
          <CButton
            block={false}
            color={'gradient'}
            className='justify-content-end'
          >
            Next
          </CButton>
          </CButtonToolbar>
    </CContainer>
  )
}

export default DiscoverOffers