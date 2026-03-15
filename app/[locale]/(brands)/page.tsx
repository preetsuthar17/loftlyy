import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { IconArrowRight, IconHeart } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { getAllBrands } from "@/data/brands"

const DitherLogoCarousel = dynamic(() =>
  import("@/components/dither-logo-carousel").then((m) => ({
    default: m.DitherLogoCarousel,
  }))
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: `${t("siteName")} — ${t("siteDescription")}`,
    description: `${t("siteDescription")}. Brand identity of brands for inspiration.`,
  }
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BrandsLanding />
}

function BrandsLanding() {
  const t = useTranslations()
  const brands = getAllBrands()

  // Pick a stable subset of 8 brands for the carousel to avoid loading all logos
  const MAX_CAROUSEL = 8
  const carouselBrands = brands.slice(0, MAX_CAROUSEL).map((b) => ({
    slug: b.slug,
    name: b.name,
    thumbnailSrc: b.thumbnail.src,
  }))

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center px-4 py-12 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 p-2 dark:bg-neutral-800">
          <DitherLogoCarousel brands={carouselBrands} interval={2000} className="size-full" />
        </div>

        <h1 className="max-w-xl text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-neutral-100">
          {t("home.headline")}
        </h1>
        <p className="max-w-md text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
          {t("home.subheadline")}
        </p>
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href={`/${brands[0].slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-neutral-700 sm:w-fit sm:py-4 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            {t("home.cta")}
            <IconArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-100 px-6 py-3.5 text-center font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 sm:w-fit sm:py-4 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t("home.sponsor")} &nbsp;❤️
          </a>
        </div>
      </section>
    </div>
  )
}
