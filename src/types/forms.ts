export interface ResourceCreationInter {
  name: string
  description: string
  version: string
  validFor: string
  ownerDid: string
  category: string
  resourceSpecification: string
}

interface AssetsProps {
  informationResource: boolean
  spectrumResource: boolean
  physicalResource: boolean
  networkFunction: boolean
}

export interface RolesProps {
  name: string
  assets: AssetsProps
}

export interface InputLogin {
  stakeholderDID: string
}

export interface InputRegister {
  governanceDID: string
  name: string
  email: string
  adminGovernance: boolean
  'handler_url': string
  company: string
  address: string
  key: string
  regulatorRole: boolean
  resourceProviderRole: boolean
  resourceConsumerRole: boolean
  serviceProviderRole: boolean
  serviceConsumerRole: boolean
  roles: {
    regulator: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
    resourceProvider: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
    resourceConsumer: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
    serviceProvider: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
    serviceConsumer: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
  }
}
