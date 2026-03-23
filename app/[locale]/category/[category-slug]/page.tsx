import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllCategories, getCategoryBySlug } from "@/data/categories"
import { getBrandsByCategory } from "@/data/brands"
import { routing } from "@/i18n/routing"
import {
  CategoryStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { BrandListingCard } from "@/components/brand-listing-card"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

export async function generateStaticParams() {
  const categories = getAllCategories()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      categories.map((cat) => ({ locale, "category-slug": cat.slug }))
    )
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; "category-slug": string }>
}) {
  const { locale, "category-slug": categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)
  if (!category) return {}

  const brands = getBrandsByCategory(categorySlug)
  const [t, tCat] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "categories" }),
  ])

  const categoryName = tCat(categorySlug)

  const title = t("categoryTitle", { category: categoryName })
  const brandNames = brands
    .slice(0, 4)
    .map((b) => b.name)
    .join(", ")
  const description = `${t("categoryDescription", {
    count: brands.length,
    category: categoryName,
  })} ${t("featuredBrands", { brands: brandNames })}`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/category/${categorySlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/category/${categorySlug}`])
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; "category-slug": string }>
}) {
  const { locale, "category-slug": categorySlug } = await params
  setRequestLocale(locale)

  const category = getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const brands = getBrandsByCategory(categorySlug)
  const [t, tCat] = await Promise.all([
    getTranslations({ locale, namespace: "category" }),
    getTranslations({ locale, namespace: "categories" }),
  ])

  const categoryName = tCat(categorySlug)

  return (
    <main className="flex flex-col gap-8 p-8">
      <CategoryStructuredData
        categoryName={categoryName}
        categoryDescription={t("description", {
          count: brands.length,
          category: categoryName,
        })}
        brands={brands}
        locale={locale}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          {
            name: categoryName,
            url: `${BASE_URL}/${locale}/category/${categorySlug}`,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-pretty">
          {t("title", { category: categoryName })}
        </h1>
        <p className="text-muted-foreground">
          {t("description", { count: brands.length, category: categoryName })}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandListingCard key={brand.slug} brand={brand} />
        ))}
      </div>
      {brands.length === 0 && (
        <p className="text-center text-muted-foreground">
          {t("noBrandsInCategory")}
        </p>
      )}
    </main>
  )
}
