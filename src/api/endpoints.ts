import { API_MARKET_PLACE, API_IPM, API_SMART_CONTRACT, API_GOVERNANCE, API_LPT } from 'config'

export const endpoints = {
  MEMBERSHIPS: `${API_GOVERNANCE}/api/v1/memberships`,
  REGISTER: `${API_IPM}/holder/register_stakeholder`,
  REGISTER_ORGANIZATION: `${API_MARKET_PLACE}/party/v4/organization`,
  LOGIN: `${API_IPM}/holder/read_stakeholder_status`,
  PRODUCT_SPECIFICATION: `${API_MARKET_PLACE}/productCatalogManagement/v4/productSpecification`,
  PRODUCT_OFFERING: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering`,
  PRODUCT_OFFERING_FILTERED: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering/filtered`,
  LEGAL_PROSE_TEMPLATES: `${API_LPT}/api/v1/legal-prose-templates`,
  RESOURCE_SPECIFICATION: `${API_MARKET_PLACE}/resourceCatalogManagement/v2/resourceSpecification`,
  PRODUCT_OFFER_PRICE: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOfferingPrice`,
  CATEGORIES: `${API_MARKET_PLACE}/productCatalogManagement/v4/category`,
  SERVICE_LEGAL_AGREEMENT: `${API_SMART_CONTRACT}/api/v1/service-level-agreement`,
  LICENCES: `${API_SMART_CONTRACT}/api/v1/licences`

}
