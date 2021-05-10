import { StackeholderResponse } from './api'
export interface Auth {
  user: StackeholderResponse
  signin: (name: string) => void
  signout: () => void
}
