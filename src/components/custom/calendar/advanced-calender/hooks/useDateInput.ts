import {
  CalendarFieldConfig,
  DateFormatPart,
} from '@/types/components/calender'
import { monthNames } from '@/utils/calender/date-formates'
import { toZonedTime } from 'date-fns-tz'
import { useState } from 'react'

export interface useDateInputProps {
  config: CalendarFieldConfig
  parts: DateFormatPart[]
  refs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
  inputDay: number | null
  inputMonth: number | null
  inputYear: number | null
  monthName: string | null

  onChange: any
  buffers: React.MutableRefObject<{
    day: string
    month: string
    year: string
    monthName: string
  }>
  fieldName: string
  typedBuffer: React.MutableRefObject<string>
  error: string | undefined
  setInputDay: React.Dispatch<React.SetStateAction<number | null>>
  setInputMonth: React.Dispatch<React.SetStateAction<number | null>>
  setInputYear: React.Dispatch<React.SetStateAction<number | null>>
  setMonthName: React.Dispatch<React.SetStateAction<string | null>>
  setCount: React.Dispatch<React.SetStateAction<number>>
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  clamp: (
    num: number,
    min: number,
    max: number,
    state?: 'year' | undefined
  ) => number
  parseInputDate: (inputValue: string) => Date | null
}

