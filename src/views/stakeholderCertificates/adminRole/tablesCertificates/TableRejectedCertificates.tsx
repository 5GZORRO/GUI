import React, { useState } from 'react'
import { useAuthContext } from 'context/AuthContext'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { getAllApprovedCertificates } from 'hooks/api/Certificates'

const RejectedCertificates: React.FC = (props: any) => {
  const { modal } = props
  const { user } = useAuthContext()
  const { data, isLoading } = getAllApprovedCertificates()

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' },
    'company'
    // 'status'
  ]

  const showCompany = (item: any) => {
    if (item?.company) {
      return <td className="py-2">{item?.company}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

  return (
    <>
      <CDataTable
        cleaner
        loading={false}
        items={data?.filter((el) => el != null && el.state === 'Stakeholder Declined') ?? []}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        sorter
        hover
        pagination
        scopedSlots={{
          company: (item: any) => showCompany(item)
        }}
      />
    </>
  )
}

export default RejectedCertificates
