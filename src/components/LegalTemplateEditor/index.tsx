import React, { useState, useEffect, useCallback, useRef } from 'react'

import { SlateTransformer } from '@accordproject/markdown-slate'
import ContractEditor, { getChildren } from '@accordproject/ui-contract-editor'
import { Template, Clause } from '@accordproject/cicero-core'

import 'semantic-ui-css/semantic.min.css'
import { SLA_DATETIME_FORMAT, SLA_OUTPUT_DATETIME_FORMAT } from 'config'
import moment from 'moment'
import { Editor, Node, Transforms } from 'slate'

const slateTransformer = new SlateTransformer()
const getContractSlateVal = () => {
  const defaultContractMarkdown = 'Loading...'
  return slateTransformer.fromMarkdown(defaultContractMarkdown)
}

const clausePropsObject = {
  CLAUSE_DELETE_FUNCTION: () => console.log('Clause -> Deleted'),
  CLAUSE_EDIT_FUNCTION: () => console.log('Clause -> Edit'),
  CLAUSE_TEST_FUNCTION: (e: Event) => console.log('Clause -> Test', { e })
}

const LegalTemplateEditor = ({ getDataCallback, triggerCallback, prefilledData, templateString, readOnly }) => {
  const [editor, setEditor] = useState<any>(null)
  const templateState = useRef<any>(null)
  const currentClause = useRef<any>(null)

  const [slateValue, setSlateValue] = useState(() => {
    const slate = getContractSlateVal()
    return slate.document.children
  })

  useEffect(() => {
    if (editor && templateString) {
      Template.fromArchive(Buffer.from(templateString, 'base64'))
        .then(async (template: any) => {
          console.log(template)
          const clause = new Clause(template)
          clause.parse(template.getMetadata().getSample())
          const sampleData = clause.getData()
          const keysToClean: [string] | [] = []
          const emptyData = Object.keys(sampleData)?.reduce((acum, el) => {
            if (keysToClean.includes(el)) {
              if (typeof sampleData[el] === 'string' || sampleData[el] instanceof String) {
                return { ...acum, [el]: '' }
              }
              return { ...acum, [el]: sampleData[el] }
            }
            return acum
          }, {})
          clause.setData({ ...sampleData, ...emptyData, ...prefilledData })
          const slateValueNew = await clause.draft({ format: 'slate' })
          const slateClause = [
            {
              children: slateValueNew.document.children,
              data: {
                name: 'template'
              },
              object: 'block',
              type: 'clause'
            }
          ]
          // Transforms.insertNodes(editor, slateClause, { at: Editor.start(editor, []) })
          setSlateValue(slateClause)
          currentClause.current = clause
          templateState.current = template
        })
        .catch((err: any) => {
          console.log('error', err)
        })
    }
  }, [templateString, editor])

  useEffect(() => {
    if (triggerCallback && getDataCallback) {
      const data = currentClause?.current?.getData()
      const { approvalDate, validFor, id, ...remain } = data

      getDataCallback({
        ...remain,
        approvalDate: moment(approvalDate, SLA_DATETIME_FORMAT).isValid()
          ? moment(approvalDate, SLA_DATETIME_FORMAT).format(SLA_OUTPUT_DATETIME_FORMAT)
          : moment().format(SLA_OUTPUT_DATETIME_FORMAT),
        validFor: {
          endDateTime: moment(validFor?.endDateTime, SLA_DATETIME_FORMAT).isValid()
            ? moment(validFor?.endDateTime, SLA_DATETIME_FORMAT).format(SLA_OUTPUT_DATETIME_FORMAT)
            : moment().format(SLA_OUTPUT_DATETIME_FORMAT),
          startDateTime: moment(validFor?.startDateTime, SLA_DATETIME_FORMAT).isValid()
            ? moment(validFor?.startDateTime, SLA_DATETIME_FORMAT).format(SLA_OUTPUT_DATETIME_FORMAT)
            : moment().format(SLA_OUTPUT_DATETIME_FORMAT)
        }
      })
    }
  }, [triggerCallback])

  const onContractChange = useCallback(
    (value) => {
      setSlateValue(value)
    },
    [editor]
  )

  const augmentEditor = useCallback((slateEditor) => {
    setEditor(slateEditor)
    return slateEditor
  }, [])

  const transformToVariables = (data, nodes: any) => {
    const transformed = nodes?.reduce((blockAcum: any, block: any) => {
      const newBlock = block?.children
        ?.filter((obj: any) => obj?.type === 'variable')
        ?.reduce((varAcum: any, variable: any) => {
          return { ...varAcum, [variable?.data?.name]: variable?.children?.[0]?.text }
        }, {})
      return { ...blockAcum, ...newBlock }
    }, {})
    const { endDateTime, startDateTime, ...remain } = transformed
    return {
      ...data,
      ...remain,
      validFor: {
        endDateTime: moment(endDateTime, 'DD/MM/YYYY').isValid()
          ? moment(endDateTime, 'DD/MM/YYYY').format(SLA_DATETIME_FORMAT)
          : moment().format(SLA_DATETIME_FORMAT),
        startDateTime: moment(startDateTime, 'DD/MM/YYYY').isValid()
          ? moment(startDateTime, 'DD/MM/YYYY').format(SLA_DATETIME_FORMAT)
          : moment().format(SLA_DATETIME_FORMAT)
      }
    }
  }

  const parseClause = useCallback(
    async (clauseNode) => {
      // if (!clauseNode.data.src) {
      //   console.log('error parse clause', clauseNode)
      //   return Promise.resolve(true)
      // }
      try {
        // const text = slateTransformer.toMarkdownCicero(value)
        const ciceroClause = new Clause(templateState.current)
        ciceroClause.parse(templateState.current.getMetadata().getSample())
        const text = transformToVariables(ciceroClause.getData(), clauseNode.children)
        ciceroClause.setData({ ...ciceroClause.getData(), ...text })

        const hasFormulas = getChildren(clauseNode, (n: any) => n.type === 'formula')
        let draftedSlateNode = null

        if (hasFormulas) {
          const slateDom = await ciceroClause.draft({ format: 'slate' })
          draftedSlateNode = JSON.parse(JSON.stringify(clauseNode))
          draftedSlateNode.children = slateDom.document.children
        }

        currentClause.current = ciceroClause

        return Promise.resolve({
          node: hasFormulas ? draftedSlateNode : null,
          operation: hasFormulas ? 'update_formulas' : null,
          error: null
        })
      } catch (err) {
        console.log('error parse', err)
        return Promise.resolve({
          node: null,
          operation: null,
          error: err
        })
      }
    },
    [editor]
  )

  let timeoutId: any

  const debouncedParseClause = (node: any) =>
    new Promise((resolve) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        (n: any) => {
          resolve(parseClause(n))
        },
        500,
        node
      )
    })

  return (
    <ContractEditor
      value={slateValue}
      lockText={true}
      readOnly={readOnly}
      onChange={onContractChange}
      clauseProps={clausePropsObject}
      onClauseUpdated={debouncedParseClause}
      augmentEditor={augmentEditor}
    />
  )
}

export default LegalTemplateEditor
