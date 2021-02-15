import React from 'react'
import { CDataTable } from '@coreui/react'

/** Hooks */
import { useGovernances } from 'hooks/api/GovernanceActions'

const fields = ['actionParams.evidence','statusUpdated', 'actionType', 'status']

const Dashboard:React.FC = () => {
  const { data, isError, isLoading } = useGovernances()
  console.log(data)
  return (
    <CDataTable
      items={data?.content}
      fields={fields}
      itemsPerPage={5}
      pagination
    />
  )
}

export default Dashboard
