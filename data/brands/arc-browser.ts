import type { Brand } from "@/lib/types"

export const arcBrowser: Brand = {
  slug: "arc-browser",
  name: "Arc",
  description:
    "Arc was a reimagined web browser built by The Browser Company, designed to replace the traditional browser experience with a more organized, productive, and personal workspace. Publicly launched in July 2023, Arc introduced features like Spaces, Boosts, and a sidebar-first interface. In May 2025, The Browser Company announced Arc would be sunset to focus on their new AI browser Dia, and Atlassian acquired the company in September 2025.",
  url: "https://arc.net",
  industry: "technology",
  categories: ["technology", "minimal-logos", "geometric-logos"],
  tags: ["browser", "productivity", "developer-tools", "design-tools"],
  colors: [
    {
      name: "Arc Blue",
      hex: "#3139FB",
      usage: "Primary brand color, used in hero sections, backgrounds, and key brand moments.",
    },
    {
      name: "Arc Red",
      hex: "#FF5060",
      usage: "Secondary accent, used in the logo, CTAs, and interactive highlights.",
    },
    {
      name: "Deep Indigo",
      hex: "#2702C2",
      usage: "Dark accent for banners, gradient overlays, and deep backgrounds.",
    },
    {
      name: "Arc Pink",
      hex: "#FF9999",
      usage: "Soft accent for illustrations, logo elements, and decorative touches.",
    },
    {
      name: "Brand Off-White",
      hex: "#FFFCEC",
      usage: "Light background, text on dark surfaces, content areas.",
    },
    {
      name: "Royal Purple",
      hex: "#210784",
      usage: "Deep accent for logo elements and subtle contrast details.",
    },
  ],
  typography: [
    {
      name: "Marlin Soft SQ",
      role: "Display / Headings",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "The Browser Company",
      foundry: "Custom",
      fontUrl: "/brands/arc-browser/fonts/marlin.woff2",
    },
    {
      name: "Inter",
      role: "Body / UI",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Google Fonts",
      fontUrl: "/brands/arc-browser/fonts/inter-variable.woff2",
    },
  ],
  assets: [
    {
      label: "Arc Logomark — Brand",
      src: "/brands/arc-browser/arc-browser-logo-brand.svg",
      width: 128,
      height: 112,
      format: "svg",
    },
    {
      label: "Arc Logomark — Black",
      src: "/brands/arc-browser/arc-browser-logo-black.svg",
      width: 128,
      height: 112,
      format: "svg",
    },
    {
      label: "Arc Logomark — White",
      src: "/brands/arc-browser/arc-browser-logo-white.svg",
      width: 128,
      height: 112,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Arc Logomark — Brand",
    src: "/brands/arc-browser/arc-browser-logo-brand.svg",
    width: 128,
    height: 112,
    format: "svg",
  },
  thumbnailDark: {
    label: "Arc Logomark — White",
    src: "/brands/arc-browser/arc-browser-logo-white.svg",
    width: 128,
    height: 112,
    format: "svg",
  },
  dateAdded: "2026-03-25",
  founded: 2019,
  headquarters: "New York, New York",
  designer: "Josh Miller, Hursh Agrawal & The Browser Company Design Team",
  lastRebranded: "2022",
  philosophy:
    "Arc reimagines the browser as a creative, personal workspace rather than a passive window to the web. Its identity blends bold color, playful geometry, and a warm, human-centered design language that sets it apart from the utilitarian aesthetics of traditional browsers.",
  legal: {
    guidelinesUrl: "https://arc.net",
    dos: [
      "Use official Arc brand assets for press and editorial coverage",
      "Maintain the multicolored logo on neutral backgrounds",
      "Refer to the product as 'Arc' or 'Arc browser' in text",
      "Use the monochrome variants when color reproduction is limited",
    ],
    donts: [
      "Alter the colors, proportions, or arrangement of the Arc logo",
      "Use Arc branding to imply partnership or endorsement without permission",
      "Place the multicolor logo on busy or clashing backgrounds",
      "Use the Arc name or logo in other product names or domain names",
    ],
  },
}
