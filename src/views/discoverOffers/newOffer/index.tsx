import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow, CTextarea } from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'
/** Hooks */
import { useCreateResource } from 'hooks/api/Resources' 

interface Inputs {
  name: string
  description: string
  version: string
  validFor: string
  ownerDid: string
}

const NewOffer:React.FC = () => {
  const resource = useCreateResource()
  const { handleSubmit, errors, control } = useForm<Inputs>()
  
  const onSubmit = (data: Inputs) => { 
    const { name, description, version, validFor, ownerDid } = data
		resource.mutate({ name, description, version, validFor, ownerDid })
  }

  return (
    <CContainer fluid={false}>
      <h1 className={'pb-5'}>New Product Offer</h1>
      <CCard>
      <CCardHeader>
        <h2>Product offer creation</h2>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit(onSubmit)}>
        <CRow>
            <CCol sm={6}>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="name"
                  render={({ onChange, onBlur, value }) => (
                    <CInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.name && 
                <CFormText className='help-block'>Please enter your email</CFormText>
                }
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="version">Version</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="version"
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.version && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                </CFormGroup>
              <CFormGroup>
                <CLabel>Valid For</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText><CIcon name="cilCalendar" /></CInputGroupText>
                  </CInputGroupPrepend>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name='validFor'
                    render={({ onChange, onBlur, value }) => (
                      <TextMask
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        Component={InputAdapter}
                        className='form-control'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      )}
                  />
                </CInputGroup>
                <CFormText color="muted">
                  ex. 01/01/1970
                </CFormText>
            </CFormGroup>
            </CCol>
            <CCol sm={6}>
            <CFormGroup>
                  <CLabel htmlFor="description">Description</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="description"
                    render={({ onChange, onBlur, value }) => (
                      <CTextarea
                        rows={2}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                  />
                  {errors.description && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="ownerDid">Owner Did</CLabel>
                <Controller
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  name="ownerDid"
                  render={({ onChange, onBlur, value }) => (
                    <CInput
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder='Content...'
                    />
                  )}
                />
                {errors.ownerDid && 
                <CFormText className='help-block'>Please enter your email</CFormText>
                }
              </CFormGroup>
              <CButton type='submit' color='primary'>
                Submit
              </CButton>
            </CCol>
        </CRow>
        </CForm>
      </CCardBody>
    </CCard>
    </CContainer>
  )
}

export default NewOffer