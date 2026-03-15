export const locales = [
  "en",
  "es",
  "fr",
  "de",
  "ja",
  "it",
  "pt",
  "ko",
  "zh",
] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = "en"

export const localeMetadata: Record<
  AppLocale,
  { shortLabel: string; displayName: string; nativeName: string }
> = {
  en: {
    shortLabel: "EN",
    displayName: "English",
    nativeName: "English",
  },
  es: {
    shortLabel: "ES",
    displayName: "Spanish",
    nativeName: "Español",
  },
  fr: {
    shortLabel: "FR",
    displayName: "French",
    nativeName: "Français",
  },
  de: {
    shortLabel: "DE",
    displayName: "German",
    nativeName: "Deutsch",
  },
  ja: {
    shortLabel: "JA",
    displayName: "Japanese",
    nativeName: "日本語",
  },
  it: {
    shortLabel: "IT",
    displayName: "Italian",
    nativeName: "Italiano",
  },
  pt: {
    shortLabel: "PT",
    displayName: "Portuguese",
    nativeName: "Português",
  },
  ko: {
    shortLabel: "KO",
    displayName: "Korean",
    nativeName: "한국어",
  },
  zh: {
    shortLabel: "ZH",
    displayName: "Chinese",
    nativeName: "简体中文",
  },
}
