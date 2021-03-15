import React, { createContext, ReactNode } from 'react'
import { useAuth } from 'hooks/useAuth'
import { AuthObject } from 'types/hooks'

const AuthContext = createContext<AuthObject>({ hasAccess: false, name: null, role: null })

interface IProps {
  children: ReactNode;
}

const ProviderAuth = ({ children }:IProps) => {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={ auth.user }>
      { children }
    </AuthContext.Provider>
  )
}

export default ProviderAuth
