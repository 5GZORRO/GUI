import React from 'react'
import {
  CRow,
  CCol,
  CSelect,
  CTextarea,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CButton,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import MaskedInput from 'react-text-mask'
import { Controller, useFormContext } from 'react-hook-form'
import { useHistory } from 'react-router'
import { DevTool } from '@hookform/devtools'
/** Components */
import { PlusCircle } from 'assets/icons/externalIcons'

const ResourceCreation = () => {
  const { control, formState: { errors } } = useFormContext()
  const history = useHistory()

  return (
    <CRow>
      <CCol sm={6}>
        <CFormGroup>
          <CLabel htmlFor='name'>Name</CLabel>
          <Controller
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            aria-invalid={errors.name ? 'true' : 'false'}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <CInput
                placeholder={'Insert Name'}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        {errors.name &&
          <CFormText role='alert' className='help-block'>Please enter a name</CFormText>
        }
        </CFormGroup>
      </CCol>
        <CCol xs={12}>
          <CFormGroup>
            <CLabel htmlFor='description'>Description</CLabel>
            <Controller
              control={control}
              defaultValue={''}
              rules={{ required: true }}
              name='description'
              render={({ field: { onChange, onBlur, value } }) => (
                <CTextarea
                  rows={4}
                  placeholder={'Insert Description'}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.description &&
            <CFormText className='help-block'>Please enter a description</CFormText>
            }
          </CFormGroup>
        </CCol>
        <CCol>
          <CFormGroup>
            <CLabel htmlFor='version'>Version</CLabel>
            <Controller
              control={control}
              defaultValue={''}
              rules={{ required: true }}
              name='version'
              render={({ field: { onChange, onBlur, value } }) => (
                <CInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Insert Version'
                />
              )}
            />
            {errors.version &&
            <CFormText className='help-block'>Please enter a version</CFormText>
            }
          </CFormGroup>
        </CCol>
        <CCol sm={6}>
          <CFormGroup>
            <CLabel htmlFor='validFor'>Valid For</CLabel>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name='cilCalendar' /></CInputGroupText>
              </CInputGroupPrepend>
              <Controller
                control={control}
                defaultValue={''}
                rules={{ required: true }}
                name='validFor'
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskedInput
                    placeholder={'__/__/____'}
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    className='form-control'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    guide
                    render={(ref, props) => (
                      <CInput
                        innerRef={ref}
                        {...props}
                      />
                    )}
                  />
                )}
              />
            </CInputGroup>
            <CFormText color='muted'>
              ex. 01/01/1970
            </CFormText>
            {errors.validFor &&
            <CFormText className='help-block'>Please enter a valid date</CFormText>
            }
        </CFormGroup>
        </CCol>
        <CCol sm={6}>
          <CFormGroup>
            <CLabel>Category</CLabel>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name='cilFindInPage' /></CInputGroupText>
              </CInputGroupPrepend>
              <Controller
                control={control}
                defaultValue={''}
                rules={{ required: true }}
                name='category'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  >
                    <option value='0'>Please select</option>
                    <option value='1'>Option #1</option>
                    <option value='2'>Option #2</option>
                    <option value='3'>Option #3</option>
                  </CSelect>
                )}
              />
              <CInputGroupAppend>
                  <CButton
                    type='button'
                    color='transparent'
                    onClick={() => history.push('/resource/new-resource/new-category')}
                  >
                    <PlusCircle />
                  </CButton>
              </CInputGroupAppend>
            </CInputGroup>
            {errors.category &&
              <CFormText className='help-block'>Please select a category</CFormText>
            }
          </CFormGroup>
        </CCol>
        <CCol sm={6}>
          <CFormGroup>
            <CLabel>Resource Specification</CLabel>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name='cilListRich' /></CInputGroupText>
              </CInputGroupPrepend>
              <Controller
                control={control}
                defaultValue={''}
                rules={{ required: true }}
                name='resourceSpecification'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CSelect onChange={onChange} onBlur={onBlur} value={value}>
                    <option value='0'>Please select</option>
                    <option value='1'>Option #1</option>
                    <option value='2'>Option #2</option>
                    <option value='3'>Option #3</option>
                  </CSelect>
                )}
              />
              <CInputGroupAppend>
                <CButton
                  type='button'
                  color='transparent'
                  onClick={() => console.log('/resource/new-resource/new-category')}
                >
                  <PlusCircle />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
            {errors.category &&
              <CFormText className='help-block'>Please select a type</CFormText>
            }
          </CFormGroup>
        </CCol>
        <CCol sm={6}>
          <CFormGroup>
            <CLabel htmlFor='owner'>Owner</CLabel>
            <Controller
              control={control}
              defaultValue={''}
              rules={{ required: true }}
              name='owner'
              render={({ field: { onChange, onBlur, value } }) => (
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
        <DevTool control={control} />
    </CRow>
  )
}

export default ResourceCreation
