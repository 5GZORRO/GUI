import { API_MARKET_PLACE, API_GOVERNANCE, API_SMART_CONTRACT } from 'config'

export const endpoints = {
  MEMBERSHIPS: `${API_MARKET_PLACE}/memberships`,
  REGISTER: `${API_GOVERNANCE}/holder/register_stakeholder`,
  REGISTER_ORGANIZATION: `${API_MARKET_PLACE}/party/v4/organization`,
  LOGIN: `${API_GOVERNANCE}/holder/read_stakeholder_status`,
  RESOURCE_CANDIDATE: `${API_MARKET_PLACE}/resourceCatalogManagement/v2/resourceCandidate`,
  PRODUCT_SPECIFICATION: `${API_MARKET_PLACE}/productCatalogManagement/v4/productSpecification`,
  PRODUCT_OFFERING: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering`,
  SMART_CONTRACT_MANAGEMENT: `${API_SMART_CONTRACT}/service-level-agreement`
}
