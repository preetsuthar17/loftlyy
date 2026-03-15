import type { Brand } from "@/lib/types"

export const notion: Brand = {
  slug: "notion",
  name: "Notion",
  description:
    "Notion is an all-in-one workspace that combines notes, docs, wikis, project management, and databases into a single connected platform. Founded in 2013 in San Francisco, Notion empowers teams and individuals to customize their workflows using modular building blocks, replacing dozens of separate productivity tools.",
  url: "https://notion.so",
  industry: "saas",
  categories: ["saas", "technology", "minimal-logos"],
  tags: [
    "productivity",
    "collaboration",
    "notes",
    "workspace",
    "project-management",
    "developer-tools",
  ],
  colors: [
    {
      name: "Notion Black",
      hex: "#000000",
      usage: "Primary brand color, text, logo, headings.",
    },
    {
      name: "Notion White",
      hex: "#FFFFFF",
      usage: "Primary background, logo on dark backgrounds.",
    },
    {
      name: "Warm Gray",
      hex: "#E3E2DE",
      usage: "Secondary background, cards, dividers.",
    },
    {
      name: "Brown",
      hex: "#9F6B53",
      usage: "Accent color, callout backgrounds, tags.",
    },
    {
      name: "Orange",
      hex: "#D9730D",
      usage: "Highlight accent, inline highlights, tags.",
    },
    {
      name: "Blue",
      hex: "#337EA9",
      usage: "Links, interactive elements, accent highlights.",
    },
  ],
  typography: [
    {
      name: "Notion Inter",
      role: "Primary / UI & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Notion (customized Inter)",
      fontUrl: "/brands/notion/fonts/notion-inter-regular.woff2",
    },
    {
      name: "Notion Inter SemiBold",
      role: "Headings & Emphasis",
      weights: ["600"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Notion (customized Inter)",
      fontUrl: "/brands/notion/fonts/notion-inter-semibold.woff2",
    },
  ],
  assets: [
    {
      label: "Notion Wordmark — Black",
      src: "/brands/notion/notion-wordmark-black.svg",
      width: 315,
      height: 90,
      format: "svg",
    },
    {
      label: "Notion Wordmark — White",
      src: "/brands/notion/notion-wordmark-white.svg",
      width: 315,
      height: 90,
      format: "svg",
    },
    {
      label: "Notion Icon — Black",
      src: "/brands/notion/notion-logo-black.svg",
      width: 132,
      height: 136,
      format: "svg",
    },
    {
      label: "Notion Icon — White",
      src: "/brands/notion/notion-logo-white.svg",
      width: 132,
      height: 136,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Notion Logo — Black",
    src: "/brands/notion/notion-logo-black.svg",
    width: 132,
    height: 136,
    format: "svg",
  },
  thumbnailDark: {
    label: "Notion Logo — White",
    src: "/brands/notion/notion-logo-white.svg",
    width: 132,
    height: 136,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2013,
  headquarters: "San Francisco, California",
  designer: "Notion Design Team",
  lastRebranded: "2023",
  philosophy:
    "Notion's identity embodies the principle that tools should be as flexible as the people using them. The minimal black-and-white palette and iconic page-with-N logomark reflect a belief in simplicity, modularity, and the idea that the best software gets out of your way.",
  legal: {
    guidelinesUrl: "https://www.notion.so/brand",
    dos: [
      "Use official Notion logos from the brand resources page",
      "Maintain clear space around the Notion logo",
      "Use the Notion wordmark or icon on clean, uncluttered backgrounds",
      "Refer to the company as 'Notion' (capitalized) in text",
    ],
    donts: [
      "Modify the Notion logo proportions or colors",
      "Use the Notion brand to imply endorsement without authorization",
      "Combine the Notion logo with other logos or symbols",
      "Place the Notion logo on visually busy or low-contrast backgrounds",
    ],
  },
}
