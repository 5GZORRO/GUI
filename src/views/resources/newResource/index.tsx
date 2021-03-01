import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow,
  CSelect,
  CTextarea
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'
import { Link } from 'react-router-dom'

/** Hooks */
import { useCreateResource } from 'hooks/api/Resources'
/** Component */
import NewCardResource from './newCardResource'
import CardResource from './cardResource'
import { PlusCircle } from 'assets/icons/externalIcons'

interface Inputs {
  name: string
  description: string
  version: string
  validFor: string
  ownerDid: string
  category: string
  resourceSpecification: string
}

const NewResource:React.FC = () => {
  const resource = useCreateResource()
  const { handleSubmit, errors, control } = useForm<Inputs>()
  
  const onSubmit = (data: Inputs) => { 
    const { name, description, version, validFor, ownerDid, category } = data
		resource.mutate({ 
      name,
      description,
      version,
      validFor,
      ownerDid,
      category
    })
  }

  return (
    <CContainer fluid={false}>
      <h2>New Resource & Service</h2>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCard>
          <CCardHeader>
          <h2>Resource Creation</h2>
        </CCardHeader>
          <CCardBody>
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
              </CCol>
              <CCol xs={12}>
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
              </CCol>
              <CCol>
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
                        placeholder='Insert Version'
                      />
                    )}
                  />
                  {errors.version && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
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
                  <CLabel>Category</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cilFindInPage" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='category'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value="0">Please select</option>
                          <option value="1">Option #1</option>
                          <option value="2">Option #2</option>
                          <option value="3">Option #3</option>
                        </CSelect>
                      )}
                    />
                    {errors.category && 
                      <CFormText className='help-block'>Please select a type</CFormText>
                    }
                    <CInputGroupAppend>
                      <Link to='/resource/new-resource/new-category'>
                        <CButton 
                          type="button"
                          color="secondary" 
                          variant={'ghost'}
                        >
                          <PlusCircle />
                        </CButton>
                      </Link>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel>Resource Specification</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cilListRich" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      defaultValue={''}
                      rules={{ required: true }}
                      name='resourceSpecification'
                      render={({ onChange, onBlur, value }) => (
                        <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                          <option value="0">Please select</option>
                          <option value="1">Option #1</option>
                          <option value="2">Option #2</option>
                          <option value="3">Option #3</option>
                        </CSelect>
                      )}
                    />
                    {errors.category && 
                      <CFormText className='help-block'>Please select a type</CFormText>
                    }
                    <CInputGroupAppend>
                      <CButton type="button" color="secondary" variant={'ghost'}><PlusCircle /></CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
              </CCol>
              <CCol sm={6 }>
                <CFormGroup>
                  <CLabel htmlFor="owner">Owner</CLabel>
                  <Controller
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    name="owner"
                    render={({ onChange, onBlur, value }) => (
                      <CInput
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Insert Owner'
                      />
                    )}
                  />
                  {errors.ownerDid && 
                  <CFormText className='help-block'>Please enter your email</CFormText>
                  }
                </CFormGroup>
              </CCol>
          </CRow>
        </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <h2>Resource Physical Capabilities</h2>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={4}>
                <Link to={'/resource/new-resource/new-physical-resource'}>
                  <NewCardResource />
                </Link>
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
        <CCard>
          <CCardHeader>
            <h2>Resource Virtual Capabilities</h2>
          </CCardHeader>
          <CCardBody className='m-3'>
            <CRow>
              <CCol sm={4}>
                <Link to={'/resource/new-resource/new-virtual-resource'}>
                  <NewCardResource />
                </Link>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <div className={'d-flex flex-row-reverse mb-5'}>
          <CButton className={'text-uppercase px-5'} type='submit' color={'gradient'}>Submit</CButton>
          <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
        </div>
      </CForm>
    </CContainer>
  )
}

export default NewResource