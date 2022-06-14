import resources from './calls/resources'
import products from './calls/products'
import auth from './calls/auth'
import sla from './calls/sla'
import licences from './calls/licences'
import orders from './calls/orders'
import issm from './calls/issm'
import certificates from './calls/certificates'

export * from './endpoints'

export const api = {
  resources,
  products,
  auth,
  sla,
  licences,
  orders,
  issm,
  certificates
}
