import React, { useState } from 'react'
import { getAllRejectedOffers } from 'hooks/api/Certificates'

import { CDataTable } from '@coreui/react'
import { ApiIssuerOffers } from 'types/api'

const OfferRejectedCertificates: React.FC = (props: any) => {
  const { data, isLoading } = getAllRejectedOffers()

  const fields = ['id', 'type', 'claims']

  const showClaims = (item: ApiIssuerOffers) => {
    if (item?.claims) {
      // return
      return <td className="py-2">{item?.claims}</td>
    }
    return <td className="py-2">{'-'}</td>
  }

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
          claims: (item: any) => showClaims(item)
        }}
      />
    </>
  )
}

export default OfferRejectedCertificates
