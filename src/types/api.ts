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
    stakeholderRoles: [{ role: string; assets: [string] }]
  }

  stakeholderServices: [{ type: string; endpoint: string }]
  state: string
  timestamp: string
  revoked: boolean
}

export type GovernanceActionsAPIResponse = BaseApiResponse<GovernanceActionsResponse>

interface BaseApiParams {
  page?: number
  size?: number
  sort?: string
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

interface credentialSubject {
  id: string
  claims: string[]
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
  brand: string | null
  bundledProductSpecification:
    | [
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
    | null
  description: string
  id?: string
  isBundle: boolean | null
  lastUpdate: string | null
  name: string
  productNumber: string | null
  productSpecCharacteristic:
    | [
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
    | null
  productSpecificationRelationship:
    | [
        {
          id: string
          relationshipType: string
          validFor: {
            endDateTime: string
            startDateTime: string
          }
        }
      ]
    | null
  relatedParty: [
    {
      extendedInfo: string
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
  serviceSpecification:
    | [
        {
          id: string
          name: string
          version: string
        }
      ]
    | []
  validFor: {
    endDateTime: string
    startDateTime: string
  } | null
  version: string | null
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

export interface ApiServiceSpecification {
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
  serviceSpecCharacteristic: [
    {
      configurable: true
      description: string
      extensible: true
      isUnique: boolean
      maxCardinality: number
      minCardinality: number
      name: string
      regex: string
      serviceSpecCharRelationship: [
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
      serviceSpecCharacteristicValue: [
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
  serviceSpecRelationship: [
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
  id: string
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

export interface ApiCategory {
  description: string
  id: string
  isRoot: true
  lastUpdate: string
  lifecycleStatus: string
  name: string
  parentId: string
  productOffering: [
    {
      id: string
      name: string
    }
  ]
  subCategory: [
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

type LifecycleStatusEnum =
  | 'Active'
  | 'In design'
  | 'In study'
  | 'In test'
  | 'Launched'
  | 'Obsolete'
  | 'Rejected'
  | 'Retired'

type ActionsEnum = 'add' | 'delete' | 'modify' | 'noChange'

type StateEnum =
  | 'acknowledged'
  | 'assessingCancellation'
  | 'cancelled'
  | 'completed'
  | 'failed'
  | 'held'
  | 'inProgress'
  | 'pending'
  | 'pendingCancellation'
  | 'rejected'
export interface SLABody {
  templateRef: {
    name: string
    description: string
    href: string
  }
  validFor: {
    startDateTime: string
    endDateTime: string
  }
  name: string
  description: string
  relatedPartyRefs:
    | [
        {
          role: string
          name: string
          href: string
          validFor: {
            starDateTime: string | null
            endDateTime: string | null
          }
        }
      ]
    | []
  rules: [
    {
      unit: string
      consequence: string
      metric: string
      id: string
      operator: string
      tolerance: string
      referenceValue: string
    }
  ]
}

export interface ApiOrders {
  id: string
  cancellationDate: string
  cancellationReason: string
  category: string
  description: string
  externalId: string
  notificationContact: string
  priority: string
  requestedCompletionDate: string
  requestedStartDate: string
  agreement: [
    {
      href: string
      id: string
      name: string
    }
  ]
  billingAccount: {
    id: string
    href: string
    name: string
  }
  channel: [
    {
      id: string
      href: string
      name: string
      role: string
    }
  ]
  note: [
    {
      id: string
      author: string
      date: string
      text: string
    }
  ]
  orderTotalPrice: [
    {
      id: string
      description: string
      name: string
      priceType: string
      recurringChargePeriod: string
      unitOfMeasure: string
      billingAccount: {
        id: string
        href: string
        name: string
      }
      price: {
        id: string
        percentage: number
        taxRate: number
        dutyFreeAmount: {
          unit: string
          value: number
        }
        taxIncludedAmount: {
          unit: string
          value: number
        }
      }
      priceAlteration: [
        {
          id: string
          applicationDuration: number
          description: string
          name: string
          priceType: string
          priority: number
          recurringChargePeriod: string
          unitOfMeasure: string
          price: {
            id: string
            percentage: number
            taxRate: number
            dutyFreeAmount: {
              unit: string
              value: number
            }
            taxIncludedAmount: {
              unit: string
              value: number
            }
          }
          productOfferingPrice: {
            description: string
            href: string
            id: string
            lastUpdate: string
            lifecycleStatus: string
            lifecycleStatusEnum: LifecycleStatusEnum
            name: string
            validFor: {
              endDateTime: string
              startDateTime: string
            }
            version: string
          }
        }
      ]
      productOfferingPrice: {
        description: string
        href: string
        id: string
        lastUpdate: string
        lifecycleStatus: string
        lifecycleStatusEnum: LifecycleStatusEnum
        name: string
        validFor: {
          endDateTime: string
          startDateTime: string
        }
        version: string
      }
    }
  ]
  payment: [
    {
      id: string
      href: string
      name: string
    }
  ]
  productOfferingQualification: [
    {
      id: string
      href: string
      name: string
    }
  ]
  productOrderItem: [
    {
      id: string
      quantity: number
      action: ActionsEnum
      appointment: {
        id: string
        href: string
        description: string
      }
      billingAccount: {
        id: string
        href: string
        name: string
      }
      itemPrice: [
        {
          id: string
          description: string
          name: string
          priceType: string
          recurringChargePeriod: string
          unitOfMeasure: string
          billingAccount: {
            id: string
            href: string
            name: string
          }
          price: {
            id: string
            percentage: number
            taxRate: number
            dutyFreeAmount: {
              unit: string
              value: number
            }
            taxIncludedAmount: {
              unit: string
              value: number
            }
          }
          priceAlteration: [
            {
              id: string
              applicationDuration: number
              description: string
              name: string
              priceType: string
              priority: number
              recurringChargePeriod: string
              unitOfMeasure: string
              price: {
                id: string
                percentage: number
                taxRate: number
                dutyFreeAmount: {
                  unit: string
                  value: number
                }
                taxIncludedAmount: {
                  unit: string
                  value: number
                }
              }
              productOfferingPrice: {
                description: string
                href: string
                id: string
                lastUpdate: string
                lifecycleStatus: string
                lifecycleStatusEnum: LifecycleStatusEnum
                name: string
                validFor: {
                  endDateTime: string
                  startDateTime: string
                }
                version: string
              }
            }
          ]
          productOfferingPrice: {
            description: string
            href: string
            id: string
            lastUpdate: string
            lifecycleStatus: string
            lifecycleStatusEnum: LifecycleStatusEnum
            name: string
            validFor: {
              endDateTime: string
              startDateTime: string
            }
            version: string
          }
        }
      ]
      itemTerm: [
        {
          id: string
          description: string
          name: string
          duration: {
            id: string
            amount: number
            units: string
          }
        }
      ]
      itemTotalPrice: [
        {
          id: string
          description: string
          name: string
          priceType: string
          recurringChargePeriod: string
          unitOfMeasure: string
          billingAccount: {
            id: string
            href: string
            name: string
          }
          price: {
            id: string
            percentage: number
            taxRate: number
            dutyFreeAmount: {
              unit: string
              value: number
            }
            taxIncludedAmount: {
              unit: string
              value: number
            }
          }
          priceAlteration: [
            {
              id: string
              applicationDuration: number
              description: string
              name: string
              priceType: string
              priority: number
              recurringChargePeriod: string
              unitOfMeasure: string
              price: {
                id: string
                percentage: number
                taxRate: number
                dutyFreeAmount: {
                  unit: string
                  value: number
                }
                taxIncludedAmount: {
                  unit: string
                  value: number
                }
              }
              productOfferingPrice: {
                description: string
                href: string
                id: string
                lastUpdate: string
                lifecycleStatus: string
                lifecycleStatusEnum: LifecycleStatusEnum
                name: string
                validFor: {
                  endDateTime: string
                  startDateTime: string
                }
                version: string
              }
            }
          ]
          productOfferingPrice: {
            description: string
            href: string
            id: string
            lastUpdate: string
            lifecycleStatus: string
            lifecycleStatusEnum: LifecycleStatusEnum
            name: string
            validFor: {
              endDateTime: string
              startDateTime: string
            }
            version: string
          }
        }
      ]
      payment: [
        {
          id: string
          href: string
          name: string
        }
      ]
      product: {
        id: string
        href: string
        description: string
        isBundle: true
        isCustomerVisible: true
        name: string
        orderDate: string
        productSerialNumber: string
        startDate: string
        terminationDate: string
        agreement: [
          {
            id: string
            href: string
            agreementItemId: string
            name: string
          }
        ]
        billingAccount: {
          id: string
          href: string
          name: string
        }
        place: [
          {
            id: string
            href: string
            name: string
            role: string
          }
        ]
        product: []
        productCharacteristic: [
          {
            href: string
            name: string
            value: {
              alias: string
              value: string
            }
            valueType: string
          }
        ]
        productOffering: {
          href: string
          id: string
          name: string
        }
        productOrderItem: [
          {
            id: string
            orderItemAction: string
            orderItemId: string
            productOrderHref: string
            productOrderId: string
            role: string
          }
        ]
        productPrice: [
          {
            id: string
            description: string
            name: string
            priceType: string
            recurringChargePeriod: string
            unitOfMeasure: string
            billingAccount: {
              id: string
              href: string
              name: string
            }
            price: {
              id: string
              percentage: number
              taxRate: number
              dutyFreeAmount: {
                unit: string
                value: number
              }
              taxIncludedAmount: {
                unit: string
                value: number
              }
            }
            productOfferingPrice: {
              description: string
              href: string
              id: string
              lastUpdate: string
              lifecycleStatus: string
              lifecycleStatusEnum: LifecycleStatusEnum
              name: string
              validFor: {
                endDateTime: string
                startDateTime: string
              }
              version: string
            }
            productPriceAlteration: [
              {
                id: string
                applicationDuration: number
                description: string
                name: string
                priceType: string
                priority: number
                recurringChargePeriod: string
                unitOfMeasure: string
                price: {
                  id: string
                  percentage: number
                  taxRate: number
                  dutyFreeAmount: {
                    unit: string
                    value: number
                  }
                  taxIncludedAmount: {
                    unit: string
                    value: number
                  }
                }
                productOfferingPrice: {
                  description: string
                  href: string
                  id: string
                  lastUpdate: string
                  lifecycleStatus: string
                  lifecycleStatusEnum: LifecycleStatusEnum
                  name: string
                  validFor: {
                    endDateTime: string
                    startDateTime: string
                  }
                  version: string
                }
              }
            ]
          }
        ]
        productRelationship: [
          {
            id: string
            relationshipType: string
          }
        ]
        productSpecification: {
          description: string
          href: string
          id: string
          lastUpdate: string
          lifecycleStatus: string
          lifecycleStatusEnum: LifecycleStatusEnum
          name: string
          targetProductSchema: {
            href: string
          }
          validFor: {
            endDateTime: string
            startDateTime: string
          }
          version: string
        }
        productTerm: [
          {
            id: string
            description: string
            name: string
            duration: {
              id: string
              amount: number
              units: string
            }
            validFor: {
              endDateTime: string
              startDateTime: string
            }
          }
        ]
        realizingResource: [
          {
            id: string
            href: string
            name: string
            value: string
          }
        ]
        realizingService: [
          {
            id: string
            href: string
            name: string
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
        status: string // change to ENUM
      }
      productOffering: {
        href: string
        id: string
        name: string
      }
      productOfferingQualificationItem: {
        id: string
        href: string
        name: string
        productOfferingQualificationHref: string
        productOfferingQualificationId: string
        productOfferingQualificationName: string
      }
      productOrderItem: []
      productOrderItemRelationship: [
        {
          id: string
          relationshipType: string
        }
      ]
      qualification: [
        {
          id: string
          href: string
          name: string
        }
      ]
      quoteItem: {
        id: string
        href: string
        name: string
        quoteHref: string
        quoteId: string
        quoteName: string
      }
      state: StateEnum
    }
  ]
  quote: [
    {
      id: string
      href: string
      name: string
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
}

export interface ApiBusinessTransactions {
  ref: string
  status: string
  created: string
  transaction_type: string
  transaction_uuid: string
}

export interface ApiCertificatesBody {
  // key: string
  id_token: string
  // governanceBoardDID: string
  // stakeholderRoles: stakeholderProfileProps[]
  stakeholderServices: any[]
  // stakeholderProfile: {
  //   name: string
  //   address: string
  // }
}

export interface ApiIssuerOffers {
  type: string
  id: string
  claims: string
  timestamp: string
  credential_definition_id: string
}
