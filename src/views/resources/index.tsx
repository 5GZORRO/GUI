/* eslint-disable react/display-name */
import { CButton } from '@coreui/react'
import React from 'react'
import { useHistory } from 'react-router'

const Resources:React.FC = () => {
  const history = useHistory()
  return (
    <>
     <h1>Resources & Services</h1>
     <CButton
      onClick={() => history.push('/resource/new-resource')}
      color={'gradient'}
    >
      New Resource
    </CButton>
    </>
  )
}

export default Resources
