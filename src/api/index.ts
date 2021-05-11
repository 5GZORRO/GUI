import resources from './calls/resources'
import products from './calls/products'
import auth from './calls/auth'
import sla from './calls/sla'

export * from './endpoints'

export const api = {
  resources,
  products,
  auth,
  sla
}
