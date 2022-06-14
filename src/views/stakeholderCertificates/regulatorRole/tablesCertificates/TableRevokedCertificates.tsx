import React, { useEffect, useState } from 'react'
import { CButton, CCol, CDataTable, CModal, CModalBody, CModalHeader, CRow, CTextarea } from '@coreui/react'
import { getAllRevokedCertificatesRegulator } from 'hooks/api/Certificates'
import dayjs from 'dayjs'
import { DATETIME_FORMAT_SHOW } from 'config'

const RevokedCertificates: React.FC = (props: any) => {
  const { triggerRefetch } = props
  const { data, isLoading, refetch } = getAllRevokedCertificatesRegulator()
  const [modal, setModal] = useState<any>(null)

  const fields = [
    { key: 'licenseDID', label: 'Licence DID' },
    { key: 'timestamp', label: 'Creation Date' },
    { key: 'actions', label: 'Actions', filter: false, sort: false }
  ]

  const showButton = (item: any) => (
    <td className="d-flex align-items-center py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  useEffect(() => {
    refetch()
  }, [triggerRefetch])

  return (
    <>
      <CModal show={modal != null} onClose={() => setModal(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Stakeholder Services Details'}</h5>
        </CModalHeader>
        <CModalBody>
          <CRow className={'mt-2'}>
            <CCol xs="12">
              <CTextarea readOnly={true} rows={22} value={JSON.stringify(modal?.stakeholderServices, null, '\t')} />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
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
          actions: (item: any) => showButton(item),
          timestamp: (item: any) => {
            return (
              <td className="py-2">
                {dayjs(item?.created).isValid() ? dayjs(item?.created).format(DATETIME_FORMAT_SHOW) : '-'}
              </td>
            )
          }
        }}
      />
    </>
  )
}

export default RevokedCertificates
