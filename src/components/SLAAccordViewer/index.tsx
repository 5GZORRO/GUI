import React from 'react'
import { useGetSLA } from 'hooks/api/Resources'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { CSpinner } from '@coreui/react'

const SLAAccordViewer = ({ id, readOnly, templateHref }) => {
  const { data, isLoading, isError } = useGetSLA(id, templateHref)
  if (!isLoading && data?.template) {
    const { template, templateRef, approvalDate, id, ...remain } = data
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
