import { useLayout } from '@/context/layout-context'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const Stepper = ({
  steps,
  currentStep,
  onStepChange,
}: {
  steps?: { id: number; key: string; label: string }[]
  currentStep?: number
  onStepChange?: (id: number) => void
}) => {
  const { formData } = useLayout()
  const [internalStep, setInternalStep] = useState(currentStep ?? 1)

  const activeStep = currentStep ?? internalStep
  const handleStepClick = (id: number) => {
    setInternalStep(id)
    onStepChange?.(id)
  }

  const stepList = steps || formData.form.stepper?.steps
  return (
    <div className="flex items-center ml-[7px]">
      {stepList?.map((step: any, index) => {
        const isActive = activeStep === index
        const isFirst = index === 0
        const isLast = index === stepList.length - 1

        // Define clip-paths for each position
        const clipPath = isFirst
          ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
          : isLast
            ? 'polygon(0 0, calc(100% - 12px) 0, 110% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)'
            : 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)'
        return (
          <button
            key={step.id}
            type="button"
            className={cn(
              'h-[27px] text-[13px] flex items-center pl-8 w-[220px] rounded-r-full cursor-pointer transition-colors',
              isActive
                ? 'bg-[#D3E3FF] text-primary font-semibold ml-[-6px]'
                : 'bg-[#E2EBF5] text-[#42526E] font-medium ml-[-6px]'
            )}
            style={{
              clipPath,
            }}
            onClick={() => handleStepClick(index)}
          >
            {step.label}
          </button>
        )
      })}
    </div>
  )
}
export default Stepper
