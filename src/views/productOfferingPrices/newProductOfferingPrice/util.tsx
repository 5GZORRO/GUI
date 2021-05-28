import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required()
})

const getInfo = (index) => {
  switch (index) {
    case 0:
      return {
        name: 'FunctionDescriptorName',
        valueType: 'string'
      }
    case 1:
      return {
        name: 'FunctionDescriptorType',
        valueType: 'string'
      }
    case 2:
      return {
        name: 'PriceLogic',
        valueType: 'string'
      }
    case 3:
      return {
        name: 'UnitOfMeasureAggregation',
        valueType: 'string'
      }
  }
}

export const TransformFormData = (data) => {
  const prodSpecCharValueUse = data?.prodSpecCharValueUse
    ?.map((el: any, index) => ({
      ...getInfo(index),
      productSpecCharacteristicValue: el?.productSpecCharacteristicValue
        .filter((caract) => caract?.value != null && caract?.value !== '')
        .map((cara) => ({ value: { ...cara }, isDefault: true, valueType: 'string' }))
    }))
    ?.filter((el) => el?.productSpecCharacteristicValue?.length > 0)
  console.log(data?.prodSpecCharValueUse, { ...data, prodSpecCharValueUse })
  return { ...data, prodSpecCharValueUse }
}
