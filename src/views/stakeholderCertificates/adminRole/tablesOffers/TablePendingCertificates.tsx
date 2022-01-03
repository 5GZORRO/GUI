import React, { useState } from 'react'
import { getAllPendingOffers } from 'hooks/api/Certificates'

import { CButton, CDataTable } from '@coreui/react'
import { ApiIssuerOffers } from 'types/api'

const OfferPendingCertificates: React.FC = (props: any) => {
  const { data, isLoading } = getAllPendingOffers()

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

  const showClaims = (item: ApiIssuerOffers) => {
    if (item?.claims) {
      // return
      return <td className="py-2">{item?.claims}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

  const showButton = () => (
    <td className="d-flex align-items-center py-2">
      <CButton color="success" className={'text-uppercase px-3 mr-3'} shape="rounded">
        Accept
      </CButton>
      <CButton color="danger" className={'text-uppercase px-3'} shape="rounded">
        Decline
      </CButton>
    </td>
  )

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
          show_details: () => showButton()
        }}
      />
    </>
  )
}

export default OfferPendingCertificates
