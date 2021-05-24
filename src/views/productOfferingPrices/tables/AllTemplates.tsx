import React from 'react'
import { CDataTable, CButton } from '@coreui/react'

import { useAllProductOfferingPrices } from 'hooks/api/Resources'

const AllTemplates = () => {
  const { data, isLoading } = useAllProductOfferingPrices()
  const fields = [
    'name',
    'percentage',
    {
      key: 'price',
      label: 'Price'
    },
    {
      key: 'unit',
      label: 'Unit'
    },
    'version',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]

  const showDetails = (item: any) => (
    <td className="py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => console.log('asda')}>
        {'Show'}
      </CButton>
    </td>
  )

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
        show_details: (item: any) => showDetails(item)
      }}
      sorter
      hover
      pagination
    />
  )
}

export default AllTemplates
