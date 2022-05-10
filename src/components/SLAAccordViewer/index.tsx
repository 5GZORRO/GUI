import React, { useEffect, useState } from 'react'
import { useGetSLA } from 'hooks/api/Resources'
import { CCardBody, CSpinner } from '@coreui/react'
import JSZip from 'jszip'
import ReactMarkdown from 'react-markdown'
import { TEMPLATE_FIELDS } from './TemplateEnum'

const SLAAccordViewer = ({ id, templateHref }) => {
  const { data, isLoading, isError } = useGetSLA(id, templateHref)
  const [json, setJson] = useState<any>({})
  const [values, setValues] = useState({})
  const [renderTemplateText, setRenderTemplateText] = useState('')

  useEffect(() => {
    if (data) {
      const { template } = data
      if (template) {
        const zip = new JSZip()
        zip.loadAsync(template?.data?.templateFileData, { base64: true }).then(function (zip) {
          if (zip) {
            zip
              .file(Object.keys(zip.files)[0])
              .async('string')
              .then(function (file) {
                try {
                  const json = JSON.parse(file)
                  const obj: any = {}
                  json?.data?.forEach((el: any) => {
                    switch (el.id) {
                      case TEMPLATE_FIELDS.CONSEQUENCE:
                        obj[TEMPLATE_FIELDS.CONSEQUENCE] = data?.rule?.[0]?.consequence
                        break
                      case TEMPLATE_FIELDS.DESCRIPTION:
                        obj[TEMPLATE_FIELDS.DESCRIPTION] = data?.description
                        break
                      case TEMPLATE_FIELDS.END_DATE_TIME_PARTY:
                        obj[TEMPLATE_FIELDS.END_DATE_TIME_PARTY] = data?.relatedParty?.[0]?.validFor?.endDateTime
                        break
                      case TEMPLATE_FIELDS.END_DATE_TIME:
                        obj[TEMPLATE_FIELDS.END_DATE_TIME] = data?.validFor?.endDateTime
                        break
                      case TEMPLATE_FIELDS.METRIC:
                        obj[TEMPLATE_FIELDS.METRIC] = data?.rule?.[0]?.metric
                        break
                      case TEMPLATE_FIELDS.NAME_PARTY:
                        obj[TEMPLATE_FIELDS.NAME_PARTY] = data?.relatedParty?.[0]?.name
                        break
                      case TEMPLATE_FIELDS.NAME:
                        obj[TEMPLATE_FIELDS.NAME] = data?.name
                        break
                      case TEMPLATE_FIELDS.OPERATOR:
                        obj[TEMPLATE_FIELDS.OPERATOR] = data?.rule?.[0]?.operator
                        break
                      case TEMPLATE_FIELDS.REFERENCE_VALUE:
                        obj[TEMPLATE_FIELDS.REFERENCE_VALUE] = data?.rule?.[0]?.referenceValue
                        break
                      case TEMPLATE_FIELDS.ROLE:
                        obj[TEMPLATE_FIELDS.ROLE] = data?.relatedParty?.[0]?.role
                        break

                      case TEMPLATE_FIELDS.START_DATE_TIME_PARTY:
                        obj[TEMPLATE_FIELDS.START_DATE_TIME_PARTY] = data?.relatedParty?.validFor?.startDateTime
                        break
                      case TEMPLATE_FIELDS.START_DATE_TIME:
                        obj[TEMPLATE_FIELDS.START_DATE_TIME] = data?.validFor?.startDateTime
                        break
                      case TEMPLATE_FIELDS.TOLERANCE:
                        obj[TEMPLATE_FIELDS.TOLERANCE] = data?.rule?.[0]?.tolerance
                        break

                      case TEMPLATE_FIELDS.UNIT:
                        obj[TEMPLATE_FIELDS.UNIT] = data?.rule?.[0]?.unit
                        break
                      case TEMPLATE_FIELDS.VERSION:
                        obj[TEMPLATE_FIELDS.VERSION] = data?.version
                        break
                    }
                  })
                  setValues(obj)
                  setJson(json)
                } catch (e) {
                  setJson({})
                }
              })
          }
        })
      }
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

    setRenderTemplateText(str)
  }, [json])

  if (!isLoading && data?.template) {
    return (
      <CCardBody>
        <CCardBody>
          {renderTemplateText !== '' ? <ReactMarkdown>{renderTemplateText}</ReactMarkdown> : <div />}
        </CCardBody>
      </CCardBody>
    )
  }
  if (isError) {
    return <p>Error fetching template</p>
  }
  return <CSpinner color="#fff" />
}

export default SLAAccordViewer
