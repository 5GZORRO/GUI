import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { CModal, CModalBody, CModalFooter, CModalHeader, CButtonClose } from '@coreui/react'
import { ModalContext } from 'context/ModalContext'

const Modal = () => {
  const context = useContext(ModalContext)
  console.log('context', context)
  const elem = document.getElementById('modal')
  if (context?.isVisible && elem) {
    return ReactDOM.createPortal(
      <CModal
        size={context.size}
        show={context?.isVisible}
        closeOnBackdrop={context.backgroundClick}
      >
      {context.modalTitle &&
      <CModalHeader>
        <h5>{context.modalTitle}</h5>
        {context.close &&
        <CButtonClose onClick={() => context.handleModal()}/>
        }
      </CModalHeader>
      }
      <CModalBody>
          {context.modalContent}
      </CModalBody>
      {context.modalFooter &&
      <CModalFooter>
        {context.modalFooter}
      </CModalFooter>
      }
      </CModal>,
      elem
    )
  } else return null
}

export default Modal
