import React, { useEffect, useState } from 'react'
import { useGetSLA } from 'hooks/api/Resources'
import LegalTemplateEditor from 'components/LegalTemplateEditor'
import { CCardBody, CSpinner } from '@coreui/react'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'

const SLAAccordViewer = ({ id, readOnly, templateHref }) => {
  const { data, isLoading, isError } = useGetSLA(id, templateHref)
  const [json, setJson] = useState<any>({})
  const [values, setValues] = useState({})
  const [newString, setNewString] = useState('')

  useEffect(() => {
    if (data) {
      setValues({
        '{{consequence}}': data?.rule?.[0]?.consequence,
        '{{description}}': data?.description,
        '{{endDateTime_party}}': data?.relatedParty?.[0]?.validFor?.endDateTime,
        '{{endDateTime}}': data?.validFor?.endDateTime,
        '{{href}}': data?.relatedParty?.[0]?.href,
        '{{id}}': data?.rule?.[0]?.id,
        '{{metric}}': data?.rule?.[0]?.metric,
        '{{name_party}}': data?.relatedParty?.[0]?.name,
        '{{name}}': data?.name,
        '{{operator}}': data?.rule?.[0]?.operator,
        '{{referenceValue}}': data?.rule?.[0]?.referenceValue,
        '{{role}}': data?.relatedParty?.[0]?.role,
        '{{startDateTime_party}}': data?.relatedParty?.validFor?.startDateTime,
        '{{startDateTime}}': data?.validFor?.startDateTime,
        '{{tolerance}}': data?.rule?.[0]?.tolerance,
        '{{unit}}': data?.rule?.[0]?.unit,
        '{{version}}': data?.version
      })
      const { template, templateRef, approvalDate, status, ...remain } = data

      const zip = new JSZip()
      zip.loadAsync(template?.data?.templateFileData, { base64: true }).then(function (zip) {
        if (zip) {
          zip
            .file(Object.keys(zip.files)[0])
            .async('string')
            .then(function (data) {
              const json = JSON.parse(data)
              setJson(json)
            })
        }
      })
    }
  }, [data])

  useEffect(() => {
    if (Object.keys(values).length === 0) {
      return
    }

    let str = json.text

    Object.keys(values).forEach((key) => {
      str = str.replace(key, values[key])
    })

    setNewString(str)
  }, [json])

  console.log(values)

  if (!isLoading && data?.template) {
    return (
      <CCardBody>
        <ReactMarkdown>{newString}</ReactMarkdown>
      </CCardBody>
    )
  }
  if (isError) {
    return <p>Error fetching template</p>
  }
  return <CSpinner color="#fff" />
}

export default SLAAccordViewer
