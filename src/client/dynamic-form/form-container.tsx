'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import FormFooter from './form-footer'
import FieldRender from './field-render'
// import { FormProvider } from 'react-hook-form'
import { CrossFieldValidator } from '@/utils/cross-field-validator'
import { useLayout } from '@/context/layout-context'
import Stepper from './stepper'
import { FieldConfig } from '@/types/filed.type'
import { showToastMessage } from '@/lib/toaster'
interface FormContainerProps {
  showRequiredFields: boolean
  onSubmit: (data: any) => void
  setShowRequiredFields: (value: boolean) => void
  setLabelAlignment: (alignment: string) => void
  setManualGridOverride: (value: boolean) => void
  progress?: number
  onCancel?: () => void
}
const FormContainerProps = ({
  showRequiredFields,
  onCancel,
}: FormContainerProps) => {
  const { formData, setFormData, setErrors, errors } = useLayout()
  const [formSubmitData, setFormSubmitData] = useState<Record<string, any>>({})
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const requiredFields = useMemo(() => {
    return (
      formData?.form?.fields?.filter(
        (field) => field.isRequired?.value == true
      ) ?? []
    )
  }, [formData?.form?.fields])

  const filledCount = useMemo(() => {
    return requiredFields.filter((field) => {
      const val = formSubmitData?.[field.name]
      if (val) {
        return Boolean(val)
      } else {
        return false
      }
    }).length
  }, [formSubmitData, requiredFields])

  const totalRequired = requiredFields.length
  const progress = Math.round((filledCount / totalRequired) * 100)

  const formFields =
    formData.form.formType == 'stepper'
      ? formData.form.stepper?.steps[currentStepIndex].fields || []
      : formData.form.fields || []

  useEffect(() => {
    if (!formFields) return

    const initialData: Record<string, any> = {}

    formFields.forEach((field: any) => {
      if (field?.autoPopulate?.defaultValue) {
        initialData[field.name] = field.autoPopulate.defaultValue
        field.value = field.autoPopulate.defaultValue
      }
    })
    setFormSubmitData(initialData)
  }, [formFields])

  useEffect(() => {
    if (formData.form.mode === 'view' && formData.form.viewMode !== true) {
      setFormData((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          viewMode: true,
        },
      }))
    }
  }, [formData.form.mode, formData.form.viewMode])

  const validateField = (field: FieldConfig, value: string): string | null => {
    if (
      field.type !== 'select' &&
      field.type !== 'calendar' &&
      !field.isRequired.value &&
      !value.trim()
    ) {
      return null
    }

    if (field.type == 'select' && !field.isRequired.value && !value) {
      return null
    }
    // Required validation
    if (
      field.type !== 'select' &&
      field.type !== 'calendar' &&
      field.isRequired.value &&
      !value.trim()
    ) {
      return field.isRequired.message
        ? field.isRequired.message
        : `${field.label} is required`
    }

    if (
      field.type == 'select' &&
      field.isRequired.value &&
      (!field.value || field.value == null || field.value == '')
    ) {
      return field.isRequired.message
        ? field.isRequired.message
        : `${field.label} is required`
    }

    // Length validation
    if (
      field.type !== 'select' &&
      field.type !== 'calendar' &&
      field?.validation?.minLength &&
      value.length < field.validation.minLength.value
    ) {
      return field.validation.minLength.message
        ? field.validation.minLength.message
        : `${field.label} must be at least ${field.validation.minLength.value} characters`
    }
    if (
      field.type == 'select' &&
      field?.validation?.minLength &&
      field.value &&
      field?.value.length < field.validation.minLength.value
    ) {
      return field.validation.minLength.message
        ? field.validation.minLength.message
        : `${field.label} must be at least ${field.validation.minLength.value} characters`
    }

    if (
      field &&
      field.type !== 'select' &&
      field.type !== 'calendar' &&
      field?.validation?.maxLength &&
      value.length > field.validation.maxLength.value
    ) {
      return field.validation.maxLength.message
        ? field.validation.maxLength.message
        : `${field.label} must not exceed ${field.validation.maxLength.value} characters`
    }

    // Enhanced cross-field validation
    if (
      field.type !== 'calendar' &&
      field?.validation?.crossFieldValidation &&
      field.validation.crossFieldValidation.length > 0
    ) {
      return CrossFieldValidator.validateMultiple(
        value,
        field.validation.crossFieldValidation,
        formSubmitData
      )
    }

    return null
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   const fullDate = { ...formData }
  //   e.preventDefault()
  //   const newErrors: Record<string, string> = {}
  //   formFields?.forEach((field: any) => {
  //     const value = formSubmitData?.[field.name] || ''
  //     const error = validateField(field, value)
  //     console.log('error: ', error)
  //     if (error) {
  //       console.log('enttter')
  //       newErrors[field.name] = error
  //       console.log('newErrors: ', newErrors)
  //       setErrors(newErrors)
  //     }
  //   })
  //   // if (errors) {
  //   //   console.log('first')
  //   //   try {
  //   //     const response = await fetch('http://localhost:5000/api/v1/form/add', {
  //   //       method: 'POST',
  //   //       headers: {
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //       body: JSON.stringify(fullDate),
  //   //     })

  //   //     if (!response.ok) {
  //   //       throw new Error(`HTTP error! Status: ${response.status}`)
  //   //     }

  //   //     const result = await response.json()
  //   //     console.log('✅ Success:', result)
  //   //   } catch (error) {
  //   //     console.error('❌ Error submitting form:', error)
  //   //   }
  //   // }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    formFields?.forEach((field: any) => {
      const value = formSubmitData?.[field.name] ?? ''
      const error = validateField(field, value)
      if (error) {
        newErrors[field.name] = error
        console.log('newErrors: ', newErrors)
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      console.log('Validation failed:', newErrors)
      return
    }

    try {
      const fullData = { ...formData }

      console.log('fullData: ', fullData)

      let api = { url: '', methods: '' }
      if (fullData.form.mode == 'create') {
        api.url = 'http://localhost:5000/api/v1/form/add'
        api.methods = 'POST'
      } else if (fullData.form.mode == 'edit') {
        api.url = 'http://localhost:8000/api/v1/form'
        api.methods = 'PUT'
      }

      const response = await fetch(api.url, {
        method: api.methods,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      })

      const result = await response.json()
      console.log('✅ Success:', result)

      if (!response.ok || result.success === false) {
        const newErrors = { ...errors }
        newErrors[result.error.fieldName] = result.error.message

        setErrors(newErrors)

        console.log('newErrors:', newErrors)

        showToastMessage('error', result.error.message as string)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="h-full overflow-auto">


        <div className="h-full rounded-lg relative p-[2px]  bg-background">
          <div className="flex ">
            <div className="h-[72px] rounded-tr-md flex-1 items-center flex bg-background">
              <div className="pl-4">
                <div className="text-[1.375rem] text-foreground font-semibold">
                  {/* Employee Details */}
                  {formData.form.formHeader.header}
                </div>
                {(formData.form.formType == 'basic' ||
                  formData.form.formType == 'wizard') && (
                    <div className="text-[0.9375rem] text-foreground font-medium">
                      {/* {formData.form.formHeader.title} */}
                    </div>
                  )}
                {formData.form.formType == 'stepper' && (
                  <Stepper
                    currentStep={currentStepIndex}
                    onStepChange={setCurrentStepIndex}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className=" main-container h-[82%]  overflow-auto mx-auto px-4 pt-2 pb-2 md:pb-0 "
          >
            <FieldRender
              formFields={formFields}
              containerRef={containerRef}
              showRequiredFields={showRequiredFields}
              validateField={validateField}
              onFieldChange={(fieldName, value) =>
                setFormSubmitData((prev) => ({
                  ...prev,
                  [fieldName]: value,
                }))
              }
            />
            <FormFooter progress={progress} onCancel={onCancel} />
          </div>

        </div>
      </form >
    </>
  )
}

export default FormContainerProps
