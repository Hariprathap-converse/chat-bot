import { CrossFieldValidation, FormConfig } from './form-config.type'

export interface FeatureRichSelectProps {
  config?: SelectFieldConfig
  formConfig?: FormConfig
  value?: Option | null
  onChange?: (value: string) => void
  onBlur?: () => void
  error?: string
  className?: string
}

interface BaseField {
  tableId: string
  rowId?: string
  fieldId: string
  id: string
  name: string
  label: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isVisible?: boolean
  auditLog?: boolean
}

export type SelectVariant =
  | 'default'
  | 'search'
  | 'group'
  | 'groupSearch'
  | 'creatable'
  | 'searchCreatable'
  | 'multiSelect'
  | 'multiSelectWithSearch'

export type Option = {
  id: string
  value: string
  disabled?: boolean
}
export type GroupedOption = {
  id: string
  group: string
  disabled?: boolean
  isOpen?: boolean
  items: Option[]
}
export type ChildTable = {
  subFieldId?: string
  isSymbol?: boolean
  concatFields?: boolean
  reference: Reference
}

export type Reference = {
  tableName: string
  columnName: string
}
export type OptionOrGroup = Option | GroupedOption | Option[]
export interface SelectFieldConfig extends BaseField {
  type: 'select'
  variant: SelectVariant
  value: string | undefined
  description?: string
  placeholder?: string
  options?: OptionOrGroup[]
  childTable?: ChildTable[]
  dataSource: 'static' | 'api'
  isRequired: {
    value?: boolean
    message?: string
  }
  autoPopulate: {
    defaultValue?: Option | Option[]
    referenceField?: string
    autoFill: boolean
  }
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
  design: {
    icon: {
      enabled: boolean
      position: string
    }
    dropdown: {
      position: 'top' | 'right' | 'bottom' | 'left' | undefined
    }
    optionIcon: {
      enabled: boolean
      iconName: string
      position: 'right' | 'left'
      showDisabledIcon: boolean
      disabledIconPosition: 'right' | 'left'
    }
  }

  validation?: {
    minLength?: {
      value: number
      message?: string
    }
    crossFieldValidation?: CrossFieldValidation[]
    additionalInfo?: string
  }

  customValidation?: {
    function: string
    message: string
  }

  security: {
    fieldLevelSecurity?: 'visible' | 'hidden' | 'readonly'
    auditEnabled: boolean
  }

  behavior?: {
    copyPasteRestriction?: boolean
    preventScreenshot?: boolean
  }
}
