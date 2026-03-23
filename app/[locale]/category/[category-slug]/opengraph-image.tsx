import { getAllCategories } from "@/data/categories"
import { getBrandsByCategory } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { OG_SIZE } from "@/lib/og"
import { createListingOGImage } from "@/lib/og-listing"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export function generateStaticParams() {
  const categories = getAllCategories()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      categories.map((cat) => ({ locale, "category-slug": cat.slug }))
    )
  )
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; "category-slug": string }>
}) {
  const { "category-slug": categorySlug } = await params
  const brands = getBrandsByCategory(categorySlug)
  const title = `${categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Brands`

  return createListingOGImage({ title, count: brands.length })
}
