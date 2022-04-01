import * as yup from 'yup'
import moment from 'moment'

import { SLA_OUTPUT_DATETIME_FORMAT } from 'config'
export const schemaRegister = yup.object().shape({
  description: yup.string(),
  requestedStartDate: yup
    .string()
    .required()
    .test({
      message: 'Must select a valid date',
      test: (date: any) => {
        return moment(date).isValid()
      }
    }),
  requestedCompletionDate: yup
    .string()
    .required()
    .test({
      message: 'Must select a valid date',
      test: (date: any) => {
        return moment(date).isValid()
      }
    })
})

export const transformForm = (form: any, additionalData: any) => {
  const newData = {
    // agreement: additionalData?.productOrderItem?.map((el) => el?.serviceLevelAgreement),
    agreement: [],
    billingAccount: null,
    cancellationDate: null,
    cancellationReason: null,
    channel: [],
    description: form?.description,
    note: [],
    notificationContact: null,
    orderTotalPrice: [],
    payment: [],
    productOfferingQualification: [],
    productOrderItem: additionalData?.productOrderItem?.map(el => ({
      action: 'add',
      appointment: null,
      billingAccount: null,
      itemPrice: [],
      itemTerm: [],
      itemTotalPrice: [],
      payment: [],
      product: null,
      productOffering: {
        id: el?.id,
        href: el?.href,
        name: el?.name
      },
      productOfferingQualificationItem: null,
      productOrderItem: [],
      productOrderItemRelationship: [],
      qualification: [],
      quantity: 0,
      quoteItem: null,
      state: 'acknowledged'
    })),
    quote: [],
    relatedParty: [],
    requestedCompletionDate: moment(form?.requestedCompletionDate).format(SLA_OUTPUT_DATETIME_FORMAT),
    requestedStartDate: moment(form?.requestedStartDate).format(SLA_OUTPUT_DATETIME_FORMAT)
  }
  return newData
}
