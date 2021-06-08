import React from 'react'
import { useGetSLA } from 'hooks/api/Resources'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { CSpinner } from '@coreui/react'

const SLAAccordViewer = ({ id, readOnly }) => {
  const { data, isLoading, isError } = useGetSLA(id)
  if (!isLoading && data?.template) {
    const { template, ...remain } = data
    return (
      <LegalTemplateEditor
        templateString={template?.templateFileData}
        readOnly={readOnly ?? true}
        getDataCallback={() => ({})}
        prefilledData={{ ...remain }}
        triggerCallback={false}
      />
    )
  }
  if (isError) {
    return <p>Error fetching template</p>
  }
  return <CSpinner color="#fff" />
}

export default SLAAccordViewer
