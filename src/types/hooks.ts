export interface AuthObject {
  name: string | null
  hasAccess: boolean
  role: string | null
}

export interface Auth {
  user: AuthObject
  signin: (name: string) => void
  signout: () => void
}

export type Size = 'sm' | 'lg' | 'xl'

export interface HandleModal {
  content?: any
  footer?: any
  title?: any
  size?: Size
  backgroundClick?: boolean
  close?: boolean
}

export interface InterfaceModal {
  isVisible: boolean
  handleModal: (content?: any, footer?: any, title?: any, size?: any, backgroundClick?: boolean, close?: boolean) => void
  modalContent: any
  modalFooter: any
  modalTitle: any
  size: Size
  backgroundClick: boolean
  close: boolean
}
