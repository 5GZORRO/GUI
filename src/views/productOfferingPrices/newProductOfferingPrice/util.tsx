import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required()
})
