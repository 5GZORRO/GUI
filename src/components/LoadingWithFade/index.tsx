import React, { useEffect } from 'react'
import { useFadeContext } from 'context/FadeContext'
import { CSpinner } from '@coreui/react'

const LoadingWithBackdrop = () => {
  const { setContent } = useFadeContext()

  useEffect(() => {
    setContent(
      <div
        style={{ height: '100%', color: '#fff' }}
        className="d-flex justify-content-center align-items-center"
        data-testid="loading"
      >
        <CSpinner color="#fff" />
      </div>
    )
    return () => {
      setContent(null)
    }
    // eslint-disable-next-line
  }, [])

  return <></>
}

export default LoadingWithBackdrop
