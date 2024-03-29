import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { StackeholderResponse } from 'types/api'
import { SESSION_TOKEN, SESSION_USER } from 'config'
import { useHistory, useLocation } from 'react-router-dom'
import { useLogin } from 'hooks/api/Auth'

interface AuthState {
  user: StackeholderResponse | null
  signin: (user: StackeholderResponse) => void
  signout: () => void
}

interface IProps {
  children: ReactNode
}

const AuthContext = createContext<AuthState>({} as AuthState)

const allowedPaths = ['/login', '/register', '/register/success', '/not-found']

const ProviderAuth = ({ children }: IProps) => {
  const [user, setUser] = useState<StackeholderResponse | null>(null)
  // const key = window.localStorage.getItem(SESSION_TOKEN)
  const history = useHistory()
  const location = useLocation()
  const { data, mutate } = useLogin()

  useEffect(() => {
    const getUser = async (prevUser: string) => {
      const parsed = JSON.parse(prevUser)
      if (parsed?.stakeholderClaim?.stakeholderDID) {
        await mutate(parsed?.stakeholderClaim?.stakeholderDID)
      }
    }
    const previousState = window.sessionStorage.getItem(SESSION_USER)
    if (previousState) {
      getUser(previousState)
    }
  }, [])

  useEffect(() => {
    if (data != null) {
      setUser(() => data ?? null)
    }
  }, [data])

  const signin = (user: StackeholderResponse) => {
    setUser(() => user)
    window.sessionStorage.setItem(SESSION_USER, JSON.stringify(user))
  }

  const signout = () => {
    window.sessionStorage.clear()
    setUser(() => null)
    // remove to localStorage
    history.push('/login')
  }

  useEffect(() => {
    if (user == null && !allowedPaths.includes(location?.pathname)) {
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
