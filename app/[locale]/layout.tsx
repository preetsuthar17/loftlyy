import type { Metadata } from "next"
import Script from "next/script"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { notFound } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { SiteStructuredData } from "@/components/structured-data"
import { routing } from "@/i18n/routing"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  const title = {
    default: `${t("siteName")} — ${t("siteDescription")}`,
    template: `%s | ${t("siteName")}`,
  }
  const description = `${t("siteDescription")}. Brand identity of brands for inspiration.`

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      title: title.default,
      description,
      siteName: t("siteName"),
      type: "website",
      locale,
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title.default,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const [messages, t] = await Promise.all([
    getMessages({ locale }),
    getTranslations({ locale, namespace: "metadata" }),
  ])

  return (
    <>
      <SiteStructuredData
        siteName={t("siteName")}
        siteDescription={t("siteDescription")}
        url={`${BASE_URL}/${locale}`}
      />
      <Script
        defer
        src="https://assets.onedollarstats.com/stonks.js"
        strategy="afterInteractive"
      />
      <div lang={locale}>
        <NuqsAdapter>
          <NextIntlClientProvider
            key={locale}
            locale={locale}
            messages={messages}
          >
            {children}
          </NextIntlClientProvider>
        </NuqsAdapter>
      </div>
    </>
  )
}
