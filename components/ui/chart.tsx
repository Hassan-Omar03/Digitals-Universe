'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import type {
  NameType,
  ValueType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent'

import { cn } from '@/lib/utils'

/* ---------------------------------- */
/* Themes                              */
/* ---------------------------------- */

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

/* ---------------------------------- */
/* ✅ FIXED Chart Container            */
/* ---------------------------------- */

type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />

          {/* ✅ SAFE MOUNT — avoids Recharts JSX type conflict */}
          {React.createElement(
            RechartsPrimitive.ResponsiveContainer as unknown as React.ElementType,
            null,
            children
          )}
        </div>
      </ChartContext.Provider>
    )
  }
)

ChartContainer.displayName = 'ChartContainer'

/* ---------------------------------- */
/* Styles                              */
/* ---------------------------------- */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, item]) => item.theme || item.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            return `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join('\n')}
}`
          })
          .join('\n'),
      }}
    />
  )
}

/* ---------------------------------- */
/* Tooltip                             */
/* ---------------------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipPayload = Payload<ValueType, NameType>

type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string | number
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
  nameKey?: string
  labelKey?: string
  className?: string
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      nameKey,
    },
    ref
  ) => {
    const { config } = useChart()

    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {!hideLabel && label && (
          <div className="font-medium">{label}</div>
        )}

        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div key={index} className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">
                {itemConfig?.label || item.name}
              </span>
              <span className="font-mono">
                {item.value?.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
)

ChartTooltipContent.displayName = 'ChartTooltipContent'

/* ---------------------------------- */
/* Legend                              */
/* ---------------------------------- */

const ChartLegend = RechartsPrimitive.Legend

type LegendItem = {
  value?: string
  color?: string
  dataKey?: string
}

type ChartLegendContentProps = {
  payload?: LegendItem[]
  verticalAlign?: 'top' | 'bottom'
  hideIcon?: boolean
  nameKey?: string
  className?: string
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, hideIcon, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item, i) => {
        const key = `${nameKey || item.dataKey || 'value'}`
        const itemConfig = config[key]

        return (
          <div key={i} className="flex items-center gap-1.5">
            {!hideIcon && item.color && (
              <span
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})

ChartLegendContent.displayName = 'ChartLegendContent'

/* ---------------------------------- */
/* Helpers                             */
/* ---------------------------------- */

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (!payload) return undefined

  const resolvedKey =
    payload?.payload?.[key] ||
    payload?.[key] ||
    payload?.name ||
    key

  return config[resolvedKey as keyof typeof config]
}

/* ---------------------------------- */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
