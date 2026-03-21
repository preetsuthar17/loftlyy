import type { Brand } from "@/lib/types"

export const samsung: Brand = {
  slug: "samsung",
  name: "Samsung",
  description:
    "Samsung is a global technology leader spanning consumer electronics, mobile devices, semiconductors, and displays. Founded in 1969 in South Korea, Samsung Electronics has grown into one of the world's most valuable companies, driving innovation across smartphones, TVs, memory chips, and home appliances.",
  url: "https://samsung.com",
  industry: "technology",
  categories: ["technology", "wordmark-logos"],
  tags: ["hardware", "mobile", "electronics", "innovation", "displays"],
  colors: [
    {
      name: "Samsung Blue",
      hex: "#1428A0",
      usage: "Primary brand color, logo, key brand elements.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Logo on light backgrounds, text, UI elements.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Logo on dark backgrounds, clean layouts.",
    },
  ],
  typography: [
    {
      name: "Samsung Sharp Sans",
      role: "Headlines / Marketing",
      weights: ["700"],
      category: "sans-serif",
      designer: "Lucas Sharp",
      foundry: "Sharp Type",
      fontUrl: "/brands/samsung/fonts/SamsungSharpSansBd.woff2",
    },
    {
      name: "SamsungOne",
      role: "Body / UI",
      weights: ["400"],
      category: "sans-serif",
      designer: "Samsung Design Team",
      foundry: "Samsung",
      fontUrl: "/brands/samsung/fonts/SamsungOneLatinWeb-400.woff2",
    },
  ],
  assets: [
    {
      label: "Samsung Wordmark — Blue",
      src: "/brands/samsung/samsung-logo-blue.svg",
      width: 600,
      height: 92,
      format: "svg",
    },
    {
      label: "Samsung Wordmark — Black",
      src: "/brands/samsung/samsung-logo-black.svg",
      width: 600,
      height: 92,
      format: "svg",
    },
    {
      label: "Samsung Wordmark — White",
      src: "/brands/samsung/samsung-logo-white.svg",
      width: 600,
      height: 92,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Samsung Wordmark — Blue",
    src: "/brands/samsung/samsung-logo-blue.svg",
    width: 600,
    height: 92,
    format: "svg",
  },
  thumbnailDark: {
    label: "Samsung Wordmark — White",
    src: "/brands/samsung/samsung-logo-white.svg",
    width: 600,
    height: 92,
    format: "svg",
  },
  dateAdded: "2026-03-21",
  founded: 1969,
  headquarters: "Suwon, South Korea",
  designer: "Landor Associates (1993), Samsung Design Team",
  lastRebranded: "2005",
  philosophy:
    "Samsung's identity is built on the belief that technology should serve humanity. The iconic blue wordmark — clean, geometric, and universally recognizable — embodies reliability, innovation, and a relentless pioneering spirit that drives the company to defy barriers and shape a better world.",
  legal: {
    guidelinesUrl:
      "https://www.samsung.com/us/about-us/brand-identity/",
    dos: [
      "Use only official Samsung-provided logo artwork",
      "Maintain minimum clear space around the Samsung wordmark",
      "Use the Samsung logo in Samsung Blue, black, or white only",
    ],
    donts: [
      "Alter the proportions or spacing of the Samsung wordmark",
      "Apply unapproved colors or gradients to the logo",
      "Place the logo on visually cluttered or low-contrast backgrounds",
      "Use the Samsung name or logo to imply endorsement without permission",
    ],
  },
}
