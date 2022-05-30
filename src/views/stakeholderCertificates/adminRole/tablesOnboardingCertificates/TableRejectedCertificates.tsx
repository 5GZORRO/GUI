import React, { useEffect } from 'react'
import { CDataTable } from '@coreui/react'
import { getAllRejectedCertificatesAdmin } from 'hooks/api/Certificates'

const RejectedCertificates: React.FC = (props: any) => {
  const { triggerRefetch } = props
  const { data, isLoading, refetch } = getAllRejectedCertificatesAdmin()

  useEffect(() => {
    refetch()
  }, [triggerRefetch])

  const fields = [
    'name',
    'role',
    { key: 'stakeholderRoles', label: 'Assets' },
    { key: 'stakeholderDID', label: 'Stakeholder DID' }
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
