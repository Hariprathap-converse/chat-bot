"use client";
import { useEffect, useState } from "react";
import { AdvancedInput } from "@/components/custom/advanced-input";
import { FormConfig } from "@/types/components/form-config.type";
import { FieldConfig } from "@/types/filed.type";
import FeatureRichSelect from "@/components/custom/FeatureRichSelect";
import { useLayout } from "@/context/layout-context";
import { DateTimePicker } from "@/components/custom/calendar/advanced-calender";

interface FieldRenderProps {
  formFields: FieldConfig[];
  showRequiredFields?: boolean;
  containerRef?: any;
  validateField: (field: FieldConfig, value: string) => string | null;
  onFieldChange: (fieldName: string, value: any) => void;
}
const FieldRender = ({
  formFields,
  containerRef,
  showRequiredFields,
  validateField,
  onFieldChange,
}: FieldRenderProps) => {
  const [computedCols, setComputedCols] = useState<1 | 2 | 3>(3);
  const [computedGap, setComputedGap] = useState("gap-x-[9%]");
  const { formData, errors, setErrors } = useLayout();
  const [formSubmitData, setFormSubmitData] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const gridColClasses: Record<1 | 2 | 3, string> = {
    1: "grid-cols-1 w-[40%] ",
    2: "grid-cols-2 w-[80%]",
    3: "grid-cols-3 w-[100%]",
  };
  const getGapClass = (width: number) => {
    if (width > 1700) return "gap-x-[6%]";
    if (width > 1400) return "gap-x-[5%]";
    if (width > 1000) return " gap-x-[4%]";
    if (width > 900) return "gap-x-[3.5%]";
    if (width > 800) return " gap-x-[3%]";
    if (width > 600) return "gap-x-auto";
    return "gap-x-auto";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        let newCols: 1 | 2 | 3 = 1;
        if (width > 1000) newCols = 3;
        else if (width > 640) newCols = 2;
        setComputedCols(newCols);
        setComputedGap(getGapClass(width));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [formData.form.layout.gridCols]);

  const gridColClass =
    formData.form.layout.gridCols === "auto"
      ? gridColClasses[computedCols]
      : gridColClasses[formData.form.layout.gridCols as 1 | 2 | 3];

  useEffect(() => {
    const initialData: Record<string, any> = {};

    if (Array.isArray(formFields)) {
      formFields.forEach((field: FieldConfig) => {
        if (field.autoPopulate?.defaultValue) {
          initialData[field.name] = field.autoPopulate.defaultValue;
        }
      });
    }
    setFormSubmitData(initialData);
  }, [formFields]);

  const handleFieldChange = (fieldName: string, value: string) => {
    const field = formData.form?.fields?.find(
      (f: FieldConfig) => f.name === fieldName,
    );
    onFieldChange(fieldName, value);
    setFormSubmitData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors?.[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }

    // Real-time validation
    if (touched?.[fieldName] && field) {
      const error = validateField(field, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
      }
    }
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const field = formData.form?.fields?.find(
      (f: FieldConfig) => f.name === fieldName,
    );
    const value = formSubmitData?.[fieldName] || "";
    if (field) {
      const error = validateField(field, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
      }
    }
  };

  return (
    <>
      <div
        className={`grid ${formData.form.layout.gridCols == "auto" ? `${gridColClass} !w-auto` : gridColClass} gap-6 gap-y-0 ${computedGap} p-4 `}
      >
        {Array.isArray(formFields) &&
          (showRequiredFields
            ? formFields.filter((field: FieldConfig) => field.isRequired.value)
            : formFields
          ).map((field: FieldConfig, index) => {
            const key = field.fieldId ?? field.name ?? index;
            if (field.type === "select") {
              return (
                <FeatureRichSelect
                  key={key}
                  config={field}
                  formConfig={formData.form as unknown as FormConfig}
                  value={formSubmitData[field.name] || ""}
                  onChange={(value) => handleFieldChange(field.name, value)}
                  onBlur={() => handleFieldBlur(field.name)}
                  error={errors[field.name]}
                />
              );
            } else if (field.type === "calendar") {
              return (
                <DateTimePicker
                  key={field.id}
                  config={field}
                  fieldName={field.name}
                  formConfig={formData.form as unknown as FormConfig}
                  value={formSubmitData[field.name] || ""}
                  onChange={(value: any) =>
                    handleFieldChange(field.name, value)
                  }
                  onBlur={() => handleFieldBlur(field.name)}
                  error={errors[field.name]}
                  formValues={formData}
                  setErrors={setErrors}
                  dateFormat={field.dateFormat}
                  calendarDisableConfig={field.calenderConfig}
                />
              );
            } else
              return (
                <AdvancedInput
                  key={key}
                  config={field}
                  formConfig={formData.form as unknown as FormConfig}
                  value={formSubmitData[field.name] || ""}
                  onChange={(value) => handleFieldChange(field.name, value)}
                  onBlur={() => handleFieldBlur(field.name)}
                  error={errors[field.name]}
                  formValues={formSubmitData}
                />
              );
          })}
      </div>
    </>
  );
};

export default FieldRender;
