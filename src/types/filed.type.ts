import { GridCols } from "@/mock-data/form-filed-json";
import { InputFieldConfig } from "./components/form-config.type";
import { SelectFieldConfig } from "./components/select-config.types";
import { string } from "zod";
import { CalendarFieldConfig } from "./components/calender";

export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | CalendarFieldConfig;

export type Step = {
  id: number;
  key: string;
  label: string;
  mode: string;
  dataSource: string;
  design: {
    icon: {
      enabled: boolean;
      iconName: string;
      position: "right" | "left";
      showDisabledIcon: boolean;
      disabledIconPosition: "right" | "left";
    };
  };
  fields?: FieldConfig[];
};

export type FormLayout = {
  gridCols: GridCols;
  labelPosition: "top" | "left";
};

export type FormHeader = {
  header: string;
  buttonText?: string;
};
export type FormType = "basic" | "stepper" | "wizard";

export type IdsType = {
  formId: string;
  moduleId?: string;
  screenId?: string;
};

export type FormDefinition = {
  form: {
    ids: IdsType;
    formName: string;
    formType: FormType;
    formDescription?: string;
    breadcrumbs: { label: string; url?: string }[];
    mode: "create" | "edit" | "view";
    layout: FormLayout;
    fontSize: "small" | "medium" | "large";
    formHeader: FormHeader;
    viewMode: boolean;
    editMode: boolean;
    stepper?: {
      steps: Step[];
    };
    fields?: FieldConfig[];
    action?: {
      method: string;
      path: string;
    };
    payload?: Record<string, string>;
  };
};
