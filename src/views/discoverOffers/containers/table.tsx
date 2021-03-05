/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import {
  CCard,
  CDataTable,
  CInputCheckbox,
  CLabel,
  CButton,
  CCardBody,
  CFormGroup,
  CButtonToolbar
} from '@coreui/react'
// import dayjs from 'dayjs'
/** Hooks */
import { useResources } from 'hooks/api/Resources'

export const Table:React.FC = () => {
  const [selected, setSelected] = useState([2, 3])

  /* const params:any = {
    page,
    // columnFilterValue: JSON.stringify(columnFilterValue),
    // tableFilterValue,
    // sorterValue: JSON.stringify(sorterValue),
    pageSize
  } */

  const { data, isLoading } = useResources()

  const check = (e: React.FormEvent<any>, id: number) => {
    if (e) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter(itemId => itemId !== id))
    }
  }

  const fields = [
    { key: 'select', label: '', filter: false },
    'statusUpdated',
    'actionType',
    'status',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]
  return (
    <>
      <CCard className='p-5'>
        <CCardBody>
          <h1>Resources</h1>
          <CDataTable
            cleaner
            loading={isLoading}
            items={data?.content}
            columnFilter
            tableFilter
            clickableRows
            fields={fields}
            itemsPerPage={5}
            scopedSlots={{
              select: (item: { id: any; _selected: boolean | undefined}) => {
                return (
                  <td>
                    <CFormGroup variant='custom-checkbox'>
                      <CInputCheckbox
                        custom
                        id={`checkbox${item.id}`}
                        checked={item._selected}
                        onChange={e => check(e, item.id)} />
                      <CLabel
                        variant='custom-checkbox'
                        htmlFor={`checkbox${item.id}`} />
                    </CFormGroup>
                  </td>
                )
              },
              show_details: () => {
                return (
                  <td className='py-2'>
                    <CButton
                      color='primary'
                      className={'px-5 text-uppercase'}
                      variant='outline'
                      shape='square'
                      onClick={() => console.log('asda')}
                    >
                      {'Show'}
                    </CButton>
                  </td>
                )
              }
            }}
            sorter
            hover
            pagination />
        </CCardBody>
      </CCard>
      <CButtonToolbar justify='end' className={'mb-5'}>
        <CButton
          className='justify-content-end px-5 mr-3'
          variant={'outline'}
          block={false}
          color={'white'}
        >
              Cancel
        </CButton>
        <CButton
          block={false}
          color={'gradient'}
          className='justify-content-end px-5'
        >
            Next
        </CButton>
      </CButtonToolbar>
    </>
  )
}

export default Table
