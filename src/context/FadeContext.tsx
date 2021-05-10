import React, { createContext, useContext, useState } from 'react'

interface FadeState {
  content: any
  setContent: (content: any) => void
}

const FadeContext = createContext<FadeState>({} as FadeState)

const FadeProvider = (props: any) => {
  const [content, setContent] = useState<any>(null)

  return (
    <FadeContext.Provider
      value={{
        content,
        setContent
      }}
      {...props}
    />
  )
}

export default FadeProvider

export const useFadeContext = () => {
  const context = useContext(FadeContext)
  if (!context) {
    throw new Error('useFadeContext must be used within a FadeContext')
  }
  return context
}
