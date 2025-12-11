// context/LayoutContext.tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
// import { defaultLayout } from '@/mock-data/dynamic-nav'
import { FormData } from '@/mock-data/form-filed-json'
import { FormDefinition } from '@/types/filed.type'

// export type Layout = typeof defaultLayout

type LayoutContextType = {
  //   layout: Layout
  //   setLayout: React.Dispatch<React.SetStateAction<Layout>>
  isMobile: boolean
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  formData: FormDefinition
  setFormData: React.Dispatch<React.SetStateAction<FormDefinition>>
  errors: Record<string, string>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // const [layout, setLayout] = useState<Layout>(defaultLayout)
  const [formData, setFormData] = useState<FormDefinition>(FormData)
  const [isMobile, setIsMobile] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (formData.form.mode === 'view' && !formData.form.viewMode) {
      setFormData((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          viewMode: true,
        },
      }))
    }
  }, [formData.form.mode, formData.form.viewMode])
  return (
    <LayoutContext.Provider
      value={{
        // layout,
        // setLayout,
        isMobile,
        setIsMobile,
        formData,
        setFormData,
        errors,
        setErrors,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within LayoutProvider')
  return context
}
