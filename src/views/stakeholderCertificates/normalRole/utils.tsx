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
    stakeholderServices: form.stakeholderObject !== '' ? [JSON.parse(form.stakeholderObject)] : [],
    stakeholderRoles: form.roles,
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
  roles: yup.object().shape({
    administrator: yup
      .object()
      .shape({
        isSelect: yup.bool(),
        edge: yup.bool(),
        cloud: yup.bool(),
        spectrum: yup.bool(),
        radioAccessNetwork: yup.bool(),
        virtualNetworkFunction: yup.bool(),
        networkSlice: yup.bool(),
        networkService: yup.bool()
      })
      .test(
        // this test is added additional to any other (build-in) tests
        'assets',
        'Must select at least one', // we'll return error message ourself if needed
        (obj) => {
          // only testing the checkboxes here
          if (!obj.isSelect) {
            return true
          } else if (
            obj.edge ||
            obj.cloud ||
            obj.spectrum ||
            obj.radioAccessNetwork ||
            obj.virtualNetworkFunction ||
            obj.networkService ||
            obj.networkSlice
          ) {
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
        edge: yup.bool(),
        cloud: yup.bool(),
        spectrum: yup.bool(),
        radioAccessNetwork: yup.bool(),
        virtualNetworkFunction: yup.bool(),
        networkSlice: yup.bool(),
        networkService: yup.bool()
      })
      .test(
        // this test is added additional to any other (build-in) tests
        'assets',
        'Must select at least one', // we'll return error message ourself if needed
        (obj) => {
          // only testing the checkboxes here
          if (!obj.isSelect) {
            return true
          } else if (
            obj.edge ||
            obj.cloud ||
            obj.spectrum ||
            obj.radioAccessNetwork ||
            obj.virtualNetworkFunction ||
            obj.networkService ||
            obj.networkSlice
          ) {
            // put every checkbox here
            return true
          } else {
            return false
          }
        }
      ),
    trader: yup
      .object()
      .shape({
        isSelect: yup.bool(),
        edge: yup.bool(),
        cloud: yup.bool(),
        spectrum: yup.bool(),
        radioAccessNetwork: yup.bool(),
        virtualNetworkFunction: yup.bool(),
        networkSlice: yup.bool(),
        networkService: yup.bool()
      })
      .test(
        // this test is added additional to any other (build-in) tests
        'assets',
        'Must select at least one', // we'll return error message ourself if needed
        (obj) => {
          // only testing the checkboxes here
          if (!obj.isSelect) {
            return true
          } else if (
            obj.edge ||
            obj.cloud ||
            obj.spectrum ||
            obj.radioAccessNetwork ||
            obj.virtualNetworkFunction ||
            obj.networkService ||
            obj.networkSlice
          ) {
            // put every checkbox here
            return true
          } else {
            return false
          }
        }
      )
  })
})

export const assestsArray: Array<AssetsProps> = [
  { label: 'Edge', value: false, id: 'edge' },
  { label: 'Cloud', value: false, id: 'cloud' },
  { label: 'Spectrum', value: false, id: 'spectrum' },
  { label: 'Radio Access Network', value: false, id: 'radioAccessNetwork' },
  { label: 'Virtual Network Function', value: false, id: 'virtualNetworkFunction' },
  { label: 'Network Slice', value: false, id: 'networkSlice' },
  { label: 'Network Service', value: false, id: 'networkService' }
]
