"use client";
import type React from "react";
import { useState, useRef, forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { DataMasking } from "@/utils/data-masking";
import Icon from "./icons/Icon";
import {
  FormConfig,
  InputFieldConfig,
} from "@/types/components/form-config.type";

interface AdvancedInputProps {
  config: InputFieldConfig;
  formConfig: FormConfig;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  className?: string;
  formValues?: Record<string, any>;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const fontSizeClasses = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

export const AdvancedInput = forwardRef<HTMLInputElement, AdvancedInputProps>(
  (
    {
      config,
      formConfig,
      value,
      onChange,
      onBlur,
      onFocus,
      error,
      className,
      formValues,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasBeenModified, setHasBeenModified] = useState(false);
    const [unmaskedValue, setUnmaskedValue] = useState(value);
    const [displayValue, setDisplayValue] = useState(value);
    const [showadditionalInfo, setShowadditionalInfo] = useState(false);
    const [passwordStrength, setPasswordStrength] =
      useState<PasswordStrength>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    
    const charCount = value.length;
    const maxLength = config?.validation?.maxLength?.value;
    const showCharCounter =
      config.behavior.showCharCounter && (isFocused || charCount > 0);

    
    useEffect(() => {
      if (config.behavior.dataMasking?.enabled) {
        if (isFocused && config.behavior.dataMasking.unmaskOnFocus) {
          setDisplayValue(unmaskedValue);
        } else if (!isFocused && config.behavior.dataMasking.maskOnBlur) {
          setDisplayValue(
            DataMasking.maskValue(unmaskedValue, config.behavior.dataMasking),
          );
        } else if (config.behavior.dataMasking.realTimeMasking && !isFocused) {
          setDisplayValue(
            DataMasking.maskValue(value, config.behavior.dataMasking),
          );
        } else {
          setDisplayValue(value);
        }
      } else {
        setDisplayValue(value);
      }

      if (config.type == "password") {
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
      }
      const inputEl = inputRef.current;
      if (inputEl) {
        setIsTruncated(charCount * 10 > inputEl.clientWidth);
      }
    }, [value, isFocused, config.behavior.dataMasking, unmaskedValue]);

    
    const isValid = !error;
    const showClearIcon =
      config.behavior.showClearIcon && !config.isReadOnly && charCount > 0;

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      
      if (config.behavior.dataMasking?.enabled) {
        if (config.behavior.dataMasking.realTimeMasking) {
          newValue = DataMasking.formatAsUserTypes(
            newValue,
            config.behavior.dataMasking.pattern,
          );
        }
        setUnmaskedValue(DataMasking.unmaskValue(newValue));
      }

      onChange(
        config.behavior.dataMasking?.enabled
          ? DataMasking.unmaskValue(newValue)
          : newValue,
      );
      if (!hasBeenModified && newValue !== config.autoPopulate.defaultValue) {
        setHasBeenModified(true);
      }
    };

    
    const handleFocus = () => {
      setIsHovered(false);
      setIsFocused(true);

      
      if (
        config.behavior.dataMasking?.enabled &&
        config.behavior.dataMasking.unmaskOnFocus
      ) {
        setDisplayValue(unmaskedValue);
      }

      onFocus?.();
    };

    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      setIsFocused(false);
      setShowadditionalInfo(false);
      config.value = newValue;
      
      if (
        config.behavior.dataMasking?.enabled &&
        config.behavior.dataMasking.maskOnBlur
      ) {
        setDisplayValue(
          DataMasking.maskValue(unmaskedValue, config.behavior.dataMasking),
        );
      }
      
      if (config.behavior.autoTrim) {
        newValue = newValue.trim();
        onChange(newValue);
      }

      onBlur?.();
    };

    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      
      if (e.key === "Enter") {
        if (config.type === "text" || config.type === "email") {
          inputRef.current?.blur();
        }
      }

      
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "a" || e.key === "c" || e.key === "v") {
          
          return;
        }
      }
    };

    
    const calculatePasswordStrength = (password: string) => {
      let score = 0;

      if (password.length >= 1) score += 1;
      if (password.length >= 6) score += 1;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;

      if (score === 0)
        return { score: 0, label: "Very Weak", color: "bg-gray-300" };
      if (score === 1) return { score: 1, label: "Weak", color: "bg-red-500" };
      if (score === 2)
        return { score: 2, label: "Fair", color: "bg-orange-500" };
      if (score === 3)
        return { score: 3, label: "Good", color: "bg-green-400" };
      return { score: 4, label: "Strong", color: "bg-green-500" };
    };

    
    const handleClear = () => {
      onChange("");
      inputRef.current?.focus();
      setIsFocused(true);
      setDisplayValue("");
      setUnmaskedValue("");
    };

    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      
      const char = e.key;

      
      if (char.length > 1) return;
      if (config?.validation?.pattern) {
        const allowRegex = new RegExp(`[${config?.validation?.pattern}]`);

        if (!allowRegex.test(char)) {
          setShowadditionalInfo(true);
          e.preventDefault();
        }
      }
    };

    
    const isVisible =
      config.isVisible !== false &&
      (!config.conditionalLogic?.showWhen ||
        config.conditionalLogic.showWhen.every((condition) => {
          const fieldValue = formValues?.[condition.field];
          switch (condition.operator) {
            case "equals":
              return fieldValue === condition.value;
            case "not_equals":
              return fieldValue !== condition.value;
            case "contains":
              return String(fieldValue).includes(condition.value);
            case "greater_than":
              return Number(fieldValue) > Number(condition.value);
            case "less_than":
              return Number(fieldValue) < Number(condition.value);
            default:
              return true;
          }
        }));

    if (!isVisible) return null;

    const shouldShowTooltip =
      isTruncated &&
      ((formConfig.viewMode && config.type !== "password") ||
        (!formConfig.viewMode && !isFocused));

    const inputType =
      config.type === "password" && showPassword ? "text" : config.type;

    const labelRightElement = (
      <div className={cn("print:!hidden")}>
        {!config.isDisabled && !formConfig.viewMode && (
          <div
            className={`flex flex-row items-center ${
              formConfig.layout.labelPosition === "left" && "justify-end mb-1"
            }`}
          >
            {showadditionalInfo &&
              isFocused &&
              config?.validation?.additionalInfo &&
              value && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <svg
                        className="mr-1"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="dark:!fill-slate-700"
                          d="M7.33367 6.66602H8.66701V9.99935H7.33367V6.66602ZM7.33301 10.666H8.66634V11.9993H7.33301V10.666Z"
                          fill="#C5C5C5"
                        />
                        <path
                          className="dark:!fill-slate-700"
                          d="M9.17888 2.7998C8.94688 2.36313 8.49488 2.0918 8.00022 2.0918C7.50555 2.0918 7.05355 2.36313 6.82155 2.80046L1.92955 12.0425C1.82125 12.2455 1.76763 12.4732 1.77394 12.7032C1.78025 12.9332 1.84628 13.1577 1.96555 13.3545C2.08315 13.5522 2.2504 13.7158 2.45072 13.829C2.65103 13.9422 2.87746 14.0011 3.10755 13.9998H12.8929C13.3649 13.9998 13.7922 13.7585 14.0355 13.3545C14.1548 13.1577 14.2208 12.9332 14.2272 12.7032C14.2335 12.4732 14.1798 12.2455 14.0715 12.0425L9.17888 2.7998ZM3.10755 12.6665L8.00022 3.42446L12.8962 12.6665H3.10755Z"
                          fill="#C5C5C5"
                        />
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      {config?.validation?.additionalInfo}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            {showCharCounter && isFocused && (
              <div className="text-[10px] dark:!text-[#81868C] pt-[1px] text-[#81868C] font-normal">
                {charCount}
                {maxLength && `/${maxLength}`}
              </div>
            )}
            {showClearIcon && isFocused && (
              <a
                className="ml-[6px] flex items-center cursor-pointer"
                onClick={handleClear}
                aria-label="Clear input"
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className="relative group inline-block w-[14px] h-[14px]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className=" hidden group-hover:block"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="dark:fill-[#424751]"
                      d="M4.48 10.5L7 7.98L9.51999 10.5L10.5 9.52L7.97999 7L10.5 4.48L9.51999 3.5L7 6.02L4.48 3.5L3.5 4.48L6.02 7L3.5 9.52L4.48 10.5ZM7 14C6.03166 14 5.12166 13.8161 4.27 13.4484C3.41833 13.0807 2.6775 12.582 2.0475 11.9525C1.4175 11.323 0.918867 10.5821 0.551601 9.73C0.184334 8.87786 0.000467552 7.96786 8.86075e-07 7C-0.00046578 6.03213 0.183401 5.12213 0.551601 4.27C0.9198 3.41787 1.41843 2.67703 2.0475 2.0475C2.67657 1.41797 3.4174 0.919333 4.27 0.5516C5.1226 0.183867 6.0326 0 7 0C7.9674 0 8.87739 0.183867 9.72999 0.5516C10.5826 0.919333 11.3234 1.41797 11.9525 2.0475C12.5816 2.67703 13.0804 3.41787 13.4491 4.27C13.8178 5.12213 14.0014 6.03213 14 7C13.9986 7.96786 13.8147 8.87786 13.4484 9.73C13.0821 10.5821 12.5834 11.323 11.9525 11.9525C11.3216 12.582 10.5807 13.0809 9.72999 13.4491C8.87926 13.8173 7.96926 14.0009 7 14Z"
                      fill="#C5C5C5"
                    />
                  </svg>

                  {/* Hover SVG (hidden initially, visible on hover) */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="group-hover:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="dark:fill-[#424751] fill-[#C5C5C5]"
                      d="M4.48 10.5L7 7.98L9.51999 10.5L10.5 9.52L7.97999 7L10.5 4.48L9.51999 3.5L7 6.02L4.48 3.5L3.5 4.48L6.02 7L3.5 9.52L4.48 10.5ZM7 14C6.03166 14 5.12166 13.8161 4.27 13.4484C3.41833 13.0807 2.6775 12.582 2.0475 11.9525C1.4175 11.323 0.918867 10.5821 0.551601 9.73C0.184334 8.87786 0.000467552 7.96786 8.86075e-07 7C-0.00046578 6.03213 0.183401 5.12213 0.551601 4.27C0.9198 3.41787 1.41843 2.67703 2.0475 2.0475C2.67657 1.41797 3.4174 0.919333 4.27 0.5516C5.1226 0.183867 6.0326 0 7 0C7.9674 0 8.87739 0.183867 9.72999 0.5516C10.5826 0.919333 11.3234 1.41797 11.9525 2.0475C12.5816 2.67703 13.0804 3.41787 13.4491 4.27C13.8178 5.12213 14.0014 6.03213 14 7C13.9986 7.96786 13.8147 8.87786 13.4484 9.73C13.0821 10.5821 12.5834 11.323 11.9525 11.9525C11.3216 12.582 10.5807 13.0809 9.72999 13.4491C8.87926 13.8173 7.96926 14.0009 7 14ZM7 12.6C8.56333 12.6 9.88749 12.0575 10.9725 10.9725C12.0575 9.8875 12.6 8.56333 12.6 7C12.6 5.43667 12.0575 4.1125 10.9725 3.0275C9.88749 1.9425 8.56333 1.4 7 1.4C5.43666 1.4 4.1125 1.9425 3.0275 3.0275C1.9425 4.1125 1.4 5.43667 1.4 7C1.4 8.56333 1.9425 9.8875 3.0275 10.9725C4.1125 12.0575 5.43666 12.6 7 12.6Z"
                    />
                    <path
                      d="M7 0.5C7.90221 0.500001 8.74478 0.67111 9.53223 1.01074C10.3292 1.35451 11.0163 1.81858 11.5986 2.40137C12.1812 2.98441 12.6455 3.67193 12.9902 4.46875C13.3304 5.25518 13.5013 6.09689 13.5 6.99902C13.4987 7.90211 13.3276 8.74504 12.9893 9.53223C12.647 10.3283 12.1836 11.0159 11.5996 11.5986C11.0149 12.182 10.3267 12.646 9.53125 12.9902C8.74626 13.33 7.90393 13.5009 7 13.5L6.66406 13.4922C5.88704 13.4548 5.1558 13.2863 4.46777 12.9893C3.67181 12.6455 2.98476 12.1816 2.40137 11.5986C1.81806 11.0158 1.35401 10.3286 1.01074 9.53223C0.671569 8.74528 0.500466 7.90279 0.5 7C0.499565 6.09757 0.670874 5.25543 1.01074 4.46875C1.355 3.67202 1.81884 2.98436 2.40137 2.40137C2.98372 1.81858 3.67082 1.35451 4.46777 1.01074C5.25522 0.67111 6.09779 0.5 7 0.5ZM7 0.900391C5.30686 0.900391 3.85456 1.4931 2.67383 2.67383C1.4931 3.85456 0.900391 5.30686 0.900391 7C0.900391 8.69314 1.4931 10.1454 2.67383 11.3262C3.85456 12.5069 5.30686 13.0996 7 13.0996C8.69314 13.0996 10.1454 12.5069 11.3262 11.3262C12.5069 10.1454 13.0996 8.69314 13.0996 7C13.0996 5.30686 12.5069 3.85456 11.3262 2.67383C10.1454 1.4931 8.69314 0.900392 7 0.900391ZM9.79199 4.47949L7.62598 6.64648L7.27246 7L9.79199 9.51953L9.51953 9.79199L7 7.27246L6.64648 7.62598L4.47949 9.79199L4.20703 9.51953L6.37402 7.35352L6.72754 7L4.20703 4.47949L4.47949 4.20703L7 6.72754L7.35352 6.37402L9.51953 4.20703L9.79199 4.47949Z"
                      stroke="white"
                      strokeOpacity="0.01"
                    />
                  </svg>
                </span>
              </a>
            )}
            {/* password  */}
            {config.type == "password" && passwordStrength && (
              <div className="flex gap-1">
                <div
                  className={`rounded-sm transition-all duration-500 ease-out h-[3px] ${
                    passwordStrength.score >= 1 || error
                      ? passwordStrength.color
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: "20px",
                  }}
                />
                <div
                  className={`rounded-sm transition-all duration-500 ease-out h-[3px] ${
                    passwordStrength.score >= 2
                      ? passwordStrength.color
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: passwordStrength.score >= 2 ? "12px" : "10px",
                  }}
                />
                <div
                  className={`rounded-sm transition-all duration-500 ease-out h-[3px] ${
                    passwordStrength.score >= 3
                      ? passwordStrength.color
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: passwordStrength.score >= 3 ? "12px" : "10px",
                  }}
                />
                <div
                  className={`rounded-sm transition-all duration-500 ease-out h-[3px] ${
                    passwordStrength.score >= 4
                      ? passwordStrength.color
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: passwordStrength.score >= 4 ? "12px" : "10px",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );

    const inputElement = (
      <div className="">
        <div className="relative">
          {/* Input icon */}
          {config.icon?.prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Icon
                className="dark:text-[#414650] text-[#C5C5C5]"
                icon={config.icon.prefix}
                size={20}
              />
            </div>
          )}

          <Input
            ref={inputRef || ref}
            id={config.id}
            name={config.name}
            type={inputType}
            value={config.behavior.dataMasking?.enabled ? displayValue : value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            placeholder={config.placeholder}
            pattern={config?.validation?.pattern}
            disabled={config.isDisabled || formConfig.viewMode}
            readOnly={config.isReadOnly}
            required={config.isRequired.value}
            maxLength={maxLength}
            spellCheck={config.behavior.spellCheck}
            autoComplete={config.autoPopulate.autoFill ? "on" : "off"}
            aria-describedby={`${config.id}-helper ${config.id}-error`}
            aria-invalid={!isValid}
            aria-required={config.isRequired.value}
            aria-label={config.placeholder || config.label}
            onCopy={
              config.behavior.copyPasteRestriction
                ? (e) => e.preventDefault()
                : undefined
            }
            onPaste={
              config.behavior.copyPasteRestriction
                ? (e) => e.preventDefault()
                : undefined
            }
            className={cn(
              fontSizeClasses[formConfig.fontSize],
              config.icon?.prefix && "pl-10",
              (config.type === "password" || config.icon?.suffix) && "pr-10",
              isHovered && "!border-b-primary !border-b dark:!border-b",
              isFocused &&
                "!border-borderFocused !border-b-primary  !border-b-2 transition-all ease-out duration-200 focus:border-b-transparent",
              error && "dark:!border-b-destructive !border-b-destructive ",
              config.isDisabled &&
                "border-borderFocused  bg-disabledBg  disabled:text-disabledText disabled:opacity-100 border-[1px] ",
              formConfig.viewMode &&
                "bg-disabledBg  border-[0.5px] disabled:text-disabledText disabled:opacity-100",
              "placeholder:text-disabledPlaceholder min-w-0 placeholder:!text-[14px]  truncate  placeholder:font-light font-medium h-[35px] rounded-t-[4px] rounded-b-[3px] border-[1px]",
              className,
            )}
            style={
              {
                borderColor: isFocused ? formConfig.primaryColor : undefined,
              } as React.CSSProperties
            }
          />
          <div
            className={cn(
              "absolute bottom-0 left-0  w-full  h-0.5 bg-primary transition-all duration-00 ease-out",
              isFocused ? "w-full" : "w-0",
            )}
          />

          {/* Action icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {config.type === "password" && (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="h-6 w-6 p-0 hover:bg-muted"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="text-lg w-10 dark:text-[#414650]" />
                ) : (
                  <Eye className="text-lg w-10 dark:text-[#414650]" />
                )}
              </Button>
            )}
            {config.isDisabled && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7062 7.49054L9.64691 6.43127L11.198 4.8802L10.1198 3.80202L8.56873 5.35309L7.50946 4.29382L11.198 0.605296C11.3493 0.453972 11.5163 0.343506 11.6989 0.273897C11.8815 0.204287 12.0741 0.169735 12.2769 0.17024C12.4797 0.170744 12.6752 0.208575 12.8633 0.283733C13.0514 0.35889 13.2154 0.472383 13.3551 0.624212L14.3947 1.68348C14.546 1.82219 14.6562 1.98613 14.7253 2.17528C14.7945 2.36444 14.8293 2.55359 14.8298 2.74275C14.8298 2.94451 14.795 3.13695 14.7253 3.32005C14.6557 3.50315 14.5455 3.67011 14.3947 3.82093L10.7062 7.49054ZM2.72383 12.2762H3.80202L7.49054 8.58764L6.96091 8.03909L6.41236 7.50946L2.72383 11.198V12.2762ZM13.9218 15L8.56873 9.66583L4.42623 13.7894H1.21059V10.5927L5.35309 6.45019L0 1.07818L1.07818 0L15 13.9218L13.9218 15ZM6.96091 8.03909L6.41236 7.50946L7.49054 8.58764L6.96091 8.03909Z"
                  fill="#81868C"
                  fillOpacity="0.8"
                />
              </svg>
            )}
            {config.type !== "password" && config.icon?.suffix && (
              <Icon
                className="dark:text-[#414650] text-[#C5C5C5]"
                icon={config.icon.suffix}
                size={20}
              />
            )}
          </div>
        </div>

        {/* Overflow tooltip */}
        {value.length > 50 && !isFocused && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute inset-0 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>{value}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );

    const labelElement = config.label && (
      <div
        className={cn(
          formConfig.layout.labelPosition == "left" ? "min-h-[6.25rem]" : " ",
          "flex flex-row justify-between items-center ",
        )}
      >
        <div className="flex items-center gap-1 w-full">
          {formConfig.editMode && hasBeenModified && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-[15px]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.98667 5.34778L9.65102 6.01222L3.1086 12.5556H2.44424V11.8911L8.98667 5.34778ZM11.5863 1C11.4058 1 11.218 1.07222 11.0808 1.20944L9.75934 2.53111L12.4673 5.23944L13.7888 3.91778C14.0704 3.63611 14.0704 3.18111 13.7888 2.89944L12.099 1.20944C11.9546 1.065 11.7741 1 11.5863 1ZM8.98667 3.30389L1 11.2917V14H3.70796L11.6946 6.01222L8.98667 3.30389Z"
                          fill="#FFB800"
                        />
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Unsaved</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          <Label
            aria-label={config.label}
            htmlFor={config.id}
            className={cn(
              fontSizeClasses[formConfig.fontSize],
              "font-normal text-disabledText",
              config.isRequired.value &&
                "after:content-['*'] after:text-red-500  after:ml-0",
            )}
          >
            {config.label}
          </Label>

          {!formConfig.viewMode && config.helperText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn("print:hidden")}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.59458 4C10.1976 4 10.4991 4.4104 10.4991 4.88065C10.4991 5.4679 9.97528 6.01105 9.29353 6.01105C8.72248 6.01105 8.38948 5.67355 8.40523 5.11555C8.40523 4.6462 8.80168 4 9.59458 4ZM7.73923 13C7.26313 13 6.91438 12.7066 7.24738 11.4142L7.79368 9.1228C7.88863 8.7565 7.90438 8.60935 7.79368 8.60935C7.65103 8.60935 7.03363 8.86225 6.66778 9.112L6.43018 8.716C7.58758 7.7323 8.91913 7.15585 9.49063 7.15585C9.96628 7.15585 10.0455 7.7287 9.80788 8.60935L9.18193 11.0177C9.07123 11.443 9.11848 11.5897 9.22963 11.5897C9.37228 11.5897 9.84028 11.4133 10.3002 11.0465L10.5702 11.4128C9.44428 12.559 8.21443 13 7.73923 13Z"
                        fill="#81868C"
                      />
                      <circle cx="8.5" cy="8.5" r="8" stroke="#81868C" />
                    </svg>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{config.helperText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div>
          {formConfig.layout.labelPosition !== "left" && labelRightElement}
        </div>
      </div>
    );

    if (formConfig.layout.labelPosition === "left") {
      return (
        <div className=" flex items-center flex-row gap-4">
          <div
            className={cn(
              "w-1/3 relative my-auto",
              (showClearIcon || showCharCounter) && "pt-4",
              !showClearIcon && !showCharCounter && error && "!pt-3 -top-3",
              error && "pt-0",
              formConfig.viewMode ||
                (formConfig.layout.labelPosition == "left" && "pt-0"),
            )}
          >
            {labelElement}
          </div>
          <div className="flex-1 space-y-2">
            <div className="">
              <div className="relative">{labelRightElement}</div>
              <div>{inputElement}</div>
              {error && (
                <div
                  id={`${config.id}-error`}
                  className="flex items-center text-destructive gap-1 pt-[2px] text-[12px]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.33416 6.66602H8.6675V9.99935H7.33416V6.66602ZM7.3335 10.666H8.66683V11.9993H7.3335V10.666Z"
                      fill="#E53D3D"
                    />
                    <path
                      d="M9.17888 2.7998C8.94688 2.36313 8.49488 2.0918 8.00022 2.0918C7.50555 2.0918 7.05355 2.36313 6.82155 2.80046L1.92955 12.0425C1.82125 12.2455 1.76763 12.4732 1.77394 12.7032C1.78025 12.9332 1.84628 13.1577 1.96555 13.3545C2.08315 13.5522 2.2504 13.7158 2.45072 13.829C2.65103 13.9422 2.87746 14.0011 3.10755 13.9998H12.8929C13.3649 13.9998 13.7922 13.7585 14.0355 13.3545C14.1548 13.1577 14.2208 12.9332 14.2272 12.7032C14.2335 12.4732 14.1798 12.2455 14.0715 12.0425L9.17888 2.7998ZM3.10755 12.6665L8.00022 3.42446L12.8962 12.6665H3.10755Z"
                      fill="#E53D3D"
                    />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-1 min-h-[6.25rem]">
        {labelElement}
        {shouldShowTooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{inputElement}</TooltipTrigger>
              <TooltipContent>{value}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          inputElement
        )}
        {error && (
          <div
            id={`${config.id}-error`}
            className="flex items-center gap-1 font-medium  text-destructive text-[12px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33416 6.66602H8.6675V9.99935H7.33416V6.66602ZM7.3335 10.666H8.66683V11.9993H7.3335V10.666Z"
                fill="#E53D3D"
              />
              <path
                d="M9.17888 2.7998C8.94688 2.36313 8.49488 2.0918 8.00022 2.0918C7.50555 2.0918 7.05355 2.36313 6.82155 2.80046L1.92955 12.0425C1.82125 12.2455 1.76763 12.4732 1.77394 12.7032C1.78025 12.9332 1.84628 13.1577 1.96555 13.3545C2.08315 13.5522 2.2504 13.7158 2.45072 13.829C2.65103 13.9422 2.87746 14.0011 3.10755 13.9998H12.8929C13.3649 13.9998 13.7922 13.7585 14.0355 13.3545C14.1548 13.1577 14.2208 12.9332 14.2272 12.7032C14.2335 12.4732 14.1798 12.2455 14.0715 12.0425L9.17888 2.7998ZM3.10755 12.6665L8.00022 3.42446L12.8962 12.6665H3.10755Z"
                fill="#E53D3D"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    );
  },
);

AdvancedInput.displayName = "AdvancedInput";
