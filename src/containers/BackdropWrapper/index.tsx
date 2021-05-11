import React from 'react'
import Backdrop from 'components/Backdrop'
import { useFadeContext } from 'context/FadeContext'

const BackdropWrapper = (props: any) => {
  const { content } = useFadeContext()
  return (
    <Backdrop isOpen={content != null}>
      {content}
    </Backdrop>
  )
}

export default BackdropWrapper
