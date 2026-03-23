import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllTags, getBrandsByTag } from "@/data/brands"
import { routing } from "@/i18n/routing"
import {
  ListingStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { BrandListingCard } from "@/components/brand-listing-card"
import { BrowseBySection } from "@/components/browse-by-section"
import {
  getRelatedCategoriesForBrands,
  getRelatedColorFamiliesForBrands,
  getRelatedTypographyForBrands,
} from "@/lib/filters"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

export async function generateStaticParams() {
  const tags = getAllTags()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) => tags.map((tag) => ({ locale, tag })))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  const brands = getBrandsByTag(tag)
  if (brands.length === 0) return {}

  const [t, tTags] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "tags" }),
  ])

  const tagName = tTags(tag)
  const title = t("tagTitle", { tag: tagName })
  const brandNames = brands
    .slice(0, 4)
    .map((b) => b.name)
    .join(", ")
  const description = `${t("tagDescription", {
    count: brands.length,
    tag: tagName,
  })} ${t("featuredBrands", { brands: brandNames })}`

  return {
    title,
    description,
    ...(brands.length <= 2 && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `/${locale}/tag/${tag}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tag/${tag}`])
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

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  setRequestLocale(locale)

  const brands = getBrandsByTag(tag)
  if (brands.length === 0) notFound()

  const [t, tTags, tCat, tColors, tTypo, tBrowse] = await Promise.all([
    getTranslations({ locale, namespace: "tag" }),
    getTranslations({ locale, namespace: "tags" }),
    getTranslations({ locale, namespace: "categories" }),
    getTranslations({ locale, namespace: "colorFamilies" }),
    getTranslations({ locale, namespace: "typographyStyles" }),
    getTranslations({ locale, namespace: "browseBy" }),
  ])

  const tagName = tTags(tag)
  const relatedCategories = getRelatedCategoriesForBrands(brands)
  const relatedColors = getRelatedColorFamiliesForBrands(brands)
  const relatedTypography = getRelatedTypographyForBrands(brands)

  return (
    <main className="flex flex-col gap-8 p-8">
      <ListingStructuredData
        name={tagName}
        description={t("description", { count: brands.length, tag: tagName })}
        brands={brands}
        locale={locale}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: tagName, url: `${BASE_URL}/${locale}/tag/${tag}` },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-pretty">
          {t("title", { tag: tagName })}
        </h1>
        <p className="text-muted-foreground">
          {t("description", { count: brands.length, tag: tagName })}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandListingCard key={brand.slug} brand={brand} />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <BrowseBySection
          title={tBrowse("relatedCategories")}
          links={relatedCategories.map((cat) => ({
            href: `/category/${cat}`,
            label: tCat(cat),
          }))}
        />
        <BrowseBySection
          title={tBrowse("relatedColors")}
          links={relatedColors.map((color) => ({
            href: `/color/${color}`,
            label: tColors(color),
          }))}
        />
        <BrowseBySection
          title={tBrowse("relatedTypography")}
          links={relatedTypography.map((style) => ({
            href: `/typography/${style}`,
            label: tTypo(style),
          }))}
        />
      </div>
    </main>
  )
}
