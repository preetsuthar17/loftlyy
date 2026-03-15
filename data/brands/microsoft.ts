import type { Brand } from "@/lib/types"

export const microsoft: Brand = {
  slug: "microsoft",
  name: "Microsoft",
  description:
    "Microsoft is a global technology corporation that develops software, hardware, and cloud services powering businesses and consumers worldwide. From Windows and Office to Azure and Xbox, Microsoft's products touch billions of people, making it one of the most influential technology companies in history.",
  url: "https://microsoft.com",
  industry: "technology",
  categories: ["technology", "geometric-logos"],
  tags: [
    "software",
    "cloud",
    "productivity",
    "ai",
    "developer-tools",
    "hardware",
    "ecosystem",
  ],
  colors: [
    {
      name: "Microsoft Red",
      hex: "#F25022",
      usage: "Top-left quadrant of the Windows logo, emphasis, alerts.",
    },
    {
      name: "Microsoft Green",
      hex: "#7FBA00",
      usage: "Top-right quadrant of the Windows logo, Xbox branding, success states.",
    },
    {
      name: "Microsoft Blue",
      hex: "#00A4EF",
      usage: "Bottom-left quadrant of the Windows logo, primary links, Azure branding.",
    },
    {
      name: "Microsoft Yellow",
      hex: "#FFB900",
      usage: "Bottom-right quadrant of the Windows logo, highlights, Bing accents.",
    },
    {
      name: "Microsoft Gray",
      hex: "#737373",
      usage: "Wordmark color, secondary text, UI elements.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Text, high-contrast logo usage.",
    },
  ],
  typography: [
    {
      name: "Segoe UI",
      role: "Primary UI / Brand typeface",
      weights: ["300", "400", "600", "700"],
      category: "sans-serif",
      designer: "Steve Matteson",
      foundry: "Microsoft / Monotype",
      fontUrl: "/brands/microsoft/fonts/segoe-ui.woff2",
    },
    {
      name: "Segoe UI Italic",
      role: "Emphasis / Editorial",
      weights: ["400"],
      category: "sans-serif",
      designer: "Steve Matteson",
      foundry: "Microsoft / Monotype",
      fontUrl: "/brands/microsoft/fonts/segoe-ui-italic.woff2",
    },
  ],
  assets: [
    {
      label: "Microsoft Logo — Color",
      src: "/brands/microsoft/microsoft-logo-color.svg",
      width: 1200,
      height: 250,
      format: "svg",
    },
    {
      label: "Microsoft Logo — Black",
      src: "/brands/microsoft/microsoft-logo-black.svg",
      width: 1200,
      height: 250,
      format: "svg",
    },
    {
      label: "Microsoft Logo — White",
      src: "/brands/microsoft/microsoft-logo-white.svg",
      width: 1200,
      height: 250,
      format: "svg",
    },
    {
      label: "Microsoft Icon — Color",
      src: "/brands/microsoft/microsoft-icon-color.svg",
      width: 200,
      height: 200,
      format: "svg",
    },
    {
      label: "Microsoft Icon — Black",
      src: "/brands/microsoft/microsoft-icon-black.svg",
      width: 200,
      height: 200,
      format: "svg",
    },
    {
      label: "Microsoft Icon — White",
      src: "/brands/microsoft/microsoft-icon-white.svg",
      width: 200,
      height: 200,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Microsoft Icon — Color",
    src: "/brands/microsoft/microsoft-icon-color.svg",
    width: 200,
    height: 200,
    format: "svg",
  },
  thumbnailDark: {
    label: "Microsoft Icon — White",
    src: "/brands/microsoft/microsoft-icon-white.svg",
    width: 200,
    height: 200,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 1975,
  headquarters: "Redmond, WA",
  designer: "Microsoft Design Team",
  lastRebranded: "2012",
  philosophy:
    "Microsoft's four-color window symbolizes openness and diversity — four distinct panes coming together as one. The clean, geometric grid and neutral Segoe wordmark communicate reliability, scale, and the company's evolution from software giant to cloud-first, AI-powered platform.",
  legal: {
    guidelinesUrl:
      "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks",
    dos: [
      "Use only official Microsoft-provided artwork",
      "Maintain clear space around the Microsoft logo",
      "Use the logo in approved color combinations only",
      "Reference Microsoft products by their full trademarked names",
    ],
    donts: [
      "Modify, animate, or distort the Microsoft logo",
      "Combine the Microsoft logo with other logos or icons",
      "Use the Microsoft name or logo in a way that implies endorsement",
      "Alter the proportions or colors of the four-color window mark",
      "Use Microsoft trademarks as part of your own product name",
    ],
  },
}
