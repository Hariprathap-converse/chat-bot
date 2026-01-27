"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";

import FormContainerProps from "./form-container";
import { useLayout } from "@/context/layout-context";

export default function EmployeeDetails({
  onCancel,
  onSubmitSuccess,
}: {
  onCancel?: () => void;
  onSubmitSuccess?: () => void;
}) {
  const { formData, setFormData } = useLayout();
  const [manualGridOverride, setManualGridOverride] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setTimeout(() => {
      const mockResponse = {
        success: true,
        message: "Employee details saved successfully",
        data: {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        },
      };

      toast.success("Sent successfully", {
        description: "Employee details have been saved",
        duration: 3000,
      });

      setIsSubmitting(false);

      setTimeout(() => {
        onCancel?.();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }, 1000);
    }, 1500);
  }

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
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
