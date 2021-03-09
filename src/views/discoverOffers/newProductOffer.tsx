/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CDataTable,
  CButton,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react'
import { useResources } from 'hooks/api/Resources'
import { useHistory } from 'react-router-dom'

const fields = [
  { key: 'select', label: '', filter: false, sorter: false },
  'name',
  { key: 'categoryType', label: 'Type' },
  { key: 'categoryName', label: 'Category' },
  { key: 'resourceSpecificationName', label: 'Resource Specification' },
  'validFor',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const NewProductOffer:React.FC = () => {
  const history = useHistory()
  const [selected, setSelected] = useState<number | null>(null)
  const { data, isLoading } = useResources()

  const check = (e: any, id: number) => setSelected(e.target.checked ? id : null)

  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h2>New Product Offer</h2>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          <h5>Resource Candidate</h5>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            cleaner
            loading={isLoading}
            items={data}
            columnFilter
            tableFilter
            clickableRows
            fields={fields}
            itemsPerPage={5}
            scopedSlots={{
              select: (item: { id: any; _selected: boolean | undefined }) => {
                return (
                  <td>
                    <CFormGroup variant='custom-checkbox'>
                      <CInputCheckbox
                        custom
                        id={`checkbox${item.id}`}
                        checked={item._selected}
                        onChange={(e) => check(e, item.id)}
                      />
                      <CLabel
                        variant='custom-checkbox'
                        htmlFor={`checkbox${item.id}`}
                      />
                    </CFormGroup>
                  </td>
                )
              },
              show_details:
                () => {
                  return (
                <td className='py-2'>
                  <CButton
                    color='primary'
                    className={'shadow-none text-uppercase'}
                    onClick={() => console.log('asda')}
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
          disabled={!selected}
          onClick={() => history.push(`/discover-offers/detail-product/${selected}`)}
        >
          next
        </CButton>
        <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
      </div>
    </CContainer>
  )
}

export default NewProductOffer
