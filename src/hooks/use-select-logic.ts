import { normalizeOptions, toCapitalCase } from "@/lib/utils";
import { fetchDropDownData } from "@/services/FeatureRichSelect/mock-api-services";
import {
  FeatureRichSelectProps,
  GroupedOption,
  Option,
} from "@/types/components/select-config.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

type UseSelectLogicParams = Pick<FeatureRichSelectProps, "config" | "value"> & {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isPopoveropen: boolean;
  value: any;
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>;
};

export const useSelectLogic = ({
  config,
  value,
  containerRef,
  isPopoveropen,
  setOptions,
  setIsLoading,
  setSelectedOption,
}: UseSelectLogicParams) => {
  const isFirstLoadRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 700);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [defaultValue, setDefaultValue] = useState(value);

  const recordLimit = 7;
  const hasMore = page < Math.ceil(totalRecords / recordLimit);

  const fetchOptions = useCallback(
    async (
      searchQuery: string,
      pageNum: number,
      append?: boolean,
      value?: any
    ) => {
      if (config?.dataSource !== "api") return;
      try {
        if (isFirstLoadRef.current) setIsLoading(true);
        setLoading(true);
        const params: any = {
          search: searchQuery,
          page: pageNum,
          record_limit: recordLimit,
        };
        const queryString = new URLSearchParams(params).toString();
        const response = await fetchDropDownData(queryString);
        const newOptions = Array.isArray(response.options)
          ? normalizeOptions(response.options)
          : [];
        const isGrouped =
          Array.isArray(newOptions) &&
          newOptions.length > 0 &&
          newOptions[0] &&
          "group" in newOptions[0] &&
          "items" in newOptions[0] &&
          Array.isArray((newOptions[0] as GroupedOption).items);

        if (append) {
          setOptions((prev) => {
            if (isGrouped) {
              const mergedGroups: any[] = [...prev];
              newOptions.forEach((newGroup: any) => {
                const existingGroup = mergedGroups.find(
                  (g) => g.group === newGroup.group
                );
                if (existingGroup) {
                  const existingValues = new Set(
                    existingGroup.items.map((item: any) => item.value)
                  );
                  const uniqueItems = newGroup.items.filter(
                    (item: any) => !existingValues.has(item.value)
                  );
                  existingGroup.items.push(...uniqueItems);
                } else {
                  mergedGroups.push({ ...newGroup });
                }
              });

              return mergedGroups;
            } else {
              const existing = new Set(prev.map((o: any) => o.value));
              const unique = newOptions.filter(
                (opt: any) => !existing.has(opt.value)
              );
              return [...prev, ...unique];
            }
          });
        } else {
          setOptions(newOptions);
          const normalized = normalizeOptions([value]);
          setOptions((prevOptions) => {
            const isGrouped =
              Array.isArray(prevOptions) &&
              prevOptions.length > 0 &&
              prevOptions[0] &&
              "group" in prevOptions[0] &&
              "items" in prevOptions[0] &&
              Array.isArray((prevOptions[0] as GroupedOption).items);

            if (isGrouped) {
              const groupName = "Defalut value";
              const existingGroup = prevOptions.find(
                (g: any) => g.group === groupName
              );

              if (existingGroup) {
                const alreadyExists = (
                  existingGroup as GroupedOption
                ).items.some(
                  (item: any) => item.value.toLowerCase() === normalized
                );
                if (!alreadyExists) {
                  (existingGroup as GroupedOption).items.push(
                    ...(normalized[0] as GroupedOption).items
                  );
                }
                return [...prevOptions];
              } else {
                const optionsOnly = normalized.filter(
                  (item): item is Option => "value" in item
                );
                const newGroup: GroupedOption = {
                  id: crypto.randomUUID(),
                  group: groupName,
                  items: optionsOnly,
                };
                return [newGroup, ...prevOptions];
              }
            } else {
              const alreadyExists = prevOptions.some(
                (item: any) =>
                  item &&
                  typeof item.value === "string" &&
                  typeof value?.value === "string" &&
                  item.value.toLowerCase() === value.value.toLowerCase()
              );

              if (!alreadyExists) {
                return [...normalized, ...prevOptions];
              }
              return prevOptions;
            }
          });
          if (
            value &&
            typeof value === "object" &&
            typeof value.value === "string"
          ) {
            const capitalizedOption = {
              ...value,
              value: toCapitalCase(value.value),
            };
            setSelectedOption(capitalizedOption);
          }
        }
        if (pageNum === 1) {
          setTotalRecords(response.total_records);
        }
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      } finally {
        setLoading(false);
        if (isFirstLoadRef.current) {
          setIsLoading(false);
          isFirstLoadRef.current = false;
        }
      }
    },
    []
  );

  useEffect(() => {
    if (config?.dataSource === "api") {
      setPage(1);
      fetchOptions(debouncedQuery, 1, false, value);
    }
  }, [debouncedQuery, fetchOptions, value]);

  const handleScroll = useCallback(() => {
    if (
      !containerRef.current ||
      loading ||
      !hasMore ||
      config?.dataSource !== "api"
    )
      return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (isNearBottom) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOptions(debouncedQuery, nextPage, true);
    }
  }, [page, loading, hasMore, debouncedQuery, fetchOptions]);

  useEffect(() => {
    if (!isPopoveropen) return;

    let observer: MutationObserver | null = null;

    const attachScrollListener = () => {
      const el = containerRef.current;
      if (el) {
        el.removeEventListener("scroll", handleScroll);
        el.addEventListener("scroll", handleScroll);
        return true;
      }
      return false;
    };

    const isAttached = attachScrollListener();

    if (!isAttached) {
      observer = new MutationObserver(() => {
        if (attachScrollListener() && observer) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (observer) observer.disconnect();
      const el = containerRef.current;
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isPopoveropen, handleScroll]);

  const handleSearchChange = (val: string) => setQuery(val);
  return {
    handleSearchChange,
    loading,
    totalRecords,
    fetchOptions,
    debouncedQuery,
    query,
    defaultValue,
    hasMore,
    setLoading,
    setQuery,
    setPage,
    containerRef,
  };
};

export default useSelectLogic;
