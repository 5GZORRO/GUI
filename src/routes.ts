import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Membership = React.lazy(() => import('./views/membership/index'))
const Proposals = React.lazy(() => import('./views/proposals/index'))
const DiscoverOffers = React.lazy(() => import('./views/discoverOffers/index'))
const Orders = React.lazy(() => import('./views/orders/index'))
const Resources = React.lazy(() => import('./views/resources/index'))
const NewOffer = React.lazy(()=> import('./views/discoverOffers/newOffer/index'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { exact: true, path: '/discover-offers', name: 'Discover Offers', component: DiscoverOffers },
  { path: '/discover-offers/new-offer', name: 'New Offer', component: NewOffer },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/resource', name: 'Resource & Services', component: Resources },
  { path: '/membership', name: 'Membership', component: Membership},
  { path: '/proposals', name: 'Proposals', component: Proposals}
]

export default routes
