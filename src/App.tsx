import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import { createBrowserHistory } from 'history'
import './scss/style.scss'
import { LogoVerticalWhite } from 'assets/icons/logos'
import ProviderAuth from 'context/AuthContext'
import FadeProvider from 'context/FadeContext'

import BackdropWrapper from 'containers/BackdropWrapper'

const loading = (
  <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center" data-testid="loading">
    <LogoVerticalWhite />
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))
// Pages
const Login = React.lazy(() => import('./views/login'))
const Register = React.lazy(() => import('./views/register'))
const RegisterSuccess = React.lazy(() => import('./views/registerSuccess'))

const App: React.FC = () => {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <ProviderAuth>
        <FadeProvider>
          <Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login/" name="login" component={Login} />
              <Route exact path="/register/" name="register" component={Register} />
              <Route exact path="/register/success/" name="registerSuccess" component={RegisterSuccess} />
              <Route exact path="/not-found" component={() => <div>404</div>} />
              <Route path="/" component={TheLayout} />
              <Redirect to="/not-found" />
            </Switch>
          </Suspense>
          <BackdropWrapper/>
        </FadeProvider>
      </ProviderAuth>
    </Router>
  )
}

export default App
