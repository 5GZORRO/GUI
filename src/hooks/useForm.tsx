import { useState } from 'react'
// Provider hook that creates auth object and handles state
export const useDataForm = () => {
  const [form, setForm] = useState<any>({
    name: 'default value',
    description: 'test state',
    version: '1.0.1',
    validFor: '21/03/2034',
    owner: 'akasmndj21312',
    category: 2,
    resourceSpecification: 3
  })

  const changeForm = (form:any) => setForm(form)

  return {
    form,
    changeForm
  }
}
