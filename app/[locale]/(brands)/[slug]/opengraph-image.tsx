import { ImageResponse } from "@vercel/og"
import { getAllBrands, getBrandBySlug } from "@/data/brands"
import { routing } from "@/i18n/routing"
import {
  OG_SIZE,
  getInterBoldFont,
  contrastingBackground,
  textColorForBackground,
} from "@/lib/og"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export function generateStaticParams() {
  const brands = getAllBrands()
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      brands.map((brand) => ({ locale, slug: brand.slug }))
    )
  )
}

export const size = OG_SIZE
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  const fontData = await getInterBoldFont()

  if (!brand) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontSize: 48,
          fontFamily: "Inter",
        }}
      >
        Loftlyy
      </div>,
      {
        ...size,
        fonts: [
          { name: "Inter", data: fontData, style: "normal", weight: 700 },
        ],
      }
    )
  }

  const primaryColor = brand.colors[0]?.hex ?? "#0a0a0a"
  const bgColor = contrastingBackground(primaryColor)
  const textColor = textColorForBackground(bgColor)

  const wordmark = brand.assets.find((a) =>
    a.label.toLowerCase().includes("wordmark")
  )
  const logoAsset = wordmark ?? brand.thumbnail

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        gap: 32,
        padding: 80,
        fontFamily: "Inter",
      }}
    >
      <img
        src={logoAsset.src}
        alt={brand.name}
        width={Math.min(logoAsset.width, 500)}
        height={Math.min(logoAsset.height, 200)}
        style={{ objectFit: "contain", maxHeight: 200, maxWidth: 500 }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "absolute",
          bottom: 40,
          right: 60,
        }}
      >
        <span style={{ fontSize: 20, color: textColor, opacity: 0.4 }}>
          Loftlyy
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Inter", data: fontData, style: "normal", weight: 700 }],
    }
  )
}