export const useDateInput = ({
  parts,
  refs,
  setInputDay,
  setInputMonth,
  setInputYear,
  setMonthName,
  setCount,
  setErrors,
  buffers,
  fieldName,
  typedBuffer,
  error,
  config,
  onChange,
  clamp,
  setDate,
  inputDay,
  inputMonth,
  inputYear,
  monthName,
  parseInputDate,
}: useDateInputProps) => {
  const handleDateInput = (
    e: React.KeyboardEvent<HTMLDivElement>,
    min: number,
    max: number,
    state: 'day' | 'month' | 'year' | 'monthName',
    digits: number,
    MIN_YEAR?: number | undefined
  ) => {
    const key = e.key
    const buffer = buffers.current[state]
    const currentIndex = parts.findIndex(
      (p: { type: string }) => p.type === state
    )
    const timeZone = 'Asia/Kolkata'

    let fullDate = ''
    parts.forEach((p) => {
      if (p.type === 'separator') {
        fullDate += p.value
      } else if (p.type === 'day') {
        fullDate += inputDay ? String(inputDay).padStart(2, '0') : 'dd'
      } else if (p.type === 'month') {
        fullDate += inputMonth ? String(inputMonth).padStart(2, '0') : 'mm'
      } else if (p.type === 'year') {
        fullDate += inputYear ? String(inputYear).padStart(4, '0') : 'yyyy'
      } else if (p.type === 'monthName') {
        fullDate += monthName ? String(monthName) : 'Month'
      }
    })

    const parsedDate = parseInputDate(fullDate)
    console.log('parsedDate: ', parsedDate)

    const zonedDate = parsedDate ? toZonedTime(parsedDate, timeZone) : undefined

    if (/^[0-9]$/.test(key) && state !== 'monthName') {
      const newBuffer = buffer + key
      const num = parseInt(newBuffer, 10)

      // Only accept if within range OR if still typing partial number
      if (num >= min) {
        buffers.current[state] = ''
        if (state === 'day') setInputDay(clamp(num, min, max))
        if (state === 'month') setInputMonth(clamp(num, min, max))
        if (state === 'year') setInputYear(Math.min(max, Math.max(min, num)))

        buffers.current[state] = newBuffer
        setErrors?.((prev: any) => {
          const newErrors = { ...prev }
          delete newErrors[fieldName]
          return newErrors
        })
        // Auto-advance: if full length reached or can't type more valid digits
        if (newBuffer.length >= digits) {
          if (MIN_YEAR && num < MIN_YEAR && state === 'year') {
            setInputYear(MIN_YEAR)
          }
          let newIndex = currentIndex
          do {
            newIndex++
          } while (
            newIndex < parts.length &&
            parts[newIndex].type === 'separator'
          )
          if (newIndex >= 0 && newIndex < parts.length) {
            const nextType = parts[newIndex].type
            refs.current[nextType]?.focus()
          }
          buffers.current[state] = ''
        }
      } else {
        // Reset to just the latest digit if first digit invalid
        buffers.current[state] = key
        const singleNum = parseInt(key, 10)
        if (singleNum >= min && singleNum <= max) {
          buffers.current[state] = ''
          if (state === 'day') setInputDay(clamp(singleNum, min, max))
          if (state === 'month') setInputMonth(singleNum)
          if (state === 'year') setInputYear(singleNum)
        }
      }
      e.preventDefault()
      return
    }
    if (state === 'monthName' && key == 'Ctrl') {
      e.preventDefault()
    }
    if (
      state === 'monthName' &&
      ![
        'ArrowUp',
        'ArrowDown',
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Ctrl',
      ].includes(key)
    ) {
      if (/^[a-zA-Z]$/.test(key)) {
        // Add to buffer
        typedBuffer.current += key

        // Find match
        const matchIndex = monthNames.findIndex((m: string) =>
          m.toLowerCase().startsWith(typedBuffer.current.toLowerCase())
        )

        if (matchIndex !== -1) {
          if (error) {
            setErrors?.((prev: any) => {
              const newErrors = { ...prev }
              delete newErrors[fieldName]
              return newErrors
            })
          }
          setCount(matchIndex)
          setMonthName(monthNames[matchIndex])
        } else {
          const maxMonthLength = 9
          const displayInput =
            typedBuffer.current.length > maxMonthLength
              ? typedBuffer.current.slice(0, maxMonthLength) + '...'
              : typedBuffer.current

          const errorMessage = `Please check your spelling. "${displayInput}" isn't recognized as the start of a month name.`

          setErrors?.((prev: any) => ({
            ...prev,
            [fieldName]: errorMessage,
          }))
        }
      }
    }

    // Move to next field with / or -
    if (key === '/' || key === '-') {
      buffers.current[state] = ''
      e.preventDefault()
      return
    }
    // Increment/decrement
    if (key === 'ArrowUp') {
      if (state === 'day') {
        setInputDay((v) => clamp((v ?? 0) + 1, min, max))
      }
      if (state === 'month') setInputMonth((v) => clamp((v ?? 0) + 1, min, max))
      if (state === 'year' && MIN_YEAR)
        setInputYear((v) => clamp((v ?? MIN_YEAR) + 1, min, max, state))
      if (state === 'monthName') {
        setCount((c: number) => {
          const newIndex = (c + 1) % 12 // wrap forward
          console.log('newIndex: ', newIndex)
          setMonthName(monthNames[newIndex])
          return newIndex
        })
      }
      setErrors?.((prev: any) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
      e.preventDefault()
      !zonedDate ? onChange?.(undefined) : onChange?.(parsedDate)
      return
    }
    if (key === 'ArrowDown') {
      if (state === 'day')
        setInputDay((v: any) => clamp((v ?? min) - 1, min, max))
      if (state === 'month')
        setInputMonth((v: any) => clamp((v ?? min) - 1, min, max))
      if (state === 'year' && MIN_YEAR)
        setInputYear((v: any) => Math.max((v ?? MIN_YEAR) - 1, MIN_YEAR))
      if (state === 'monthName') {
        setCount((c: number) => {
          const newIndex = (c + 11) % 12
          setMonthName(monthNames[newIndex])
          return newIndex
        })
      }
      setErrors?.((prev: any) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
      e.preventDefault()
      !zonedDate ? onChange?.(undefined) : onChange?.(parsedDate)
      return
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      e.preventDefault()

      let newIndex = currentIndex
      if (key === 'ArrowLeft') {
        // find previous non-separator
        !zonedDate ? onChange?.(undefined) : onChange?.(parsedDate)

        do {
          newIndex--
        } while (newIndex >= 0 && parts[newIndex].type === 'separator')
      } else {
        // ArrowRight → find next non-separator
        !zonedDate ? onChange?.(undefined) : onChange?.(parsedDate)

        do {
          newIndex++
        } while (
          newIndex < parts.length &&
          parts[newIndex].type === 'separator'
        )
      }

      if (newIndex >= 0 && newIndex < parts.length) {
        const nextType = parts[newIndex].type
        refs.current[nextType]?.focus()
      }
    }

    // Home/End
    if (key === 'Home') {
      if (state === 'day') setInputDay(min)
      if (state === 'month') setInputMonth(min)
      if (state === 'year') setInputYear(min)
      e.preventDefault()
      return
    }
    if (key === 'End') {
      if (state === 'day') setInputDay(max)
      if (state === 'month') setInputMonth(max)
      if (state === 'year') setInputYear(max)
      e.preventDefault()
      return
    }
    // Backspace → reset to placeholder
    if (key === 'Backspace') {
      buffers.current[state] = ''
      if (state === 'day') setInputDay(null)
      if (state === 'month') setInputMonth(null)
      if (state === 'year') setInputYear(null)
      if (state === 'monthName') {
        typedBuffer.current = ''
        setMonthName(null)
      }
      onChange?.(undefined)
      setDate(undefined)
      config.value = undefined
      e.preventDefault()
      return
    }
  }

  return { handleDateInput }
}
