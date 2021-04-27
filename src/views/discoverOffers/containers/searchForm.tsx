import React from 'react'
import CIcon from '@coreui/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { CForm, CFormGroup, CRow, CCol, CLabel, CButton, CTextarea, CFormText } from '@coreui/react'

interface Search {
  search: string,
}

interface SearchFormTypes {
  onSubmit: (form:Search) => void
}

const SearchForm:React.FC<SearchFormTypes> = ({ onSubmit }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm<Search>()

  const submit = (form: Search) => {
    onSubmit(form)
  }

  const clearForm = () => {
    reset({ search: '' })
  }
  console.log('errors', errors)
  return (
    <CForm onSubmit={handleSubmit(submit)}>
      <CFormGroup>
        <CRow className={'d-flex align-items-center'}>
          <CCol className={'d-flex justify-content-start'}>
            <CLabel htmlFor='search' className={'mb-0'}>Insert your search</CLabel>
          </CCol>
          <CCol className={'d-flex justify-content-end align-items-center mb-1'}>
            <CButton
              variant={'ghost'}
              className="d-flex align-items-center"
              onClick={clearForm}
            >
              <CIcon name="cilTrash" size={'lg'} className={'mr-2'} />
              Delete Resource
            </CButton>
          </CCol>
        </CRow>
      <Controller
        control={control}
        defaultValue={''}
        rules={{ required: true }}
        name='search'
        render={({ field }) => (
          <CTextarea
            rows={8}
            {...field}
          />
        )}
      />
      {errors.search &&
      <CFormText className='help-block'>Please enter a search</CFormText>
      }
      <pre className={'text-gray-700 mt-2'}>
{`ex. SELECT
    call.*,
    DATEDIFF("SECOND", call.start_time, call.end_time) AS call_duration
 FROM call
 ORDER BY
    call.employee_id ASC,
    call.start_time ASC;`}
      </pre>
      </CFormGroup>
      <CButton
        type='submit'
        block={false}
        variant={'outline'}
        color={'white'}
        className='text-uppercase px-5 float-right'
      >
        Search
      </CButton>
    </CForm>
  )
}

export default SearchForm
