import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  description: yup.string(),
  externalId: yup.string(),
  requestedStartDate: yup.string().required(),
  requestedCompletionDate: yup.string().required()
})

export const transformForm = (form: any, additionalData: any) => {
  console.log(form, additionalData)
}
