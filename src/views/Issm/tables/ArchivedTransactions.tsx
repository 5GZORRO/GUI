import React, { useState } from 'react'
import { getArchivedTransactions } from 'hooks/api/ISSM'
import { useAuthContext } from 'context/AuthContext'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'

const ArchivedTransactions: React.FC = () => {
  const { user } = useAuthContext()
  // const { data, isLoading } = getArchivedTransactions(user?.stakeholderClaim?.stakeholderProfile?.name)

  const fields = [
    { key: 'argoReferenceId', label: 'Argo Reference' },
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
        // scopedSlots={{
        //   category: (item: any) => arrayToStringsData(item?.category, 'name'),
        //   productOfferingPrice: (item: any) => arrayToStringsData(item?.productOfferingPrice, 'priceType')
        // }}
      />
    </>
  )
}

export default ArchivedTransactions