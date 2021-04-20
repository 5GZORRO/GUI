import React, { createContext } from 'react'
import { HandleModal, InterfaceModal } from 'types/hooks'
import useModal from 'hooks/useModal'

import Modal from 'components/Modal'

const ModalContext = createContext<InterfaceModal | undefined>(undefined)

const ProviderModal: React.FC<any> = ({ children }) => {
  const { size, backgroundClick, modalTitle, modalContent, modalFooter, isVisible, close, handleModal } = useModal()
  return (
    <ModalContext.Provider value={{ size, backgroundClick, modalTitle, modalContent, modalFooter, isVisible, close, handleModal }}>
        <Modal />
        {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ProviderModal }
