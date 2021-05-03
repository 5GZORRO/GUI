import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

interface IProps {
  children: ReactNode
}
const PrivateRoute = ({ children, ...rest }: IProps) => {
  const { user } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.hasAccess
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
