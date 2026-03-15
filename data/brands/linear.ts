import type { Brand } from "@/lib/types"

export const linear: Brand = {
  slug: "linear",
  name: "Linear",
  description:
    "Linear is a purpose-built project management platform for modern software teams, designed around speed, clarity, and craftsmanship. Founded in 2019, Linear streamlines issue tracking, sprint planning, and product development workflows for over 25,000 companies including OpenAI, Coinbase, and Ramp.",
  url: "https://linear.app",
  industry: "saas",
  categories: ["saas", "technology", "minimal-logos", "geometric-logos"],
  tags: [
    "project-management",
    "developer-tools",
    "issue-tracking",
    "productivity",
    "design-tools",
  ],
  colors: [
    {
      name: "Linear Indigo",
      hex: "#5E6AD2",
      usage: "Primary brand color, logo, key accents and interactive elements.",
    },
    {
      name: "Linear Blue",
      hex: "#8299FF",
      usage: "Secondary accent, favicon, gradients, highlights.",
    },
    {
      name: "Nordic Gray",
      hex: "#222326",
      usage: "Dark backgrounds, primary text in light mode.",
    },
    {
      name: "Mercury White",
      hex: "#F4F5F8",
      usage: "Light backgrounds, cards, content surfaces.",
    },
    {
      name: "Pure White",
      hex: "#FFFFFF",
      usage: "Base background, contrast surfaces.",
    },
    {
      name: "Ink Black",
      hex: "#08090A",
      usage: "Primary dark mode background, headings.",
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
      fontUrl: "/brands/linear/fonts/inter-variable.woff2",
    },
  ],
  assets: [
    {
      label: "Linear Logomark — Black",
      src: "/brands/linear/linear-logomark-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Linear Logomark — White",
      src: "/brands/linear/linear-logomark-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Linear Logomark — Brand",
      src: "/brands/linear/linear-logomark-brand.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Linear Wordmark — Black",
      src: "/brands/linear/linear-wordmark-black.svg",
      width: 400,
      height: 100,
      format: "svg",
    },
    {
      label: "Linear Wordmark — White",
      src: "/brands/linear/linear-wordmark-white.svg",
      width: 400,
      height: 100,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Linear Logomark — Brand",
    src: "/brands/linear/linear-logomark-brand.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Linear Logomark — White",
    src: "/brands/linear/linear-logomark-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2019,
  headquarters: "San Francisco, California (Distributed)",
  designer: "Karri Saarinen & Linear Design Team",
  lastRebranded: "2023",
  philosophy:
    "Linear's identity reflects relentless focus on speed, craftsmanship, and clarity. The brand uses a restrained indigo palette and clean geometric logomark to convey precision and purpose — software built by people who deeply care about the tools they create.",
  legal: {
    guidelinesUrl: "https://linear.app/brand",
    dos: [
      "Use official Linear brand assets from the brand guidelines page",
      "Maintain clear space around the Linear logo",
      "Use monochrome variants of the wordmark when possible",
      "Refer to the company as 'Linear' (capitalized) in text",
    ],
    donts: [
      "Alter or modify the Linear logomark or wordmark files",
      "Use Linear branding to imply endorsement without written consent",
      "Combine the Linear logo with other graphics or elements",
      "Use the Linear name in product names or domain names",
    ],
  },
}
