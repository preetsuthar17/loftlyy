import type { Brand } from "@/lib/types"

export const scira: Brand = {
  slug: "scira",
  name: "Scira",
  description:
    "Scira is an open-source, AI-powered search engine that plans, retrieves, and cites information from the web. Built by Zaid Mukaddam and originally launched as MiniPerplx in 2024, it rebranded to Scira — from the Latin 'scire,' meaning 'to know' — offering 17 search modes and 28 integrated tools.",
  url: "https://scira.ai",
  industry: "ai",
  categories: ["ai", "saas", "technology", "minimal-logos", "geometric-logos"],
  tags: [
    "artificial-intelligence",
    "search-engine",
    "research",
    "open-source",
    "productivity",
  ],
  colors: [
    {
      name: "Scira White",
      hex: "#F9F9F9",
      usage: "Primary light background across the main site and interface.",
    },
    {
      name: "Scira Black",
      hex: "#111111",
      usage: "Primary dark background and text color in light mode.",
    },
    {
      name: "Scira Gray",
      hex: "#BABABA",
      usage: "Secondary text, borders, and UI accents.",
    },
  ],
  typography: [
    {
      name: "Geist",
      role: "Body / UI",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/scira/fonts/geist-regular.woff2",
    },
    {
      name: "Be Vietnam Pro",
      role: "Headings / Display",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Lam Bao, Tony Le, VietAnh Nguyen",
      foundry: "Yellow Type",
      fontUrl: "/brands/scira/fonts/be-vietnam-pro-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Scira Logo — Black",
      src: "/brands/scira/scira-logo-black.svg",
      width: 910,
      height: 934,
      format: "svg",
    },
    {
      label: "Scira Logo — White",
      src: "/brands/scira/scira-logo-white.svg",
      width: 910,
      height: 934,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Scira Logo — Black",
    src: "/brands/scira/scira-logo-black.svg",
    width: 910,
    height: 934,
    format: "svg",
  },
  thumbnailDark: {
    label: "Scira Logo — White",
    src: "/brands/scira/scira-logo-white.svg",
    width: 910,
    height: 934,
    format: "svg",
  },
  dateAdded: "2026-03-17",
  founded: 2024,
  headquarters: "Mumbai, India",
  designer: "Zaid Mukaddam",
  philosophy:
    "Research anything. Do anything. Scira's identity is rooted in minimalism and clarity, using a monochromatic palette and sparkle iconography to convey intelligent discovery and agentic capability.",
  legal: {
    dos: [
      "Use the official Scira logo assets provided",
      "Maintain adequate clear space around the logo",
      "Use approved color variants on appropriate backgrounds",
    ],
    donts: [
      "Modify the Scira logo proportions or colors",
      "Use the Scira name to imply official endorsement",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
