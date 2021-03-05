import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Membership = React.lazy(() => import('./views/membership/index'))
const Proposals = React.lazy(() => import('./views/proposals/index'))
const DiscoverOffers = React.lazy(() => import('./views/discoverOffers/index'))
const NewProduct = React.lazy(() => import('./views/discoverOffers/newProductOffer'))
const ProductDetail = React.lazy(() => import('./views/discoverOffers/productDetail'))
const Orders = React.lazy(() => import('./views/orders/index'))
const Resources = React.lazy(() => import('./views/resources/index'))
const NewResource = React.lazy(() => import('./views/resources/newResource/index'))
const NewPhysicalResource = React.lazy(() => import('./views/resources/newPhysicalResource'))
const NewVirtualResource = React.lazy(() => import('./views/resources/newVirtualResource'))
const NewCategory = React.lazy(() => import('./views/resources/newCategory'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { exact: true, path: '/discover-offers', name: 'Discover Offers', component: DiscoverOffers },
  { path: '/discover-offers/new-product', name: 'New Product Offer', component: NewProduct },
  { path: '/discover-offers/detail-product/:id', name: 'Detail Product Offer', component: ProductDetail },
  { path: '/orders', name: 'Orders', component: Orders },
  { exact: true, path: '/resource', name: 'Resource & Services', component: Resources },
  { exact: true, path: '/resource/new-resource', name: 'Create Resource & Service', component: NewResource },
  { path: '/resource/new-resource/new-category', name: 'New Category', component: NewCategory },
  { path: '/resource/new-resource/new-physical-resource', name: 'New Resource - Physical Capabilities', component: NewPhysicalResource },
  { path: '/resource/new-resource/new-virtual-resource', name: 'New Resource - Virtual Capabilities', component: NewVirtualResource },
  { path: '/membership', name: 'Membership', component: Membership },
  { path: '/proposals', name: 'Proposals', component: Proposals }
]

export default routes
