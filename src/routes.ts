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
const NewOrder = React.lazy(() => import('./views/orders/NewOrder'))
const FormCreateOrder = React.lazy(() => import('./views/orders/FormCreateOrder'))
const FetchResources = React.lazy(() => import('./views/resources/FetchResources'))
const IssmBusinessTransactions = React.lazy(() => import('./views/Issm/index'))
const StakeholderCertificates = React.lazy(() => import('./views/stakeholderCertificates/index'))
const AdminStakeholderCertificates = React.lazy(() => import('./views/stakeholderCertificates/adminRole/index'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { exact: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { exact: true, path: '/offers', name: 'Offers', component: DiscoverOffers },
  { path: '/offers/new-offer/:id', name: 'Detail Product Offer', component: ProductDetail },
  { path: '/offers/new-offer', name: 'New Product Offer', component: NewProduct },
  { exact: true, path: '/orders', name: 'Orders', component: Orders },
  { path: '/orders/new-order/:id', name: 'Detail Product Order', component: FormCreateOrder },
  { path: '/orders/new-order', name: 'New Product Orders', component: NewOrder },
  { exact: true, path: '/resource', name: 'Resources & Services', component: Resources },

  { exact: true, path: '/resource/translate-resources', name: 'Fetch xRM', component: FetchResources },

  { exact: true, path: '/resource/new-resource', name: 'Create Resource & Service', component: NewResource },
  { exact: true, path: '/prices/new', name: 'New Product Offering Price', component: NewProductOfferingPrice },

  { exact: true, path: '/businesstransactions', name: 'Business Transactions', component: IssmBusinessTransactions },

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
  { path: '/prices', name: 'Product Offering Prices', component: ProductOfferingPrices },

  { path: '/certificates', name: 'Stakeholder Certificates', component: StakeholderCertificates },
  { path: '/stakeholdercertificates', name: 'Stakeholder Certificates', component: AdminStakeholderCertificates },
  { path: '/offercertificates', name: 'Offer Certificates', component: AdminStakeholderCertificates }
]

export default routes
