import type { Brand } from "@/lib/types"

export const snapchat: Brand = {
  slug: "snapchat",
  name: "Snapchat",
  description:
    "Snapchat is a multimedia messaging app known for its ephemeral photo and video sharing, augmented reality lenses, and Stories format. Developed by Snap Inc., it pioneered disappearing content and has become one of the most popular social platforms among younger demographics worldwide.",
  url: "https://snapchat.com",
  industry: "social-media",
  categories: ["social-media", "technology"],
  tags: ["messaging", "camera", "augmented-reality", "ephemeral", "social"],
  colors: [
    {
      name: "Snapchat Yellow",
      hex: "#FFFC00",
      usage:
        "Primary brand color. Used as the app icon background, marketing materials, and core brand identity.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage:
        "Used for the Ghost logo on yellow backgrounds, typography, and UI elements.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Ghost logo on dark backgrounds, text on dark surfaces, and clean UI layouts.",
    },
    {
      name: "Gray",
      hex: "#D9D9D9",
      usage:
        "Secondary UI color for borders, dividers, and subtle background elements.",
    },
  ],
  typography: [
    {
      name: "Graphik",
      role: "Primary Brand Typeface",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Christian Schwartz",
      foundry: "Commercial Type",
    },
    {
      name: "DM Sans",
      role: "Alternative / Fallback",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Google Fonts",
      fontUrl: "/brands/snapchat/fonts/dm-sans.woff2",
    },
  ],
  assets: [
    {
      label: "Ghost Icon (Black)",
      src: "/brands/snapchat/snapchat-ghost-black.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Ghost Icon (White)",
      src: "/brands/snapchat/snapchat-ghost-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Ghost Icon (Yellow)",
      src: "/brands/snapchat/snapchat-ghost-yellow.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Full Wordmark (Dark)",
      src: "/brands/snapchat/snapchat-logo-black.svg",
      width: 1475,
      height: 283,
      format: "svg",
    },
    {
      label: "Full Wordmark (White)",
      src: "/brands/snapchat/snapchat-logo-white.svg",
      width: 960,
      height: 184,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Ghost Icon",
    src: "/brands/snapchat/snapchat-ghost-black.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  thumbnailDark: {
    label: "Ghost Icon (White)",
    src: "/brands/snapchat/snapchat-ghost-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2011,
  headquarters: "Santa Monica, CA",
  designer: "Snap Inc. Design Team",
  lastRebranded: "2019",
  philosophy:
    "Snapchat's identity is built around the iconic Ghost — a playful, approachable symbol that represents the ephemeral nature of the platform. The bold yellow and minimal ghost silhouette create instant recognition, embodying creativity, spontaneity, and authentic self-expression.",
  legal: {
    guidelinesUrl: "https://snap.com/brand-guidelines",
    dos: [
      "Use the official Snapchat Ghost logo as provided in official brand assets.",
      "Maintain clear space around the Ghost logo equal to the height of the Ghost's body.",
      "Use Snapchat Yellow (#FFFC00) as the primary background color when displaying the logo.",
    ],
    donts: [
      "Alter, rotate, or distort the Ghost logo in any way.",
      "Use the Ghost logo as part of a sentence or combined with other logos.",
      "Change the colors of the Ghost logo outside of approved variations.",
      "Use the Snapchat name or logo to imply endorsement or partnership without permission.",
      "Create derivative works based on Snapchat's branding or visual identity.",
    ],
  },
}
