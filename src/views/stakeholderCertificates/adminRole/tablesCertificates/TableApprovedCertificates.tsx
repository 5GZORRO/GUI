import React, { useEffect } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { getAllApprovedCertificates, revokeCertificate } from 'hooks/api/Certificates'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'

const ApprovedCertificates: React.FC = (props: any) => {
  const { modal } = props
  const { data, isLoading, refetch } = getAllApprovedCertificates()
  const { mutate, isSuccess, isLoading: loadingRevoke, isError } = revokeCertificate()

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' },
    'company',
    { key: 'actions', label: 'Actions', filter: false, sort: false }
  ]

  const handleSubmit = (resolve: { 'cred_exchange_id': string }) => {
    mutate(resolve)
  }

  const showCompany = (item: any) => {
    if (item?.company) {
      return <td className="py-2">{item?.company}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

  const showButton = (item: any) => (
    <td className="d-flex align-items-center py-2">
      <CButton
        size="sm"
        color="warning"
        className={'text-uppercase px-3 mr-1'}
        style={{ fontSize: '10.5px' }}
        shape="rounded"
        // onClick={() => handleSubmit({ cred_exchange_id: item?.stakeholderDID })}
      >
        Ban Certificate
      </CButton>
    </td>
  )

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess])

  return (
    <>
      <CDataTable
        cleaner
        loading={isLoading || loadingRevoke}
        items={data?.filter((el) => el != null && el.state === 'Stakeholder Registered') ?? []}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        sorter
        hover
        pagination
        scopedSlots={{
          company: (item: any) => showCompany(item),
          actions: (item: any) => showButton(item)
        }}
      />
    </>
  )
}

export default ApprovedCertificates
