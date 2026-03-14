import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { notFound } from "next/navigation"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteStructuredData } from "@/components/structured-data"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
    getMessages(),
    getTranslations({ locale, namespace: "metadata" }),
  ])

  const clientMessages = {
    brand: messages.brand,
    nav: messages.nav,
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0a"
          media="(prefers-color-scheme: dark)"
        />
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
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
