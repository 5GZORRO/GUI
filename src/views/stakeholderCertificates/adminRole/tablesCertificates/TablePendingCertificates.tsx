import React, { useEffect } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { getAllPendingCertificates, resolveStakeholder } from 'hooks/api/Certificates'

import { CRow, CCol, CButton, CContainer, CDataTable, CCard, CCardBody, CCardHeader } from '@coreui/react'

const PendingCertificates: React.FC = (props: any) => {
  const { modal } = props
  const { user } = useAuthContext()
  const { data, isLoading, refetch } = getAllPendingCertificates()
  const { mutate, isSuccess, isLoading: loadingResolve, isError } = resolveStakeholder(user)

  console.log(user)

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' },
    { key: 'actions', label: 'Actions', filter: false }
  ]

  const handleSubmit = (resolve: { 'stakeholder_did': string; approval: boolean }) => {
    mutate(resolve)
  }

  const showButton = (item: any) => (
    <td className="d-flex align-items-center py-2">
      <CButton
        size="sm"
        color="success"
        className={'text-uppercase px-3 mr-3'}
        shape="rounded"
        onClick={() => handleSubmit({ stakeholder_did: item?.stakeholderDID, approval: true })}
      >
        Accept
      </CButton>
      <CButton
        size="sm"
        color="danger"
        className={'text-uppercase px-3'}
        shape="rounded"
        onClick={() => handleSubmit({ stakeholder_did: item?.stakeholderDID, approval: false })}
      >
        Decline
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
        loading={isLoading || loadingResolve}
        items={data?.filter((el) => el != null) ?? []}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        sorter
        hover
        pagination
        scopedSlots={{
          actions: (item: any) => showButton(item)
        }}
      />
    </>
  )
}

export default PendingCertificates
