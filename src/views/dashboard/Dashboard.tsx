/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { CDataTable, CButton, CFormGroup, CInputCheckbox, CLabel } from '@coreui/react'

/** Hooks */
// import { useGovernances } from 'hooks/api/GovernanceActions'

const fields = [
  { key: 'select', label: '', filter: false },
  'statusUpdated',
  'actionType',
  'status',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false
  }
]

const Dashboard:React.FC = () => {
  // const { data, isLoading } = useGovernances()
  const [selected, setSelected] = useState([2, 3])

  const check = (e: React.FormEvent<any>, id: number) => {
    if (e) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter(itemId => itemId !== id))
    }
  }

  return (
    <div className={'bg-gradient-dark-test'}>
    <CDataTable
      cleaner
      loading={false}
      items={[]}
      columnFilter
      tableFilter
      clickableRows
      fields={fields}
      itemsPerPage={5}
      scopedSlots={{
        select: (item: { id: any; _selected: boolean | undefined }) => {
          return (
            <td>
              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  custom
                  id={`checkbox${item.id}`}
                  checked={item._selected}
                  onChange={e => check(e, item.id)}
                />
                <CLabel
                  variant="custom-checkbox"
                  htmlFor={`checkbox${item.id}`}
                />
              </CFormGroup>
            </td>
          )
        },
        show_details:
          () => {
            return (
          <td className="py-2">
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
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
    </div>
  )
}

export default Dashboard
