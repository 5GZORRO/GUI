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
