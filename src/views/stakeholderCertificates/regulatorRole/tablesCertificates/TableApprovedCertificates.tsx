import React, { useEffect, useState } from 'react'
import { getAllApprovedCertificatesRegulator } from 'hooks/api/Certificates'
import { CRow, CCol, CButton, CDataTable, CModal, CModalHeader, CModalBody, CTextarea } from '@coreui/react'
import dayjs from 'dayjs'
import { DATETIME_FORMAT_SHOW } from 'config'

const ApprovedCertificates: React.FC = (props: any) => {
  const { triggerRefetch } = props
  const [modalDetails, setModalDetails] = useState<any>(null)
  const { data, isLoading, refetch } = getAllApprovedCertificatesRegulator()

  const fields = [
    { key: 'licenseDID', label: 'Licence DID' },
    { key: 'timestamp', label: 'Creation Date' },
    { key: 'actions', label: 'Actions', filter: false, sort: false }
  ]

  const showButton = (item: any) => (
    <td className="d-flex align-items-center py-2">
      <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModalDetails(item)}>
        {'Show'}
      </CButton>
    </td>
  )

  useEffect(() => {
    refetch()
  }, [triggerRefetch])

  return (
    <>
      <CModal show={modalDetails != null} onClose={() => setModalDetails(null)} size="lg">
        <CModalHeader closeButton>
          <h5>{'Stakeholder Services Details'}</h5>
        </CModalHeader>
        <CModalBody>
          <CRow className={'mt-2'}>
            <CCol xs="12">
              <CTextarea
                readOnly={true}
                rows={22}
                value={JSON.stringify(modalDetails?.stakeholderServices, null, '\t')}
              />
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

export default ApprovedCertificates
