import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
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
        <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path='/login' name='login' component={Login} />
          <Route path='/register' name='register' component={Register} />
          <Route path="/" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
