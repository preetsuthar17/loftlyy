"use client"

import {
  useDeferredValue,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { filterBrands } from "@/lib/filters"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import { CommandMenu } from "@/components/command-menu"
import type { Brand } from "@/lib/types"

function getVerticalMask(canScrollUp: boolean, canScrollDown: boolean) {
  if (canScrollUp && canScrollDown) {
    return "linear-gradient(to bottom, transparent, black 32px, black calc(100% - 32px), transparent)"
  }
  if (canScrollUp) {
    return "linear-gradient(to bottom, transparent, black 32px)"
  }
  if (canScrollDown) {
    return "linear-gradient(to bottom, black calc(100% - 32px), transparent)"
  }
  return undefined
}

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollUp(el.scrollTop > 2)
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 2)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState])

  const maskStyle = useMemo(() => {
    const mask = getVerticalMask(canScrollUp, canScrollDown)
    return mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined
  }, [canScrollUp, canScrollDown])

  const deferredQuery = useDeferredValue(query)
  const filtered = filterBrands(brands, filters, deferredQuery)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 px-5 lg:px-0">
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
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div>
          <span className="text-[11px] font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            {t("allBrands")}
          </span>
        </div>

        <div className="min-h-0 flex-1" style={maskStyle}>
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
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
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-contain",
                          brand.thumbnail.width / brand.thumbnail.height < 0.85
                            ? "p-0.5"
                            : brand.thumbnail.width / brand.thumbnail.height >
                                1.1
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
          </div>
        </div>
      </div>
    </div>
  )
}
