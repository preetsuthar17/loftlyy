import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import {
  getAllBrands,
  getAllSidebarBrands,
  getColorExplorerEntries,
} from "@/data/brands"
import { colorFamilies } from "@/data/color-families"
import { routing } from "@/i18n/routing"
import {
  ColorExplorer,
  type ColorExplorerCopy,
} from "@/components/color-explorer"
import {
  BreadcrumbStructuredData,
  ListingStructuredData,
} from "@/components/structured-data"
import { getStaticLocales } from "@/lib/static-params"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

export function generateStaticParams() {
  return getStaticLocales().map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "colorExplorer" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/colors`,
      languages: Object.fromEntries(
        routing.locales.map((entryLocale) => [
          entryLocale,
          `/${entryLocale}/colors`,
        ])
      ),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  }
}

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [t, messages] = await Promise.all([
    getTranslations({ locale, namespace: "colorExplorer" }),
    getMessages({ locale }),
  ])

  const entries = getColorExplorerEntries()
  const brands = getAllSidebarBrands()
  const allBrands = getAllBrands()
  const copy = messages.colorExplorer as ColorExplorerCopy
  const familyLabels = messages.colorFamilies as Record<string, string>

  const familyOptions = colorFamilies.map((family) => ({
    slug: family.slug,
    count: entries.filter((entry) => entry.family === family.slug).length,
    hex: family.hex,
  }))

  return (
    <main className="flex flex-col py-12">
      <ListingStructuredData
        name={t("title")}
        description={t("metaDescription")}
        brands={allBrands}
        locale={locale}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: t("title"), url: `${BASE_URL}/${locale}/colors` },
        ]}
      />
      <ColorExplorer
        brands={brands}
        copy={copy}
        entries={entries}
        familyLabels={familyLabels}
        familyOptions={familyOptions}
      />
    </main>
  )
}
