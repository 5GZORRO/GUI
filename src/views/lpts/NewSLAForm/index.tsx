import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { endpoints } from 'api/endpoints'
import { FormProvider, useForm } from 'react-hook-form'

import { CCard, CButton, CCardBody, CRow, CContainer, CForm, CSpinner } from '@coreui/react'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

import { DATETIME_FORMAT } from 'config'
import { useCreateSLA } from 'hooks/api/SLA'

import LoadingWithFade from 'components/LoadingWithFade'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { useAuthContext } from 'context/AuthContext'
import dayjs from 'dayjs'

const NewSLAForm = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetLegalTemplate(id)
  const href = `${endpoints.LEGAL_PROSE_TEMPLATES}/${id}`
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

  const history = useHistory()

  useEffect(() => {
    if (isSuccess) {
      history.push('/templates/')
    }
  }, [isSuccess])

  const onSubmit = (formData: any) => {
    setTrigger(true)
  }

  const mutateData = (templateData: any) => {
    const { template, ...remain } = templateData
    mutate({
      templateRef: {
        name: data?.name,
        description: data.description,
        href
      },
      status: 'ACTIVE',
      ...remain
    })
  }

  if (!isLoading && data?.templateFileData) {
    return (
      <>
        {isLoadingCreate && <LoadingWithFade />}

        <CContainer>
          <h1 className={'mb-5'}>New SLA</h1>
          <FormProvider {...methods} {...{ formState: { errors, ...remain }, control, handleSubmit }}>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CCard>
                <CCardBody>
                  <CRow className={'p-3'}>
                    <LegalTemplateEditor
                      templateString={data?.templateFileData}
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
                  onClick={() => history.goBack()}
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
      </>
    )
  }
  return <CSpinner color="#fff" />
}

export default NewSLAForm
