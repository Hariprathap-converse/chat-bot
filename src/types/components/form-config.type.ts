import { FieldConfig } from '../filed.type'
import { CalendarFieldConfig } from './calender'
import { SelectFieldConfig } from './select-config.types'

export interface FormConfig {
  theme: 'light' | 'dark' | 'auto'
  primaryColor: string
  fontSize: 'small' | 'medium' | 'large'
  layout: {
    columns: 1 | 2 | 3
    labelPosition: 'top' | 'left'
  }
  viewMode: boolean
  editMode: boolean
}

export interface InputFieldConfig {
  tableId: string
  id: string
  fieldId?: string
  rowId?: string
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'url' | 'search'
  value: string | undefined
  placeholder?: string
  helperText?: string
  isRequired: {
    value: boolean
    message?: string
  }
  isDisabled?: boolean
  isReadOnly?: boolean
  isVisible?: boolean
  auditLog?: boolean
  icon?: {
    prefix?: string
    suffix?: string
  }
  // Validation
  validation?: {
    minLength?: {
      value: number
      message?: string
    }
    maxLength?: {
      value: number
      message?: string
    }
    pattern?: string
    customValidator?: string // function name
    crossFieldValidation?: CrossFieldValidation[]
    additionalInfo?: string
  }

  // Auto-population
  autoPopulate: {
    defaultValue?: string
    referenceField?: string
    derivationLogic?: string
    autoFill: boolean
  }

  // UI Behavior
  behavior: {
    showCharCounter?: boolean
    showClearIcon?: boolean
    dataMasking?: DataMaskingConfig
    spellCheck?: boolean
    autoTrim?: boolean
    copyPasteRestriction?: boolean
    preventScreenshot?: boolean
  }

  // Security & Audit
  security: {
    fieldLevelSecurity?: 'visible' | 'hidden' | 'readonly'
    auditEnabled: boolean
  }

  // Conditional Logic
  conditionalLogic?: {
    showWhen?: {
      field: string
      operator:
        | 'equals'
        | 'not_equals'
        | 'contains'
        | 'greater_than'
        | 'less_than'
      value: any
      message: string
    }[]
  }
}

export interface FormSchema {
  config: FormConfig
  fields: FieldConfig[]
}

export interface DataMaskingConfig {
  enabled: boolean
  pattern:
    | 'ssn'
    | 'credit-card'
    | 'phone'
    | 'email'
    | 'license'
    | 'passport'
    | 'custom'
  customPattern?: string
  maskChar: string
  showFirst?: number
  showLast?: number
  unmaskOnFocus: boolean
  maskOnBlur: boolean
  realTimeMasking: boolean
  preserveFormat: boolean
  scenarios?: {
    display: 'full' | 'partial' | 'masked'
    edit: 'full' | 'partial' | 'masked'
    export: 'full' | 'partial' | 'masked'
    print: 'full' | 'partial' | 'masked'
  }
}

export interface CrossFieldValidation {
  dependsOn: string[]
  rule:
    | 'equals'
    | 'not_equals'
    | 'greater_than'
    | 'less_than'
    | 'greater_equal'
    | 'less_equal'
    | 'contains'
    | 'not_contains'
    | 'starts_with'
    | 'ends_with'
    | 'after'
    | 'before'
    | 'same_day'
    | 'different_day'
    | 'min_difference'
    | 'max_difference'
  value?: any
  errorMessage?: string
  caseSensitive?: boolean
  dateFormat?: string
  minDifference?: number
  maxDifference?: number
}
