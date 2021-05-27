import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { CSpinner } from '@coreui/react'
import { endpoints } from 'api/endpoints'

import LegalTemplateEditor from 'components/LegalTemplateEditor'

const NewSLAForm = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetLegalTemplate(id)
  const href = `${endpoints.LEGAL_PROSE_TEMPLATES}/${id}`
  // console.log(data)

  if (!isLoading && data?.templateFileData) {
    return <LegalTemplateEditor templateString={data?.templateFileData} readOnly={false} />
  }
  return <CSpinner color="#fff" />
}

export default NewSLAForm
