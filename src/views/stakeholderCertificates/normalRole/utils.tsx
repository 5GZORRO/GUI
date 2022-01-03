import * as yup from 'yup'
import { InputAddCertificate } from 'types/forms'
import { VERIFICATION_KEY, LEDGER_IDENTITY } from 'config'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

const createStakeHolderRoles = (data: any) => {
  return Object.keys(data).reduce((acc: any, role: any) => {
    if (data[role].isSelect) {
      // remove isSelect
      const keys = Object.keys(data[role]).filter((item) => item !== 'isSelect')
      acc.push({
        // Capitalize ty google
        role: startCase(lowerCase(role)).replace(/\s/g, ''),
        assets: [...keys.filter((item) => data[role][item]).map((el) => el.charAt(0).toUpperCase() + el.slice(1))]
      })
    }
    return acc
  }, [])
}

export const transformForm = (form: InputAddCertificate) => {
  const newData = {
    key: VERIFICATION_KEY,
    governanceBoardDID: form.governanceDID,
    stakeholderServices: [JSON.parse(form.stakeholderObject)],
    stakeholderRoles: createStakeHolderRoles(form.roles),
    stakeholderProfile: {
      name: form.name,
      address: form.address,
      company: form.company,
      ledgerIdentity: LEDGER_IDENTITY,
      notificationMethod: {
        notificationType: 'EMAIL',
        distributionList: form.email
      }
    },
    handler_url: ''
  }
  return newData
}

interface AssetsProps {
  label: string
  value: boolean
  id: string
}

export const schemaAddCertificate = yup.object().shape({
  name: yup.string().required(),
  // handler_url: yup.string().url().required(),
  governanceDID: yup.string().required(),
  address: yup.string().required(),
  roles: yup
    .object()
    .shape({
      administrator: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        ),
      regulator: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        ),
      resourceProvider: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        ),
      resourceConsumer: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        ),
      serviceProvider: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        ),
      serviceConsumer: yup
        .object()
        .shape({
          isSelect: yup.bool(),
          informationResource: yup.bool(),
          networkFunction: yup.bool(),
          physicalResource: yup.bool(),
          spectrumResource: yup.bool()
        })
        .test(
          // this test is added additional to any other (build-in) tests
          'assets',
          'Must select at least one', // we'll return error message ourself if needed
          (obj) => {
            // only testing the checkboxes here
            if (!obj.isSelect) {
              return true
            } else if (obj.informationResource || obj.networkFunction || obj.physicalResource || obj.spectrumResource) {
              // put every checkbox here
              return true
            } else {
              return false
            }
          }
        )
    })
    .test(
      // this test is added additional to any other (build-in) tests
      'roles',
      'Must select at least one', // we'll return error message ourself if needed
      (obj) => {
        // only testing the checkboxes here
        if (
          obj.administrator.isSelect ||
          obj.regulator.isSelect ||
          obj.resourceProvider.isSelect ||
          obj.resourceConsumer.isSelect ||
          obj.serviceProvider.isSelect ||
          obj.serviceConsumer.isSelect
        ) {
          // put every checkbox here
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
