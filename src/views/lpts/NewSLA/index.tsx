/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CDataTable,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader
} from '@coreui/react'

import { useHistory, Link } from 'react-router-dom'
import { useAllSLATemplates } from 'hooks/api/SLA'
import SLATemplateAccordViewer from 'components/SLATemplateAccordViewer'
import { DATETIME_FORMAT_SHOW } from 'config'
import dayjs from 'dayjs'

const fields = [
  { key: 'select', label: '', filter: false, sorter: false },
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

const NewSLA: React.FC = () => {
  const history = useHistory()
  const [selected, setSelected] = useState<string[]>([])
  const { data, isLoading } = useAllSLATemplates()
  const [modal, setModal] = useState<any | null>(null)

  const check = (item: any) => {
    const found = selected.find((sla: any) => sla === item?.id)

    if (!found) {
      setSelected((previous: any) => [item?.id])
    } else {
      setSelected((previous: any) => previous.filter((sla: any) => sla !== item?.id))
    }
  }

  return (
    <>
      <CContainer>
        <CRow className={'mb-5'}>
          <CCol>
            <h2>New SLA</h2>
          </CCol>
        </CRow>
        <CCard>
          <CCardHeader>
            <h5>SLA Templates</h5>
          </CCardHeader>
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
              scopedSlots={{
                select: (item: { id: any; _selected: boolean | undefined }) => {
                  return (
                    <td>
                      <input
                        className={'product-offer--checkbox'}
                        type="radio"
                        checked={selected?.find((el) => item?.id === el) != null}
                        onChange={() => check(item)}
                      />
                    </td>
                  )
                },
                category: (item: any) => {
                  return <td className="py-2">{item?.category ? item.category : '-'}</td>
                },
                show_details: (item: any) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        className={'text-uppercase'}
                        shape="square"
                        onClick={() => setModal(item)}
                      >
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
          </CCardBody>
        </CCard>
        <div className={'d-flex flex-row-reverse mb-5'}>
          <CButton
            className={'text-uppercase px-5'}
            color={'gradient'}
            disabled={!selected?.length}
            onClick={() => history.push(`/templates/new/sla/${selected}`)}
          >
            next
          </CButton>
          <Link to={'/templates/'}>
            <CButton className={'text-uppercase px-5 mr-3'} variant="outline" color={'white'}>
              Cancel
            </CButton>
          </Link>
        </div>
      </CContainer>
      {modal != null && (
        <CModal show={true} onClose={() => setModal(null)} size="lg">
          <CModalHeader closeButton>
            <h5>{`SLA Template ${modal?.id}`}</h5>
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
            <CRow className={'mt-2 p-3'}>
              <h5>{'Template'}</h5>
              <CContainer>
                <CRow className={'mt-2'}>
                  <SLATemplateAccordViewer id={modal?.id} readOnly={true}></SLATemplateAccordViewer>
                </CRow>
              </CContainer>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </>
  )
}

export default NewSLA
