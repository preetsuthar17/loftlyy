import type { Brand } from "@/lib/types"

export const onlyfans: Brand = {
  slug: "onlyfans",
  name: "OnlyFans",
  description:
    "OnlyFans is a subscription-based content platform where creators earn directly from their fans through monthly subscriptions, tips, and pay-per-view content. Founded in 2016, it has grown to over 4 million creators and 370 million users, becoming a defining platform in the creator economy.",
  url: "https://onlyfans.com",
  industry: "social-media",
  categories: ["social-media", "technology"],
  tags: [
    "social-media",
    "creators",
    "subscriptions",
    "content-platform",
    "creator-economy",
  ],
  colors: [
    {
      name: "OnlyFans Blue",
      hex: "#00AFF0",
      usage:
        "Primary brand color used across the logo, website, buttons, icons, and social media profiles.",
    },
    {
      name: "OnlyFans Dark Blue",
      hex: "#008CCF",
      usage:
        "Secondary brand color used in the 'Fans' portion of the wordmark for tonal depth.",
    },
    {
      name: "Charcoal",
      hex: "#27272B",
      usage:
        "Near-black used for text, UI elements, and the monochrome wordmark on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Used for the reversed wordmark on dark backgrounds and light UI surfaces.",
    },
  ],
  typography: [
    {
      name: "Roboto",
      role: "Primary / UI",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Christian Robertson",
      foundry: "Google",
      fontUrl: "/brands/onlyfans/fonts/roboto-regular.woff2",
    },
    {
      name: "Roboto Bold",
      role: "Headings / Emphasis",
      weights: ["700"],
      category: "sans-serif",
      designer: "Christian Robertson",
      foundry: "Google",
      fontUrl: "/brands/onlyfans/fonts/roboto-bold.woff2",
    },
  ],
  assets: [
    {
      label: "OnlyFans Icon — Color",
      src: "/brands/onlyfans/onlyfans-logo-color.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "OnlyFans Icon — Black",
      src: "/brands/onlyfans/onlyfans-logo-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "OnlyFans Icon — White",
      src: "/brands/onlyfans/onlyfans-logo-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "OnlyFans Wordmark — Color",
      src: "/brands/onlyfans/onlyfans-wordmark-color.svg",
      width: 480,
      height: 115,
      format: "svg",
    },
    {
      label: "OnlyFans Wordmark — Black",
      src: "/brands/onlyfans/onlyfans-wordmark-black.svg",
      width: 480,
      height: 115,
      format: "svg",
    },
    {
      label: "OnlyFans Wordmark — White",
      src: "/brands/onlyfans/onlyfans-wordmark-white.svg",
      width: 480,
      height: 115,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "OnlyFans Icon — Color",
    src: "/brands/onlyfans/onlyfans-logo-color.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "OnlyFans Icon — White",
    src: "/brands/onlyfans/onlyfans-logo-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-25",
  founded: 2016,
  headquarters: "London, England",
  designer: "OnlyFans Design Team",
  lastRebranded: "2021",
  philosophy:
    "OnlyFans' identity centers on a clean, two-tone blue wordmark that conveys trust, accessibility, and modernity. The light-to-dark blue gradient across the logotype symbolizes the connection between creators and their audiences, while the minimal aesthetic reflects the platform's focus on putting creators first.",
  legal: {
    guidelinesUrl: "https://onlyfans.com/brand",
    dos: [
      "Use only official OnlyFans-provided logo artwork",
      "Maintain minimum clear space around the wordmark",
      "Use the wordmark in approved color, black, or white versions",
      "Always capitalize 'OnlyFans' as one word with capital O and F",
    ],
    donts: [
      "Modify, rotate, or distort the OnlyFans wordmark",
      "Separate 'Only' and 'Fans' into two words",
      "Use the OnlyFans name or logo in a way that implies endorsement",
      "Alter the brand colors or apply custom gradients to the logo",
      "Use outdated versions of the OnlyFans logo",
    ],
  },
}
