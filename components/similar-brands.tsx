"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { SimilarBrandCard } from "@/lib/types"

function getMaskImage(canScrollLeft: boolean, canScrollRight: boolean) {
  if (canScrollLeft && canScrollRight) {
    return "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)"
  }
  if (canScrollLeft) {
    return "linear-gradient(to right, transparent, black 48px)"
  }
  if (canScrollRight) {
    return "linear-gradient(to right, black calc(100% - 48px), transparent)"
  }
  return undefined
}

export function SimilarBrands({
  brands,
}: {
  brands: SimilarBrandCard[]
}) {
  const t = useTranslations("brand")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const maskStyle = useMemo(() => {
    const mask = getMaskImage(canScrollLeft, canScrollRight)
    return mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined
  }, [canScrollLeft, canScrollRight])

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
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

  if (brands.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[13px] font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        {t("similarBrands")}
      </h2>

      <div
        className="-mx-8"
        style={maskStyle}
      >
        <div
          ref={scrollRef}
          role="region"
          aria-label={t("similarBrands")}
          tabIndex={0}
          className="flex gap-3 overflow-x-auto px-8 pb-2 scrollbar-none focus-visible:outline-2 focus-visible:outline-ring"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${brand.slug}`}
              className="flex w-[200px] shrink-0 flex-col gap-2.5 rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <div className="flex h-12 items-center justify-center">
                <Image
                  src={brand.thumbnail.src}
                  alt={brand.name}
                  width={48}
                  height={48}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
                  {brand.name}
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {brand.industry}
                </span>
                <div className="flex gap-1">
                  {brand.colors.map((c) => (
                    <div
                      key={c.hex}
                      className="h-3 w-3 rounded-full shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)]"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
