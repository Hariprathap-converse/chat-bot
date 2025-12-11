import { Option } from "@/types/common.type"

export interface MultiSelectDropdownUIProps {
  placeholder?: string
  className?: string
  value?: Option[]
  options: Option[]
  loading: boolean
  commandListRef: React.RefObject<HTMLDivElement | null>
  onSearchChange: (value: string) => void
  onSelect: (option: Option) => void
  onRemove: (option: Option) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface MultiSelectProps {
  placeholder?: string
  className?: string
  onChange: (values: Option[]) => void
  value?: Option[]
}

export interface SingleSelectLazyDropdownUIProps {
  placeholder?: string
  value: Option | null
  options: Option[]
  loading: boolean
  commandListRef: React.RefObject<HTMLDivElement | null>
  onSearchChange: (value: string) => void
  onSelect: (option: Option) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface SingleSelectProps {
  placeholder?: string
  onChange: (value: Option | null) => void
  value: Option | null
}