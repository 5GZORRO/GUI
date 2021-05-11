/* eslint-disable no-unused-vars */
interface BaseApiResponse<T> {
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  content: T[]
  pageable: {
    page: number
    size: number
    sort: string[]
  }
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

interface MembershipsResponse {
  stakeholderId: string
  legalName: string
  address: string
}

enum ProposalStatus {
  PROPOSED = 'PROPOSED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

enum actionTypes {
  ONBOARD_STAKEHOLDER = 'ONBOARD_STAKEHOLDER',
  NEW_LEGAL_PROSE_TEMPLATE = 'NEW_LEGAL_PROSE_TEMPLATE',
  ARCHIVE_LEGAL_PROSE_TEMPLATE = 'ARCHIVE_LEGAL_PROSE_TEMPLATE',
  SLA_DISPUTE = 'SLA_DISPUTE'
}

interface GovernanceActionsResponse {
  proposalId: string
  status: ProposalStatus
  actionType: actionTypes
  actionParams: {
    entityIdentityId: string
    evidence: string
  }
  statusUpdated: string
}

export interface ApiOrganizationBody {
    organizationCreate: {}
    stakeholderDID: string,
    token: string
}

export interface StackeholderResponse {
  /* eslint-disable camelcase */
  'handler_url': string
  /* eslint-disable camelcase */
  'id_token': string
  stakeholderClaim: {
    governanceBoardDID: string
    stakeholderDID: string
    stakeholderProfile: {
      address: string
      name: string
      notificationMethod: {
        distributionList: string
        notificationType: string
      }
    }
  }

  stakeholderRoles: [{ role: string; assets: [string] }]
  stakeholderServices: [{ type: string; endpoint: string }]
  state: string
  timestamp: string
}

export type MemberbershipAPIResponse = BaseApiResponse<MembershipsResponse>

export type GovernanceActionsAPIResponse = BaseApiResponse<GovernanceActionsResponse>

interface BaseApiParams {
  page?: number
  size?: number
  sort?: string
}

export interface ApiParamsMembership extends BaseApiParams {
  filterText?: string
}

export interface ApiParamsGovernanceActions extends BaseApiParams {
  statusFilter?: ProposalStatus
  actionTypeFilter?: actionTypes
}

export interface ApiResourceCandidate {
  id: string
  name: string
  version: string
  valid: string
  categories: string[]
  lifecycleStatus: string
  resourceSpecification: any
}

interface stakeholderServicesProps {
  type: string
  endpoint: string
}

interface stakeholderProfileProps {
  role: string
  assets: string[]
}

export interface ApiRegisterBody {
  key: string
  governanceBoardDID: string
  stakeholderServices: stakeholderServicesProps[]
  stakeholderRoles: stakeholderProfileProps[]
  stakeholderProfile: {
    name: string
    address: string
    notificationMethod: {
      notificationType: string
      distributionList: string
    }
  }
  handler_url: string
}

export interface ApiLoginBody {
  stakeholderDID: string
}

export interface ApiLoginResponse {
  stakeholderClaim: {
    governanceBoardDID: string
    stakeholderServices: stakeholderServicesProps[]
    stakeholderRoles: stakeholderProfileProps[]
    stakeholderProfile: {
      name: string
      address: string
      notificationMethod: {
        notificationType: string
        distributionList: string
      }
    }
    stakeholderDID: string
  }
  state: string
  credentialDefinitionId: string
  idToken: string
}
