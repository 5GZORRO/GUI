import React, { useEffect } from 'react'
import { getAllApprovedCertificatesAdmin, revokeCertificate } from 'hooks/api/Certificates'

import { CButton, CDataTable } from '@coreui/react'

const ApprovedCertificates: React.FC = (props: any) => {
  const { triggerRefetch } = props
  const { data, isLoading, refetch } = getAllApprovedCertificatesAdmin()
  const { mutate, isSuccess, isLoading: loadingRevoke, isError } = revokeCertificate()

  useEffect(() => {
    refetch()
  }, [triggerRefetch])

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' },
    { key: 'actions', label: 'Actions', filter: false, sort: false }
  ]

  const handleSubmit = (resolve: { credExchangeId: string }) => {
    mutate(resolve)
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

export default ApprovedCertificates
