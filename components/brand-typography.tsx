"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import type { BrandTypography as BrandTypographyType } from "@/lib/types"

const WHITESPACE_RE = /\s+/g

function fontFamilyName(name: string) {
  return `brand-${name.replace(WHITESPACE_RE, "-").toLowerCase()}`
}

function useFontLoader(font: BrandTypographyType) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!font.fontUrl) return
    const familyName = fontFamilyName(font.name)
    const face = new FontFace(familyName, `url(${font.fontUrl})`)
    face
      .load()
      .then((f) => {
        document.fonts.add(f)
        setLoaded(true)
      })
      .catch(() => {})
  }, [font.fontUrl, font.name])

  return loaded
    ? `"${fontFamilyName(font.name)}"`
    : undefined
}

export function BrandTypography({
  typography,
}: {
  typography: BrandTypographyType[]
}) {
  const t = useTranslations("brand")

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[13px] font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        {t("typography")}
      </h2>
      <div className="flex flex-col gap-0 divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {typography.map((font) => (
          <TypeSpecimen key={font.name} font={font} />
        ))}
      </div>
    </section>
  )
}

function TypeSpecimen({ font }: { font: BrandTypographyType }) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("brand")
  const fontFamily = useFontLoader(font)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  async function copyName() {
    await navigator.clipboard.writeText(font.name)
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group flex flex-col gap-4 py-6 first:pt-0 last:pb-0">
      {/* Header row */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200">
            {font.name}
          </h3>
          {font.category && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              {font.category}
            </span>
          )}
          <button
            onClick={copyName}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded text-neutral-400 transition-colors hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-ring dark:text-neutral-500 dark:hover:text-neutral-300"
            aria-label={t("copyFontName")}
          >
            {copied ? (
              <IconCheck className="h-3 w-3" />
            ) : (
              <IconCopy className="h-3 w-3" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{font.role}</span>
          {font.designer && (
            <>
              <span className="text-neutral-400 dark:text-neutral-600">&middot;</span>
              <span>{font.designer}</span>
            </>
          )}
          {font.foundry && (
            <>
              <span className="text-neutral-400 dark:text-neutral-600">&middot;</span>
              <span>{font.foundry}</span>
            </>
          )}
        </div>
      </div>

      {/* Type scale specimen */}
      <div className="flex flex-col gap-1" style={fontFamily ? { fontFamily } : undefined}>
        <p className="text-[36px] leading-[1.1] tracking-tight text-neutral-800 dark:text-neutral-200">
          The quick brown fox jumps
        </p>
        <p className="text-[20px] leading-snug text-neutral-600 dark:text-neutral-400">
          over the lazy dog. 0123456789
        </p>
        <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz !@#$%&amp;*()
        </p>
      </div>

      {/* Weight chips */}
      {font.weights && (
        <div className="flex flex-wrap gap-1.5">
          {font.weights.map((w) => (
            <span
              key={w}
              className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
