import React, { useState, useEffect } from 'react'
import { CButton, CDataTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { ApiBusinessTransactions } from 'types/api'

import { deleteTransaction, getAllTransactions } from 'hooks/api/ISSM'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'

const fields = [
  { key: 'transaction_uuid', label: 'Argo Reference', filter: true },
  { key: 'status', label: 'Status', filter: true },
  { key: 'transaction_type', label: 'Transaction Type', filter: true },
  { key: 'actions', label: 'Actions', filter: false },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

export const ActiveTransactions: React.FC = () => {
  const { user } = useAuthContext()
  const { data, isLoading } = getAllTransactions(user?.stakeholderClaim?.stakeholderProfile?.name)
  const { mutate, isLoading: isLoadingDelete } = deleteTransaction()

  const handleDelete = (item: ApiBusinessTransactions) => {
    let operator: any
    switch (user?.stakeholderClaim?.stakeholderProfile?.name) {
      case 'Operator_A':
        operator = 'operator-a'
        break
      case 'Operator_B':
        operator = 'operator-b'
        break

      case 'Operator_C':
        operator = 'operator-c'
        break
    }
    const params = {
      operator,
      transactionUuid: item.transaction_uuid
    }
    mutate(params)
  }

  const showButton = (item: ApiBusinessTransactions) => (
    <td className="py-2">
      <Link to={{ pathname: 'http://172.28.3.42:32026/workflows/domain-operator-a/' + item?.transaction_uuid }} target="_blank">
        <CButton color="primary" className={'text-uppercase px-3 d-flex align-items-center '} shape="rounded">
          Show
          <CIcon name="cilExternalLink" className="ml-2" size="sm" />
        </CButton>
      </Link>
    </td>
  )

  const showArgoRef = (item: ApiBusinessTransactions) => {
    return <td className="py-2">{item?.transaction_uuid}</td>
  }

  const showTransactionType = (item: ApiBusinessTransactions) => {
    return <td className="py-2">{item?.transaction_type}</td>
  }

  const showStatus = (item: ApiBusinessTransactions) => {
    return <td className="py-2">{item?.status}</td>
    // switch (item?.status) {
    //   case 'Succeeded':
    //     return <td className="py-2">Completed</td>
    //   case 'Failed':
    //     return <td className="py-2">Failed</td>
    // }
  }

  const showActions = (item: ApiBusinessTransactions) => (
    <td className="py-2">
      <CButton color="dark" className={'text-uppercase m-1'} shape="rounded" disabled={item?.status === 'Succeeded'}>
        <CIcon name="cilBan" />
      </CButton>
      <CButton color="dark" className={'text-uppercase m-1'} shape="rounded" disabled={item?.status !== 'Succeeded'}>
        <CIcon name="cilFolder" />
      </CButton>
      <CButton
        color="dark"
        className={'text-uppercase m-1'}
        shape="rounded"
        disabled={item?.status !== 'Succeeded'}
        onClick={() => handleDelete(item)}
      >
        <CIcon name="cilTrash" className="text-danger" />
      </CButton>
    </td>
  )

  return (
    <CDataTable
      cleaner
      loading={isLoading || isLoadingDelete}
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
        // argoReference: (item: ApiBusinessTransactions) => showArgoRef(item),
        status: (item: ApiBusinessTransactions) => showStatus(item),
        transactionType: (item: ApiBusinessTransactions) => showTransactionType(item),
        actions: (item: ApiBusinessTransactions) => showActions(item),
        show_details: (item: ApiBusinessTransactions) => showButton(item)
      }}
    />
  )
}

export default ActiveTransactions
