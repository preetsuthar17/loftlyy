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

  const carouselBrands = brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    thumbnailSrc: b.thumbnail.src,
  }))

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 p-2 dark:bg-neutral-800">
          <DitherLogoCarousel brands={carouselBrands} className="size-full" />
        </div>

        <h1 className="max-w-xl text-4xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-neutral-100">
          {t("home.headline")}
        </h1>
        <p className="max-w-md text-base text-neutral-500 dark:text-neutral-400">
          {t("home.subheadline")}
        </p>
        <div className="flex flex-col items-center gap-3 lg:flex-row">
          <Link
            href={`/${brands[0].slug}`}
            className="justtify-center flex w-full items-center gap-2 rounded-full bg-neutral-900 px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-neutral-700 lg:w-fit dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            {t("home.cta")}
            <IconArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            rel="noopener noreferrer"
            className="justtify-center flex w-full items-center gap-2 rounded-full bg-neutral-100 px-6 py-4 text-center font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 lg:w-fit dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t("home.sponsor")} &nbsp;❤️
          </a>
        </div>
      </section>
    </div>
  )
}
