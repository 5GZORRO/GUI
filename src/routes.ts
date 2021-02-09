import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/', name: 'Dashboard', component: Dashboard }
]

export default routes
