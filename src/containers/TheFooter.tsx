import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span>
          ©2021, All Rights 5GZorro
        </span>
      </div>
      <div className="ml-auto">
        <span className="mr-1">Right text</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
