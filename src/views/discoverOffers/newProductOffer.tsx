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
  const [selected, setSelected] = useState([2, 3])
  const { data, isLoading } = useResources()

  const check = (e: React.FormEvent<any>, id: number) => {
    if (e) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter(itemId => itemId !== id))
    }
  }

  return (
    <CContainer>
      <CRow className={'mb-5'}>
        <CCol>
          <h1>New Product Offer</h1>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          Resource Candidate
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
                        onChange={e => check(e, item.id)}
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
                    shape='square'
                    size='sm'
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
        <CButton className={'text-uppercase px-5'} color={'gradient'}>next</CButton>
        <CButton className={'text-uppercase px-5 mr-3'} variant='outline' color={'white'}>Cancel</CButton>
      </div>
    </CContainer>
  )
}

export default NewProductOffer
