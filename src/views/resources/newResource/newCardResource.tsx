import { CCard, CCardBody } from '@coreui/react'
import { PlusCircle } from 'assets/icons/externalIcons'
import React from 'react'

interface NewCardProps {
  height?: number
}

const NewCardResource:React.FC<NewCardProps> = ({ height }) => {
  return (
    <CCard className={'card-dotted'} style={{ minHeight: height || 320, minWidth: 322 }}>
      <CCardBody className={'d-flex justify-content-center align-items-center flex-column'}>
        <div className={'pb-2'}>
          <PlusCircle width={20} height={20} />
        </div>
        <p className={'text-uppercase font-weight-bold'}>
          Add Resource
        </p>
      </CCardBody>
    </CCard>
  )
}

export default NewCardResource