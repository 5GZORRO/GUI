import { InputRegister } from 'types/forms'
import * as yup from 'yup'

const createStakeHolderRoles = (data:any) => {
  return Object.keys(data).reduce((acc: any, role:any) => {
    if (data[role].isSelect) {
      // remove isSelect
      const keys = Object.keys(data[role]).filter(item => item !== 'isSelect')
      acc.push({
        // Capitalize ty google
        role: role.charAt(0).toUpperCase() + role.slice(1),
        assets: [...keys.filter(item => data[role][item])]
      })
    }
    return acc
  }, [])
}

export const transformForm = (form: InputRegister) => {
  const newData = {
    key: form.key,
    governanceBoardDID: form.governanceDID,
    stakeholderServices: [
      {
        type: 'string',
        endpoint: 'string'
      }
    ],
    stakeholderRoles: createStakeHolderRoles(form.roles),
    stakeholderProfile: {
      name: form.name,
      address: form.address,
      notificationMethod: {
        notificationType: 'EMAIL',
        distributionList: 'cebec47c-2766-47e0-951b-e02027ecb190@email.webhook.site'
      }
    },
    handlerUrl: 'https://webhook.site/cebec47c-2766-47e0-951b-e02027ecb190'
  }
  return newData
}

interface AssetsProps {
  label: string
  value: boolean
  id: string
}

export const schemaRegister = yup.object().shape({
  name: yup.string().required(),
  governanceDID: yup.string().required(),
  address: yup.string().required(),
  key: yup.string().required(),
  roles: yup.object().shape({
    governance: yup.object().shape({
      isSelect: yup.bool(),
      informationResource: yup.bool(),
      networkFunction: yup.bool(),
      physicalResource: yup.bool(),
      spectrumResource: yup.bool()
    }).test( // this test is added additional to any other (build-in) tests
      'assets',
      'Must select at least one', // we'll return error message ourself if needed
      (obj) => {
        // only testing the checkboxes here
        if (!obj.isSelect) {
          return true
        } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) { // put every checkbox here
          return true
        } else {
          return false
        }
      }
    ),
    regulator: yup.object().shape({
      isSelect: yup.bool(),
      informationResource: yup.bool(),
      networkFunction: yup.bool(),
      physicalResource: yup.bool(),
      spectrumResource: yup.bool()
    }).test( // this test is added additional to any other (build-in) tests
      'assets',
      'Must select at least one', // we'll return error message ourself if needed
      (obj) => {
        // only testing the checkboxes here
        if (!obj.isSelect) {
          return true
        } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) { // put every checkbox here
          return true
        } else {
          return false
        }
      }
    ),
    provider: yup.object().shape({
      isSelect: yup.bool(),
      informationResource: yup.bool(),
      networkFunction: yup.bool(),
      physicalResource: yup.bool(),
      spectrumResource: yup.bool()
    }).test( // this test is added additional to any other (build-in) tests
      'assets',
      'Must select at least one', // we'll return error message ourself if needed
      (obj) => {
        // only testing the checkboxes here
        if (!obj.isSelect) {
          return true
        } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) { // put every checkbox here
          return true
        } else {
          return false
        }
      }
    ),
    consumer: yup.object().shape({
      isSelect: yup.bool(),
      informationResource: yup.bool(),
      networkFunction: yup.bool(),
      physicalResource: yup.bool(),
      spectrumResource: yup.bool()
    }).test( // this test is added additional to any other (build-in) tests
      'assets',
      'Must select at least one', // we'll return error message ourself if needed
      (obj) => {
        // only testing the checkboxes here
        if (!obj.isSelect) {
          return true
        } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) { // put every checkbox here
          return true
        } else {
          return false
        }
      }
    )
  }).test( // this test is added additional to any other (build-in) tests
    'roles',
    'Must select at least one', // we'll return error message ourself if needed
    (obj) => {
      // only testing the checkboxes here
      if (obj.governance.isSelect || obj.regulator.isSelect || obj.provider.isSelect || obj.consumer.isSelect) { // put every checkbox here
        return true
      } else {
        return false
      }
    }
  )
})

export const assestsArray: Array<AssetsProps> = [
  { label: 'Information Resource', value: false, id: 'informationResource' },
  { label: 'Physical Resource', value: false, id: 'physicalResource' },
  { label: 'Spectrum Resource', value: false, id: 'spectrumResource' },
  { label: 'Network Function', value: false, id: 'networkFunction' }
]
