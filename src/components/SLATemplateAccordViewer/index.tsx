import React, { useState } from 'react'
import { useGetLegalTemplate } from 'hooks/api/Resources'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { CCardBody, CSpinner } from '@coreui/react'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'

const SLATemplateAccordViewer = ({ id, readOnly = false }) => {
  const { data, isLoading } = useGetLegalTemplate(id)
  const [newString, setNewString] = useState('')
  if (!isLoading && data?.templateFileData) {
    const zip = new JSZip()

    zip.loadAsync(data?.templateFileData, { base64: true }).then(function (zip) {
      if (zip) {
        zip
          .file(Object.keys(zip.files)[0])
          .async('string')
          .then(function (data) {
            const json = JSON.parse(data)
            setNewString(json.text)
          })
      }
    })

    return (
      <CCardBody>
        <ReactMarkdown>{newString}</ReactMarkdown>
      </CCardBody>
      // <LegalTemplateEditor
      //   templateString={data?.templateFileData}
      //   readOnly={readOnly ?? true}
      //   getDataCallback={() => ({})}
      //   prefilledData={{}}
      //   triggerCallback={false}
      // />
    )
  }
  return <CSpinner color="#fff" />
}

export default SLATemplateAccordViewer
