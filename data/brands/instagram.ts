import type { Brand } from "@/lib/types"

export const instagram: Brand = {
  slug: "instagram",
  name: "Instagram",
  description:
    "Instagram is a photo and video sharing social networking platform owned by Meta Platforms. Launched in 2010, it has grown into one of the world's most popular social media apps with over 2 billion monthly active users, known for its focus on visual storytelling, Reels, and creator culture.",
  url: "https://www.instagram.com",
  industry: "social-media",
  categories: ["social-media", "technology", "gradient-brands"],
  tags: [
    "social-media",
    "photography",
    "video",
    "creators",
    "messaging",
    "advertising",
  ],
  colors: [
    {
      name: "Instagram Gradient Yellow",
      hex: "#FCAF45",
      usage:
        "Part of the signature gradient palette, representing warmth and creativity.",
    },
    {
      name: "Instagram Gradient Orange",
      hex: "#F56040",
      usage:
        "Core gradient color used in the glyph and brand materials for energy and vibrancy.",
    },
    {
      name: "Instagram Gradient Pink",
      hex: "#E1306C",
      usage:
        "Central gradient color that defines the brand's warm, expressive identity.",
    },
    {
      name: "Instagram Gradient Purple",
      hex: "#833AB4",
      usage:
        "Gradient accent used in the glyph and brand assets for depth and richness.",
    },
    {
      name: "Instagram Gradient Blue",
      hex: "#405DE6",
      usage:
        "Cool end of the gradient spectrum, providing balance and contrast.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Used for the glyph and wordmark on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Used for the glyph and wordmark on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Instagram Sans",
      role: "Primary / Headings",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/instagram/fonts/instagram-sans-regular.woff2",
    },
    {
      name: "Instagram Sans Bold",
      role: "Display / Emphasis",
      weights: ["700"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/instagram/fonts/instagram-sans-bold.woff2",
    },
  ],
  assets: [
    {
      label: "Instagram Glyph — Color",
      src: "/brands/instagram/instagram-glyph-color.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Instagram Glyph — Black",
      src: "/brands/instagram/instagram-glyph-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Instagram Glyph — White",
      src: "/brands/instagram/instagram-glyph-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Instagram Wordmark — Color",
      src: "/brands/instagram/instagram-wordmark-color.svg",
      width: 480,
      height: 158,
      format: "svg",
    },
    {
      label: "Instagram Wordmark — Black",
      src: "/brands/instagram/instagram-wordmark-black.svg",
      width: 480,
      height: 158,
      format: "svg",
    },
    {
      label: "Instagram Wordmark — White",
      src: "/brands/instagram/instagram-wordmark-white.svg",
      width: 480,
      height: 158,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Instagram Glyph — Color",
    src: "/brands/instagram/instagram-glyph-color.svg",
    width: 140,
    height: 162,
    format: "svg",
  },
  thumbnailDark: {
    label: "Instagram Glyph — White",
    src: "/brands/instagram/instagram-glyph-white.svg",
    width: 140,
    height: 162,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2010,
  headquarters: "Menlo Park, CA",
  designer: "Colophon Foundry, Instagram Design Team",
  lastRebranded: "2022",
  philosophy:
    "Instagram's 2022 rebrand embraces a vibrant, dynamic gradient palette and the custom Instagram Sans typeface — inspired by the iconic squircle glyph. The identity blends grotesque and geometric type styles with 3D-modeled color to celebrate global creativity and self-expression.",
  legal: {
    guidelinesUrl: "https://about.instagram.com/brand",
    dos: [
      "Use only official Instagram-provided logo artwork",
      "Maintain minimum clear space around the glyph and wordmark",
      "Use the glyph icon or wordmark in approved single colors or gradient form",
      "Always capitalize the 'I' in Instagram when referring to the brand by name",
    ],
    donts: [
      "Modify, rotate, or distort the Instagram glyph or wordmark",
      "Use the old Instagram logo or camera icon in place of the current identity",
      "Combine the Instagram name or logo with your own branding",
      "Use the Instagram gradient in unapproved contexts or custom applications",
      "Abbreviate or alter the Instagram name (e.g., 'Insta' or 'IG') in official contexts",
    ],
  },
}
