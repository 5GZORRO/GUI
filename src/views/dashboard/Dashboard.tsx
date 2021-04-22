/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useState, useCallback, useEffect } from 'react'
/* Accord Project */
import { SlateTransformer } from '@accordproject/markdown-slate'
import ContractEditor from '@accordproject/ui-contract-editor'
import { Template, Clause, TemplateLibrary, version } from '@accordproject/cicero-core'
/* Slate */
import { Editor, Node, Transforms } from 'slate'

const slateTransformer = new SlateTransformer()
const getContractSlateVal = () => {
  const defaultContractMarkdown = `# Heading One
        This is text. This is *italic* text. This is **bold** text. This is \`inline code\`. Fin.`
  return slateTransformer.fromMarkdown(defaultContractMarkdown)
}

const clausePropsObject = {
  CLAUSE_DELETE_FUNCTION: ('function'),
  CLAUSE_EDIT_FUNCTION: ('function'),
  CLAUSE_TEST_FUNCTION: ('function')
}

const parseClauseFunction = () => { /* ... */ }
const loadTemplateObjectFunction = () => { /* ... */ }
const pasteToContractFunction = () => { /* ... */ }

const Dashboard:React.FC<{}> = () => {
  const [slateValue, setSlateValue] = useState(() => {
    const slate = getContractSlateVal()
    return slate.document.children
  })
  const templateUrl = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.14.1.cta'

  useEffect(() => {
    Template.fromUrl(templateUrl)
      .then((template: any) => {
        console.log(template)
      })
      .catch((err:any) => {
        console.log('error', err)
      })
  }, [templateUrl])

  const onContractChange = useCallback((value) => { setSlateValue(value) }, [])

  return (
    <ContractEditor
      value={slateValue}
      lockText={false}
      readOnly={false}
      onChange={onContractChange}
      clauseProps={clausePropsObject}
      loadTemplateObject={templateUrl}
      pasteToContract={pasteToContractFunction}
      onClauseUpdated={parseClauseFunction}
    />
  )
}

export default Dashboard
