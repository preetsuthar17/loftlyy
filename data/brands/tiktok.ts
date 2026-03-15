import type { Brand } from "@/lib/types"

export const tiktok: Brand = {
  slug: "tiktok",
  name: "TikTok",
  description:
    "TikTok is the world's leading short-form video platform, where over a billion users create, discover, and share entertaining content. Launched internationally in 2017 by ByteDance, TikTok has redefined social media with its algorithm-driven feed and creative tools for music, comedy, education, and culture.",
  url: "https://tiktok.com",
  industry: "social-media",
  categories: ["social-media", "entertainment", "technology"],
  tags: [
    "video",
    "streaming",
    "social-media",
    "entertainment",
    "short-form-video",
  ],
  colors: [
    {
      name: "TikTok Cyan",
      hex: "#25F4EE",
      usage:
        "Primary accent color, used in the logo's offset effect and UI highlights.",
    },
    {
      name: "TikTok Red",
      hex: "#FE2C55",
      usage:
        "Primary accent color, used in the logo's offset effect and interactive elements.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary logo color and text, core to the brand's bold identity.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds and text on dark surfaces.",
    },
  ],
  typography: [
    {
      name: "TikTok Sans",
      role: "Display / Headlines + UI",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "TikTok / Grilli Type",
      fontUrl: "/brands/tiktok/fonts/tiktok-sans-regular.woff2",
    },
  ],
  assets: [
    {
      label: "TikTok Icon — Color",
      src: "/brands/tiktok/tiktok-icon-color.svg",
      width: 256,
      height: 335,
      format: "svg",
    },
    {
      label: "TikTok Icon — Black",
      src: "/brands/tiktok/tiktok-icon-black.svg",
      width: 256,
      height: 335,
      format: "svg",
    },
    {
      label: "TikTok Icon — White",
      src: "/brands/tiktok/tiktok-icon-white.svg",
      width: 256,
      height: 335,
      format: "svg",
    },
    {
      label: "TikTok Wordmark — Black",
      src: "/brands/tiktok/tiktok-wordmark-black.svg",
      width: 750,
      height: 196,
      format: "svg",
    },
    {
      label: "TikTok Wordmark — White",
      src: "/brands/tiktok/tiktok-wordmark-white.svg",
      width: 750,
      height: 196,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "TikTok Icon — Color",
    src: "/brands/tiktok/tiktok-icon-color.svg",
    width: 256,
    height: 335,
    format: "svg",
  },
  thumbnailDark: {
    label: "TikTok Icon — White",
    src: "/brands/tiktok/tiktok-icon-white.svg",
    width: 256,
    height: 335,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2016,
  headquarters: "Los Angeles, California / Beijing, China",
  designer: "TikTok Design Team",
  lastRebranded: "2023",
  philosophy:
    "Energetic, youthful, and unmistakably digital. TikTok's identity pairs a bold note symbol with a glitch-inspired cyan-and-red offset effect, creating a sense of movement and creativity that mirrors the platform's endless stream of short-form content.",
  legal: {
    guidelinesUrl: "https://www.tiktok.com/brand",
    dos: [
      "Use the official TikTok logo with the cyan and red glitch effect on appropriate backgrounds",
      "Maintain clear space around the logo equal to the height of the musical note",
      "Use official brand assets from tiktok.com/brand",
    ],
    donts: [
      "Alter the TikTok logo colors, proportions, or glitch offset",
      "Place the TikTok logo on busy or low-contrast backgrounds",
      "Use the TikTok name or logo to imply endorsement without permission",
      "Separate the note icon from the wordmark in the combined logo",
    ],
  },
}
