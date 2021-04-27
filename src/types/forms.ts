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

export interface InputRegister {
  governanceDID: string
  name: string
  adminGovernance: boolean
  company: string
  address: string
  key: string,
  governanceRole: boolean,
  regulatorRole: boolean,
  providerRole: boolean,
  consumerRole: boolean,
  roles: {
    governance: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    },
    regulator: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    },
    provider: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    },
    consumer: {
      isSelect: boolean
      informationResource: boolean
      networkFunction: boolean
      physicalResource: boolean
      spectrumResource: boolean
    }
  }
}
