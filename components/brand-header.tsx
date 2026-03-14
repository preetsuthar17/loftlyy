import Image from "next/image"
import { useTranslations } from "next-intl"
import type { Brand } from "@/lib/types"

export function BrandHeader({ brand }: { brand: Brand }) {
  const t = useTranslations("brand")
  const tCat = useTranslations("categories")
  const tTag = useTranslations("tags")
  const tBrand = useTranslations("brands")

  function tr(ns: ReturnType<typeof useTranslations>, key: string, fallback: string) {
    try { return ns(key) } catch { return fallback }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_0_0_0.5px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)] dark:bg-neutral-800 dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)]">
          <Image
            src={brand.thumbnail.src}
            alt={`${brand.name} logo`}
            width={56}
            height={56}
            className="h-full w-full object-contain p-2.5"
            priority
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h1 className="text-xl font-semibold tracking-tight text-balance text-neutral-900 dark:text-neutral-100">
            {brand.name}
          </h1>
          <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
            {tr(tCat, brand.industry, brand.industry)}
          </span>
        </div>
      </div>

      <p className="max-w-2xl text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        {tr(tBrand, `${brand.slug}.description`, brand.description)}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-neutral-500 dark:text-neutral-400">
        {brand.tags?.map((tag, i) => (
          <span key={tag} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-neutral-400 dark:text-neutral-600">&middot;</span>}
            <span>{tr(tTag, tag, tag)}</span>
          </span>
        ))}
        {brand.url && (
          <>
            <span className="text-neutral-400 dark:text-neutral-600">&middot;</span>
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline decoration-neutral-400 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-300 dark:decoration-neutral-600"
            >
              {t("visitWebsite")} <span aria-hidden="true">&rsaquo;</span>
            </a>
          </>
        )}
      </div>
    </section>
  )
}
