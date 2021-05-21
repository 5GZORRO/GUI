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
  stakeholderDID: string
  token: string
}

export interface StackeholderResponse {
  /* eslint-disable camelcase */
  handler_url: string
  /* eslint-disable camelcase */
  id_token: string
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

export interface ApiProductSpecification {
  brand: string
  bundledProductSpecification: [
    {
      description: string
      id: string
      lastUpdate: string
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  description: string
  id: string
  isBundle: boolean
  lastUpdate: string
  name: string
  productNumber: string
  productSpecCharacteristic: [
    {
      configurable: boolean
      description: string
      extensible: boolean
      href: string
      isUnique: true
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      maxCardinality: number
      minCardinality: number
      name: string
      productSpecCharRelationship: [
        description: string,
        href: string,
        id: string,
        lastUpdate: string,
        lifecycleStatus: string,
        lifecycleStatusEnum: string,
        name: string,
        relationshipType: string,
        validFor: {
          endDateTime: string
          startDateTime: string
        },
        version: string
      ]
      productSpecCharacteristicValue: [
        {
          isDefault: true
          rangeInterval: string
          unitOfMeasure: string
          validFor: {
            endDateTime: string
            startDateTime: string
          }
          value: {
            alias: string
            value: string
          }
          valueFrom: string
          valueTo: string
          valueType: string
        }
      ]
      regex: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      valueType: string
      version: string
    }
  ]
  productSpecificationRelationship: [
    {
      id: string
      relationshipType: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
    }
  ]
  relatedParty: [
    {
      extendedInfo: string
      href: string
      id: string
      name: string
      role: string
    }
  ]
  resourceSpecification: [
    {
      id: string
      name: string
      version: string
    }
  ]
  serviceSpecification: [
    {
      id: string
      name: string
      version: string
    }
  ]
  validFor: {
    endDateTime: string
    startDateTime: string
  }
  version: string
}

export interface ApiResourceSpecification {
  id: string
  attachment: [
    {
      description: string
      id: string
      name: string
      url: string
    }
  ]
  category: string
  description: string
  feature: [
    {
      id: string
      isBundle: true
      isEnabled: true
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  isBundle: boolean
  lastUpdate: string
  lifecycleStatus: string
  name: string
  relatedParty: [
    {
      extendedInfo: string
      id: string
      name: string
      role: string
    }
  ]
  resourceSpecCharacteristic: [
    {
      configurable: true
      description: string
      extensible: true
      isUnique: boolean
      maxCardinality: number
      minCardinality: number
      name: string
      regex: string
      resourceSpecCharRelationship: [
        {
          id: string
          name: string
          relationshipType: string
          validFor: {
            endDateTime: string
            startDateTime: string
          }
        }
      ]
      resourceSpecCharacteristicValue: [
        {
          isDefault: boolean
          rangeInterval: string
          regex: string
          unitOfMeasure: string
          validFor: {
            endDateTime: string
            startDateTime: string
          }
          value: {
            alias: string
            value: string
          }
          valueFrom: number
          valueTo: number
          valueType: string
        }
      ]
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      valueType: string
    }
  ]
  resourceSpecRelationship: [
    {
      id: string
      name: string
      relationshipType: string
      role: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
    }
  ]
  targetResourceSchema: {
    href: string
  }
  validFor: {
    endDateTime: string
    startDateTime: string
  }
  version: string
}

export interface ApiProductOfferPrice {
  bundledPopRelationship: [
    {
      description: string
      id: string
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  constraint: [
    {
      description: string
      id: string
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  description: string
  isBundle: boolean
  lastUpdate: string
  lifecycleStatus: string
  name: string
  percentage: number
  place: [
    {
      id: string
      name: string
      role: string
    }
  ]
  popRelationship: [
    {
      description: string
      id: string
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      name: string
      relationshipType: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  price: {
    unit: string
    value: number
  }
  priceType: string
  pricingLogicAlgorithm: [
    {
      description: string
      id: string
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      name: string
      plaSpecId: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  prodSpecCharValueUse: [
    {
      description: string
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      maxCardinality: number
      minCardinality: number
      name: string
      productSpecCharacteristicValue: [
        {
          isDefault: boolean
          rangeInterval: string
          regex: string
          unitOfMeasure: string
          validFor: {
            endDateTime: string
            startDateTime: string
          }
          value: {
            alias: string
            value: string
          }
          valueFrom: string
          valueTo: string
          valueType: string
        }
      ]
      productSpecification: {
        description: string
        id: string
        lastUpdate: string
        lifecycleStatus: string
        lifecycleStatusEnum: string
        name: string
        validFor: {
          endDateTime: string
          startDateTime: string
        }
        version: string
      }
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      valueType: string
      version: string
    }
  ]
  productOfferingTerm: [
    {
      description: string
      duration: {
        amount: number
        units: string
      }
      lastUpdate: string
      lifecycleStatus: string
      lifecycleStatusEnum: string
      name: string
      validFor: {
        endDateTime: string
        startDateTime: string
      }
      version: string
    }
  ]
  recurringChargePeriodLength: number
  recurringChargePeriodType: string
  tax: [
    {
      taxAmount: {
        unit: string
        value: number
      }
      taxCategory: string
      taxRate: number
    }
  ]
  unitOfMeasure: {
    amount: number
    units: string
  }
  validFor: {
    endDateTime: string
    startDateTime: string
  }
  version: string
}
