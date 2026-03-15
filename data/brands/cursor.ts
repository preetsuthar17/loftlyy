import type { Brand } from "@/lib/types"

export const cursor: Brand = {
  slug: "cursor",
  name: "Cursor",
  description:
    "Cursor is an AI-powered code editor built by Anysphere that enhances developer productivity through intelligent code completion, autonomous agents, and natural language editing. It positions itself as the best way to code with AI.",
  url: "https://cursor.com",
  industry: "ai",
  categories: ["ai", "saas", "technology", "minimal-logos", "geometric-logos"],
  tags: [
    "artificial-intelligence",
    "developer-tools",
    "code-editor",
    "machine-learning",
    "productivity",
  ],
  colors: [
    {
      name: "Cursor Off-White",
      hex: "#F7F7F4",
      usage:
        "Primary light background, used across the main site and marketing.",
    },
    {
      name: "Cursor Black",
      hex: "#14120B",
      usage: "Primary dark background and text color in light mode.",
    },
    {
      name: "Cursor Text",
      hex: "#26251E",
      usage: "Body text and headings in light mode.",
    },
    {
      name: "Cursor Dark Gray",
      hex: "#43413C",
      usage: "Secondary text and UI accents.",
    },
    {
      name: "Cursor Light Text",
      hex: "#EDECEC",
      usage: "Body text and headings in dark mode.",
    },
  ],
  typography: [
    {
      name: "Cursor Gothic",
      role: "Headings / Display",
      weights: ["400", "400i", "700", "700i"],
      category: "sans-serif",
      designer: "Anysphere Design Team",
      foundry: "Anysphere",
      fontUrl: "/brands/cursor/fonts/cursor-gothic-regular.woff2",
    },
    {
      name: "Berkeley Mono",
      role: "Code / Technical",
      weights: ["400"],
      category: "monospace",
      designer: "Neil Ingle",
      foundry: "Berkeley Graphics",
      fontUrl: "/brands/cursor/fonts/berkeley-mono-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Cursor Logo — Black",
      src: "/brands/cursor/cursor-logo-black.svg",
      width: 2193,
      height: 545,
      format: "svg",
    },
    {
      label: "Cursor Logo — White",
      src: "/brands/cursor/cursor-logo-white.svg",
      width: 2193,
      height: 545,
      format: "svg",
    },
    {
      label: "Cursor Icon — Black",
      src: "/brands/cursor/cursor-icon-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Cursor Icon — White",
      src: "/brands/cursor/cursor-icon-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Cursor Icon — Black",
    src: "/brands/cursor/cursor-icon-black.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Cursor Icon — White",
    src: "/brands/cursor/cursor-icon-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2023,
  headquarters: "San Francisco, CA",
  designer: "Anysphere Design Team",
  philosophy:
    "Minimal, dark, and developer-centric. Cursor's identity pairs warm off-white tones with deep charcoal backgrounds, reflecting a tool built by developers for developers — fast, focused, and unapologetically technical.",
  legal: {
    dos: [
      "Use the official Cursor logo assets provided",
      "Maintain adequate clear space around the logo",
      "Use approved color variants on appropriate backgrounds",
    ],
    donts: [
      "Modify the Cursor logo proportions or colors",
      "Use the Cursor name to imply official endorsement",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
