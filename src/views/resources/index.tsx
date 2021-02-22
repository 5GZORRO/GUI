/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { CDataTable,
  CCard,
  CPagination,
  CFormGroup,
  CLabel,
  CInputCheckbox,
  CButton,
  CCollapse,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CNav,
  CNavItem, CNavLink, CTabContent, CTabPane, CTabs
  , CCol, CRow, CButtonToolbar } from '@coreui/react'
import dayjs from 'dayjs'
/** Hooks */
import { useResources } from 'hooks/api/Resources'

const Resources:React.FC = () => {
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

  return (
    <>
      <CModal
          show={modal}
          onClose={() => setModal(false)}
        >
          <CModalHeader>Resource Candidate Details</CModalHeader>
          <CModalBody>
            <CTabs activeTab="home">
              <CNav variant="pills">
                <CNavItem>
                  <CNavLink data-tab="home">Home</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="profile">Profile</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="messages">Messages</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="home">
                  HOME
                </CTabPane>
                <CTabPane data-tab="profile">
                  PROFILE
                </CTabPane>
                <CTabPane data-tab="messages">
                  Messages
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Do Something</CButton>{' '}
            <CButton
              color="secondary"
              onClick={() => setModal(!modal)}
            >
              Cancel
            </CButton>
          </CModalFooter>
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
          className={data?.totalPages < 2 ? "d-none" : ""}
        />
      </CCard>
      <CRow>
        <CCol>
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
            variant={'outline'}
            color={'primary'}
            className='justify-content-end'
          >
            Next
          </CButton>
          </CButtonToolbar>
        </CCol>
      </CRow>
    </>
  )
}

export default Resources