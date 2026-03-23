import { defaultLocale } from "@/i18n/locales"
import { routing } from "@/i18n/routing"

const isDevelopment = process.env.NODE_ENV === "development"

export function getStaticLocales() {
  return isDevelopment ? [defaultLocale] : routing.locales
}

export function getBuildOnlyStaticParams<T>(createParams: () => T[]): T[] {
  return isDevelopment ? [] : createParams()
}
