import { API_MARKET_PLACE, API_GOVERNANCE } from 'config'

export const endpoints = {
  MEMBERSHIPS: `${API_MARKET_PLACE}/memberships`,
  REGISTER: `${API_GOVERNANCE}/holder/register_stakeholder`,
  LOGIN: `${API_GOVERNANCE}/holder/read_stakeholder_status`,
  RESOURCE_CANDIDATE: `${API_MARKET_PLACE}/resourceCatalogManagement/v2/resourceCandidate`,
  PRODUCT_SPECIFICATION: `${API_MARKET_PLACE}/productCatalogManagement/v4/productSpecification`,
  PRODUCT_OFFERING: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering`

}
