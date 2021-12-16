interface AssetsProps {
  label: string
  value: boolean
  id: string
}

export const assestsArray: Array<AssetsProps> = [
  { label: 'Information Resource', value: false, id: 'informationResource' },
  { label: 'Physical Resource', value: false, id: 'physicalResource' },
  { label: 'Spectrum Resource', value: false, id: 'spectrumResource' },
  { label: 'Network Function', value: false, id: 'networkFunction' }
]

// export const TransformFormData = (data: any) => {
//   const { switch,  file, asset, ...filtered } = data

//   return { filtered }
// }
