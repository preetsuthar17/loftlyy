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
  BrandPageStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
} from "@/components/structured-data"
import { BrandStory } from "@/components/brand-story"
import { getSimilarBrandCards, getBrandColorFamilies } from "@/lib/filters"
import { BrowseBySection } from "@/components/browse-by-section"
import { BrandSeoSummary } from "@/components/brand-seo-summary"
import { BASE_URL, composeBrandSeoContent, toAbsoluteUrl } from "@/lib/seo"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

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
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      brands.map((brand) => ({ locale, slug: brand.slug }))
    )
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

  const [tSeo, tCategories] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "categories" }),
  ])
  const seo = composeBrandSeoContent({
    brand,
    locale,
    tSeo,
    translatedIndustry: tCategories(brand.industry),
  })

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/${slug}`])
      ),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale,
      url: `${BASE_URL}/${locale}/${slug}`,
      images: seo.imageUrls.map((url) => ({ url })),
    },
    twitter: {
      card: seo.imageUrls.length > 0 ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images: seo.imageUrls,
    },
  }
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

  const seo = composeBrandSeoContent({
    brand,
    locale,
    tSeo,
    translatedIndustry,
  })

  return (
    <article className="flex flex-col gap-10 px-8 py-7">
      <BrandStructuredData brand={brand} />
      <BrandPageStructuredData
        name={seo.title}
        description={seo.description}
        url={`${BASE_URL}/${locale}/${brand.slug}`}
        locale={locale}
        about={{
          name: brand.name,
          url: brand.url,
          logo: toAbsoluteUrl(brand.thumbnail.src),
        }}
        images={brand.assets.length > 0 ? seo.imageUrls : []}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: brand.name, url: `${BASE_URL}/${locale}/${brand.slug}` },
        ]}
      />
      <FAQStructuredData questions={seo.faqQuestions} />
      <BrandHeader
        brand={brand}
        translatedDescription={translatedDescription}
        translatedIndustry={translatedIndustry}
        translatedTags={translatedTags}
      />
      <BrandSeoSummary title={tSeo("summaryTitle")} items={seo.summaryItems} />
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
