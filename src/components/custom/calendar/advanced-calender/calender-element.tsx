import { CalendarElementProps } from '@/types/components/calender'
import { CalendarHeader } from './calendar-hearder'
import { CalendarMonthGrid } from './calendar-month-grid'
import { CalendarYearGrid } from './calendar-year-grid'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/modified-calendar'

export const CalendarElement: React.FC<CalendarElementProps> = ({
  view,
  month,
  date,
  timeZone,
  MIN_YEAR,
  MAX_YEAR,
  yearPage,
  YEARS_PER_PAGE,
  TOTAL_PAGES,
  weekStartsOn,
  setYearPage,
  getZonedNow,
  setMonth,
  setView,
  isMonthFullyDisabled,
  isYearFullyDisabled,
  isDateDisabled,
  handlePresetClick,
  handleDateSelect,
  presetOptions,
}) => {
  return (
    <div className="flex !w-fit relative shadow-[0px_2px_10px_0px_#E1E1E1] bg-background dark:shadow-none !border-none dark:bg-[#161616]">
      <div className="xs:w-[90px] xss:w-[100px] sm:w-[104px] 3xl:w-[127px] duration-1000 p-2 relative !z-50 dark:!shadow-[-2px_0px_10px_0px_#00000033_inset] !shadow-[inset_-2px_0px_10px_0px_#0000000A]">
        <div className="space-y-[10px] xs:space-y-[8px] pl-[9px] 3xl:pl-[8px] sm:space-y-[11px] sm:pt-[8px] sm:pl-[7px] 3xl:pt-[8px] relative z-0 3xl:space-y-[12px] pt-[22px] xs:pt-0 xs:pl-0">
          {presetOptions.map((preset) => {
            const dateValue = preset.getValue()
            const isDisabled = preset.disabled || isDateDisabled(dateValue)
            return (
              <div
                key={preset.label}
                tabIndex={isDisabled == true ? -1 : 0}
                className={cn(
                  'xs:text-[10px] xss:text-[11px] sm:text-[10px] text-nowrap focus-visible:!text-primary focus-visible:outline-none w-full select-none justify-start 3xl:text-[12px] inter font-normal',
                  isDisabled
                    ? 'text-[#979a9e] cursor-not-allowed'
                    : 'cursor-pointer !text-[#31363F] dark:!text-[#EFEFEF] hover:!text-primary dark:hover:!text-primary !hover:font-medium hover:translate-x-[0.3px] delay-200'
                )}
                onClick={() => {
                  if (!isDisabled) {
                    handlePresetClick(dateValue)
                  }
                }}
              >
                {preset.label}
              </div>
            )
          })}
        </div>
      </div>
      <div className="xs:w-[210px] xss:w-[260px] xs:h-[205px] sm:w-[227px] sm:h-[220px] 3xl:w-[287px] 3xl:h-[260px] h-[275px]">
        <CalendarHeader
          month={month}
          timeZone={timeZone}
          MIN_YEAR={MIN_YEAR}
          MAX_YEAR={MAX_YEAR}
          yearPage={yearPage}
          YEARS_PER_PAGE={YEARS_PER_PAGE}
          setMonth={setMonth}
          setView={setView}
          view={view}
          TOTAL_PAGES={TOTAL_PAGES}
          setYearPage={setYearPage}
        />

        {view === 'month' ? (
          <CalendarMonthGrid
            month={month}
            date={date}
            timeZone={timeZone}
            setMonth={setMonth}
            setView={setView}
            isMonthFullyDisabled={isMonthFullyDisabled}
            getZonedNow={getZonedNow}
          />
        ) : view === 'year' ? (
          <CalendarYearGrid
            month={month}
            date={date}
            timeZone={timeZone}
            MIN_YEAR={MIN_YEAR}
            MAX_YEAR={MAX_YEAR}
            yearPage={yearPage}
            YEARS_PER_PAGE={YEARS_PER_PAGE}
            getZonedNow={getZonedNow}
            setMonth={setMonth}
            setView={setView}
            isYearFullyDisabled={isYearFullyDisabled}
          />
        ) : (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              handleDateSelect(selectedDate)
            }}
            month={month}
            onMonthChange={setMonth}
            initialFocus
            disabled={isDateDisabled}
            className="w-[287px] op 3xl:w-[285px] xs:w-[210px] xss:w-[260px] sm:w-full"
            weekStartsOn={weekStartsOn}
            showOutsideDays={false}
          />
        )}
      </div>
    </div>
  )
}
