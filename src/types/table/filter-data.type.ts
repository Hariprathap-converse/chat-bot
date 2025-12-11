// Define Types
export interface InputField {
  placeholder: string;
  type: string;
  options?: { label: string; value: string }[];
  dropdown_type?: string;
}

interface FilterCondition {
  filterCondition: string;
  inputRequired: boolean;
  inputField: InputField[];
}

interface FilterData {
  columnType: string;
  conditions: FilterCondition[];
}

export interface FilterDataState {
  data: FilterData[];
  loading: boolean;
  error: any;
}

export interface CustomFilterDropdownProps {
  value?: { type: string; value: any };
  columnType: string;
  column_name: string;
  options?: { label: string; value: string }[];
}

