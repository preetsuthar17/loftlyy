import Image from "next/image"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { IconArrowRight, IconSpeakerphone } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { getAllSidebarBrands } from "@/data/brands"
import type { SidebarBrand } from "@/lib/types"

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
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  }
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BrandsLanding brands={getAllSidebarBrands()} />
}

function BrandsLanding({ brands }: { brands: SidebarBrand[] }) {
  const t = useTranslations()

  return (
    <div className="flex min-h-full w-full flex-col items-center px-4 py-12 sm:px-6">
      {/* Advertise spots */}
      <section className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <a
            key={`ad-spot-${i}`}
            href="mailto:preetsuthar.me@gmail.com?subject=Loftlyy%20Advertising"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 opacity-50 transition-all hover:border-neutral-400 hover:opacity-80 dark:border-neutral-600 dark:hover:border-neutral-500"
          >
            <IconSpeakerphone
              size={24}
              className="text-neutral-400 transition-colors group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300"
            />
            <span className="text-sm font-medium text-neutral-400 transition-colors group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300">
              Advertise
            </span>
            <span className="text-xs text-neutral-400 transition-colors group-hover:text-neutral-500 dark:text-neutral-500 dark:group-hover:text-neutral-400">
              4/4 spots left
            </span>
          </a>
        ))}
      </section>

      {/* Hero + Marquee centered in remaining space */}
      <div className="flex w-full flex-1 flex-col items-center justify-center">
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <Image
            src="/logo.webp"
            alt="Loftly"
            width={48}
            height={48}
            className="size-full rounded-xl object-contain"
          />
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

      {/* Forward marquee — below hero */}
      <div className="relative mt-24 w-full max-w-3xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-10">
          {[...brands, ...brands].map((brand, i) => (
            <Link
              key={`${brand.slug}-fwd-${i}`}
              href={`/${brand.slug}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={brand.thumbnail.src}
                alt={brand.name}
                width={32}
                height={32}
                className="size-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
