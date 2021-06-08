import React from 'react'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { CSpinner } from '@coreui/react'

const SLATemplateAccordViewer = ({ id, readOnly }) => {
  const { data, isLoading } = useGetLegalTemplate(id)
  if (!isLoading && data?.templateFileData) {
    return (
      <LegalTemplateEditor
        templateString={data?.templateFileData}
        readOnly={readOnly ?? true}
        getDataCallback={() => ({})}
        prefilledData={{}}
        triggerCallback={false}
      />
    )
  }
  return <CSpinner color="#fff" />
}

export default SLATemplateAccordViewer
