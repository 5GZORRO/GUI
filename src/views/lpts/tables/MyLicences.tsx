/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { CDataTable, CButton, CCol, CRow, CModal, CModalBody, CModalHeader } from '@coreui/react'
// import dayjs from 'dayjs'
/** Hooks */
import { DATETIME_FORMAT_SHOW } from 'config'
import { useAllLicences } from 'hooks/api/SLA'
import dayjs from 'dayjs'
import SLATemplateAccordViewer from 'components/SLATemplateAccordViewer'

export const AllTemplates: React.FC = () => {
  const { data, isLoading } = useAllLicences()
  const [modal, setModal] = useState<any>(null)
  const fields = [
    'id',
    'name',
    'status',
    'created',
    'category',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sort: false
    }
  ]
  return (
    <>
      <CDataTable
        cleaner
        loading={isLoading}
        items={data}
        columnFilter
        tableFilter
        clickableRows
        fields={fields}
        itemsPerPage={5}
        scopedSlots={{
          created: (item: any) => {
            return (
              <td className="py-2">
                {dayjs(item?.created).isValid() ? dayjs(item?.created).format(DATETIME_FORMAT_SHOW) : '-'}
              </td>
            )
          },
          category: (item: any) => {
            return <td className="py-2">{item?.category ? item.category : '-'}</td>
          },
          show_details: (item: any) => {
            return (
              <td className="py-2">
                <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
                  {'Show'}
                </CButton>
              </td>
            )
          }
        }}
        sorter
        hover
        pagination
      />
      {modal != null && (
        <CModal show={true} onClose={() => setModal(null)} size="lg">
          <CModalHeader closeButton>
            <h5>{`Legal Prose Template ${modal?.id}`}</h5>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="6">
                <p className={'text-light mb-2'}>Name:</p> <p>{modal?.name}</p>
              </CCol>
              <CCol xs="6">
                <p className={'text-light mb-2'}>Last Update:</p>{' '}
                <p>
                  {dayjs(modal?.statusUpdated).isValid()
                    ? dayjs(modal?.statusUpdated).format(DATETIME_FORMAT_SHOW)
                    : '-'}
                </p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12">
                <p className={'text-light mb-2'}>Description</p>
                <p>{modal?.description}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <p className={'text-light mb-2'}>Status:</p>

                <p>{modal?.status}</p>
              </CCol>
            </CRow>
            <CRow>
              <SLATemplateAccordViewer id={modal?.id}></SLATemplateAccordViewer>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </>
  )
}

export default AllTemplates
