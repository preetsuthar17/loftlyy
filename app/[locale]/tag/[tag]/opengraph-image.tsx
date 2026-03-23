import { getAllTags, getBrandsByTag } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { OG_SIZE } from "@/lib/og"
import { createListingOGImage } from "@/lib/og-listing"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export function generateStaticParams() {
  const tags = getAllTags()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) => tags.map((tag) => ({ locale, tag })))
  )
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { tag } = await params
  const brands = getBrandsByTag(tag)
  const title = tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return createListingOGImage({
    title: `${title} Brands`,
    count: brands.length,
  })
}
