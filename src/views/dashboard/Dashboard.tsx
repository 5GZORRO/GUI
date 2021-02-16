import React from 'react'
import { CDataTable, CSpinner } from '@coreui/react'

/** Hooks */
import { useGovernances } from 'hooks/api/GovernanceActions'

const fields = ['actionParams.evidence','statusUpdated', 'actionType', 'status']

const Dashboard:React.FC = () => {
  const { data, isLoading } = useGovernances()
  console.log(data)
  return (
    <>
    {isLoading &&
    <CSpinner
      color="primary"
      style={{width:'4rem', height:'4rem'}}
    />
    }
    <CDataTable
      items={data?.content}
      fields={fields}
      itemsPerPage={5}
      pagination
    />
    </>
  )
}

export default Dashboard
