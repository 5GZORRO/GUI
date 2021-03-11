import React, { createContext, ReactNode } from 'react'
import { useAuth } from 'hooks/useAuth'

const AuthContext = createContext<{ hasAccess: boolean, name: string | null }>({ hasAccess: false, name: null })

interface IProps {
  children: ReactNode;
}

const ProviderAuth = ({ children }:IProps) => {
  const auth = useAuth()
  console.log(auth)
  return (
    <AuthContext.Provider value={ auth.user }>
      { children }
    </AuthContext.Provider>
  )
}

export default ProviderAuth
