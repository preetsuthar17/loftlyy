"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { IconChevronDown, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { type FilterState, getAvailableFilters } from "@/lib/filters"
import type { Brand } from "@/lib/types"

interface SidebarFiltersProps {
  brands: Brand[]
  filters: FilterState
  onToggle: (dimension: keyof FilterState, value: string) => void
  onClear: () => void
  hasActiveFilters: boolean
}

function renderColorValue(v: string) {
  return (
    <span className="flex items-center gap-1.5">
      <ColorDot family={v} />
      {v}
    </span>
  )
}

export function SidebarFilters({
  brands,
  filters,
  onToggle,
  onClear,
  hasActiveFilters,
}: SidebarFiltersProps) {
  const t = useTranslations("nav")
  const available = useMemo(() => getAvailableFilters(brands), [brands])

  return (
    <div className="flex flex-col gap-1">
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex min-h-[44px] items-center gap-1 self-start rounded-md px-1.5 py-0.5 text-[11px] text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300 sm:min-h-0"
        >
          <IconX className="h-3 w-3" />
          {t("clearFilters")}
        </button>
      )}

      <FilterSection
        label={t("industry")}
        values={available.industries}
        active={filters.industries}
        onToggle={(v) => onToggle("industries", v)}
      />
      <FilterSection
        label={t("styleTags")}
        values={available.tags}
        active={filters.tags}
        onToggle={(v) => onToggle("tags", v)}
      />
      <FilterSection
        label={t("colorFamily")}
        values={available.colorFamilies}
        active={filters.colorFamilies}
        onToggle={(v) => onToggle("colorFamilies", v)}
        renderValue={renderColorValue}
      />
      <FilterSection
        label={t("typographyStyle")}
        values={available.typographyStyles}
        active={filters.typographyStyles}
        onToggle={(v) => onToggle("typographyStyles", v)}
      />
    </div>
  )
}

function FilterSection({
  label,
  values,
  active,
  onToggle,
  renderValue,
}: {
  label: string
  values: string[]
  active: string[]
  onToggle: (value: string) => void
  renderValue?: (value: string) => React.ReactNode
}) {
  const [open, setOpen] = useState(active.length > 0)

  if (values.length === 0) return null

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex min-h-9 items-center justify-between rounded-md px-2 text-[11.5px] font-medium text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-ring dark:text-neutral-400 dark:hover:text-neutral-300"
      >
        <span>{label}</span>
        <IconChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-1 px-2">
            {values.map((v) => {
              const isActive = active.includes(v)
              return (
                <button
                  key={v}
                  onClick={() => onToggle(v)}
                  className={cn(
                    "min-h-[44px] rounded-md px-2 py-1.5 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0",
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  )}
                >
                  {renderValue ? renderValue(v) : v}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const colorFamilyMap: Record<string, string> = {
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  neutral: "#9CA3AF",
}

function ColorDot({ family }: { family: string }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]"
      style={{ backgroundColor: colorFamilyMap[family] ?? "#9CA3AF" }}
    />
  )
}
