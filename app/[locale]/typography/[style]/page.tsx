import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  getAllTypographyStyles,
  getBrandsByTypographyStyle,
} from "@/data/brands"
import { routing } from "@/i18n/routing"
import {
  ListingStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { BrandListingCard } from "@/components/brand-listing-card"
import { BrowseBySection } from "@/components/browse-by-section"
import {
  getRelatedTagsForBrands,
  getRelatedColorFamiliesForBrands,
} from "@/lib/filters"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

export async function generateStaticParams() {
  const styles = getAllTypographyStyles()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      styles.map((style) => ({ locale, style }))
    )
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; style: string }>
}) {
  const { locale, style } = await params
  const brands = getBrandsByTypographyStyle(style)
  if (brands.length === 0) return {}

  const [t, tStyles] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "typographyStyles" }),
  ])

  const styleName = tStyles(style)
  const title = t("typographyTitle", { style: styleName })
  const brandNames = brands
    .slice(0, 4)
    .map((b) => b.name)
    .join(", ")
  const description = `${t("typographyDescription", {
    count: brands.length,
    style: styleName,
  })} ${t("featuredBrands", { brands: brandNames })}`

  return {
    title,
    description,
    ...(brands.length <= 2 && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `/${locale}/typography/${style}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/typography/${style}`])
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function TypographyPage({
  params,
}: {
  params: Promise<{ locale: string; style: string }>
}) {
  const { locale, style } = await params
  setRequestLocale(locale)

  const brands = getBrandsByTypographyStyle(style)
  if (brands.length === 0) notFound()

  const [t, tStyles, tTags, tColors, tBrowse] = await Promise.all([
    getTranslations({ locale, namespace: "typographyPage" }),
    getTranslations({ locale, namespace: "typographyStyles" }),
    getTranslations({ locale, namespace: "tags" }),
    getTranslations({ locale, namespace: "colorFamilies" }),
    getTranslations({ locale, namespace: "browseBy" }),
  ])

  const styleName = tStyles(style)
  const relatedTags = getRelatedTagsForBrands(brands)
  const relatedColors = getRelatedColorFamiliesForBrands(brands)

  return (
    <main className="flex flex-col gap-8 p-8">
      <ListingStructuredData
        name={styleName}
        description={t("description", {
          count: brands.length,
          style: styleName,
        })}
        brands={brands}
        locale={locale}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: styleName, url: `${BASE_URL}/${locale}/typography/${style}` },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-pretty">
          {t("title", { style: styleName })}
        </h1>
        <p className="text-muted-foreground">
          {t("description", { count: brands.length, style: styleName })}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandListingCard key={brand.slug} brand={brand} />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <BrowseBySection
          title={tBrowse("relatedTags")}
          links={relatedTags.map((tag) => ({
            href: `/tag/${tag}`,
            label: tTags(tag),
          }))}
        />
        <BrowseBySection
          title={tBrowse("relatedColors")}
          links={relatedColors.map((color) => ({
            href: `/color/${color}`,
            label: tColors(color),
          }))}
        />
      </div>
    </main>
  )
}
