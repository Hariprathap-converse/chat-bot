interface PerPageValue {
  label: string;
  value: number;
}

interface Preferences {
  density: string;
  columnResizable: boolean;
  dataWrap: boolean;
  theme: string;
  per_page: number;
}

export interface ScreenPreferencesData {
  per_page_values: PerPageValue[];
  preferences: Preferences;
}