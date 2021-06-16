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
        valueType: 'string'
      }
    case 1:
      return {
        name: 'FunctionDescriptorType',
        description:
          'Type of component that correspond to the FunctionDescriptorName values in a POP. This PSC affects to the entire POP, therefore each type of FunctionDescriptorName would require a new POP.',
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
        description:
          'Additional logic required to correctly measure the PriceType. They may be combined in order to closely describe the price logic.',
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
