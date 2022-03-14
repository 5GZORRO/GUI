import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required()
})

const getInfo = (index) => {
  switch (index) {
    case 0:
      return {
        name: 'FunctionDescriptorId',
        description: 'Descriptor name which links this specification to an actual Virtual Network Function',
        valueType: 'string',
        isDefault: true
      }
    case 1:
      return {
        name: 'FunctionDescriptorType',
        description: 'Type of component that correspond to the FunctionDescriptorName values in a POP.',
        valueType: 'string'
      }
    case 2:
      return {
        name: 'PriceLogic',
        description: 'Type of logic applied to the productOfferingPrice',
        valueType: 'string'
      }
    case 3:
      return {
        name: 'UnitOfMeasureAggregation',
        description: 'Additional logic required to correctly measure the PriceType.',
        valueType: 'string'
      }
    case 4:
      return {
        name: 'MaxNumberInstances',
        description: 'Maximum Number of Licensed Instances.',
        valueType: 'integer'
      }
  }
}

export const TransformFormData = (data) => {
  const prodSpecCharValueUse = data?.prodSpecCharValueUse
    ?.map((el: any, index) => ({
      ...getInfo(index),
      productSpecCharacteristicValue: el?.productSpecCharacteristicValue
        .filter((caract) => caract?.value != null && caract?.value !== '')
        .map((cara) => {
          if (cara?.valueType === 'integer') {
            return { ...cara, value: { value: parseInt(cara.value) } }
          } else {
            return { value: { ...cara }, isDefault: true, valueType: 'string' }
          }
        })
    }))
    ?.filter((el) => el?.productSpecCharacteristicValue?.length > 0)
  return { ...data, prodSpecCharValueUse }
}
