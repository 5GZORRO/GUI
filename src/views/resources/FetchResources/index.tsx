import React from 'react'
import { useHistory } from 'react-router'

import { CButton, CDataTable, CContainer, CCard, CCardBody, CRow, CCol } from '@coreui/react'

import LoadingWithFade from 'components/LoadingWithFade'

import { useQueryClient } from 'react-query'
import { useAllXrmResources, useTranslateResource } from 'hooks/api/Resources'

const FetchResources: React.FC = () => {
  const history = useHistory()

  const queryClient = useQueryClient()
  const { data, isLoading } = useAllXrmResources()

  const {
    mutate,
    isLoading: isMutating,
    isError
  } = useTranslateResource({
    onSuccess: () => {
      queryClient.refetchQueries('useAllXrmResources')
      history.push('/resource')
    }
  })

  const fields = [
    'id',
    { key: 'name', label: 'Name' },
    'description',
    'contentType',
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
        disabled={isMutating}
        onClick={() => {
          mutate({
            id: item?.id,
            type: item?.contentType
          })
        }}
      >
        {'Translate'}
      </CButton>
    </td>
  )

  const showByType = (item: any, key: string, keyNSD?: string, keySPC?: string, keyRAD?: string) => {
    switch (item.contentType) {
      case 'VNF':
        return <td className="py-2">{item?.[`vnf${key}`] ?? item?.[`${key}`] ?? '-'}</td>
      case 'NSD':
        return <td className="py-2">{item?.[`nsd${keyNSD}`] ?? item?.[`${key}`] ?? '-'}</td>
      case 'SPC':
        return <td className="py-2">{item?.[`${keySPC ?? key}`] ?? '-'}</td>
      case 'RAD':
        return <td className="py-2">{item?.[`${keyRAD ?? key}`] ?? '-'}</td>
      default:
        return <td className="py-2">{item?.[key] ?? '-'}</td>
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
        {isMutating && !isError && <LoadingWithFade />}
        {!isMutating && isError && (
          <p style={{ color: 'red', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)' }}>
            An error has occurred, please try again
          </p>
        )}
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
              // band and technology no the correct fields to show name
              name: (item: any) => showByType(item, 'ProductName', 'Name', 'band', 'technology'),
              description: (item: any) => showByType(item, 'description'),
              fetch_details: (item: any) => showButton(item)
            }}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default FetchResources
