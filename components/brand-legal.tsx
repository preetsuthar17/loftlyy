"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { IconScale, IconChevronRight, IconExternalLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { Brand } from "@/lib/types"

export function BrandLegal({ brand }: { brand: Brand }) {
  const [expanded, setExpanded] = useState(false)
  const t = useTranslations("brand")

  return (
    <footer className="flex flex-col gap-0 border-t border-neutral-100 pt-6 dark:border-neutral-800/50">
      {/* Compact attribution line */}
      <div className="flex items-center gap-2 text-[11.5px] text-neutral-500 dark:text-neutral-400">
        <IconScale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <p>
          {t("legalNotice", { brandName: brand.name })}
        </p>
      </div>

      {/* Action row */}
      <div className="mt-2 flex items-center gap-4">
        {brand.legal?.guidelinesUrl && (
          <a
            href={brand.legal.guidelinesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-[11px] text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-ring dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t("viewGuidelines")}
            <IconExternalLink className="h-3 w-3" />
          </a>
        )}

        {brand.legal && (brand.legal.dos || brand.legal.donts) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex min-h-11 items-center gap-1 text-[11px] text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-ring dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t("brandGuidelines")}
            <IconChevronRight
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                expanded && "rotate-90"
              )}
            />
          </button>
        )}
      </div>

      {/* Expandable guidelines */}
      {brand.legal && (brand.legal.dos || brand.legal.donts) && (
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-4 flex flex-col gap-4 rounded-xl bg-neutral-50 px-5 py-4 dark:bg-neutral-900/50">
              {brand.legal.donts && brand.legal.donts.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10.5px] font-medium tracking-wide text-red-600 uppercase dark:text-red-400/80">
                    {t("donts")}
                  </span>
                  <ul className="flex flex-col gap-1">
                    {brand.legal.donts.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[11.5px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {brand.legal.dos && brand.legal.dos.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10.5px] font-medium tracking-wide text-green-700 uppercase dark:text-green-400/80">
                    {t("dos")}
                  </span>
                  <ul className="flex flex-col gap-1">
                    {brand.legal.dos.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[11.5px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
