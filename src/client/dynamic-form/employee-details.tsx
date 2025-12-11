'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

import FormContainerProps from './form-container'
import { useLayout } from '@/context/layout-context'

export default function EmployeeDetails({ onCancel }: { onCancel?: () => void }) {
  const { formData, setFormData } = useLayout()
  const [manualGridOverride, setManualGridOverride] = useState(false)
  const [showRequiredFields, setShowRequiredFields] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // const form = useForm()

  // const fieldValues = form.watch()
  // const requiredFields = useMemo(() => {
  //   return formData?.form?.fields?.filter((f) => f.isRequired?.value) ?? []
  // }, [formData?.form?.fields])

  // const filledCount = useMemo(() => {
  //   return requiredFields.filter((field) => {
  //     const val = fieldValues?.[field.id]
  //     return val !== undefined && val !== '' && val !== null
  //   }).length
  // }, [requiredFields, fieldValues])

  // const totalRequired = requiredFields.length
  // const progress = Math.round((filledCount / totalRequired) * 100)

  // const navWidth = layout.sideNav.isNavOpen
  //   ? layout.sideNav.width[0]
  //   : layout.sideNav.width[1]

  const updateForm = (updates: any) => {
    // setLayout((prev: any) => ({
    //   ...prev,
    // }))
    setFormData((prev) => ({
      form: {
        ...prev.form,
        ...updates,
      },
    }))
  }
  function onSubmit(data: any) {
    console.log('data', data)

  }

  const setLabelAlignment = (alignment: string) => {
    updateForm({
      layout: {
        ...formData.form.layout,
        labelPosition: alignment,
      },
    })
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        let newCols: 1 | 2 | 3 = 1
        if (width > 1000) newCols = 3
        else if (width > 640) newCols = 2
      }
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [manualGridOverride])

  return (
    <>
      <FormContainerProps
        showRequiredFields={showRequiredFields}
        onSubmit={onSubmit}
        setShowRequiredFields={setShowRequiredFields}
        setLabelAlignment={setLabelAlignment}
        setManualGridOverride={setManualGridOverride}
        onCancel={onCancel}
      // progress={progress}
      />
    </>
  )
}
