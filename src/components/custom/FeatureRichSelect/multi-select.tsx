"use client";
import {
  FeatureRichSelectProps,
  Option,
  OptionOrGroup,
} from "@/types/components/select-config.types";
import React, { useEffect, useRef, useState } from "react";

import { cn, normalizeMultiSelectValues, normalizeOptions } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  AllClearIcon,
  DisableLockIcon,
  DisableModeIcon,
  SelectTirggerIcon,
} from "../icons/select";
import { toast } from "sonner";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { TruncateTooltip } from "@/components/custom/tooltip/truncate-tooltip";
import { Badge } from "@/components/ui/badge";
import {
  GroupSkeleton,
  SelectSkeleton,
} from "@/client/dynamic-form/skeletons/select-skeleton";
import Loader from "@/components/ui/loader";
import useMultiSelectLogic from "@/hooks/use-multi-select-logic";
import { Checkbox } from "@/components/ui/checkbox";

const MultiSelect: React.FC<FeatureRichSelectProps> = ({
  config,
  formConfig,
  value,
  onChange,
  onBlur,
  error,
}) => {
  if (!config || !formConfig) {
    toast.error("MultiSelect: config and formConfig prop is required");
    return null;
  }
  if (!value) return [];
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = React.useState<OptionOrGroup[]>([]);
  const [isPopoveropen, setIsPopoveropen] = React.useState(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchTerm, setShowSearchTerm] = useState("");
  const [dataSide, setDataSide] = React.useState<
    "top" | "right" | "bottom" | "left" | undefined
  >(undefined);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<Option[] | null>([]);
  if (!selectedOptions) return;
  const {
    handleSearchChange,
    loading,
    totalRecords,
    fetchOptions,
    query,
    debouncedQuery,
    setLoading,
    setQuery,
    setPage,
  } = useMultiSelectLogic({
    config,
    value,
    containerRef,
    isPopoveropen,
    setOptions,
    setIsLoading,
    setSelectedOptions,
  });

  const popoverContentRef = React.useRef<HTMLDivElement | null>(null);

  const popoverTriggerRef = useRef<any | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxBadgesToShow = 2;
  const extraCount =
    selectedOptions.length > maxBadgesToShow ? selectedOptions.length : 0;

  React.useEffect(() => {
    if (isPopoveropen && query !== "" && config?.dataSource === "api") {
      setQuery("");
      setPage(1);
      fetchOptions("", 1, false);
    }
  }, [isPopoveropen]);

  useEffect(() => {
    if (config.dataSource == "static" && config.options) {
      const newOptions = Array.isArray(config.options)
        ? normalizeOptions(config.options)
        : [];
      setOptions(newOptions);
      const normalized = normalizeMultiSelectValues(value);
      setOptions((prevOptions) => {
        const merged = [...normalized, ...prevOptions];

        const seen = new Set<string>();
        const deduped = merged.filter((item) => {
          if (!("value" in item)) return false;
          const lower = item.value.toLowerCase();
          if (seen.has(lower)) return false;
          seen.add(lower);
          return true;
        });

        const ordered = [
          ...normalized,
          ...deduped.filter(
            (item) =>
              "value" in item &&
              !normalized.some(
                (sel) => sel.value.toLowerCase() === item.value.toLowerCase(),
              ),
          ),
        ];

        return ordered;
      });
      setSelectedOptions(normalized);
    } else {
      fetchOptions(debouncedQuery, 1, false, value);
    }
  }, []);

  useEffect(() => {
    let intervalId: any;

    if (isPopoveropen) {
      intervalId = setInterval(() => {
        const side = popoverContentRef.current?.getAttribute("data-side");
        if (
          side === "top" ||
          side === "right" ||
          side === "bottom" ||
          side === "left"
        ) {
          setDataSide(side);
        } else {
          setDataSide(undefined);
        }
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isPopoveropen]);

  const handleOpenSelect = (open: boolean) => {
    setSearchTerm("");
    setShowSearchTerm("");
    setIsTyping(true);
    if (formConfig.viewMode === true) {
      setIsPopoveropen(open);
    } else {
      setIsPopoveropen(open);
    }
    onBlur?.();
  };

  const handleSelect = (value: Option) => {
    const updated = selectedOptions.some(
      (v) => v.value.toLowerCase() === value.value.toLowerCase(),
    )
      ? selectedOptions.filter(
          (v) => v.value.toLowerCase() !== value.value.toLowerCase(),
        )
      : [...selectedOptions, value];
    setSelectedOptions(updated);
    onChange?.(value.value);
    // selectedOptions.map((opt) => onChange?.(opt as unknown as string));
  };

  const sortBySelectedOrder = (a: Option, b: Option) => {
    const aIndex = selectedOptions.indexOf(a);
    const bIndex = selectedOptions.indexOf(b);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  };

  useEffect(() => {
    if (!isPopoveropen && searchTerm === "") {
      setOptions((prevOptions) => {
        const sorted = [...prevOptions].sort((a, b) => {
          if ("value" in a && "value" in b) {
            return sortBySelectedOrder(a, b);
          }
          return 0;
        });

        return sorted;
      });
    }
  }, [isPopoveropen, searchTerm, selectedOptions]);

  const renderSearchOption = (item: Option, className?: string) => {
    const isSelected = selectedOptions
      .map((val) => val.value.toLowerCase())
      .includes(item.value.toLowerCase());

    return (
      <div
        key={item.value}
        role="option"
        aria-selected={isSelected}
        aria-disabled={item.disabled}
        aria-checked={isSelected}
        tabIndex={
          item.disabled || config.isReadOnly || formConfig.viewMode ? -1 : 0
        }
        onClick={() => {
          if (config.isReadOnly || formConfig.viewMode || item.disabled) return;
          handleSelect(item);
        }}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            !(config.isReadOnly || formConfig.viewMode || item.disabled)
          ) {
            handleSelect(item);
            e.preventDefault();
            popoverTriggerRef.current.blur();
          }
        }}
        className={cn(
          "group pr-0 flex pl-2  hover:rounded-none items-center h-[30px] focus-visible:!bg-accent focus-visible:text-accent-foreground hover:bg-accent hover:text-accent-foreground hover:font-medium select-none outline-none aria-selected:bg-accent aria-selected:text-accent-foreground relative cursor-pointer px-2 text-sm",
          isSelected
            ? "!bg-transparent font-medium text-primary hover:text-primary"
            : "text-select-option font-normal",
          item.disabled
            ? "!cursor-not-allowed text-disabledText hover:!border-select-border hover:font-normal hover:bg-transparent hover:text-select-option  opacity-50  focus-visible:!bg-transparent focus-visible:text-disabledText  focus-visible:font-normal"
            : "cursor-pointer",
          isSelected &&
            item.disabled == true &&
            "!text-select-option font-normal  opacity-50",
          config.isReadOnly || formConfig.viewMode
            ? "!cursor-default pointer-events-none"
            : "pointer-events-auto",
          (formConfig.viewMode == true || config.isReadOnly == true) &&
            "!text-select-option !font-normal !bg-transparent",
          className,
        )}
      >
        <div
          className={cn(
            config.design.optionIcon.showDisabledIcon &&
              item.disabled &&
              config.design.optionIcon.disabledIconPosition === "left"
              ? "relative transition-all duration-500 focus-visible:!bg-accent focus-visible:text-accent-foreground"
              : "",
            "flex items-center max-w-full relative gap-1",
          )}
        >
          <div className={cn("w-full flex items-center justify-center gap-2 ")}>
            <Checkbox
              tabIndex={-1}
              checked={isSelected}
              className={cn(
                isSelected ? "border-primary " : "border-border",
                "h-[14px] w-[14px] rounded-[3px] ",
                (formConfig.viewMode || config.isReadOnly == true) && "hidden",
                item.disabled &&
                  config.design.optionIcon.disabledIconPosition === "left" &&
                  "hover:opacity-0 group-hover:opacity-0 transition-all duration-0 ",
              )}
            />

            <TruncateTooltip
              text={item.value}
              className={cn(
                item.disabled && "!hover:text-select-text",
                `truncate `,
              )}
            />
            <span
              className={cn(
                !config.design.optionIcon.showDisabledIcon
                  ? "hidden"
                  : " block",
                config.design.optionIcon.showDisabledIcon && item.disabled
                  ? "group-hover:opacity-100  opacity-0  "
                  : "hidden",
                config.design.optionIcon.disabledIconPosition === "right" &&
                  "transition-all duration-500",
                config.design.optionIcon.disabledIconPosition === "left"
                  ? "absolute left-[1px] group-hover:opacity-100 opacity-0"
                  : "",
              )}
            >
              <DisableLockIcon />
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderWithSearchOptions = () => {
    const filteredOptions = options
      ?.filter(
        (item): item is Option =>
          !!item &&
          typeof item === "object" &&
          "value" in item &&
          !("group" in item) &&
          typeof item.value === "string" &&
          (formConfig.viewMode || config.isReadOnly == true
            ? selectedOptions.includes(item)
            : item.value.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      ?.sort((a, b) => {
        const search = searchTerm.toLowerCase();
        const aLabel = a.value.toLowerCase();
        const bLabel = b.value.toLowerCase();

        const aStarts = aLabel.startsWith(search);
        const bStarts = bLabel.startsWith(search);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return 0; // maintain relative order otherwise
      });

    if (
      (!filteredOptions || filteredOptions.length === 0) &&
      totalRecords == 0
    ) {
      return (
        <div className="px-4 py-2 text-sm text-muted-foreground text-center">
          No results found
        </div>
      );
    }

    return filteredOptions.map((item) => renderSearchOption(item));
  };

  return (
    <>
      <div
        className={cn(
          config.isVisible ? "" : "hidden",
          formConfig.layout.labelPosition == "left"
            ? config.description
              ? "grid grid-cols-[100px_auto] items-baseline text-start "
              : "flex items-center text-start"
            : " flex-col items-center",
          config.behavior?.preventScreenshot ? "print:hidden" : "",
          "gap-2 w-full ",
        )}
      >
        <Label
          htmlFor={config.id}
          aria-label={config.label}
          aria-describedby={config.label}
          className={cn(
            "font-normal text-select-lable cursor-pointer",
            config.isRequired.value && "after:content-['*']  after:ml-0",
          )}
        >
          {config.label}
        </Label>
        <div className="w-full">
          <Popover open={isPopoveropen} onOpenChange={handleOpenSelect}>
            <div className="w-full relative  mx-auto">
              <div>
                <PopoverTrigger
                  ref={popoverTriggerRef}
                  id={config.id}
                  name={config.name}
                  className={cn(
                    "w-full relative  h-[35px] font-medium text-select-text border  text-sm border-select-border",
                    "!hover:border hover:!border-b-primary hover:rounded-b-[2px]  rounded-[4px] ",
                    "focus:border focus:border-select-border-focused focus-visible:ring-offset-0 focus-visible:ring-0",
                    // "focus-visible:border-b-2 focus-visible:border-b-primary",
                    "relative  focus-visible:hover:!border-b-select-border-focused focus-visible:outline-none focus-visible:after:content-[''] focus-visible:after:absolute focus-visible:after:left-[1px] focus-visible:after:right-[1px] focus-visible:after:bottom-0 focus-visible:after:h-[2px] focus-visible:after:bg-primary focus:ring-0 focus:ring-offset-0",
                    error &&
                      "!border-b-error-message hover:!border-b-error-message  focus-visible:after:!border-b-select-border-focused   focus-visible:!border-b-select-border-focused  ",
                    error && isPopoveropen && "!border-select-border-focused",
                  )}
                  asChild
                >
                  <Button
                    onCut={
                      config.behavior?.copyPasteRestriction
                        ? (e) => {
                            e.preventDefault();
                          }
                        : undefined
                    }
                    onCopy={
                      config.behavior?.copyPasteRestriction
                        ? (e) => {
                            e.preventDefault();
                          }
                        : undefined
                    }
                    onPaste={
                      config.behavior?.copyPasteRestriction
                        ? (e) => {
                            e.preventDefault();
                          }
                        : undefined
                    }
                    disabled={config.isDisabled}
                    type="button"
                    role="combobox"
                    className={cn(
                      "w-full relative bg-background flex items-center justify-start hover:bg-background  h-[35px] font-medium text-select-text border  text-sm border-select-border focus:border focus:border-select-border-focused hover:border hover:border-b-primary hover:rounded-b-[2px]  rounded-[4px]  focus:ring-0 focus:ring-offset-0",
                      "data-[placeholder]:font-light data-[placeholder]:text-select-placeholder ",
                      (formConfig.viewMode || config.isReadOnly) &&
                        "bg-select-disable-bg   cursor-pointer hover:bg-select-disable-bg border-[0.5px] hover:!border-select-view-border  !border-select-view-border disabled:text-disabledText disabled:opacity-100",
                      "placeholder:text-disabledPlaceholder   min-w-0 placeholder:!text-[14px]  truncate  placeholder:font-light font-medium h-[35px] rounded-t-[4px] !rounded-b-[3px] border-[1px]",
                      config.isDisabled &&
                        "border-select-border  bg-select-disable-bg  hover:bg-select-disable-bg  hover:!border-select-border  disabled:pointer-events-auto disabled:!cursor-not-allowed  disabled:text-select-text disabled:opacity-100 border-[1px] ",
                      config.placeholder &&
                        !selectedOptions &&
                        "font-light text-select-placeholder",
                      formConfig.viewMode &&
                        config.isDisabled &&
                        "hover:bg-select-disable-bg border-[0.5px] hover:!border-select-border  !border-select-border",
                      selectedOptions
                        ? "text-select-text font-medium"
                        : "text-select-placeholder",
                      selectedOptions.length > 0 && "pl-[2px]",
                      isPopoveropen === true
                        ? "hover:border-select-border-focused hover:!border-b-select-border-focused border-select-border-focused rounded-b-[3px] "
                        : "",
                      (config.isReadOnly == true ||
                        formConfig.viewMode == true) &&
                        selectedOptions.length <= 0 &&
                        "opacity-100 pointer-events-none",
                      "focus:ring-0 focus:ring-offset-0",
                    )}
                  >
                    <div
                      className={cn(
                        config.variant == "multiSelectWithSearch" &&
                          isPopoveropen
                          ? "opacity-0"
                          : "opacity-100",
                        (config.isReadOnly == true ||
                          formConfig.viewMode == true) &&
                          selectedOptions.length <= 0 &&
                          "opacity-100 pointer-events-none",
                        "flex items-center justify-between w-full ",
                      )}
                    >
                      {selectedOptions ? (
                        <span
                          className={cn(
                            config.variant === "search" && isPopoveropen
                              ? "opacity-0"
                              : "opacity-100",
                            "text-sm max-w-[92%] flex gap-2",
                          )}
                        >
                          <div className="flex items-center flex-1 gap-[5px] overflow-hidden  ">
                            {selectedOptions.length > 0 ? (
                              selectedOptions
                                .slice(0, maxBadgesToShow)
                                .map((option) => (
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                    key={option.value}
                                    className={cn(
                                      "flex items-center py-[3.5px] px-[11px] gap-2 bg-multiselect-selected-option  rounded-sm",
                                      config.isReadOnly ||
                                        config.isDisabled ||
                                        formConfig.viewMode == true
                                        ? "dark:bg-background"
                                        : "bg-multiselect-selected-option",
                                    )}
                                  >
                                    <span className="truncate text-sm">
                                      {option.value}
                                    </span>
                                    <span
                                      role="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(option);
                                      }}
                                      className={cn(
                                        "cursor-pointer hover:text-foreground  items-center mx-auto my-auto ",
                                        formConfig.viewMode == true ||
                                          config.isReadOnly == true
                                          ? "hidden"
                                          : "flex",
                                        (formConfig.viewMode == true ||
                                          config.isReadOnly == true) &&
                                          config.isDisabled == true &&
                                          "hidden",
                                        config.isDisabled == true && "hidden",
                                      )}
                                    >
                                      <AllClearIcon />
                                    </span>
                                  </div>
                                ))
                            ) : (
                              <span
                                className={cn(
                                  isPopoveropen ? "opacity-0" : "",
                                  (config.isReadOnly == true ||
                                    formConfig.viewMode == true) &&
                                    selectedOptions.length <= 0 &&
                                    "opacity-100",
                                  "text-muted-foreground font-light tracking-[0] leading-[17px] text-sm",
                                )}
                              >
                                {config.placeholder}
                              </span>
                            )}
                            {extraCount > 0 && (
                              <span className="text-foreground text-[14px] pb-0  flex items-center">
                                ...
                              </span>
                            )}
                          </div>
                        </span>
                      ) : (
                        <span
                          className={cn(
                            isPopoveropen ? "opacity-0" : "",

                            "text-muted-foreground font-light tracking-[0] leading-[17px] text-sm",
                          )}
                        >
                          {config.placeholder}
                        </span>
                      )}
                      <div
                        className={cn(
                          formConfig.viewMode == true ||
                            config.isReadOnly == true
                            ? ""
                            : "gap-[10px]",
                          (formConfig.viewMode == true ||
                            config.isReadOnly == true) &&
                            config.isDisabled == true &&
                            "gap-[10px]",
                          "flex items-center",
                        )}
                      >
                        <div className="flex items-center ">
                          {extraCount > 0 && (
                            <Badge
                              variant="secondary"
                              className={cn(
                                isPopoveropen &&
                                  !formConfig.viewMode &&
                                  config.isReadOnly == false
                                  ? "bg-primary  hover:bg-primary "
                                  : "bg-multiselect-selected-option  ",
                                "text-[12px] rounded-[4px]  h-5 w-5 flex items-center justify-center p-0",
                              )}
                            >
                              <span
                                className={cn(
                                  isPopoveropen &&
                                    !formConfig.viewMode &&
                                    config.isReadOnly == false
                                    ? "text-primary-foreground  hover:text-primary-foreground"
                                    : "text-foreground",
                                  " font-normal text-center text-[12px] tracking-[0]",
                                )}
                              >
                                {extraCount}
                              </span>
                            </Badge>
                          )}
                        </div>
                        {extraCount > 0 && (
                          <span
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOptions([]);
                            }}
                            className={cn(
                              isPopoveropen
                                ? "text-primary hover:text-primary "
                                : " text-foreground hover:text-foreground",
                              formConfig.viewMode == true ||
                                config.isReadOnly == true
                                ? "hidden"
                                : "flex",
                              config.isDisabled == true && "hidden",
                              " items-center",
                            )}
                          >
                            <AllClearIcon />
                          </span>
                        )}
                        <span
                          className={cn(
                            formConfig.viewMode == true ||
                              config.isReadOnly == true
                              ? "hidden"
                              : "",
                            formConfig.viewMode == true &&
                              config.isDisabled == true &&
                              "block",
                            isPopoveropen ? "" : "",
                            "p-0 m-0 w-2 pr-3",
                          )}
                        >
                          {config.isDisabled ? (
                            <DisableModeIcon />
                          ) : formConfig.viewMode === true ||
                            config.isReadOnly ? (
                            <></>
                          ) : (
                            <SelectTirggerIcon />
                          )}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <div
                  className={cn(
                    "absolute bottom-[0.3px] !z-50 left-[0.3%]  flex items-center  max-w-[99.5%] h-0.5 bg-primary rounded-none transition-all duration-200 ease-out ",
                    isPopoveropen &&
                      (!config.isReadOnly || !formConfig.viewMode)
                      ? "w-full "
                      : "w-0",
                    isPopoveropen && !formConfig.viewMode ? "w-full " : "w-0",
                    isPopoveropen && !config.isReadOnly ? "w-full " : "w-0",
                  )}
                />
              </div>
              <PopoverContent
                ref={popoverContentRef}
                className={cn(
                  dataSide === "right" && "relative left-[0px]  rounded-sm ",
                  dataSide === "left" && "relative right-[2px]  rounded-sm",
                  // dataSide === "right" &&
                  //   config.variant == "group" &&
                  //   "relative left-[0px]",
                  // dataSide === "left" &&
                  //   config.variant == "group" &&
                  //   "relative right-[0px]",
                  config.variant == "multiSelect" ||
                    config.variant == "multiSelectWithSearch"
                    ? ""
                    : "min-h-[45px]",
                  (config.isReadOnly == true || formConfig.viewMode == true) &&
                    selectedOptions.length <= 0 &&
                    "hidden",
                  // dataSide === "top" && "shadow-select-shadow",
                  // dataSide === "bottom" && "shadow-select-shadow",
                  "p-0  min-w-[var(--radix-popover-trigger-width)] border-none rounded-sm",
                  "!animate-none !opacity-100 !transform-none transition-none shadow-select-shadow  ",
                )}
                align="start"
                side={
                  config.design.dropdown.position
                    ? config.design.dropdown.position
                    : dataSide
                }
              >
                <Command
                  className={cn(
                    dataSide === "top" && " rounded-sm rounded-b-none ",
                    dataSide === "bottom" && "rounded-sm rounded-t-none",
                    dataSide === "left" && "rounded-r-none  ",
                    dataSide === "right" && "rounded-l-none",
                    "px-[2px] pt-1 pb-1  border-none shadow-none  ",
                  )}
                >
                  <div
                    className={cn(
                      dataSide === "top" && "bottom-[-39px]",
                      dataSide === "bottom" && "top-[-39px]",
                      dataSide === "left" &&
                        "absolute left-[calc(var(--radix-popover-trigger-width)+5.5px)] min-w-full top-[-1px] ",
                      dataSide === "right" &&
                        "absolute right-[calc(var(--radix-popover-trigger-width)+4px)] top-[-1px]",
                      "absolute bg-transparent  rounded-sm z-50 min-w-full ",
                      "h-[35px]  flex items-center ",
                      config.variant === "multiSelect" && "hidden",
                    )}
                  >
                    {isTyping === false ? (
                      <div className="flex items-center  w-full shadow-none border-none rounded-sm px-3 pl-[15px] tracking-[0] leading-[17px] text-sm h-[35px] ">
                        <SearchIcon className="h-4 w-4 shrink-0 text-select-icon" />
                        <Input
                          ref={inputRef}
                          onCut={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          onCopy={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          onPaste={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          className={cn(
                            "h-full max-h-[35px] pl-1 border-none",
                            "flex w-full rounded-md !bg-transparent tracking-[0] leading-[17px] text-sm  outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                          )}
                          onChange={(e) => {
                            setLoading(true);
                            handleSearchChange(e.target.value);
                            setSearchTerm(e.target.value);
                            setShowSearchTerm(e.target.value);
                          }}
                          onBlur={(e) => {
                            setSearchTerm(e.target.value);
                            setIsTyping(true);
                          }}
                          onFocus={(e) => {
                            const length = e.target.value.length;
                            e.target.setSelectionRange(length, length);
                          }}
                          value={searchTerm}
                        ></Input>
                      </div>
                    ) : (
                      <div className="flex items-center w-full shadow-none border-none rounded-sm px-3 pl-[15px] tracking-[0] leading-[17px] text-sm h-[35px] ">
                        <SearchIcon className="h-4 w-4 shrink-0 text-select-icon" />
                        <Input
                          onCut={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          onCopy={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          onPaste={
                            config.behavior?.copyPasteRestriction
                              ? (e) => {
                                  e.preventDefault();
                                }
                              : undefined
                          }
                          className={cn(
                            "h-full max-h-[35px] p-2 pl-1 border-none",
                            "flex w-full rounded-md   tracking-[0] leading-[17px] text-sm !bg-transparent  outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                          )}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearchChange(e.target.value);
                            setIsTyping(false);
                          }}
                          onFocus={(e) => {
                            const length = e.target.value.length;
                            e.target.setSelectionRange(length, length);
                          }}
                          value={showSearchTerm}
                        ></Input>
                      </div>
                    )}
                  </div>
                  {isLoading === false ? (
                    <div
                      ref={containerRef}
                      style={{ scrollbarGutter: "stable" }}
                      className={cn(
                        " navbar-scroll  max-h-[11.200rem] overflow-auto shadow-none  rounded-sm border-none  data-[side=bottom]:translate-y-[3px] rounded-t-none  w-full bg-popover z-50 ",
                      )}
                    >
                      <div className="pl-[4px] pr-0 h-fit">
                        {renderWithSearchOptions()}
                        {loading &&
                          options.length > 0 &&
                          config.dataSource == "api" && (
                            <div
                              tabIndex={0}
                              className="py-2 text-center flex items-center focus-within:ring-0 focus-within:!outline-none  justify-center z-50 w-full text-sm text-muted-foreground"
                            >
                              {/* Loading more... */}
                              <Loader />
                            </div>
                          )}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{ scrollbarGutter: "stable" }}
                      className=" navbar-scroll  pl-1 pb-1  max-h-[11.200rem] overflow-auto shadow-none  rounded-sm border-none  data-[side=bottom]:translate-y-[3px] rounded-t-none  w-full bg-popover z-50 "
                    >
                      {config.variant === "search" ||
                      config.variant === "default" ? (
                        <SelectSkeleton />
                      ) : (
                        <GroupSkeleton />
                      )}
                    </div>
                  )}
                </Command>
              </PopoverContent>
            </div>
          </Popover>
          {config.description && !error && (
            <p className="text-xs text-descriptionText font-normal mt-1">
              {config.description}
            </p>
          )}
          {error && (
            <div
              id={`${config.id}-error`}
              className="flex items-center gap-[3px] pt-[1px] "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="!max-h-[16px] !max-w-[16px]"
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
              <span className="text-error-message font-medium text-[12px] pt-[2px]">
                {error}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiSelect;
