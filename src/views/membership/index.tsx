import React from 'react'
import { CContainer, CRow, CForm, CFormGroup, CLabel, CInput, CCol, CFormText, CButton } from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'

interface Inputs {
  name: string
  type: string
}

const FormGenerate:React.FC = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => console.log(data)

  return (
    <CContainer fluid>
    <CRow>
      <CCol sm='12'>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CFormGroup>
            <CLabel htmlFor="nf-email">Text</CLabel>
            <Controller
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              name="name"
              render={({ field }) => (
                <CInput
                  {...field}
                />
              )}
            />
            {errors.name &&
            <CFormText className='help-block'>Please enter your email</CFormText>
            }
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="Type">Type</CLabel>

            {errors.type &&
            <CFormText className='help-block'>Please enter your password</CFormText>
            }
          </CFormGroup>
          <CButton type='submit' color='primary'>
            Submit
          </CButton>
        </CForm>
      </CCol>
    </CRow>
  </CContainer>
  )
}

export default FormGenerate
