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
const LegalProseTemplates = React.lazy(() => import('./views/lpts'))
const ProductOfferingPrices = React.lazy(() => import('./views/productOfferingPrices'))
const NewProductOfferingPrice = React.lazy(() => import('./views/productOfferingPrices/newProductOfferingPrice'))
const NewLegalProseTemplate = React.lazy(() => import('./views/lpts/NewTemplate'))
const NewLicence = React.lazy(() => import('./views/lpts/NewLicence'))
const NewSLA = React.lazy(() => import('./views/lpts/NewSLA'))
const NewSLAForm = React.lazy(() => import('./views/lpts/NewSLAForm'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { exact: true, path: '/offers', name: 'Offers', component: DiscoverOffers },
  { path: '/offers/new-offer/:id', name: 'Detail Product Offer', component: ProductDetail },
  { path: '/offers/new-offer', name: 'New Product Offer', component: NewProduct },
  { path: '/orders', name: 'Orders', component: Orders },
  { exact: true, path: '/resource', name: 'Resources & Services', component: Resources },
  { exact: true, path: '/resource/new-resource', name: 'Create Resource & Service', component: NewResource },
  { exact: true, path: '/prices/new', name: 'New Product Offering Price', component: NewProductOfferingPrice },

  { path: '/resource/new-resource/new-category', name: 'New Category', component: NewCategory },
  {
    path: '/resource/new-resource/new-physical-resource',
    name: 'New Resource - Physical Capabilities',
    component: NewPhysicalResource
  },
  {
    path: '/resource/new-resource/new-virtual-resource',
    name: 'New Resource - Virtual Capabilities',
    component: NewVirtualResource
  },
  { path: '/membership', name: 'Membership', component: Membership },
  { path: '/proposals', name: 'Proposals', component: Proposals },
  { path: '/templates/new/sla/:id', name: 'New SLA', component: NewSLAForm },

  { path: '/templates/new/sla', name: 'New SLA', component: NewSLA },

  { path: '/templates/new/licence', name: 'New Licence', component: NewLicence },

  { path: '/templates/new/', name: 'New Legal Prose Template', component: NewLegalProseTemplate },

  { path: '/templates', name: 'Legal Prose Templates', component: LegalProseTemplates },
  { path: '/prices', name: 'Product Offering Prices', component: ProductOfferingPrices }
]

export default routes
