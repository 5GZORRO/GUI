import React, { useEffect, useState } from 'react'
import { getAllPendingOffers, resolveOffer } from 'hooks/api/Certificates'

import { CButton, CDataTable } from '@coreui/react'
import { ApiIssuerOffers } from 'types/api'

const OfferPendingCertificates: React.FC = (props: any) => {
  const { data, isLoading, refetch } = getAllPendingOffers()
  const { mutate, isSuccess, isLoading: loadingResolve, isError } = resolveOffer()

  const fields = [
    'id',
    'type',
    'claims',
    {
      key: 'show_details',
      label: 'Actions',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const handleSubmit = (resolve: { id: string; approval: boolean }) => {
    mutate(resolve)
  }

  const showClaims = (item: ApiIssuerOffers) => {
    if (item?.claims) {
      // return
      return <td className="py-2">{item?.claims}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

  const showButton = (item: ApiIssuerOffers) => (
    <td className="d-flex align-items-center py-2">
      <CButton
        size="sm"
        color="success"
        className={'text-uppercase px-3 mr-3'}
        shape="rounded"
        onClick={() => handleSubmit({ id: item?.id, approval: true })}
      >
        Accept
      </CButton>
      <CButton
        size="sm"
        color="danger"
        className={'text-uppercase px-3'}
        shape="rounded"
        onClick={() => handleSubmit({ id: item?.id, approval: false })}
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
        scopedSlots={{
          claims: (item: any) => showClaims(item),
          show_details: (item: any) => showButton(item)
        }}
      />
    </>
  )
}

export default OfferPendingCertificates
