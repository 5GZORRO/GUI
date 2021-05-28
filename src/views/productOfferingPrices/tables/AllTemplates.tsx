import React from 'react'
import { CDataTable, CButton } from '@coreui/react'

import { useAllProductOfferingPrices } from 'hooks/api/Resources'

const AllTemplates = () => {
  const { data, isLoading } = useAllProductOfferingPrices()
  const fields = [
    'name',
    {
      key: 'value',
      label: 'Price'
    },
    {
      key: 'unit',
      label: 'Unit'
    },
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

  const renderValue = (item: any) => <td className="py-2">{item?.price?.value}</td>

  const renderUnit = (item: any) => <td className="py-2">{item?.price?.unit}</td>

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
        show_details: (item: any) => showDetails(item),
        value: (item: any) => renderValue(item),
        unit: (item: any) => renderUnit(item)
      }}
      sorter
      hover
      pagination
    />
  )
}

export default AllTemplates
