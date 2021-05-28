import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required()
})

export const TransformFormData = (data) => {
  const prodSpecCharValueUse = data?.prodSpecCharValueUse?.filter(
    (el: any) => el?.productSpecCharacteristicValue?.value != null && el?.productSpecCharacteristicValue?.value !== ''
  )

  return { ...data, prodSpecCharValueUse }
}
