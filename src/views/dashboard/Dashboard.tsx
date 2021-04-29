/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useState, useCallback, useEffect } from 'react'
/* Accord Project */
import { SlateTransformer } from '@accordproject/markdown-slate'
import ContractEditor, { getChildren } from '@accordproject/ui-contract-editor'
import { Template, Clause } from '@accordproject/cicero-core'

import 'semantic-ui-css/semantic.min.css'
/* Slate */
import { Editor, Transforms } from 'slate'

const slateTransformer = new SlateTransformer()
const getContractSlateVal = () => {
  const defaultContractMarkdown = ''
  return slateTransformer.fromMarkdown(defaultContractMarkdown)
}

const clausePropsObject = {
  CLAUSE_DELETE_FUNCTION: ('Clause -> Deleted'),
  CLAUSE_EDIT_FUNCTION: ('Clause -> Edit'),
  CLAUSE_TEST_FUNCTION: ('Clause -> Test')
}

const Dashboard:React.FC<{}> = () => {
  const [editor, setEditor] = useState<any>(null)
  const [slateValue, setSlateValue] = useState(() => {
    const slate = getContractSlateVal()
    return slate.document.children
  })
  const templateUrl = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.15.0.cta'

  useEffect(() => {
    if (editor && templateUrl) {
      Template.fromUrl(templateUrl)
        .then(async (template: any) => {
          console.log(template)
          const clause = new Clause(template)
          clause.parse(template.getMetadata().getSample())
          const slateValueNew = await clause.draft({ format: 'slate' })
          console.log('slateValueNew', slateValueNew)
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
          Transforms.insertNodes(editor, slateClause, { at: Editor.end(editor, []) })
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
      return Promise.resolve(true)
    }

    try {
      const hasFormulas = getChildren(clauseNode, (n:any) => n.type === 'formula')
      let draftedSlateNode = null

      if (hasFormulas) {
        draftedSlateNode = JSON.parse(JSON.stringify(clauseNode))
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
    timeoutId = setTimeout((n) => {
      resolve(parseClause(n))
    }, 500, node)
  })

  return (
    <ContractEditor
      value={slateValue}
      lockText={false}
      readOnly={false}
      onChange={onContractChange}
      clauseProps={clausePropsObject}
      loadTemplateObject={templateUrl}
      onClauseUpdated={debouncedParseClause}
      augmentEditor={augmentEditor}
    />
  )
}

export default Dashboard
