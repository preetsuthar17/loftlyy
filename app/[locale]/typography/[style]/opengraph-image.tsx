import {
  getAllTypographyStyles,
  getBrandsByTypographyStyle,
} from "@/data/brands"
import { routing } from "@/i18n/routing"
import { OG_SIZE } from "@/lib/og"
import { createListingOGImage } from "@/lib/og-listing"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export function generateStaticParams() {
  const styles = getAllTypographyStyles()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      styles.map((style) => ({ locale, style }))
    )
  )
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; style: string }>
}) {
  const { style } = await params
  const brands = getBrandsByTypographyStyle(style)
  const title = `${style.charAt(0).toUpperCase() + style.slice(1)} Typography Brands`

  return createListingOGImage({ title, count: brands.length })
}
