import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CForm,
  CContainer
} from '@coreui/react'

import { DATETIME_FORMAT_SHOW } from 'config'
import { endpoints } from 'api/endpoints'

import { useForm, FormProvider } from 'react-hook-form'
import LoadingWithFade from 'components/LoadingWithFade'
import { useCreateSLA, useAllSLATemplates } from 'hooks/api/SLA'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { useAuthContext } from 'context/AuthContext'
import SLATemplateAccordViewer from 'components/SLATemplateAccordViewer'
import dayjs from 'dayjs'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'
import { useGetLegalTemplate } from 'hooks/api/Resources'

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

const AddNewCategoryModal = (props: any) => {
  const { handleClose } = props
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<any | null>(null)

  const { data, isLoading: isLoadingTemplates } = useAllSLATemplates({ size: 9999 })
  const { data: selectedSLA } = useGetLegalTemplate(selected?.id)

  const [modal, setModal] = useState<any | null>(null)

  const check = (item: any) => {
    setSelected((previous: any) => item)
  }

  const href = `${endpoints.LEGAL_PROSE_TEMPLATES}/${selected?.id}`
  const { user } = useAuthContext()

  const {
    formState: { errors, ...remain },
    control,
    handleSubmit,
    ...methods
  } = useForm<any>({
    defaultValues: {}
  })
  const { mutate, isSuccess, isLoading: isLoadingCreate } = useCreateSLA()

  const [trigger, setTrigger] = useState(false)

  const onSubmit = (formData: any) => {
    setTrigger(true)
  }

  const mutateData = (templateData: any) => {
    const { template, ...remain } = templateData
    mutate({
      templateRef: {
        name: selectedSLA?.name,
        description: selectedSLA.description,
        href
      },
      ...remain
    })
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  const selectInput = (item: { id: any; _selected: boolean | undefined }) => {
    return (
      <td>
        <input
          className={'product-offer--checkbox'}
          type="radio"
          checked={selected?.id === item?.id}
          onChange={() => check(item)}
        />
      </td>
    )
  }

  const categoryInput = (item: any) => {
    return <td className="py-2">{item?.category ? item.category : '-'}</td>
  }
  const showDetailsInput = (item: any) => {
    return (
      <td className="py-2">
        <CButton color="primary" className={'text-uppercase'} shape="square" onClick={() => setModal(item)}>
          {'Show'}
        </CButton>
      </td>
    )
  }

  return (
    <>
      {isLoadingCreate && <LoadingWithFade />}
      <CModal show={true} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <h5>{'Add new SLA'}</h5>
        </CModalHeader>
        <CModalBody>
          {step === 0 && (
            <>
              <CContainer>
                <CCard>
                  <CCardHeader>
                    <h5>SLA Templates</h5>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      cleaner
                      loading={isLoadingTemplates}
                      items={data?.filter((el) => el != null) ?? []}
                      columnFilter
                      tableFilter
                      clickableRows
                      fields={fields}
                      itemsPerPage={5}
                      scopedSlots={{
                        select: selectInput,
                        category: categoryInput,
                        show_details: showDetailsInput
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
                    disabled={!selected}
                    onClick={() => setStep(1)}
                  >
                    next
                  </CButton>
                </div>
              </CContainer>
              {modal != null && (
                <CModal show={true} onClose={() => setModal(null)} size="lg">
                  <CModalHeader closeButton>
                    <h5>{'SLA Template'}</h5>
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
          )}
          {step === 1 && (
            <CContainer>
              <h1 className={'mb-5'}>New SLA</h1>
              <FormProvider {...methods} {...{ formState: { errors, ...remain }, control, handleSubmit }}>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <CCard>
                    <CCardBody>
                      <CRow className={'p-3'}>
                        <LegalTemplateEditor
                          templateString={selectedSLA?.templateFileData}
                          readOnly={false}
                          getDataCallback={(data: any) => {
                            mutateData(data)
                            setTrigger(false)
                          }}
                          triggerCallback={trigger}
                          prefilledData={{
                            relatedParty: [
                              // {
                              //   role: 'SLAProvider',
                              //   name: user?.stakeholderClaim?.stakeholderProfile?.name,
                              //   href: user?.stakeholderClaim?.stakeholderDID,
                              //   validFor: {
                              //     startDateTime: dayjs().format('DD/MM/YYYY'),
                              //     endDateTime: dayjs().format('DD/MM/YYYY')
                              //   }
                              // }
                            ]
                          }}
                        />
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <div className={'mt-5 d-flex justify-content-between mb-5'}>
                    <CButton
                      className={'text-uppercase px-5 d-flex align-items-center'}
                      color={'gradient'}
                      variant={'ghost'}
                      onClick={() => setStep(0)}
                    >
                      <ArrowLeftIcon fill={'#fff'} />
                      Previous
                    </CButton>
                    <div className={'d-flex'}>
                      <CButton className={'text-uppercase px-5'} type="submit" color={'gradient'}>
                        Submit
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </FormProvider>
            </CContainer>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddNewCategoryModal
