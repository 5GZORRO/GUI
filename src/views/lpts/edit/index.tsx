/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useState, useCallback, useEffect } from 'react'
/* Accord Project */
import { SlateTransformer } from '@accordproject/markdown-slate'
import ContractEditor, { getChildren } from '@accordproject/ui-contract-editor'
import { Template, Clause } from '@accordproject/cicero-core'

import 'semantic-ui-css/semantic.min.css'
/* Slate */

const slateTransformer = new SlateTransformer()
const getContractSlateVal = () => {
  const defaultContractMarkdown = 'Loading...'
  return slateTransformer.fromMarkdown(defaultContractMarkdown)
}

const clausePropsObject = {
  CLAUSE_DELETE_FUNCTION: () => console.log('Clause -> Deleted'),
  CLAUSE_EDIT_FUNCTION: () => console.log('Clause -> Edit'),
  CLAUSE_TEST_FUNCTION: (e:Event) => console.log('Clause -> Test', { e })
}

const EditSLA:React.FC<{}> = () => {
  const [editor, setEditor] = useState<any>(null)
  const [template, setTemplate] = useState<any>(null)

  const [slateValue, setSlateValue] = useState(() => {
    const slate = getContractSlateVal()
    return slate.document.children
  })
  const templateUrl = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.15.0.cta'

  useEffect(() => {
    if (editor && templateUrl) {
      Template.fromUrl(templateUrl)
        .then(async (template: any) => {
          const clause = new Clause(template)
          clause.parse(template.getMetadata().getSample())
          const slateValueNew = await clause.draft({ format: 'slate' })
          const slateClause = [
            {
              children: slateValueNew.document.children,
              data: {
                src: templateUrl,
                name: 'template'
              },
              object: 'block',
              type: 'clause'
            }
          ]
          // Transforms.insertNodes(editor, slateClause, { at: Editor.end(editor, []) })
          setSlateValue(slateClause)
          setTemplate(template)
        })
        .catch((err:any) => {
          console.log('error', err)
        })
    }
  }, [templateUrl, editor])

  const onContractChange = useCallback((value) => { setSlateValue(value) }, [editor])

  const augmentEditor = useCallback((slateEditor) => {
    setEditor(slateEditor)
    return slateEditor
  }, [])

  const parseClause = useCallback(async (clauseNode) => {
    if (!clauseNode.data.src) {
      console.log('error parse clause', clauseNode)
      return Promise.resolve(true)
    }

    try {
      const value = {
        document: {
          children: clauseNode.children
        }
      }
      const text = slateTransformer.toMarkdownCicero(value)
      const ciceroClause = new Clause(template)
      ciceroClause.parse(text)

      const hasFormulas = getChildren(clauseNode, (n:any) => n.type === 'formula')
      let draftedSlateNode = null

      if (hasFormulas) {
        const slateDom = await ciceroClause.draft({ format: 'slate' })
        draftedSlateNode = JSON.parse(JSON.stringify(clauseNode))
        draftedSlateNode.children = slateDom.document.children
      }

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
  }, [editor])

  let timeoutId: any

  const debouncedParseClause = (node:any) => new Promise((resolve) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout((n:any) => {
      resolve(parseClause(n))
    }, 500, node)
  })

  return (
    <ContractEditor
      value={slateValue}
      lockText={true}
      readOnly={false}
      onChange={onContractChange}
      clauseProps={clausePropsObject}
      loadTemplateObject={templateUrl}
      onClauseUpdated={debouncedParseClause}
      augmentEditor={augmentEditor}
    />
  )
}

export default EditSLA
