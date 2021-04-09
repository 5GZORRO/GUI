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
  address: string
  key: string
  roles: RolesProps[]
}
