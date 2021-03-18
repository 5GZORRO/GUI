import React, { Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import './scss/style.scss'
import { LogoVerticalWhite } from 'assets/icons/logos'
import ProviderAuth from 'context/AuthContext'
import axios from 'axios'

const loading = (
  <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center' data-testid='loading'>
    <LogoVerticalWhite />
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))
// Pages
const Login = React.lazy(() => import('./views/login/index'))
const Register = React.lazy(() => import('./views/register/index'))

const App:React.FC = () => {
  const test = {
    governanceBoardDID: '', // any string will do
    stakeholderServices: [], // empty will do
    stakeholderRoles: {
      role: 'Regulator', // Regulator, Resource Provider, Resource Consumer, Service Provider, and Service Consumers
      assets: 'InformationResource' // InformationResource, SpectrumResource, PhysicalResource, NetworkFunction,
    },
    stakeholderProfile: {
      name: 'test uw',
      address: 'test uw'
    },
    verKey: 'test uw', // manda uma string qq
    handler_url: 'https://webhook.site/56298017-1d7e-4a05-9ec9-8a72da128137' // um url válido
  }
  useEffect(() => {
    axios.post('https://5gzorro.alticelabs.com/holder/register_stakeholder', { test })
  }, [])

  const history = createBrowserHistory()
  return (
    <Router history={history}>
    <ProviderAuth>
      <Suspense fallback={loading}>
        <Switch>
          <Route exact path='/login' name='login' component={Login} />
          <Route path='/register' name='register' component={Register} />
          <Route path='/' component={TheLayout} />
        </Switch>
      </Suspense>
    </ProviderAuth>
    </Router>
  )
}

export default App
