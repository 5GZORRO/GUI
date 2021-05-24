import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  country: yup.string().required(),
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
  serviceLevelAgreement: yup.mixed().required()
})

export const transformForm = (form: any, resourcesData: any) => {
  const newData = {
    agreement: [],
    attachment: [],
    bundledProductOffering: [],
    // category: resourcesData?.map((resource: any) => resource?.category),
    category: [],
    channel: [],
    description: form?.description,
    isBundle: null,
    isSellable: null,
    lifecycleStatus: resourcesData?.find((el: any) => el?.lifecycleStatus != null)?.lifecycleStatus,
    marketSegment: [],
    name: form?.name,
    // place: [...form?.country],
    place: [],
    prodSpecCharValueUse: [],
    productOfferingPrice: form?.productOfferPrice,
    productOfferingTerm: [],
    productSpecification: null,
    resourceCandidate: null,
    serviceCandidate: null,
    serviceLevelAgreement: form?.serviceLevelAgreement?.[0],
    statusReason: null,
    version: null,
    validFor: resourcesData?.find((el: any) => el?.validFor != null)?.validFor
  }
  return newData
}
