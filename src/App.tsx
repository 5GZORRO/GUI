import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { LogoVerticalWhite } from 'assets/icons/logos'

const loading = (
  <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
    <LogoVerticalWhite />
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))
// Pages
const Login = React.lazy(() => import('./views/login/index'))
const Register = React.lazy(() => import('./views/register/index'))

const App:React.FC = () => {
  return (
    <HashRouter>
        <Suspense fallback={loading}>
        <Switch>
          <Route exact path='/login' name='login' component={Login} />
          <Route path='/register' name='register' component={Register} />
          <Route path="/" component={TheLayout} />
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default App
