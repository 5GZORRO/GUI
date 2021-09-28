import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  location: yup.string(),
  productOfferPrice: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string(),
        name: yup.string()
      })
    )
    .default([])
    .test({
      message: 'Must choose at least one',
      test: (arr: any) => {
        return arr?.length > 0
      }
    }),
  serviceLevelAgreement: yup.mixed().required(),
  category: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.object()
      })
    )
    .default([])
    .test({
      message: 'Must choose at least one',
      test: (arr: any) => {
        return arr?.length > 0
      }
    })
})

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const transformForm = (form: any, resourcesData: any) => {
  const newData = {
    agreement: [],
    attachment: [],
    bundledProductOffering: [],
    category: form?.category?.map((el: any) => el?.value),
    channel: [],
    description: form?.description,
    isBundle: null,
    isSellable: null,
    lifecycleStatus: 'active',
    marketSegment: [],
    name: form?.name,
    place: IsJsonString(form?.location) ? [JSON.parse(form?.location)] : [],
    prodSpecCharValueUse: [],
    productOfferingPrice: form?.productOfferPrice,
    productOfferingTerm: [],
    productSpecification: null,
    resourceCandidate: null,
    serviceCandidate: null,
    serviceLevelAgreement: form?.serviceLevelAgreement?.[0],
    statusReason: null,
    version: null,
    validFor: form?.validFor
  }
  return newData
}
