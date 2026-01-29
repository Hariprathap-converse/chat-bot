"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";

import FormContainerProps from "./form-container";
import { useLayout } from "@/context/layout-context";
import { transformBackendFormToDefinition } from "@/utils/form-transformer";
import { FormData as DefaultFormData } from "@/mock-data/form-filed-json";

export default function EmployeeDetails({
  onCancel,
  onSubmitSuccess,
  onCancelSuccess,
  dynamicData,
}: {
  onCancel?: () => void;
  onSubmitSuccess?: (title: string, message: string) => void;
  onCancelSuccess?: (title: string, message: string) => void;
  dynamicData?: any;
}) {
  const { formData, setFormData } = useLayout();
  const [manualGridOverride, setManualGridOverride] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateForm = (updates: any) => {
    setFormData((prev) => ({
      form: {
        ...prev.form,
        ...updates,
      },
    }));
  };

  function onSubmit(data: any) {
    setIsSubmitting(true);
    setIsSuccess(false);
    console.log("Submitted raw data:", data);

    const action = (formData.form as any).action;
    const payloadSchema = (formData.form as any).payload;

    // Convert data types based on payload schema
    const formattedData: Record<string, any> = {};
    if (payloadSchema) {
      Object.keys(payloadSchema).forEach((key) => {
        const type = payloadSchema[key];
        const value = data[key];

        if (value === undefined || value === null) {
          formattedData[key] = value;
          return;
        }

        switch (type) {
          case "number":
            formattedData[key] = Number(value);
            break;
          case "boolean":
            formattedData[key] = String(value).toLowerCase() === "true";
            break;
          case "date":
            formattedData[key] = value; // Keep as is or format if needed
            break;
          case "string":
          default:
            formattedData[key] = String(value).toLowerCase();
            break;
        }
      });
    } else {
      Object.assign(formattedData, data);
    }

    console.log("Formatted data for submission:", formattedData);

    const baseUrl = "http://localhost:8001";
    const url = action ? `${baseUrl}${action.path}` : `${baseUrl}/api/v1/form/add`;
    const method = action ? action.method : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        toast.success("Sent successfully", {
          description: `${formData.form.formHeader.header} has been saved`,
          duration: 3000,
        });

        setIsSubmitting(false);
        setIsSuccess(true);


        setTimeout(() => {
          onCancel?.();
          if (onSubmitSuccess) {
            onSubmitSuccess(
              formData.form.formHeader.header,
              `${formData.form.formHeader.header} has been successfully recorded.`
            );
          }
        }, 1000);
      })
      .catch((error) => {
        console.error("Submission error:", error);
        toast.error("Submission failed", {
          description: error.message || "An error occurred while saving details.",
        });
        setIsSubmitting(false);
      });
  }

  const handleCancel = () => {
    onCancel?.();
    if (onCancelSuccess) {
      onCancelSuccess(formData.form.formHeader.header, `The request for ${formData.form.formHeader.header} has been cancelled.`);
    }
  };

  useEffect(() => {
    if (dynamicData) {
      const transformed = transformBackendFormToDefinition(dynamicData);
      console.log("transformed", transformed);
      setFormData(transformed);
    } else {
      setFormData(DefaultFormData);
    }
  }, [dynamicData, setFormData]);

  const setLabelAlignment = (alignment: string) => {
    updateForm({
      layout: {
        ...formData.form.layout,
        labelPosition: alignment,
      },
    });
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
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [manualGridOverride]);

  return (
    <>
      <FormContainerProps
        showRequiredFields={showRequiredFields}
        onSubmit={onSubmit}
        setShowRequiredFields={setShowRequiredFields}
        setLabelAlignment={setLabelAlignment}
        setManualGridOverride={setManualGridOverride}
        onCancel={handleCancel}
        isLoading={isSubmitting}
        isSuccess={isSuccess}
      />
    </>
  );
}
