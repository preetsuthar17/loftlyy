import type { Brand } from "@/lib/types"

export const meta: Brand = {
  slug: "meta",
  name: "Meta",
  description:
    "Meta Platforms is a global technology conglomerate that builds products and technologies to help people connect, find communities, and grow businesses. The company owns Facebook, Instagram, WhatsApp, and Threads, and is investing heavily in augmented and virtual reality through its Reality Labs division.",
  url: "https://about.meta.com",
  industry: "technology",
  categories: ["technology", "social-media", "geometric-logos"],
  tags: [
    "social-media",
    "virtual-reality",
    "augmented-reality",
    "messaging",
    "advertising",
    "ai",
    "metaverse",
  ],
  colors: [
    {
      name: "Meta Blue",
      hex: "#0082FB",
      usage:
        "Primary brand color, used in the infinity symbol and across digital products.",
    },
    {
      name: "Meta Blue Dark",
      hex: "#0064E0",
      usage:
        "Darker end of the brand gradient, used for depth and emphasis in the logo.",
    },
    {
      name: "Meta Charcoal",
      hex: "#1C2B33",
      usage:
        "Primary dark color for wordmarks and text on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Used for logos and text on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Optimistic Display",
      role: "Primary / Headings",
      weights: ["500", "700"],
      category: "sans-serif",
      designer: "Dalton Maag",
      foundry: "Dalton Maag",
      fontUrl: "/brands/meta/fonts/optimistic-display.woff2",
    },
    {
      name: "Facebook Reader",
      role: "Body / UI",
      weights: ["400", "500"],
      category: "sans-serif",
      designer: "Meta Design Team",
      foundry: "Meta",
      fontUrl: "/brands/meta/fonts/facebook-reader.woff2",
    },
  ],
  assets: [
    {
      label: "Meta Logo — Color",
      src: "/brands/meta/meta-logo-color.svg",
      width: 1200,
      height: 800,
      format: "svg",
    },
    {
      label: "Meta Logo — Black",
      src: "/brands/meta/meta-logo-black.svg",
      width: 1200,
      height: 800,
      format: "svg",
    },
    {
      label: "Meta Logo — White",
      src: "/brands/meta/meta-logo-white.svg",
      width: 1200,
      height: 800,
      format: "svg",
    },
    {
      label: "Meta Logo — Blue",
      src: "/brands/meta/meta-logo-blue.svg",
      width: 1200,
      height: 800,
      format: "svg",
    },
    {
      label: "Meta Infinity Icon — Color",
      src: "/brands/meta/meta-icon-color.svg",
      width: 288,
      height: 192,
      format: "svg",
    },
    {
      label: "Meta Infinity Icon — Black",
      src: "/brands/meta/meta-icon-black.svg",
      width: 288,
      height: 192,
      format: "svg",
    },
    {
      label: "Meta Infinity Icon — White",
      src: "/brands/meta/meta-icon-white.svg",
      width: 288,
      height: 192,
      format: "svg",
    },
    {
      label: "Meta Infinity Icon — Blue",
      src: "/brands/meta/meta-icon-blue.svg",
      width: 288,
      height: 192,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Meta Infinity Icon — Blue",
    src: "/brands/meta/meta-icon-blue.svg",
    width: 288,
    height: 192,
    format: "svg",
  },
  thumbnailDark: {
    label: "Meta Infinity Icon — White",
    src: "/brands/meta/meta-icon-white.svg",
    width: 288,
    height: 192,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2004,
  headquarters: "Menlo Park, CA",
  designer: "Meta Design Team, Dalton Maag",
  lastRebranded: "2021",
  philosophy:
    "Meta's identity represents a shift beyond any single product. The infinity symbol — a continuous 3D loop that works across 2D and 3D contexts — embodies unlimited potential and connection, using a blue gradient that honors the company's heritage while signaling its future in immersive technology.",
  legal: {
    guidelinesUrl: "https://www.meta.com/brand/resources/meta/company-brand/",
    dos: [
      "Use only official Meta-provided logo artwork",
      "Maintain minimum clear space equal to double the symbol height",
      "Never use the Meta logo below 12px / 5mm in height",
      "Use approved color variations for the appropriate context",
    ],
    donts: [
      "Modify, distort, or recolor the Meta logo beyond approved variations",
      "Use the Meta logo to represent Facebook or any single product",
      "Use the Meta logo without written approval from Meta",
      "Incorporate the Meta logo into your own branding or product names",
      "Animate or alter the 3D properties of the infinity symbol without approval",
    ],
  },
}
