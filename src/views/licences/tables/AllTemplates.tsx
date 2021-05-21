/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { CDataTable, CButton } from '@coreui/react'
// import dayjs from 'dayjs'
/** Hooks */
import { DATETIME_FORMAT } from 'config'
import { useAllTemplates } from 'hooks/api/Licences'
import dayjs from 'dayjs'

export const AllTemplates: React.FC = () => {
  const { data, isLoading } = useAllTemplates()

  const fields = [
    'id',
    'name',
    'status',
    'created',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

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
        created: (item: any) => {
          return (
            <td className="py-2">
              {dayjs(item?.created).isValid() ? dayjs(item?.created).format(DATETIME_FORMAT) : '-'}
            </td>
          )
        },
        show_details: () => {
          return (
            <td className="py-2">
              <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => console.log('asda')}>
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
