import { API_MARKET_PLACE, API_IPM, API_SMART_CONTRACT, API_GOVERNANCE, API_LPT } from 'config'

export const endpoints = {
  MEMBERSHIPS: `${API_GOVERNANCE}/api/v1/memberships`,
  REGISTER: `${API_IPM}/holder/register_stakeholder`,
  REGISTER_ORGANIZATION: `${API_MARKET_PLACE}/party/v4/organization`,
  LOGIN: `${API_IPM}/holder/read_stakeholder_status`,
  PRODUCT_SPECIFICATION: `${API_MARKET_PLACE}/productCatalogManagement/v4/productSpecification`,
  PRODUCT_OFFERING: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering`,
  SMART_CONTRACT_MANAGEMENT: `${API_SMART_CONTRACT}/service-level-agreement`,
  LEGAL_PROSE_TEMPLATES: `${API_LPT}/api/v1/legal-prose-templates`
}
