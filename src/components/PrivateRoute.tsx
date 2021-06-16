import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'

interface IProps {
  children: ReactNode
}
const PrivateRoute = ({ children, ...rest }: IProps) => {
  const { user } = useAuthContext()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user != null
          ? children
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
      }
    />
  )
}
export default PrivateRoute
