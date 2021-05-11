/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import {
  CDataTable,
  CInputCheckbox,
  CLabel,
  CButton,
  CFormGroup
} from '@coreui/react'
// import dayjs from 'dayjs'
/** Hooks */
import { useAllTemplates } from 'hooks/api/SLA'

export const AllTemplates:React.FC = () => {
  const [selected, setSelected] = useState([2, 3])

  /* const params:any = {
    page,
    // columnFilterValue: JSON.stringify(columnFilterValue),
    // tableFilterValue,
    // sorterValue: JSON.stringify(sorterValue),
    pageSize
  } */

  const { data, isLoading } = useAllTemplates()

  const fields = [
    'name',
    'publisher',
    'status',
    'version',
    'DID',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]
  console.log(data)
  return (
    <CDataTable
        cleaner
        loading={isLoading}
        items={data}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        scopedSlots={{
          show_details: () => {
            return (
            <td className='py-2'>
                <CButton
                color='primary'
                className={'text-uppercase'}
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
        pagination
    />
  )
}

export default AllTemplates
