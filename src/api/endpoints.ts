import { API_MARKET_PLACE, API_IPM, API_SMART_CONTRACT, API_GOVERNANCE, API_LPT, XRM_ENDPOINT, API_SRSD, API_ISSM, API_RAPP } from 'config'

export const endpoints = {
  MEMBERSHIPS: `${API_GOVERNANCE}/api/v1/memberships`,
  REGISTER: `${API_IPM}/holder/register_stakeholder`,
  REGISTER_ORGANIZATION: `${API_MARKET_PLACE}/party/v4/organization`,
  LOGIN: `${API_IPM}/holder/read_stakeholder`,
  PRODUCT_SPECIFICATION: `${API_MARKET_PLACE}/productCatalogManagement/v4/productSpecification`,
  PRODUCT_OFFERING: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering`,
  PRODUCT_OFFERING_FILTERED: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOffering/filtered`,
  PRODUCT_ORDERS: `${API_MARKET_PLACE}/productOrderingManagement/v4/productOrder`,
  LEGAL_PROSE_TEMPLATES: `${API_LPT}/legal-prose-repository/api/v1/legal-prose-templates`,
  RESOURCE_SPECIFICATION: `${API_MARKET_PLACE}/resourceCatalogManagement/v2/resourceSpecification`,
  SERVICE_SPECIFICATION: `${API_MARKET_PLACE}/serviceCatalogManagement/v4/serviceSpecification`,
  PRODUCT_OFFER_PRICE: `${API_MARKET_PLACE}/productCatalogManagement/v4/productOfferingPrice`,
  RESOURCE_CANDIDATE: `${API_MARKET_PLACE}/resourceCatalogManagement/v2/resourceCandidate`,
  SERVICE_CANDIDATE: `${API_MARKET_PLACE}/serviceCatalogManagement/v4/serviceCandidate`,
  CATEGORIES: `${API_MARKET_PLACE}/productCatalogManagement/v4/category`,
  SERVICE_LEGAL_AGREEMENT: `${API_SMART_CONTRACT}/api/v1/service-level-agreement`,
  LICENCES: `${API_SMART_CONTRACT}/api/v1/licences`,
  LOCATIONS: `${API_MARKET_PLACE}/geographicAddressManagement/v4/geographicAddress`,
  LOCATION_CREATE: `${API_MARKET_PLACE}/geographicAddressManagement/v4/geographicAddressValidation`,
  XRM_VNF_DISCOVERY_ENDPOINT: `${XRM_ENDPOINT}/catalogue/vnfd/`,
  XRM_NSD_DISCOVERY_ENDPOINT: `${XRM_ENDPOINT}/catalogue/nsd/`,
  RAPP_SPC_DISCOVERY_ENDPOINT: `${XRM_ENDPOINT}/rapp/spc`,
  RAPP_RAD_DISCOVERY_ENDPOINT: `${XRM_ENDPOINT}/rapp/rad`,
  XRM_VNF_TRANSLATOR_ENDPOINT: `${XRM_ENDPOINT}/translator/vnf/`,
  XRM_NSD_TRANSLATOR_ENDPOINT: `${XRM_ENDPOINT}/translator/ns/`,
  XRM_SPC_TRANSLATOR_ENDPOINT: `${XRM_ENDPOINT}/translator/spc/`,
  XRM_RAD_TRANSLATOR_ENDPOINT: `${XRM_ENDPOINT}/translator/rad/`,
  SRDS_INTENT_MODULE: `${API_SRSD}/intent/`,
  ISSM_ALL_BUSINESS_TRANSACTIONS: `${API_ISSM}/transactions`,
  ISSM_TRANSACTIONS_TYPES: `${API_ISSM}/transactions_types`,
  ISSM_SCALE_OUT: `${API_ISSM}/transactions`,
  ISSM_ARCHIVED: `${API_ISSM}/archived-workflows/domain-`,
  ISSM_DELETE: `${API_ISSM}/transactions`,
  CERTIFICATE_HOLDER_CERTIFICATES: `${API_IPM}/holder/read_stakeholder`,
  CERTIFICATE_HOLDER_REGISTER: `${API_IPM}/holder/license`,
  CERTIFICATE_HOLDER_CREATE_OFFER: `${API_IPM}/holder/create_did`,
  CERTIFICATE_ADMIN_PENDING_CERTIFICATES: `${API_IPM}/issuer/stakeholder?state=pending`,
  CERTIFICATE_ADMIN_APPROVED: `${API_IPM}/issuer/stakeholder?state=approved`,
  CERTIFICATE_ADMIN_REJECTED: `${API_IPM}/issuer/stakeholder?state=rejected`,
  CERTIFICATE_ADMIN_RESOLVE: `${API_IPM}/issuer/stakeholder/resolve`,
  CERTIFICATE_ADMIN_REVOKE: `${API_IPM}/issuer/revoke_did`,
  CERTIFICATE_ADMIN_PENDING_OFFER: `${API_IPM}/issuer/did_offer/pending`,
  CERTIFICATE_ADMIN_RESOLVE_OFFER: `${API_IPM}/issuer/did_offer/resolve`,
  CERTIFICATE_ADMIN_ALL_OFFER: `${API_IPM}/issuer/read_issued_did/all`,
  CERTIFICATE_ADMIN_REVOKED_OFFER: `${API_IPM}/issuer/read_did/revoked`,
  CERTIFICATE_ADMIN_APPROVED_CERTIFICATES: `${API_IPM}/holder/read_stakeholder_status`,
  CERTIFICATE_REGULATOR_APPROVED_LICENSE: `${API_IPM}/regulator/license?state=approved`,
  CERTIFICATE_REGULATOR_PENDING_LICENSE: `${API_IPM}/regulator/license?state=pending`,
  CERTIFICATE_REGULATOR_REJECTED_LICENSE: `${API_IPM}/regulator/license?state=rejected`,
  CERTIFICATE_ALL_LICENSE: `${API_IPM}/holder/license/all`,
  CERTIFICATE_REGULATOR_RESOLVE: `${API_IPM}/regulator/license/resolve`,
  RADD_REGISTER_RESOURCE: `${API_RAPP}/SpectrumWallet/registerSpectrumResource`
}
