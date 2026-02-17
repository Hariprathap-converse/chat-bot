"use client";
import {
  FeatureRichSelectProps,
  GroupedOption,
  Option,
  OptionOrGroup,
} from "@/types/components/select-config.types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  cn,
  normalizeOptions,
  scrollToElement,
  toCapitalCase,
} from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  DisableLockIcon,
  DisableModeIcon,
  GroupTriggerIcon,
  SelectTirggerIcon,
} from "../icons/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Check, SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { TooltipButton } from "@/components/custom/tooltip/tooltip-button";
import { TruncateTooltip } from "@/components/custom/tooltip/truncate-tooltip";
import { TruncateTooltipInput } from "@/components/custom/tooltip/truncate-input-tooltip";
import {
  GroupSkeleton,
  SelectSkeleton,
} from "@/client/dynamic-form/skeletons/select-skeleton";
import Loader from "@/components/ui/loader";
import useSelectLogic from "@/hooks/use-select-logic";

const DefaultSelect: React.FC<FeatureRichSelectProps> = ({
  config,
  formConfig,
  value,
  onChange,
  onBlur,
  error,
  className,
}) => {
  formConfig = formConfig ?? {
    theme: "light",
    primaryColor: "#1D57C7",
    fontSize: "small",
    editMode: true,
    layout: {
      columns: 3,
      labelPosition: "top",
    },
    viewMode: false,
  };

  if (!config) return;
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [createNewOption, setCreateNewOption] = useState<string | undefined>(
    undefined,
  );
  const [options, setOptions] = React.useState<OptionOrGroup[]>([]);
  const [isPopoveropen, setIsPopoveropen] = React.useState(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchTerm, setShowSearchTerm] = useState("");
  const [dataSide, setDataSide] = React.useState<
    "top" | "right" | "bottom" | "left" | undefined
  >(undefined);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const createOptionref = useRef<HTMLInputElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

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
  } = useSelectLogic({
    config,
    value,
    containerRef,
    isPopoveropen,
    setOptions,
    setIsLoading,
    setSelectedOption,
  });
  const isValidInitialValue =
    value &&
    typeof value.value === "string" &&
    config.dataSource === "static" &&
    (config.options?.some(
      (opt) =>
        "value" in opt &&
        typeof opt.value === "string" &&
        opt.value.toLowerCase() === value.value.toLowerCase(),
    ) ||
      config.options?.some(
        (group) =>
          "group" in group &&
          group.items?.some(
            (opt) =>
              typeof opt.value === "string" &&
              opt.value.toLowerCase() === value.value.toLowerCase(),
          ),
      ));

  useEffect(() => {
    if (!value) return;
    if (isValidInitialValue) {
      const optionWithLabel = {
        ...value,
        label: toCapitalCase(value.label || value.value),
      };
      setSelectedOption(optionWithLabel);
      config.value = optionWithLabel.id;
    }
  }, [value]);

  const popoverContentRef = React.useRef<HTMLDivElement | null>(null);

  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const popoverTriggerRef = useRef<any | null>(null);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isPopoveropen && query !== "" && config?.dataSource === "api") {
      setQuery("");
      setPage(1);
      fetchOptions("", 1, false, value);
    }
  }, [isPopoveropen]);

  useEffect(() => {
    if (config.dataSource == "static" && config.options) {
      const capitalizedOptions = normalizeOptions(config?.options || []);
      setOptions(capitalizedOptions);
    } else {
      fetchOptions(debouncedQuery, 1, false);
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

  const filteredData = useMemo(() => {
    if (!options) return [];

    return options
      .map((item) => {
        if (item && "group" in item) {
          const groupMatch = item.group
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const filteredItems = item.items.filter((opt) =>
            opt.value.toLowerCase().includes(searchTerm.toLowerCase()),
          );

          if (groupMatch || filteredItems.length > 0) {
            return {
              ...item,
              items: groupMatch ? item.items : filteredItems,
              groupOnlyMatch: groupMatch && filteredItems.length === 0,
            };
          }
        }
        return null;
      })
      .filter(Boolean);
  }, [options, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const expandedGroups: Record<string, boolean> = {};
      options?.forEach((item) => {
        if ("group" in item) {
          const hasMatch = item.items.some((opt) =>
            opt.value.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          if (hasMatch) expandedGroups[item.group] = true;
        }
      });
      setOpenGroups((prev) => ({ ...prev, ...expandedGroups }));
    }
  }, [searchTerm, config]);

  useEffect(() => {
    const updatedOpenGroups = Object.fromEntries(
      filteredData.map((group) => [group?.group, !group?.groupOnlyMatch]),
    );
    setOpenGroups(updatedOpenGroups);
  }, [filteredData]);

  const handleOpenSelect = (open: boolean) => {
    setSearchTerm("");
    setIsTyping(true);
    if (formConfig.viewMode === true || config.isReadOnly === true) {
      setIsPopoveropen(false);
    } else {
      setIsPopoveropen(open);
    }
  };

  const handleSelect = (option: Option) => {
    popoverTriggerRef.current.blur();
    setIsPopoveropen(false);
    setSelectedOption(option);
    config.value = option.id;
    setSearchTerm("");
    setShowSearchTerm(option.label || option.value);
    setIsTyping(true);
    onChange?.(option.value);
  };

  const toggleGroup = useCallback(
    (group: string, state?: boolean, variant?: string) => {
      setOpenGroups((prev) => {
        const isCurrentlyOpen = prev[group] ?? false;
        const newState = typeof state === "boolean" ? state : !isCurrentlyOpen;

        const updatedGroups = {
          ...prev,
          [group]: newState,
        };

        if (newState) {
          requestAnimationFrame(() => {
            const container = containerRef.current;
            const targetGroup = groupRefs.current[group];
            if (container && targetGroup) {
              scrollToElement(container, targetGroup, 500);
            }
          });
        }
        return updatedGroups;
      });
    },
    [],
  );

  const renderSearchOption = (item: Option, className?: string) => {
    return (
      <div
        key={item.value}
        role="option"
        aria-selected={selectedOption?.value === item.value}
        tabIndex={0}
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
          "group pr-0 flex pl-2  hover:rounded-none   items-center h-[30px] focus-visible:!bg-accent focus-visible:text-accent-foreground focus-visible:font-medium hover:bg-accent hover:text-accent-foreground hover:font-medium select-none outline-none aria-selected:bg-accent aria-selected:text-accent-foreground relative cursor-pointer px-2 text-sm",
          selectedOption?.value === item.value
            ? "!bg-transparent font-medium text-primary hover:text-primary"
            : "text-select-option font-normal",
          item.disabled
            ? "!cursor-not-allowed text-disabledText hover:!border-select-border hover:font-normal hover:bg-transparent hover:text-foreground opacity-50  focus-visible:!bg-transparent focus-visible:text-disabledText  focus-visible:font-normal"
            : "cursor-pointer",
          selectedOption?.value === item.value &&
            item.disabled == true &&
            "!text-select-option font-normal  opacity-50",
          config.isReadOnly || formConfig.viewMode
            ? "!cursor-default pointer-events-none"
            : "pointer-events-auto",
          className,
        )}
      >
        <div
          className={cn(
            config.design.optionIcon.showDisabledIcon &&
              item.disabled &&
              config.design.optionIcon.disabledIconPosition === "left"
              ? "group-hover:pl-4  relative transition-all duration-700 focus-visible:!bg-accent focus-visible:text-accent-foreground"
              : "",
            "flex items-center max-w-full relative gap-1",
          )}
        >
          <div className="w-full flex items-center justify-center">
            <TruncateTooltip
              text={item.label || item.value}
              className={`truncate`}
            />
          </div>
          <span
            className={cn(
              !config.design.optionIcon.showDisabledIcon ? "hidden" : "block",
              config.design.optionIcon.showDisabledIcon && item.disabled
                ? "group-hover:opacity-100 transition-all duration-500 opacity-0"
                : "hidden",
              config.design.optionIcon.disabledIconPosition === "left"
                ? "absolute left-0"
                : "",
            )}
          >
            <DisableLockIcon />
          </span>
        </div>
      </div>
    );
  };

  const renderGroupedSearchOptions = () => {
    const renderedGroups = filteredData
      .map((item) => {
        if (!item || !("group" in item)) return null;
        const isOpen = openGroups[item.group] ?? false;

        const selectedOptions = item.items.find(
          (opt) => opt.value === selectedOption?.value,
        );

        const variant = config.variant;
        return (
          <Collapsible
            key={item.group}
            disabled={item.disabled}
            ref={(el) => {
              groupRefs.current[item.group] = el;
            }}
            open={isOpen}
            className="disabled:pointer-events-auto disabled:!cursor-not-allowed "
            onOpenChange={(state) => toggleGroup(item.group, state, variant)}
          >
            <CollapsibleTrigger
              disabled={item.disabled}
              className="disabled:pointer-events-auto shadow-none disabled:!cursor-not-allowed "
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
              asChild
            >
              <Button
                className={cn(
                  "flex mt-[5px] mb-1 focus-visible:ring-offset-0 items-center p-[1px] pl-[5px] py-[6px] h-fit gap-[7px] text-sm  justify-start hover:bg-transparent w-full text-select-text bg-transparent",
                )}
              >
                <GroupTriggerIcon
                  className={cn(
                    isOpen
                      ? "-rotate-90 transition-all duration-500"
                      : "transition-all duration-500",
                    "!w-[9px] !h-[6px] shrink-0",
                  )}
                />
                <span className="text-sm font-normal   ">{item.group}</span>
                {!isOpen && selectedOptions && (
                  <span className="ml-auto text-xs pb-[1px]  font-light pr-1 text-muted-foreground hover:font-normal truncate ">
                    {selectedOption?.label || selectedOption?.value}
                  </span>
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent
              className={cn(
                item.disabled && "hidden",
                "overflow-hidden transition-[height] duration-300 ease-in-out",
                isOpen
                  ? "animate-slideDown duration-300"
                  : "animate-slideUp duration-300",
                "p-0 pb-[1px]",
              )}
            >
              {item.items.map((opt) => renderSearchOption(opt, "pl-[30px]"))}
            </CollapsibleContent>
          </Collapsible>
        );
      })
      .filter(Boolean);
    if (renderedGroups.length === 0 && totalRecords == 0) {
      return (
        <div className="px-4 py-2 text-sm text-muted-foreground text-center">
          No results found
        </div>
      );
    }

    return renderedGroups;
  };

  const renderWithSearchOptions = () => {
    if (config?.variant === "groupSearch" || config?.variant === "group") {
      return renderGroupedSearchOptions();
    }

    const filteredOptions = options
      ?.filter(
        (item): item is Option =>
          !!item &&
          typeof item === "object" &&
          "value" in item &&
          !("group" in item) &&
          typeof item.value === "string" &&
          item.value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      ?.sort((a, b) => {
        const search = searchTerm.toLowerCase();
        const aLabel = a.value.toLowerCase();
        const bLabel = b.value.toLowerCase();

        const aStarts = aLabel.startsWith(search);
        const bStarts = bLabel.startsWith(search);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return 0;
      });

    if (
      (!filteredOptions || filteredOptions.length === 0) &&
      totalRecords == 0 &&
      config.variant !== "searchCreatable"
    ) {
      return (
        <div className="px-4 py-2 text-sm text-muted-foreground text-center">
          No results found
        </div>
      );
    }
    if (
      (!filteredOptions || filteredOptions.length === 0) &&
      totalRecords == 0 &&
      config.variant == "searchCreatable"
    ) {
      return (
        <div className="p-0">
          <Button
            onClick={() => {
              setIsCreateMode(true);
              setIsPopoveropen(false);
            }}
            className=" group w-full   h-[30px] px-[4px] justify-start bg-transparent rounded-sm flex pl-[8px]  items-center hover:bg-accent hover:text-accent-foreground  cursor-pointer"
          >
            <span className="font-normal  text-sm tracking-[0] leading-[100%] text-primary group-hover:font-medium   ">
              + Add New
            </span>
          </Button>
        </div>
      );
    }

    return filteredOptions.map((item) => renderSearchOption(item));
  };

  useEffect(() => {
    createOptionref.current?.focus();
  }, [isCreateMode]);

  const handleCreate = useCallback(() => {
    if (!createNewOption?.trim()) return;
    const newOption: Option = {
      id: crypto.randomUUID(),
      value: createNewOption.toLowerCase(),
    };

    setOptions((prev) => [...prev, newOption]);
    setSelectedOption(newOption);
    config.value = newOption.id;
    setCreateNewOption(undefined);
    setIsCreateMode(false);
  }, [createNewOption]);

  const handleCancle = useCallback(() => {
    setCreateNewOption("");
    setIsCreateMode(false);
  }, []);

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
          "gap-2 w-full h-[85px] !space-y-2.5",
        )}
      >
        <Label
          htmlFor={config.fieldId}
          aria-label={config.label}
          aria-describedby={config.label}
          className={cn(
            "font-normal text-select-lable cursor-pointer",
            config.isRequired.value &&
              "after:content-['*'] after:text-red-500 after:ml-0",
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
                  id={config.fieldId}
                  name={config.name}
                  className={cn(
                    "w-full relative  h-[35px] font-medium text-select-text border  text-sm border-select-border shadow-none",
                    "!hover:border hover:!border-b-primary hover:rounded-b-[2px]  rounded-[4px] ",
                    "focus:border focus:border-select-border-focused focus-visible:ring-offset-0 focus-visible:ring-0",
                    "relative  focus-visible:hover:!border-b-select-border-focused focus-visible:outline-none focus-visible:after:content-[''] focus-visible:after:absolute focus-visible:after:left-[1px] focus-visible:after:right-[1px] focus-visible:after:bottom-0 focus-visible:after:h-[2px] focus-visible:after:bg-primary focus:ring-0 focus:ring-offset-0",
                    error &&
                      "!border-b-error-message hover:!border-b-error-message  focus-visible:after:!border-b-select-border-focused   focus-visible:!border-b-select-border-focused  ",
                    error && isPopoveropen && "!border-select-border-focused",
                    className,
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
                        "bg-select-disable-bg !cursor-default hover:bg-select-disable-bg border-[0.5px] hover:!border-select-view-border  !border-select-view-border disabled:text-disabledText disabled:opacity-100",
                      "placeholder:text-disabledPlaceholder   min-w-0 placeholder:!text-[14px]  truncate  placeholder:font-light font-medium h-[35px] rounded-t-[4px] !rounded-b-[3px] border-[1px]",
                      config.isDisabled &&
                        "border-select-border  bg-select-disable-bg  hover:bg-select-disable-bg  hover:!border-select-border   disabled:pointer-events-auto disabled:!cursor-not-allowed  disabled:text-select-text disabled:opacity-100 border-[1px] ",
                      config.placeholder &&
                        !selectedOption &&
                        "font-light text-select-placeholder",
                      formConfig.viewMode &&
                        config.isDisabled &&
                        "hover:bg-select-disable-bg border-[0.5px] hover:!border-select-border  !border-select-border",
                      selectedOption
                        ? "text-select-text font-medium"
                        : "text-select-placeholder",
                      isPopoveropen === true
                        ? "hover:border-select-border-focused hover:!border-b-select-border-focused border-select-border-focused rounded-b-[3px] "
                        : "",
                      "focus:ring-0 focus:ring-offset-0",
                    )}
                  >
                    <div className="flex items-center justify-between w-full ">
                      {selectedOption ? (
                        <span
                          className={cn(
                            (config.variant === "groupSearch" ||
                              config.variant === "search" ||
                              config.variant == "searchCreatable") &&
                              isPopoveropen
                              ? "opacity-0"
                              : "opacity-100",
                            isCreateMode && "opacity-0",
                            "text-sm max-w-[92%]",
                          )}
                        >
                          <div className="flex-1 overflow-hidden text-selectSecondaryForeground flex items-center h-full data-[highlighted]:!bg-transparent">
                            <TruncateTooltip
                              text={
                                selectedOption.label ||
                                selectedOption.value ||
                                "Select column"
                              }
                              className="text-[14px] text-selectOptionMappedSearch hover:!text-selectOptionMappedSearch truncate text-nowrap w-full text-start"
                            />
                          </div>
                        </span>
                      ) : (
                        <span
                          className={cn(
                            isPopoveropen || isCreateMode ? "opacity-0" : "",

                            "text-muted-foreground font-light tracking-[0] leading-[17px] text-sm",
                          )}
                        >
                          {config.placeholder}
                        </span>
                      )}
                      <span
                        className={cn(
                          isPopoveropen ? "" : "",
                          "p-0 m-0 w-2 pr-3",
                        )}
                      >
                        {config.isDisabled ? (
                          <DisableModeIcon />
                        ) : formConfig.viewMode === true ||
                          config.isReadOnly ||
                          isCreateMode ? (
                          <></>
                        ) : (
                          <SelectTirggerIcon />
                        )}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                {(config.variant == "creatable" ||
                  config.variant == "searchCreatable") &&
                  isCreateMode == true && (
                    <div
                      className={cn(
                        dataSide === "top" && "bottom-[0px]",
                        dataSide === "bottom" && "top-[0px]",
                        dataSide === "left" &&
                          "absolute left-[calc(var(--radix-popover-trigger-width)+5.5px)] min-w-full top-[-1px] ",
                        dataSide === "right" &&
                          "absolute right-[calc(var(--radix-popover-trigger-width)+4px)] top-[-1px]",
                        "absolute bg-transparent  rounded-sm z-50 min-w-full ",
                        "h-[35px]  flex items-center px-2 pl-[17px] ",
                      )}
                    >
                      <TruncateTooltipInput
                        ref={createOptionref}
                        value={createNewOption ?? ""}
                        onChange={(e) => {
                          setCreateNewOption(e.target.value);
                          onChange?.(e.target.value);
                        }}
                        onBlur={() => {
                          onBlur?.();
                        }}
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
                          "h-full max-h-[35px] pl-0 border-none truncate focus:truncate",
                          "flex w-[95%] rounded-md !bg-transparent  tracking-[0] font-medium text-sm  outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                        )}
                        onFocus={(e) => {
                          const length = e.target.value.length;
                          e.target.setSelectionRange(length, length);
                        }}
                      />

                      <div className="flex gap-2">
                        <TooltipButton
                          type="button"
                          label="Submit"
                          onClick={handleCreate}
                          icon={<Check />}
                          className="bg-[#79CA97] hover:bg-[#79CA97] h-6 w-h-6 rounded-full p-1"
                        />
                        <TooltipButton
                          type="button"
                          label="Cancel"
                          onClick={handleCancle}
                          icon={<X />}
                          className={cn(
                            "bg-[#E14343] hover:bg-[#E14343] h-6 w-6 rounded-full p-1",
                          )}
                        />
                      </div>
                    </div>
                  )}
                <div
                  className={cn(
                    "absolute bottom-[0.3px] !z-50 left-[0.3%]  flex items-center  max-w-[99.5%] h-0.5 bg-primary rounded-none transition-all duration-200 ease-out ",
                    isPopoveropen &&
                      (!config.isReadOnly || !formConfig.viewMode)
                      ? "w-full "
                      : "w-0",
                    isPopoveropen || isCreateMode ? "w-full " : "w-0",
                  )}
                />
              </div>
              <PopoverContent
                ref={popoverContentRef}
                className={cn(
                  dataSide === "right" && "relative left-[0px]  rounded-sm ",
                  dataSide === "left" && "relative right-[2px]  rounded-sm",
                  dataSide === "right" &&
                    config.variant == "group" &&
                    "relative left-[0px]",
                  dataSide === "left" &&
                    config.variant == "group" &&
                    "relative right-[0px]",

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
                    dataSide === "bottom" && "rounded-sm rounded-t-none ",
                    dataSide === "left" && "rounded-r-none  ",
                    dataSide === "right" && "rounded-l-none",
                    config.variant === "creatable" && "!pb-[2px]",
                    "px-[2px] pt-1 pb-1  border-none shadow-none ",
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
                      (config.variant === "group" ||
                        config.variant === "default" ||
                        config.variant == "creatable") &&
                        "hidden",
                    )}
                  >
                    {isTyping === false ? (
                      <div className="flex items-center w-full shadow-none border-none rounded-sm px-3 pl-[15px] tracking-[0] leading-[17px] text-sm h-[35px] ">
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
                            if (config.variant == "searchCreatable") {
                              setCreateNewOption(e.target.value);
                            }

                            setLoading(true);
                            handleSearchChange(e.target.value);
                            setSearchTerm(e.target.value);
                            setShowSearchTerm(e.target.value);
                          }}
                          onBlur={() => {
                            setIsTyping(true);
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
                            if (e.target.value == "") {
                              setShowSearchTerm("");
                            }
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

                {config.variant == "creatable" && (
                  <div className="p-[6px] pt-0 pb-1 ">
                    <div className="w-full px-[2px] pt-[1px] pb-[4px]  flex items-center">
                      <div className="flex items-center border-t w-full border-select-border-focused"></div>
                    </div>
                    <Button
                      onClick={() => {
                        setIsCreateMode(true);
                        setIsPopoveropen(false);
                      }}
                      className="group w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:font-medium h-[30px] px-[4px] justify-start bg-transparent rounded-sm pl-[8px] flex items-center hover:bg-accent hover:text-accent-foreground  cursor-pointer"
                    >
                      <span className="font-normal group-focus-visible:font-medium text-sm tracking-[0] leading-[100%] text-primary group-hover:font-medium ">
                        + Add New
                      </span>
                    </Button>
                  </div>
                )}
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
              id={`${config.fieldId}-error`}
              className="flex items-center gap-[3px]"
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

export default DefaultSelect;
