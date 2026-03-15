import { useTranslations } from "next-intl"
import type { Brand } from "@/lib/types"

export function BrandStory({ brand }: { brand: Brand }) {
  const t = useTranslations("brand")
  const tBrand = useTranslations("brands")

  function tr(key: string, fallback: string) {
    try {
      return tBrand(key)
    } catch {
      return fallback
    }
  }

  const hasStory =
    brand.founded ||
    brand.headquarters ||
    brand.designer ||
    brand.lastRebranded ||
    brand.philosophy

  if (!hasStory) return null

  const meta = [
    brand.founded && { label: t("founded"), value: String(brand.founded) },
    brand.headquarters && {
      label: t("headquarters"),
      value: brand.headquarters,
    },
    brand.designer && { label: t("identityDesigner"), value: brand.designer },
    brand.lastRebranded && {
      label: t("lastRebranded"),
      value: brand.lastRebranded,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-3">
      <h2 className="text-[13px] font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        {t("brandStory")}
      </h2>

      {meta.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {item.label}
              </span>
              <span className="text-[13.5px] font-medium text-neutral-700 dark:text-neutral-300">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {brand.philosophy && (
        <p className="max-w-2xl text-[13.5px] leading-relaxed text-neutral-500 italic dark:text-neutral-400">
          &ldquo;{tr(`${brand.slug}.philosophy`, brand.philosophy)}&rdquo;
        </p>
      )}
    </section>
  )
}
