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

const App:React.FC = () => {
  return (
    <HashRouter>
        <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/" name="Login" component={Login} />
          <Route path="/dashboard" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
