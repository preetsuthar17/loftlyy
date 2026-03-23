import { getColorExplorerEntries } from "@/data/brands"
import { OG_SIZE } from "@/lib/og"
import { createListingOGImage } from "@/lib/og-listing"
import { getStaticLocales } from "@/lib/static-params"

export function generateStaticParams() {
  return getStaticLocales().map((locale) => ({ locale }))
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage() {
  return createListingOGImage({
    title: "Color Explorer",
    count: getColorExplorerEntries().length,
    accentColor: "#3B82F6",
  })
}
