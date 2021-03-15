import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthObject } from 'types/hooks'

// Provider hook that creates auth object and handles state
export const useAuth = () => {
  const [user, setUser] = useState<AuthObject>({ hasAccess: true, name: 'fakeUser', role: 'Provider' })
  const history = useHistory()

  // ... to save the user to state.
  const signin = (name: string, role: string) => {
    setUser({ hasAccess: true, name, role })
  }

  const signout = () => {
    setUser({ hasAccess: false, name: null, role: null })
    // remove to localStorage
    localStorage.removeItem('vas')
  }

  useEffect(() => {
    // const authToken = localStorage.getItem('vas')
  }, [])

  useEffect(() => {
    console.log(user.hasAccess)
    !user.hasAccess && history.push('/login')
  }, [user])

  return {
    user,
    signin,
    signout
  }
}
