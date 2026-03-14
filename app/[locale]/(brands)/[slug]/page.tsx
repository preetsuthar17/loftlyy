import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllBrands, getBrandBySlug } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { BrandHeader } from "@/components/brand-header"
import { BrandColors } from "@/components/brand-colors"
import { BrandTypography } from "@/components/brand-typography"
import { BrandStructuredData } from "@/components/structured-data"
import { BrandStory } from "@/components/brand-story"
import { getSimilarBrandCards } from "@/lib/filters"

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
  return routing.locales.flatMap((locale) =>
    brands.map((brand) => ({ locale, slug: brand.slug }))
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

  const t = await getTranslations({ locale, namespace: "seo" })

  const title = t("brandTitle", { brandName: brand.name })
  const description = t("brandDescription", {
    brandName: brand.name,
    industry: brand.industry,
  })

  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/${slug}`])
      ),
    },
    openGraph: {
      title,
      description,
      images: brand.assets[0]
        ? [
            {
              url: brand.assets[0].src,
              width: brand.assets[0].width,
              height: brand.assets[0].height,
            },
          ]
        : [],
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: brand.assets[0] ? [brand.assets[0].src] : [],
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

  return (
    <article className="flex flex-col gap-10 px-8 py-7">
      <BrandStructuredData brand={brand} />
      <BrandHeader brand={brand} />
      <BrandStory brand={brand} />
      <BrandAssets assets={brand.assets} brandName={brand.name} />
      <BrandColors colors={brand.colors} />
      <BrandTypography typography={brand.typography} />
      <SimilarBrands brands={getSimilarBrandCards(brand, getAllBrands())} />
      <BrandLegal brand={brand} />
    </article>
  )
}
