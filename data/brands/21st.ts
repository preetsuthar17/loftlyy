import type { Brand } from "@/lib/types"

export const twentyFirst: Brand = {
  slug: "21st",
  name: "21st",
  description:
    "21st.dev is a developer platform that provides infrastructure and UI building blocks for the agentic internet. It offers the 21st Agents SDK for building and deploying AI agents, along with thousands of community-published React components for rapid product development.",
  url: "https://21st.dev",
  industry: "ai",
  categories: ["ai", "saas", "technology", "minimal-logos", "geometric-logos"],
  tags: [
    "artificial-intelligence",
    "developer-tools",
    "open-source",
    "ui-components",
    "agents",
  ],
  colors: [
    {
      name: "21st Black",
      hex: "#09090B",
      usage: "Primary background and text color in dark mode.",
    },
    {
      name: "21st White",
      hex: "#FFFFFF",
      usage: "Primary background in light mode and text on dark surfaces.",
    },
    {
      name: "21st Blue",
      hex: "#0034FF",
      usage:
        "Accent color used for interactive elements, links, and brand highlights.",
    },
  ],
  typography: [
    {
      name: "Geist Sans",
      role: "Primary / UI",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "sans-serif",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/21st/fonts/geist-sans.woff2",
    },
    {
      name: "Geist Mono",
      role: "Code / Technical",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "monospace",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/21st/fonts/geist-mono.woff2",
    },
  ],
  assets: [
    {
      label: "21st Icon — Blue",
      src: "/brands/21st/21st-logo-blue.svg",
      width: 400,
      height: 400,
      format: "svg",
    },
    {
      label: "21st Icon — Black",
      src: "/brands/21st/21st-logo-black.svg",
      width: 400,
      height: 400,
      format: "svg",
    },
    {
      label: "21st Icon — White",
      src: "/brands/21st/21st-logo-white.svg",
      width: 400,
      height: 400,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "21st Icon — Blue",
    src: "/brands/21st/21st-logo-blue.svg",
    width: 400,
    height: 400,
    format: "svg",
  },
  thumbnailDark: {
    label: "21st Icon — Blue",
    src: "/brands/21st/21st-logo-blue.svg",
    width: 400,
    height: 400,
    format: "svg",
  },
  dateAdded: "2026-03-17",
  founded: 2024,
  headquarters: "San Francisco, CA",
  philosophy:
    "Dark, minimal, and developer-first. 21st's identity reflects the precision and speed of modern AI tooling — a geometric logomark paired with Vercel's Geist type family signals a product built for the agentic internet, where clarity and performance are paramount.",
  legal: {
    dos: [
      "Use the official 21st logo assets provided",
      "Maintain adequate clear space around the logo",
      "Use approved color variants on appropriate backgrounds",
    ],
    donts: [
      "Modify the 21st logo proportions or colors",
      "Use the 21st name to imply official endorsement",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
