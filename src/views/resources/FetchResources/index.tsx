import React from 'react'

import { CButton, CDataTable, CContainer, CCard, CCardBody, CRow, CCol } from '@coreui/react'

import { useQueryClient } from 'react-query'
import { useAllXrmResources, useTranslateResource } from 'hooks/api/Resources'

const FetchResources: React.FC = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useAllXrmResources()

  const { mutate } = useTranslateResource({
    onSuccess: () => {
      queryClient.invalidateQueries('useAllXrmResources')
    }
  })

  const fields = [
    'id',
    { key: 'name', label: 'Name' },
    { key: 'provider', label: 'Created by' },
    'type',
    {
      key: 'fetch_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  const showButton = (item: any) => (
    <td className="py-2">
      <CButton
        color="primary"
        className={'text-uppercase'}
        shape="square"
        onClick={() => {
          mutate({
            id: item?.id,
            type: item?.type
          })
        }}
      >
        {'Translate'}
      </CButton>
    </td>
  )

  const showByType = (item: any, key: string, keyNSD?: string) => {
    switch (item.type) {
      case 'VNF':
        return <td className="py-2">{item?.[`vnf${key}`]}</td>
      case 'NSD':
        return <td className="py-2">{item?.[`nsd${keyNSD ?? key}`]}</td>
      default:
        return <td className="py-2">{item?.[key]}</td>
    }
  }

  return (
    <CContainer fluid={false}>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>Translate xRM Resources</h2>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
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
              name: (item: any) => showByType(item, 'ProductName', 'Name'),
              provider: (item: any) => showByType(item, 'Provider', 'Designer'),
              fetch_details: (item: any) => showButton(item)
            }}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default FetchResources
