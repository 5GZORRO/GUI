import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const FormGenerate = React.lazy(() => import('./views/formGenerate/index'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/form', name: 'FormGenerate', component: FormGenerate }
]

export default routes
