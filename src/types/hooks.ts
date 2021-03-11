export interface Auth {
  user: {
    name: string
    hasAccess: boolean
  },
  signin: (name: string) => void
  signout: () => void
}
