import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Provider hook that creates auth object and handles state
export const useAuth = () => {
  const [user, setUser] = useState({ hasAccess: true, name: 'fakeUser' })
  const history = useHistory()

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (name: string) => {
    setUser({ hasAccess: true, name })
  }

  const signout = () => {
    setUser({ hasAccess: false, name: '' })
    // remove to localStorage
    localStorage.removeItem('vas')
  }

  useEffect(() => {
    const authToken = localStorage.getItem('vas')
  }, [])

  useEffect(() => {
    console.log(user.hasAccess)
    user.hasAccess ? history.push('/') : history.push('/login')
  }, [user])

  return {
    user,
    signin,
    signout
  }
}
