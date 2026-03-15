"use client"

import { useDeferredValue, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { filterBrands } from "@/lib/filters"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import { CommandMenu } from "@/components/command-menu"
import type { Brand } from "@/lib/types"

export function BrandSidebarSearch({
  brands,
  onNavigate,
}: {
  brands: Brand[]
  onNavigate?: () => void
}) {
  const [query] = useState("")
  const pathname = usePathname()
  const t = useTranslations("nav")
  const { filters, hasActiveFilters, toggleFilter, clearFilters } =
    useBrandFilters()

  const deferredQuery = useDeferredValue(query)
  const filtered = filterBrands(brands, filters, deferredQuery)

  return (
    <div className="flex flex-1 flex-col gap-3 px-5 lg:px-0">
      {/* Command menu trigger + filters */}
      <div className="flex flex-col gap-2">
        <CommandMenu
          brands={brands}
          filters={filters}
          onToggleFilter={toggleFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

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
                    "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors",
                    isActive
                      ? "bg-neutral-100/70 dark:bg-neutral-800/50"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  )}
                  style={{
                    contentVisibility: "auto",
                    containIntrinsicSize: "auto 40px",
                  }}
                >
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[10px]",
                      /black|dark|slate|navy/i.test(brand.thumbnail.label)
                        ? "dark:bg-neutral-200"
                        : /ivory|white|light/i.test(brand.thumbnail.label)
                          ? "bg-neutral-800"
                          : ""
                    )}
                  >
                    <Image
                      src={brand.thumbnail.src}
                      alt={brand.name}
                      width={36}
                      height={36}
                      className={cn(
                        "h-full w-full object-contain",
                        brand.thumbnail.width / brand.thumbnail.height < 0.85
                          ? "p-0.5"
                          : brand.thumbnail.width / brand.thumbnail.height > 1.1
                            ? "p-1.5"
                            : "p-1"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "truncate text-sm font-medium",
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
