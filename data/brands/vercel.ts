import type { Brand } from "@/lib/types"

export const vercel: Brand = {
  slug: "vercel",
  name: "Vercel",
  description:
    "Vercel is a cloud platform for frontend developers that enables teams to build, deploy, and scale web applications with zero configuration. Founded in 2015, Vercel is the creator of Next.js and the Geist design system, powering the frontends of companies like Washington Post, Under Armour, and Nintendo.",
  url: "https://vercel.com",
  industry: "technology",
  categories: ["technology", "saas", "minimal-logos", "geometric-logos"],
  tags: [
    "developer-tools",
    "cloud",
    "hosting",
    "frontend",
    "api",
  ],
  colors: [
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary brand color, logo, text, and UI elements.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds, inverted logo, and contrast surfaces.",
    },
    {
      name: "Gray 900",
      hex: "#171717",
      usage: "Dark backgrounds, secondary surfaces.",
    },
    {
      name: "Gray 100",
      hex: "#EDEDED",
      usage: "Borders, subtle dividers, light backgrounds.",
    },
    {
      name: "Background",
      hex: "#FAFAFA",
      usage: "Page backgrounds, cards, and content areas.",
    },
    {
      name: "Blue",
      hex: "#0070F3",
      usage: "Links, interactive elements, and accents.",
    },
  ],
  typography: [
    {
      name: "Geist Sans",
      role: "Primary / Headings & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/vercel/fonts/geist-sans-regular.woff2",
    },
    {
      name: "Geist Mono",
      role: "Code / Monospace",
      weights: ["400", "500", "600", "700"],
      category: "monospace",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/vercel/fonts/geist-mono-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Vercel Wordmark — Black",
      src: "/brands/vercel/vercel-wordmark-black.svg",
      width: 240,
      height: 48,
      format: "svg",
    },
    {
      label: "Vercel Wordmark — White",
      src: "/brands/vercel/vercel-wordmark-white.svg",
      width: 240,
      height: 48,
      format: "svg",
    },
    {
      label: "Vercel Icon — Black",
      src: "/brands/vercel/vercel-logo-black.svg",
      width: 256,
      height: 222,
      format: "svg",
    },
    {
      label: "Vercel Icon — White",
      src: "/brands/vercel/vercel-logo-white.svg",
      width: 256,
      height: 222,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Vercel Logo — Black",
    src: "/brands/vercel/vercel-logo-black.svg",
    width: 256,
    height: 222,
    format: "svg",
  },
  thumbnailDark: {
    label: "Vercel Logo — White",
    src: "/brands/vercel/vercel-logo-white.svg",
    width: 256,
    height: 222,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2015,
  headquarters: "San Francisco, California",
  designer: "Vercel Design Team",
  lastRebranded: "2023",
  philosophy:
    "Vercel's brand identity centers on developer experience and the power of the frontend. Its stark black-and-white palette and iconic triangle symbol communicate speed, precision, and the cutting edge of web development — where simplicity meets performance.",
  legal: {
    guidelinesUrl: "https://vercel.com/geist/brands#vercel",
    dos: [
      "Use official Vercel brand assets from the brand resources page",
      "Describe Vercel products, services, and technologies truthfully",
      "State your company uses Vercel products (e.g., 'Our website is hosted on Vercel')",
      "Maintain clear space around the Vercel logo",
    ],
    donts: [
      "Use Vercel marks in business or product names or domain names",
      "Create confusingly similar marks or suggest Vercel sponsorship",
      "Modify the Vercel marks in any way",
      "Display Vercel marks more prominently than your own branding",
    ],
  },
}
