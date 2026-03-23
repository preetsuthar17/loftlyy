"use client"

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Command } from "cmdk"
import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconX,
  IconTypography,
  IconCategory,
  IconTag,
  IconLanguage,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
} from "@tabler/icons-react"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { localeMetadata } from "@/i18n/locales"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn, searchParamsToQuery } from "@/lib/utils"
import {
  filterBrands,
  getAvailableFilters,
  normalizeHex,
  type FilterDimension,
  type FilterState,
} from "@/lib/filters"
import type { SidebarBrand } from "@/lib/types"

interface CommandMenuProps {
  brands: SidebarBrand[]
  filters: FilterState
  onToggleFilter: (dimension: FilterDimension, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
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

const WHITESPACE_RE = /\s+/g

function getSearchHeadingKey(
  query: string,
  brands: SidebarBrand[]
): "allBrands" | "colorResults" | "fontResults" | "keywordResults" {
  const tokens = query.trim().toLowerCase().split(WHITESPACE_RE).filter(Boolean)

  if (tokens.length === 0) return "allBrands"

  const hexTokens = tokens.filter((token) => normalizeHex(token))
  if (hexTokens.length === tokens.length) {
    return "colorResults"
  }

  if (hexTokens.length === 0) {
    const isFontSearch = tokens.every((token) =>
      brands.some((brand) =>
        brand.typography.some((font) => font.name.toLowerCase().includes(token))
      )
    )

    if (isFontSearch) {
      return "fontResults"
    }
  }

  return "keywordResults"
}

export function CommandMenu({
  brands,
  filters,
  onToggleFilter,
  onClearFilters,
  hasActiveFilters,
}: CommandMenuProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("nav")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = useLocale()
  const { theme, setTheme } = useTheme()
  const available = useMemo(() => getAvailableFilters(brands), [brands])
  const deferredQuery = useDeferredValue(query)
  const filteredBrands = useMemo(
    () => filterBrands(brands, { ...filters, query: deferredQuery }),
    [brands, filters, deferredQuery]
  )
  const resultHeading = useMemo(
    () => getSearchHeadingKey(query, brands),
    [query, brands]
  )

  const activeCount =
    filters.industries.length +
    filters.tags.length +
    filters.colorFamilies.length +
    filters.typographyStyles.length

  // Keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const navigateToBrand = useCallback(
    (slug: string) => {
      router.push(`/${slug}`)
      setOpen(false)
      setQuery("")
    },
    [router]
  )

  useEffect(() => {
    if (!open) return

    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 })
    })

    return () => cancelAnimationFrame(frame)
  }, [open, query, filteredBrands.length])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => {
          setQuery("")
          setOpen(true)
        }}
        className="flex w-full items-center gap-2 rounded-lg bg-neutral-100/80 px-3 py-2 text-[13px] text-neutral-500 transition-colors hover:text-neutral-700 dark:bg-neutral-900 dark:hover:text-neutral-300"
      >
        <IconSearch className="size-3.5" aria-hidden="true" />
        <span className="flex-1 truncate text-left">{t("search")}</span>
        <kbd className="hidden rounded bg-neutral-200/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-neutral-400 sm:inline-block dark:bg-neutral-800">
          ⌘K
        </kbd>
      </button>

      {/* Filter button */}
      <button
        onClick={() => {
          setQuery("")
          setOpen(true)
        }}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors",
          hasActiveFilters
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100/80 text-neutral-500 hover:text-neutral-700 dark:bg-neutral-900 dark:hover:text-neutral-300"
        )}
      >
        <IconAdjustmentsHorizontal className="size-3.5" />
        <span>{t("filters")}</span>
        {activeCount > 0 && (
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded-full text-[10px] font-semibold",
              hasActiveFilters
                ? "bg-white/20 dark:bg-black/20"
                : "bg-neutral-200 dark:bg-neutral-800"
            )}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Command dialog */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 animate-in bg-black/10 backdrop-blur-xs duration-150 fade-in-0"
            onClick={() => {
              setOpen(false)
              setQuery("")
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false)
                setQuery("")
              }
            }}
          />

          {/* Panel */}
          <div
            className="fixed top-[20%] left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 animate-in overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl duration-150 fade-in-0 zoom-in-95 slide-in-from-top-2 dark:border-neutral-800 dark:bg-neutral-950"
            role="dialog"
            aria-label="Search brands and filters"
          >
            <Command
              shouldFilter={false}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false)
              }}
            >
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder={t("searchPlaceholder")}
                autoFocus
                className="w-full border-b border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:border-neutral-800 dark:text-neutral-100"
              />
              <Command.List
                ref={listRef}
                className="max-h-[360px] overflow-y-auto p-2"
              >
                {filteredBrands.length === 0 && (
                  <div className="py-6 text-center text-sm text-neutral-400">
                    {t("noBrandsFound")}
                  </div>
                )}

                {/* Brands */}
                {filteredBrands.length > 0 && (
                  <Command.Group
                    heading={t(resultHeading)}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                  >
                    {filteredBrands.map((brand) => (
                      <Command.Item
                        key={brand.slug}
                        value={brand.slug}
                        onSelect={() => navigateToBrand(brand.slug)}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
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
                            className="size-full object-contain p-0.5"
                          />
                        </div>
                        <span className="font-medium">{brand.name}</span>
                        <span className="ml-auto text-[11px] text-neutral-400">
                          {brand.industry}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Industry filters */}
                {available.industries.length > 0 && (
                  <Command.Group
                    heading={t("industry")}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                  >
                    {available.industries.map((v) => {
                      const isActive = filters.industries.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`industry ${v}`}
                          onSelect={() => onToggleFilter("industries", v)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                        >
                          <IconCategory className="size-4 text-neutral-400" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Style filters */}
                {available.tags.length > 0 && (
                  <Command.Group
                    heading={t("styleTags")}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                  >
                    {available.tags.map((v) => {
                      const isActive = filters.tags.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`style ${v}`}
                          onSelect={() => onToggleFilter("tags", v)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                        >
                          <IconTag className="size-4 text-neutral-400" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Color filters */}
                {available.colorFamilies.length > 0 && (
                  <Command.Group
                    heading={t("colorFamily")}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                  >
                    {available.colorFamilies.map((v) => {
                      const isActive = filters.colorFamilies.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`color ${v}`}
                          onSelect={() => onToggleFilter("colorFamilies", v)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                        >
                          <span
                            className="size-4 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                            style={{
                              backgroundColor: colorFamilyMap[v] ?? "#9CA3AF",
                            }}
                          />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Typography filters */}
                {available.typographyStyles.length > 0 && (
                  <Command.Group
                    heading={t("typographyStyle")}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                  >
                    {available.typographyStyles.map((v) => {
                      const isActive = filters.typographyStyles.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`typography ${v}`}
                          onSelect={() => onToggleFilter("typographyStyles", v)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                        >
                          <IconTypography className="size-4 text-neutral-400" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Language */}
                <Command.Group
                  heading={t("language")}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                >
                  {routing.locales.map((loc) => {
                    const isActive = loc === currentLocale
                    return (
                      <Command.Item
                        key={loc}
                        value={`language ${localeMetadata[loc].displayName} ${localeMetadata[loc].nativeName} ${loc}`}
                        onSelect={() => {
                          router.replace(
                            {
                              pathname,
                              query: searchParamsToQuery(searchParams),
                            },
                            {
                              locale: loc,
                            }
                          )
                          setOpen(false)
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                      >
                        <IconLanguage className="size-4 text-neutral-400" />
                        <span>{localeMetadata[loc].nativeName}</span>
                        <span className="text-[11px] text-neutral-400 uppercase">
                          {loc}
                        </span>
                        {isActive && (
                          <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                        )}
                      </Command.Item>
                    )
                  })}
                </Command.Group>

                {/* Theme */}
                <Command.Group
                  heading={t("theme")}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase"
                >
                  {(
                    [
                      { value: "light", icon: IconSun },
                      { value: "dark", icon: IconMoon },
                      { value: "system", icon: IconDeviceDesktop },
                    ] as const
                  ).map(({ value, icon: Icon }) => (
                    <Command.Item
                      key={value}
                      value={`theme ${value}`}
                      onSelect={() => {
                        setTheme(value)
                        setOpen(false)
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 data-[selected=true]:bg-neutral-100 dark:text-neutral-400 dark:data-[selected=true]:bg-neutral-800/50"
                    >
                      <Icon className="size-4 text-neutral-400" />
                      <span className="capitalize">{value}</span>
                      {theme === value && (
                        <span className="ml-auto size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <Command.Group>
                    <Command.Item
                      value="clear all filters"
                      onSelect={() => {
                        onClearFilters()
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-red-500 data-[selected=true]:bg-red-50 dark:data-[selected=true]:bg-red-950/20"
                    >
                      <IconX className="size-4" />
                      <span>{t("clearFilters")}</span>
                    </Command.Item>
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
