import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { endpoints } from 'api/endpoints'
import { FormProvider, Controller, useForm } from 'react-hook-form'

import {
  CCard,
  CButton,
  CCardBody,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CLabel,
  CRow,
  CTextarea,
  CContainer,
  CForm,
  CSpinner,
  CInputGroupText,
  CInputGroupPrepend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DateRangePicker from 'components/DateRangePicker'
import { ArrowLeftIcon } from 'assets/icons/externalIcons'

import { DATETIME_FORMAT } from 'config'
import moment from 'moment'
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
    mutate({
      templateRef: {
        name: data?.name,
        description: data.description,
        href
      },
      ...templateData
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
                  {/* <CRow>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="name">Name</CLabel>
                      <Controller
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        name="name"
                        render={({ field }) => <CInput placeholder={'Enter name'} {...field} />}
                      />
                      {errors?.name && <CFormText className="help-block">Please enter a name</CFormText>}
                    </CFormGroup>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      <CLabel htmlFor="validFor">Valid For</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cilCalendar" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <Controller
                          control={control}
                          defaultValue={''}
                          rules={{ required: true }}
                          name="validFor"
                          render={({ field }) => {
                            const { value, onChange, ref } = field
                            return (
                              <div className={'datepicker'}>
                                <DateRangePicker
                                  startDate={
                                    moment(value?.startDateTime, DATETIME_FORMAT).isValid()
                                      ? moment(value?.startDateTime)
                                      : null
                                  }
                                  endDate={
                                    moment(value?.endDateTime, DATETIME_FORMAT).isValid()
                                      ? moment(value?.endDateTime)
                                      : null
                                  }
                                  onDatesChange={({ startDate, endDate }) =>
                                    onChange({
                                      startDateTime: moment(startDate).format(DATETIME_FORMAT),
                                      endDateTime: moment(endDate).format(DATETIME_FORMAT)
                                    })
                                  }
                                  ref={ref}
                                />
                              </div>
                            )
                          }}
                        />
                      </CInputGroup>
                      {errors.validFor && <CFormText className="help-block">Please enter a date range</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12}>
                    <CFormGroup>
                      <CLabel>Description</CLabel>
                      <CInputGroup>
                        <Controller
                          control={control}
                          defaultValue={''}
                          rules={{ required: true }}
                          name="description"
                          render={({ field }) => (
                            <CTextarea
                              placeholder={'Enter Description'}
                              {...field}
                              rows={4}
                              style={{ resize: 'none' }}
                            />
                          )}
                        />
                      </CInputGroup>
                      {errors?.description && <CFormText className="help-block">Please insert a description</CFormText>}
                    </CFormGroup>
                  </CCol>
                </CRow> */}
                  <CRow className={'p-3'}>
                    <LegalTemplateEditor
                      templateString={data?.templateFileData}
                      readOnly={false}
                      getDataCallback={(data: any) => {
                        mutateData(data)
                        setTrigger(false)
                      }}
                      triggerCallback={trigger}
                      // prefilledData={{
                      //   relatedPartyRefs: [
                      //     {
                      //       role: 'SLAProvider',
                      //       name: user?.stakeholderClaim?.stakeholderProfile?.name,
                      //       href: user?.stakeholderClaim?.stakeholderDID,
                      //       validFor: {
                      //         startDateTime: dayjs().format(DATETIME_FORMAT),
                      //         endDateTime: null
                      //       }
                      //     }
                      //   ]
                      // }}
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
