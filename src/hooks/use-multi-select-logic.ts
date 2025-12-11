'use client'
import {
  normalizeMultiSelectValues,
  normalizeOptions,
  toCapitalCase,
} from '@/lib/utils'
import { fetchDropDownData } from '@/services/FeatureRichSelect/mock-api-services'
import {
  FeatureRichSelectProps,
  GroupedOption,
  Option,
} from '@/types/components/select-config.types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

type UseMultiSelectLogicParams = Pick<
  FeatureRichSelectProps,
  'config' | 'value'
> & {
  containerRef: React.RefObject<HTMLDivElement | null>
  isPopoveropen: boolean
  value: Option
  setOptions: React.Dispatch<React.SetStateAction<any[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[] | null>>
}

export const useMultiSelectLogic = ({
  config,
  value,
  containerRef,
  isPopoveropen,
  setOptions,
  setIsLoading,
  setSelectedOptions,
}: UseMultiSelectLogicParams) => {
  const isFirstLoadRef = useRef(true)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 700)
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const recordLimit = 7
  const hasMore = page < Math.ceil(totalRecords / recordLimit)

  const fetchOptions = useCallback(
    async (
      searchQuery: string,
      pageNum: number,
      append?: boolean,
      value?: any
    ) => {
      if (config?.dataSource !== 'api') return

      try {
        if (isFirstLoadRef.current) setIsLoading(true)
        setLoading(true)
        const params: any = {
          search: searchQuery,
          page: pageNum,
          record_limit: recordLimit,
        }
        const queryString = new URLSearchParams(params).toString()
        const response = await fetchDropDownData(queryString)
        const newOptions = Array.isArray(response.options)
          ? normalizeOptions(response.options)
          : []
        if (append) {
          setOptions((prev) => {
            const existing = new Set(prev.map((o: any) => o.value))
            const unique = newOptions.filter(
              (opt: any) => !existing.has(opt.value)
            )
            return [...prev, ...unique]
          })
        } else {
          setOptions(newOptions)
          const normalized = normalizeMultiSelectValues(value) // 1 or many new values
          setOptions((prevOptions) => {
            const merged = [...normalized, ...prevOptions]

            const seen = new Set<string>()
            const deduped = merged.filter((item) => {
              const lower = item.value.toLowerCase()
              if (seen.has(lower)) return false
              seen.add(lower)
              return true
            })
            const ordered = [
              ...normalized,
              ...deduped.filter(
                (item) =>
                  !normalized.some(
                    (sel) =>
                      sel.value.toLowerCase() === item.value.toLowerCase()
                  )
              ),
            ]
            return ordered
          })
          setSelectedOptions(normalized)
        }
        if (pageNum === 1) {
          setTotalRecords(response.total_records)
        }
      } catch (err) {
        console.error('Dropdown fetch error:', err)
      } finally {
        setLoading(false)
        if (isFirstLoadRef.current) {
          setIsLoading(false)
          isFirstLoadRef.current = false
        }
      }
    },
    []
  )

  useEffect(() => {
    if (config?.dataSource === 'api') {
      setPage(1)
      fetchOptions(debouncedQuery, 1, false, value)
    }
  }, [debouncedQuery, fetchOptions, value])

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (
      !containerRef.current ||
      loading ||
      !hasMore ||
      config?.dataSource !== 'api'
    )
      return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50

    if (isNearBottom) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchOptions(debouncedQuery, nextPage, true)
    }
  }, [page, loading, hasMore, debouncedQuery, fetchOptions])

  // Attach scroll listener once dropdown is open and ref is available
  useEffect(() => {
    if (!isPopoveropen) return

    let observer: MutationObserver | null = null

    const attachScrollListener = () => {
      const el = containerRef.current
      if (el) {
        el.removeEventListener('scroll', handleScroll) // Clean before re-adding
        el.addEventListener('scroll', handleScroll)
        return true
      }
      return false
    }

    // Try attaching immediately if the ref is already available
    const isAttached = attachScrollListener()

    // If not available yet, observe the DOM
    if (!isAttached) {
      observer = new MutationObserver(() => {
        if (attachScrollListener() && observer) {
          observer.disconnect()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      if (observer) observer.disconnect()
      const el = containerRef.current
      if (el) {
        el.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isPopoveropen, handleScroll])

  const handleSearchChange = (val: string) => setQuery(val)
  return {
    handleSearchChange,
    loading,
    totalRecords,
    fetchOptions,
    debouncedQuery,
    query,
    hasMore,
    setLoading,
    setQuery,
    setPage,
    containerRef,
  }
}

export default useMultiSelectLogic
