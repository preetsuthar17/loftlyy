import type { Brand } from "@/lib/types"

export const tailwindCss: Brand = {
  slug: "tailwind-css",
  name: "Tailwind CSS",
  description:
    "Tailwind CSS is a utility-first CSS framework that enables developers to rapidly build modern websites by composing utility classes directly in HTML markup. Created by Tailwind Labs, it has become one of the most popular CSS frameworks, powering millions of projects with its flexible, production-optimized approach to styling.",
  url: "https://tailwindcss.com",
  industry: "technology",
  categories: ["technology", "saas"],
  tags: ["developer-tools", "css", "framework", "frontend", "open-source"],
  colors: [
    {
      name: "Sky",
      hex: "#38BDF8",
      usage: "Primary brand color, logo mark, and accent elements.",
    },
    {
      name: "Slate 900",
      hex: "#0F172A",
      usage: "Logotype text, dark backgrounds, and body content.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Light backgrounds, inverted logo, and contrast surfaces.",
    },
    {
      name: "Teal",
      hex: "#00AAAA",
      usage: "Secondary accent color for highlights and interactive states.",
    },
    {
      name: "Slate 100",
      hex: "#F1F5F9",
      usage: "Subtle backgrounds, cards, and content areas.",
    },
  ],
  typography: [
    {
      name: "Inter",
      role: "Primary / Headings & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Google Fonts",
      fontUrl: "/brands/tailwind-css/fonts/inter-regular.woff2",
    },
    {
      name: "IBM Plex Mono",
      role: "Code / Monospace",
      weights: ["400", "500", "600"],
      category: "monospace",
      designer: "Mike Abbink",
      foundry: "IBM",
      fontUrl: "/brands/tailwind-css/fonts/ibm-plex-mono-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Tailwind CSS Mark — Brand",
      src: "/brands/tailwind-css/tailwind-css-mark-brand.svg",
      width: 256,
      height: 154,
      format: "svg",
    },
    {
      label: "Tailwind CSS Mark — Black",
      src: "/brands/tailwind-css/tailwind-css-mark-black.svg",
      width: 256,
      height: 154,
      format: "svg",
    },
    {
      label: "Tailwind CSS Mark — White",
      src: "/brands/tailwind-css/tailwind-css-mark-white.svg",
      width: 256,
      height: 154,
      format: "svg",
    },
    {
      label: "Tailwind CSS Logotype — Dark",
      src: "/brands/tailwind-css/tailwind-css-logotype-dark.svg",
      width: 524,
      height: 66,
      format: "svg",
    },
    {
      label: "Tailwind CSS Logotype — White",
      src: "/brands/tailwind-css/tailwind-css-logotype-white.svg",
      width: 524,
      height: 66,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Tailwind CSS Mark — Brand",
    src: "/brands/tailwind-css/tailwind-css-mark-brand.svg",
    width: 256,
    height: 154,
    format: "svg",
  },
  thumbnailDark: {
    label: "Tailwind CSS Mark — White",
    src: "/brands/tailwind-css/tailwind-css-mark-white.svg",
    width: 256,
    height: 154,
    format: "svg",
  },
  dateAdded: "2026-03-17",
  founded: 2017,
  headquarters: "Cambridge, Ontario, Canada",
  designer: "Adam Wathan & Steve Schoger",
  lastRebranded: "2023",
  philosophy:
    "Tailwind CSS believes that the best way to build modern interfaces is through utility-first composition — providing low-level building blocks that empower developers to create unique designs without fighting against opinionated frameworks.",
  legal: {
    guidelinesUrl: "https://tailwindcss.com/brand",
    dos: [
      "Use Tailwind CSS assets in articles, tutorials, and educational content",
      "Use your own brand name clearly, distinguishing it from Tailwind CSS (e.g., 'ComponentStudio for Tailwind CSS')",
      "Properly attribute assets to Tailwind Labs Inc.",
    ],
    donts: [
      "Use Tailwind name or logos in ways that imply official endorsement",
      "Name products or services emphasizing the Tailwind brand (e.g., 'Tailwind Themes')",
      "Use Tailwind trademarks in domain names (e.g., 'tailwindkits.com')",
      "Use logos on merchandise without explicit written consent from Tailwind Labs",
    ],
  },
}
