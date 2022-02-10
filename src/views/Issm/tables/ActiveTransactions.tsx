import React, { useState, useEffect } from 'react'
import { CButton, CDataTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DATETIME_FORMAT_SHOW, LEDGER_IDENTITY } from 'config'
import { ApiBusinessTransactions } from 'types/api'

import { deleteTransaction, getAllTransactions } from 'hooks/api/ISSM'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const fields = [
  { key: 'transaction_uuid', label: 'Transaction UUID', filter: true },
  { key: 'status', label: 'Status', filter: true },
  { key: 'transaction_type', label: 'Transaction Type', filter: true },
  { key: 'created', label: 'Created' },
  { key: 'actions', label: 'Actions', filter: false },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

export const ActiveTransactions: React.FC = (props: any) => {
  const { modal } = props
  const { data, isLoading, refetch } = getAllTransactions(LEDGER_IDENTITY)
  const { mutate, isLoading: isLoadingDelete, isSuccess } = deleteTransaction()

  useEffect(() => {
    if (isSuccess || modal) {
      refetch()
    }
  }, [isSuccess, modal])

  const handleDelete = (item: ApiBusinessTransactions) => {
    let operator: any
    if (LEDGER_IDENTITY.includes('OperatorA')) {
      operator = 'operator-a'
    } else if (LEDGER_IDENTITY.includes('OperatorB')) {
      operator = 'operator-b'
    } else if (LEDGER_IDENTITY.includes('OperatorC')) {
      operator = 'operator-c'
    } else if (LEDGER_IDENTITY.includes('RegulatorA')) {
      operator = 'regulator'
    }
    const params = {
      operator,
      transactionUuid: item.transaction_uuid
    }
    mutate(params)
  }

  const showButton = (item: ApiBusinessTransactions) => (
    <td className="py-2">
      <Link to={{ pathname: item?.ref }} target="_blank">
        <CButton color="primary" className={'text-uppercase px-3 d-flex align-items-center '} shape="rounded">
          Show
          <CIcon name="cilExternalLink" className="ml-2" size="sm" />
        </CButton>
      </Link>
    </td>
  )

  const showDate = (item: ApiBusinessTransactions) => (
    <td className="py-2">
      {dayjs(item?.created)?.isValid() ? dayjs(item?.created).format(DATETIME_FORMAT_SHOW) : '-'}
    </td>
  )

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

  const showActions = (item: ApiBusinessTransactions) => {
    const check = ['Succeeded', 'Failed']
    return (
      <td className="py-2">
        <CButton
          color="dark"
          className={'text-uppercase m-1'}
          shape="rounded"
          disabled={item?.status === 'Succeeded' || item?.status === 'Failed'}
        >
          <CIcon name="cilBan" />
        </CButton>
        <CButton color="dark" className={'text-uppercase m-1'} shape="rounded" disabled={!check.includes(item?.status)}>
          <CIcon name="cilFolder" />
        </CButton>
        <CButton
          color="dark"
          className={'text-uppercase m-1'}
          shape="rounded"
          disabled={!check.includes(item?.status)}
          onClick={() => handleDelete(item)}
        >
          <CIcon name="cilTrash" className="text-danger" />
        </CButton>
      </td>
    )
  }

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
        status: (item: ApiBusinessTransactions) => showStatus(item),
        transactionType: (item: ApiBusinessTransactions) => showTransactionType(item),
        actions: (item: ApiBusinessTransactions) => showActions(item),
        show_details: (item: ApiBusinessTransactions) => showButton(item),
        created: (item: ApiBusinessTransactions) => showDate(item)
      }}
    />
  )
}

export default ActiveTransactions
