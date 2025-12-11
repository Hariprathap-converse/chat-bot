'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Palette, RotateCcw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const colorThemes = [
  { hex: 'df3b3b', color: 'red' },
  { hex: 'e4335a', color: 'rose' },
  { hex: 'f9802d', color: 'orange' },
  { hex: '2dac5c', color: 'green' },
  { hex: 'ffc519', color: 'yellow' },
  { hex: '884dee', color: 'violet' },
]

const ThemeSwitcherForMobile = () => {
  const [baseTheme, setBaseTheme] = useState<'light' | 'dark'>()
  const [colorTheme, setColorTheme] = useState<string>('')

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
  //   const savedColor = localStorage.getItem('colorTheme')

  //   if (savedTheme) setBaseTheme(savedTheme)
  //   if (savedColor) setColorTheme(savedColor)
  // }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const savedColor = localStorage.getItem('colorTheme')

    if (savedTheme) {
      setBaseTheme(savedTheme)
    } else {
      // detect system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setBaseTheme(prefersDark ? 'dark' : 'light')
    }

    if (savedColor) setColorTheme(savedColor)
  }, [])

  useEffect(() => {
    if (baseTheme) localStorage.setItem('theme', baseTheme)
  }, [baseTheme])

  useEffect(() => {
    if (colorTheme) {
      localStorage.setItem('colorTheme', colorTheme)
    } else {
      localStorage.removeItem('colorTheme')
    }
  }, [colorTheme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(
      ...colorThemes.flatMap((color) => [color.color, `${color.color}-dark`])
    )

    if (baseTheme === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }

    if (colorTheme) {
      const themeClass =
        baseTheme === 'dark' ? `${colorTheme}-dark` : colorTheme
      root.classList.add(themeClass)
    }
  }, [baseTheme, colorTheme])

  const withViewTransition = (callback: () => void) => {
    if ('startViewTransition' in document) {
      ;(document as any).startViewTransition(callback)
    } else {
      callback()
    }
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-full justify-between hover:bg-transparent"
          >
            <span>Theme</span>
            <Palette className="h-5 w-5" />
            <span className="sr-only">Open theme switcher</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          align="start"
          className="shadow-[2px_4px_10px_0px_#00000026] md:w-64 ml-3 xs:ml-[25px] sm:ml-[33px] p-4 space-y-4 rounded-xl border-none  backdrop-blur bg-background/80"
        >
          <div>
            <DropdownMenuLabel className="text-xs text-gray-500 mb-2">
              Base Theme
            </DropdownMenuLabel>
            <div className="flex items-center gap-2 ml-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="Light Mode"
                    onClick={() =>
                      withViewTransition(() => setBaseTheme('light'))
                    }
                    variant={baseTheme === 'light' ? 'default' : 'outline'}
                    size="icon"
                    className="rounded-full h-8 w-8 transition-colors"
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Light Mode</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="Dark Mode"
                    onClick={() =>
                      withViewTransition(() => setBaseTheme('dark'))
                    }
                    variant={baseTheme === 'dark' ? 'default' : 'outline'}
                    size="icon"
                    className="rounded-full h-8 w-8 transition-colors"
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Dark Mode</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <DropdownMenuSeparator />

          <div>
            <DropdownMenuLabel className="text-xs text-gray-500 mb-2">
              Accent Color
            </DropdownMenuLabel>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-2 ml-2">
              {colorThemes.map((color) => (
                <Button
                  key={color.color}
                  aria-label={`${color.color} color`}
                  onClick={() =>
                    withViewTransition(() =>
                      setColorTheme((prev) =>
                        prev === color.color ? '' : color.color
                      )
                    )
                  }
                  variant={colorTheme === color.color ? 'default' : 'outline'}
                  size="icon"
                  className="rounded-full h-6 w-6 p-0 border-2 transition-all hover:scale-105"
                >
                  <span
                    className="rounded-full h-3 w-3"
                    style={{ backgroundColor: `#${color.hex}` }}
                  />
                </Button>
              ))}
            </div>

            {colorTheme && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-xs text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
                onClick={() => withViewTransition(() => setColorTheme(''))}
              >
                <RotateCcw className="h-3 w-3" />
                Reset Accent Color
              </Button>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export default ThemeSwitcherForMobile
