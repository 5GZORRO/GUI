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
  edge: boolean
  cloud: boolean
  spectrum: boolean
  radioAccessNetwork: boolean
  virtualNetworkFunction: boolean
  networkSlice: boolean
  networkService: boolean
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
  /* eslint-disable camelcase */
  handler_url: string
  address: string
  key: string
  regulatorRole: boolean
  resourceProviderRole: boolean
  resourceConsumerRole: boolean
  serviceProviderRole: boolean
  serviceConsumerRole: boolean
  roles: {
    administrator: {
      isSelect: boolean
      edge: boolean
      cloud: boolean
      spectrum: boolean
      radioAccessNetwork: boolean
      virtualNetworkFunction: boolean
      networkSlice: boolean
      networkService: boolean
    }
    regulator: {
      isSelect: boolean
      edge: boolean
      cloud: boolean
      spectrum: boolean
      radioAccessNetwork: boolean
      virtualNetworkFunction: boolean
      networkSlice: boolean
      networkService: boolean
    }
    trader: {
      isSelect: boolean
      edge: boolean
      cloud: boolean
      spectrum: boolean
      radioAccessNetwork: boolean
      virtualNetworkFunction: boolean
      networkSlice: boolean
      networkService: boolean
    }
  }
}

export interface InputAddCertificate {
  governanceDID: string
  name: string
  // company: string
  email: string
  address: string
  spectrumResource: string
  stakeholderObject: string
  roles: any[]
  // roles: {
  //   administrator: {
  //     isSelect: boolean
  //     edge: boolean
  //     cloud: boolean
  //     spectrum: boolean
  //     radioAccessNetwork: boolean
  //     virtualNetworkFunction: boolean
  //     networkSlice: boolean
  //     networkService: boolean
  //   }
  //   regulator: {
  //     isSelect: boolean
  //     edge: boolean
  //     cloud: boolean
  //     spectrum: boolean
  //     radioAccessNetwork: boolean
  //     virtualNetworkFunction: boolean
  //     networkSlice: boolean
  //     networkService: boolean
  //   }
  //   trader: {
  //     isSelect: boolean
  //     edge: boolean
  //     cloud: boolean
  //     spectrum: boolean
  //     radioAccessNetwork: boolean
  //     virtualNetworkFunction: boolean
  //     networkSlice: boolean
  //     networkService: boolean
  //   }
  // }
}
