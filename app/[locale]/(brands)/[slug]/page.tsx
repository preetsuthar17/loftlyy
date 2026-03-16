import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllBrands, getBrandBySlug } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { BrandHeader } from "@/components/brand-header"
import { BrandColors } from "@/components/brand-colors"
import { BrandTypography } from "@/components/brand-typography"
import {
  BrandStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
} from "@/components/structured-data"
import { BrandStory } from "@/components/brand-story"
import { getSimilarBrandCards, getBrandColorFamilies } from "@/lib/filters"
import type { Brand } from "@/lib/types"
import { BrowseBySection } from "@/components/browse-by-section"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

const BrandAssets = dynamic(() =>
  import("@/components/brand-assets").then((m) => ({ default: m.BrandAssets }))
)
const SimilarBrands = dynamic(() =>
  import("@/components/similar-brands").then((m) => ({
    default: m.SimilarBrands,
  }))
)
const BrandLegal = dynamic(() =>
  import("@/components/brand-legal").then((m) => ({ default: m.BrandLegal }))
)

export async function generateStaticParams() {
  const brands = getAllBrands()
  return routing.locales.flatMap((locale) =>
    brands.map((brand) => ({ locale, slug: brand.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) return {}

  const t = await getTranslations({ locale, namespace: "seo" })

  const title = t("brandTitle", { brandName: brand.name })
  const description = t("brandDescription", {
    brandName: brand.name,
    industry: brand.industry,
  })

  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/${slug}`])
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

function generateFAQ(
  brand: Brand,
  t: (key: string, values?: Record<string, string | number>) => string
) {
  const questions: { question: string; answer: string }[] = []

  if (brand.colors.length > 0) {
    const colorNames = brand.colors
      .map((c) => `${c.name} (${c.hex})`)
      .join(", ")
    questions.push({
      question: t("faqColorQuestion", { brandName: brand.name }),
      answer: t("faqColorAnswer", {
        brandName: brand.name,
        colors: colorNames,
      }),
    })
  }

  if (brand.typography.length > 0) {
    const fontNames = brand.typography
      .map((f) => `${f.name} (${f.role})`)
      .join(", ")
    questions.push({
      question: t("faqFontQuestion", { brandName: brand.name }),
      answer: t("faqFontAnswer", { brandName: brand.name, fonts: fontNames }),
    })
  }

  questions.push({
    question: t("faqIndustryQuestion", { brandName: brand.name }),
    answer: t("faqIndustryAnswer", {
      brandName: brand.name,
      industry: brand.industry,
    }),
  })

  if (brand.founded) {
    questions.push({
      question: t("faqFoundedQuestion", { brandName: brand.name }),
      answer: t("faqFoundedAnswer", {
        brandName: brand.name,
        year: brand.founded,
      }),
    })
  }

  return questions
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const [tSeo, tTags, tColors, tTypo, tBrowse, tBrands, tCategories] =
    await Promise.all([
      getTranslations({ locale, namespace: "seo" }),
      getTranslations({ locale, namespace: "tags" }),
      getTranslations({ locale, namespace: "colorFamilies" }),
      getTranslations({ locale, namespace: "typographyStyles" }),
      getTranslations({ locale, namespace: "browseBy" }),
      getTranslations({ locale, namespace: "brands" }),
      getTranslations({ locale, namespace: "categories" }),
    ])
  const faqQuestions = generateFAQ(brand, tSeo)

  const colorFamilies = getBrandColorFamilies(brand)
  const typoStyles = [
    ...new Set(
      brand.typography.map((t) => t.category).filter(Boolean) as string[]
    ),
  ]

  // Resolve translations on the server so child components
  // don't need access to namespaces missing from NextIntlClientProvider
  function trBrand(key: string, fallback: string) {
    try {
      return tBrands(key)
    } catch {
      return fallback
    }
  }
  function trCat(key: string, fallback: string) {
    try {
      return tCategories(key)
    } catch {
      return fallback
    }
  }

  const translatedDescription = trBrand(
    `${brand.slug}.description`,
    brand.description
  )
  const translatedPhilosophy = brand.philosophy
    ? trBrand(`${brand.slug}.philosophy`, brand.philosophy)
    : undefined
  const translatedIndustry = trCat(brand.industry, brand.industry)
  const translatedTags: Record<string, string> = {}
  for (const tag of brand.tags ?? []) {
    try {
      translatedTags[tag] = tTags(tag)
    } catch {
      translatedTags[tag] = tag
    }
  }

  return (
    <article className="flex flex-col gap-10 px-8 py-7">
      <BrandStructuredData brand={brand} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: brand.name, url: `${BASE_URL}/${locale}/${brand.slug}` },
        ]}
      />
      <FAQStructuredData questions={faqQuestions} />
      <BrandHeader
        brand={brand}
        translatedDescription={translatedDescription}
        translatedIndustry={translatedIndustry}
        translatedTags={translatedTags}
      />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-6">
        <BrandStory brand={brand} translatedPhilosophy={translatedPhilosophy} />
      </div>
      <BrandAssets assets={brand.assets} brandName={brand.name} />
      <BrandColors colors={brand.colors} />
      <BrandTypography typography={brand.typography} />
      <SimilarBrands brands={getSimilarBrandCards(brand, getAllBrands())} />
      <div className="flex flex-col gap-6">
        {brand.tags && brand.tags.length > 0 && (
          <BrowseBySection
            title={tBrowse("relatedTags")}
            links={brand.tags.map((tag) => ({
              href: `/tag/${tag}`,
              label: tTags(tag),
            }))}
          />
        )}
        <BrowseBySection
          title={tBrowse("relatedColors")}
          links={colorFamilies.map((color) => ({
            href: `/color/${color}`,
            label: tColors(color),
          }))}
        />
        <BrowseBySection
          title={tBrowse("relatedTypography")}
          links={typoStyles.map((style) => ({
            href: `/typography/${style}`,
            label: tTypo(style),
          }))}
        />
      </div>
      <BrandLegal brand={brand} />
      <div className="flex justify-center pb-2">
        <a
          href={`https://www.ikiform.com/f/report-a-brand-issue-w93co6?brand_url=${encodeURIComponent(`${BASE_URL}/${locale}/${brand.slug}`)}&brand_name=${encodeURIComponent(brand.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Report an issue with this brand
        </a>
      </div>
    </article>
  )
}
