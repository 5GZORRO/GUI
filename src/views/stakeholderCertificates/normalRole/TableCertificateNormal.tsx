import React, { useState } from 'react'
import { getStakeholderCertificates } from 'hooks/api/Certificates'
import { useAuthContext } from 'context/AuthContext'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'

const CertificatesNormal: React.FC = () => {
  const { user } = useAuthContext()

  const { data, isLoading } = getStakeholderCertificates(user?.stakeholderClaim?.stakeholderDID)

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' },
    { key: 'state', label: 'Status' }
  ]

  return (
    <>
      <CDataTable
        cleaner
        loading={false}
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

export default CertificatesNormal
