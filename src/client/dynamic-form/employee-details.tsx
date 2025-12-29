'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'sonner'

import FormContainerProps from './form-container'
import { useLayout } from '@/context/layout-context'

export default function EmployeeDetails({ onCancel }: { onCancel?: () => void }) {
  const { formData, setFormData } = useLayout()
  const [manualGridOverride, setManualGridOverride] = useState(false)
  const [showRequiredFields, setShowRequiredFields] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateForm = (updates: any) => {
    setFormData((prev) => ({
      form: {
        ...prev.form,
        ...updates,
      },
    }))
  }

  /**
   * Handle form submission
   * - Shows loading state
   * - Logs form data to console
   * - Shows success toast
   * - In future: will send to API
   */
  function onSubmit(data: any) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Log the submitted data
      console.log('📋 Employee Details Form Data:', data)

      // Mock API response
      const mockResponse = {
        success: true,
        message: 'Employee details saved successfully',
        data: {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        }
      }

      console.log('✅ API Response:', mockResponse)

      // Show success toast
      toast.success('Sent successfully', {
        description: 'Employee details have been saved',
        duration: 3000,
      })

      setIsSubmitting(false)

      // Close the form after successful submission
      setTimeout(() => {
        onCancel?.()
      }, 1000)
    }, 1500) // Simulate network delay
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
        isSubmitting={isSubmitting}
      // progress={progress}
      />
    </>
  )
}
