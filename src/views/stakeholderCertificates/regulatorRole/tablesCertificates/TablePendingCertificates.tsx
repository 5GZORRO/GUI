import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { getAllPendingCertificatesRegulator, resolveLicence } from 'hooks/api/Certificates'

import {
  CRow,
  CCol,
  CButton,
  CContainer,
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CTextarea
} from '@coreui/react'
import dayjs from 'dayjs'
import { DATETIME_FORMAT_SHOW } from 'config'

const PendingCertificates: React.FC = (props: any) => {
  const { triggerRefetch, setTriggerRefetch } = props
  const [modal, setModal] = useState<any>(null)
  const { user } = useAuthContext()
  const { data, isLoading, refetch } = getAllPendingCertificatesRegulator()
  const { mutate, isSuccess, isLoading: loadingResolve, isError } = resolveLicence(user?.id_token)

  const fields = [
    { key: 'licenseDID', label: 'Licence DID' },
    { key: 'timestamp', label: 'Creation Date' },
    { key: 'actionsCustom', label: 'Actions', filter: false }
  ]

  /*eslint-disable */
  const handleSubmit = (resolve: { license_did: any; approval: boolean; licenseObject: any; stakeholderDID: any }) => {
    mutate(resolve)
  }

  const showButton = (item: any) => (
    <td className="d-flex align-items-center py-2">
      <CButton color="primary" className={'text-uppercase px-2 mr-3'} shape="rounded" onClick={() => setModal(item)}>
        {'SHOW'}
      </CButton>
      <CButton
        color="success"
        className={'text-uppercase px-2 mr-3'}
        shape="rounded"
        onClick={() =>
          handleSubmit({
            license_did: item.licenseDID,
            approval: true,
            licenseObject: item?.stakeholderServices,
            stakeholderDID: item?.stakeholderDID
          })
        }
      >
        Accept
      </CButton>
      <CButton
        color="danger"
        className={'text-uppercase px-2'}
        shape="rounded"
        onClick={() =>
          handleSubmit({
            license_did: item.licenseDID,
            approval: false,
            licenseObject: item?.stakeholderServices,
            stakeholderDID: item?.stakeholderDID
          })
        }
      >
        Decline
      </CButton>
    </td>
  )

  useEffect(() => {
    if (isSuccess) {
      refetch()
      setTriggerRefetch(!triggerRefetch)
    }
  }, [isSuccess])

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
        loading={isLoading || loadingResolve}
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
          actionsCustom: (item: any) => showButton(item),
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

export default PendingCertificates
