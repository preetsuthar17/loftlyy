import { getAllColorFamilies, getBrandsByColorFamily } from "@/data/brands"
import { getColorFamilyBySlug } from "@/data/color-families"
import { routing } from "@/i18n/routing"
import { OG_SIZE } from "@/lib/og"
import { createListingOGImage } from "@/lib/og-listing"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export function generateStaticParams() {
  const families = getAllColorFamilies()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      families.map((color) => ({ locale, color }))
    )
  )
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; color: string }>
}) {
  const { color } = await params
  const brands = getBrandsByColorFamily(color)
  const colorFamily = getColorFamilyBySlug(color)
  const title = `${color.charAt(0).toUpperCase() + color.slice(1)} Brands`

  return createListingOGImage({
    title,
    count: brands.length,
    accentColor: colorFamily?.hex,
  })
}
