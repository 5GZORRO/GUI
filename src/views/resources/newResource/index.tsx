import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow
} from '@coreui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

/** Hooks */
import { useCreateResource } from 'hooks/api/Resources'
/** Container */
import ResourceCreation from './ResourceCreation'
/** Component */
import NewCardResource from './newCardResource'
import CardResource from './cardResource'
/** Types */
import { ResourceCreationInter } from 'types/forms'

const NewResource:React.FC = () => {
  const resource = useCreateResource()
  const history = useHistory()
  const methods = useForm<ResourceCreationInter>({
    defaultValues: { name: 'default value' },
    shouldUnregister: false
  })
  const { handleSubmit } = methods

  const onSubmit = (data: ResourceCreationInter) => {
    const { name, description, version, validFor, ownerDid } = data

    resource.mutate({
      name,
      description,
      version,
      validFor,
      ownerDid
    })
  }

  return (
    <CContainer fluid={false}>
      <h2 className={'mb-5'}>New Resource & Service</h2>
      <FormProvider {...methods}>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CCard className={'mb-5'}>
            <CCardHeader>
              <h5>Resource Creation</h5>
            </CCardHeader>
            <CCardBody>
              <ResourceCreation />
            </CCardBody>
          </CCard>
          <CCard className={'mb-5'}>
            <CCardHeader>
              <h5>Resource Physical Capabilities</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={4}>
                  <NewCardResource
                    onClick={() => history.push('/resource/new-resource/new-physical-resource')}
                  />
                </CCol>
                <CCol sm={4}>
                  <CardResource />
                </CCol>
                <CCol sm={4}>
                  <CardResource />
                </CCol>
                <CCol sm={4}>
                  <CardResource />
                </CCol>
                <CCol sm={4}>
                  <CardResource />
                </CCol>
                <CCol sm={4}>
                  <CardResource />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CCard className={'mb-5'}>
            <CCardHeader>
              <h2>Resource Virtual Capabilities</h2>
            </CCardHeader>
            <CCardBody className='m-3'>
              <CRow>
                <CCol sm={4}>
                  <NewCardResource
                    onClick={() => history.push('/resource/new-resource/new-virtual-resource')}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <div className={'d-flex flex-row-reverse mb-5'}>
            <CButton className={'text-uppercase px-5'} type='submit' color={'gradient'}>Submit</CButton>
            <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
          </div>
        </CForm>
      </FormProvider>
    </CContainer>
  )
}

export default NewResource
