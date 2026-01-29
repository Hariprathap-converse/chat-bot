import React, { useState } from "react";
import {
  LockIcon,
  PlusIconMenu,
  ResetIcon,
} from "./icons/dynamic-form/all-dynamic-form-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLayout } from "@/context/layout-context";

interface FormFooterProps {
  progress: number;
  onCancel?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const FormFooter = ({ progress, onCancel, isLoading = false, isSuccess = false }: FormFooterProps) => {
  const { formData } = useLayout();

  return (
    <>
      <div className="flex items-center w-full p-10  justify-center gap-4 md:gap-[32px]">
        <Button
          type="button"
          onClick={onCancel}
          className="md:w-[117px] w-full h-[35px] border border-primary  cursor-pointer rounded-md md:rounded-sm bg-background  text-primary shadow-none   font-medium hover:bg-primary  hover:text-primary-foreground  transition-all duration-500 ease-in-out "
        >
          Cancel
        </Button>

        <div className="relative w-full md:w-[117px] h-[35px]">
          <Button
            type="submit"
            disabled={progress < 100 || isLoading}
            className={cn(
              "group  w-full h-full disabled:opacity-100 overflow-hidden rounded-md md:rounded-sm border border-transparent !bg-primary shadow-customhover font-normal text-primary-foreground hover:border-primary hover:text-primary transition-all duration-500 ease-in-out",
              isLoading ? "!bg-background !border !border-primary " : " ",
            )}
          >
            {progress < 100 && (
              <span
                className="absolute top-0 right-0 h-full bg-background opacity-40 z-10 border border-transparent transition-all duration-500 ease-in-out pointer-events-none"
                style={{ width: `${100 - progress}%` }}
              />
            )}

            <div
              className={`relative z-20 flex items-center justify-center gap-1 transition-all duration-500 ease-in-out `}
            >
              {isLoading ? (
                <div className="loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              ) : (
                <span
                  className={cn(
                    "transition-all duration-500 ease-in-out inline-flex items-center justify-center overflow-hidden",
                    progress === 100 ? "opacity-0 w-0" : "opacity-100 w-[20px]",
                  )}
                >
                  <LockIcon />
                </span>
              )}

              <span
                className={cn(
                  "inline-block transform transition-all duration-700 ease-in-out text-primary-foreground",
                  isSuccess
                    ? "opacity-100 translate-y-0 transform transition-all duration-700 "
                    : isLoading
                      ? "opacity-0 -translate-y-2 transform transition-all duration-700 "
                      : "opacity-100 translate-y-0 transform transition-all duration-700 ",
                )}
              >
                {isSuccess ? `${formData.form.formHeader.buttonText || 'Created'}!` : isLoading ? "" : (formData.form.formHeader.buttonText || "Create")}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormFooter;
