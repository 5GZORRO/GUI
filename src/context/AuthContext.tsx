import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { StackeholderResponse } from 'types/api'
import { SESSION_USER } from 'config'
import { useHistory, useLocation } from 'react-router-dom'

interface AuthState {
  user: StackeholderResponse | null
  signin: (user: StackeholderResponse) => void
  signout: () => void
}

interface IProps {
  children: ReactNode
}

const AuthContext = createContext<AuthState>({} as AuthState)

const ProviderAuth = ({ children }: IProps) => {
  const [user, setUser] = useState<StackeholderResponse | null>(null)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const previousState = window.sessionStorage.getItem(SESSION_USER)
    if (previousState != null) {
      setUser(() => JSON.parse(previousState))
    }
  }, [])

  const signin = (user: StackeholderResponse) => {
    setUser(() => user)
    window.sessionStorage.setItem(SESSION_USER, JSON.stringify(user))
  }

  const signout = () => {
    setUser(() => null)
    // remove to localStorage
    window.sessionStorage.removeItem(SESSION_USER)
    history.push('/login')
  }

  useEffect(() => {
    if (user == null && location?.pathname !== '/login') {
      history.push('/login')
    }
  }, [location?.pathname])

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>
}

export default ProviderAuth

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContext')
  }
  return context
}
