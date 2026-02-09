import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | undefined;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-1", containerClassName)}>
        {label && <Label>{label}</Label>}
        <div className="grid gap-2 w-full relative">
          {icon && <span className="absolute top-[29%] left-3">{icon}</span>}
          <Input
            ref={ref}
            className={cn(
              "p-0 h-[45px] rounded-[8px]! border-0 bg-white px-[21px] flex items-center placeholder:font-normal placeholder:text-sm placeholder:text-foreground leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus:ring-offset-0 focus-visible:ring-offset-0 focus:placeholder:text-sub-title shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!",
              icon ? "pl-11" : "",
              error ? "ring-1 ring-red-500 focus-visible:ring-red-500" : "",
              className,
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm pt-1 px-2">{error.message}</p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export { FormInput };
