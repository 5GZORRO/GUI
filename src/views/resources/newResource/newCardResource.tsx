import { CCard, CCardBody } from '@coreui/react'
import { PlusCircle } from 'assets/icons/externalIcons'
import React from 'react'

interface NewCardProps {
  height?: number
  onClick: () => void
}

const NewCardResource:React.FC<NewCardProps> = ({ height, onClick }) => {
  return (
    <CCard
      className={'card-dotted card-cursor'}
      style={{ minHeight: height || 320, minWidth: 322 }}
      onClick={onClick}
    >
      <CCardBody className={'d-flex justify-content-center align-items-center flex-column'}>
        <div className={'pb-2'}>
          <PlusCircle width={20} height={20} />
        </div>
        <p className={'text-uppercase font-weight-bold text-light'}>
          Add Resource
        </p>
      </CCardBody>
    </CCard>
  )
}

export default NewCardResource
