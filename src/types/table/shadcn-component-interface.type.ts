export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectDropdownProps {
  options: { value: string; label: string; icon?: string; color?: string }[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  placeholder?: string;
  height?: number;
  triggerClassName?: string;
  itemClassName?: string;
  iconMap?: Record<string, React.ComponentType<any>>;
}

export interface CustomSelectProps {
  options: string[];
  placeholder?: string;
}

// time input field

export interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}