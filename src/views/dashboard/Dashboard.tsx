import React from 'react'
import { useGetMembers } from 'hooks/api/Resources'

const Dashboard: React.FC<{}> = () => {
  const { data, isLoading } = useGetMembers()
  return <div></div>
}

export default Dashboard
