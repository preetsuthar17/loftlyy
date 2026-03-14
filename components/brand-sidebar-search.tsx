"use client"

import { useState, useDeferredValue } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { IconSearch } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { filterBrands } from "@/lib/filters"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import { SidebarFilters } from "@/components/sidebar-filters"
import type { Brand } from "@/lib/types"

export function BrandSidebarSearch({
  brands,
  onNavigate,
}: {
  brands: Brand[]
  onNavigate?: () => void
}) {
  const [query, setQuery] = useState("")
  const pathname = usePathname()
  const t = useTranslations("nav")
  const { filters, hasActiveFilters, toggleFilter, clearFilters } =
    useBrandFilters()

  const deferredQuery = useDeferredValue(query)
  const filtered = filterBrands(brands, filters, deferredQuery)

  return (
    <div className="flex flex-1 flex-col gap-3">
      {/* Search */}
      <div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100/80 px-3 py-2 transition-shadow focus-within:ring-2 focus-within:ring-ring dark:bg-neutral-900">
          <IconSearch className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
          <input
            type="search"
            placeholder={`${t("search")}…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("search")}
            autoComplete="off"
            className="w-full bg-transparent text-[13px] text-neutral-700 placeholder:text-neutral-500 outline-none dark:text-neutral-300 dark:placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Filters */}
      <SidebarFilters
        brands={brands}
        filters={filters}
        onToggle={toggleFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Brand list */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div>
          <span className="text-[11px] font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            {t("allBrands")}
          </span>
        </div>

        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-px">
            {filtered.map((brand) => {
              const isActive = pathname.endsWith(`/${brand.slug}`)
              return (
                <Link
                  key={brand.slug}
                  href={`/${brand.slug}`}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-px rounded-lg px-2 py-1.5 transition-colors",
                    isActive
                      ? "bg-neutral-100/70 dark:bg-neutral-800/50"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  )}
                  style={{ contentVisibility: "auto", containIntrinsicSize: "auto 40px" }}
                >
                  <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[10px]">
                    <Image
                      src={brand.thumbnail.src}
                      alt={brand.name}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <span
                    className={cn(
                      "truncate text-[13.5px]",
                      isActive
                        ? "font-medium text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    {brand.name}
                  </span>
                </Link>
              )
            })}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <p className="text-[13px] text-neutral-500">
                  {t("noBrandsFound")}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    {t("clearFilters")}
                  </button>
                )}
              </div>
            )}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
