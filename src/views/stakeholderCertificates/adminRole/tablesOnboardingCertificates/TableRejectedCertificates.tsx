import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/AuthContext'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { getAllRejectedCertificatesAdmin } from 'hooks/api/Certificates'

const RejectedCertificates: React.FC = (props: any) => {
  const { triggerRefetch } = props
  const { user } = useAuthContext()
  const { data, isLoading, refetch } = getAllRejectedCertificatesAdmin()

  useEffect(() => {
    refetch()
  }, [triggerRefetch])

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' }
    // 'status'
  ]

  return (
    <>
      <CDataTable
        cleaner
        loading={isLoading}
        items={data?.filter((el) => el != null) ?? []}
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

export default RejectedCertificates
