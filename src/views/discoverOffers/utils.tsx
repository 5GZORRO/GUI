import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  productSpecification: yup.object().required(),
  name: yup.string().required(),
  country: yup.string().required(),
  price: yup.string().required(),
  description: yup.string().required(),
  serviceLevelAgreements: yup.array()
  // serviceLevelAgreements: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       id: yup.number(),
  //       name: yup.string()
  //     })
  //   )
  //   .default([])
  //   .test({
  //     message: 'Must choose at least one',
  //     test: (arr: any) => {
  //       console.log(arr, arr?.filter((el: any) => el != null)?.length > 0)
  //       return arr?.length > 0
  //     }
  //   })
})

export const transformForm = (form: any) => {
  const newData = {
    agreement: [],
    attachment: [],
    bundledProductOffering: [],
    category: [],
    channel: [],
    description: form?.description,
    isBundle: null,
    isSellable: null,
    lifecycleStatus: null,
    marketSegment: [],
    name: form?.name,
    // place: [...form?.country],
    place: [],
    prodSpecCharValueUse: [],
    // productOfferingPrice: [...form?.price],
    productOfferingPrice: [],
    productOfferingTerm: [],
    productSpecification: form?.productSpecification,
    resourceCandidate: null,
    serviceCandidate: null,
    // serviceLevelAgreement: [...form?.serviceLevelAgreements],
    serviceLevelAgreement: null,
    statusReason: null,
    version: null
  }
  return newData
}
