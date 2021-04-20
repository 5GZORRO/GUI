import React, { useState } from 'react'
import { Size } from 'types/hooks'
export default () => {
  const [isVisible, setIsVisible] = useState(false)
  const [modalContent, setModalContent] = useState<any>(undefined)
  const [modalFooter, setModalFooter] = useState<any>(undefined)
  const [modalTitle, setModalTitle] = useState<string | boolean | undefined>(undefined)
  const [size, setSize] = useState<Size>('lg')
  const [backgroundClick, setBackgroundClick] = useState(false)
  const [close, setClose] = useState(true)

  const handleModal = (content = false, footer = false, title = false, size: Size = 'lg', backgroundClick = true, close = true):void => {
    console.log('content', content)
    content && setModalContent(content)
    footer && setModalFooter(footer)
    title && setModalTitle(title)
    setIsVisible(!isVisible)
    setBackgroundClick(backgroundClick)
    setSize(size)
    setClose(close)
  }

  return { isVisible, handleModal, modalContent, modalFooter, modalTitle, size, backgroundClick, close }
}
