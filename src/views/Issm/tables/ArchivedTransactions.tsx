import React from 'react'
import { CDataTable } from '@coreui/react'

const ArchivedTransactions: React.FC = () => {
  const fields = [
    { key: 'argoReferenceId', label: 'Transaction UUID' },
    'status',
    { key: 'archivedDate', label: 'Archived Date' }
  ]

  return (
    <>
      <CDataTable
        cleaner
        loading={false}
        items={[]}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        sorter
        hover
        pagination
      />
    </>
  )
}

export default ArchivedTransactions
