'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50  rounded-sm bg-tooltip px-3 py-1.5 text-[13px]  font-medium  text-center text-tooltipForeground  fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
        className
      )}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-90 relative bottom-[3px]"
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
        >
          <path
            className="fill-tooltip"
            d="M1.43574 8.65444C0.267414 7.86087 0.267413 6.13913 1.43574 5.34556L8.62624 0.461512C9.95413 -0.440435 11.75 0.510714 11.75 2.11595V11.884C11.75 13.4893 9.95413 14.4404 8.62624 13.5385L1.43574 8.65444Z"
          />
        </svg>
      </TooltipPrimitive.Arrow>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))

TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
