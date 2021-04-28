import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import './scss/style.scss'
import { LogoVerticalWhite } from 'assets/icons/logos'
import ProviderAuth from 'context/AuthContext'

const loading = (
  <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center' data-testid='loading'>
    <LogoVerticalWhite />
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))
// Pages
const Login = React.lazy(() => import('./views/login'))
const Register = React.lazy(() => import('./views/register'))
const RegisterSuccess = React.lazy(() => import('./views/registerSuccess'))

const App:React.FC = () => {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
    <ProviderAuth>
      <Suspense fallback={loading}>
        <Switch>
          <Route exact path='/login' name='login' component={Login} />
          <Route path='/register' name='register' component={Register} />
          <Route path='/success' name='registerSuccess' component={RegisterSuccess} />
          <Route path='/' component={TheLayout} />
        </Switch>
      </Suspense>
    </ProviderAuth>
    </Router>
  )
}

export default App
