import React, { useEffect, useState } from 'react'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import { CCardBody, CSpinner } from '@coreui/react'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'
import { useAuthContext } from 'context/AuthContext'

const SLATemplateAccordViewer = ({ id, readOnly = false }) => {
  const { data, isLoading } = useGetLegalTemplate(id)
  const { user } = useAuthContext()
  const [renderTemplateText, setRenderTemplateText] = useState('')

  useEffect(() => {
    if (data?.templateFileData) {
      const zip = new JSZip()
      zip.loadAsync(data?.templateFileData, { base64: true }).then(function (zip) {
        if (zip !== null) {
          zip
            .file(Object.keys(zip.files)[0])
            .async('string')
            .then(function (data) {
              try {
                const json = JSON.parse(data)
                const replace = json?.text.replace(
                  '{{stakeholderName}}',
                  user?.stakeholderClaim?.stakeholderProfile?.name
                )
                setRenderTemplateText(replace)
              } catch (e) {
                setRenderTemplateText('')
              }
            })
        }
      })
    }
  }, [data])

  if (!isLoading && data?.templateFileData) {
    return (
      <CCardBody>{renderTemplateText !== '' ? <ReactMarkdown>{renderTemplateText}</ReactMarkdown> : <div />}</CCardBody>
    )
  }
  return <CSpinner color="#fff" />
}

export default SLATemplateAccordViewer
