import type { Brand } from "@/lib/types"

export const adidas: Brand = {
  slug: "adidas",
  name: "adidas",
  description:
    "adidas is a global sportswear brand headquartered in Herzogenaurach, Germany. Founded in 1949 by Adolf Dassler, adidas designs and sells footwear, apparel, and accessories for sport and everyday wear. Known for the iconic Three Stripes and the mountain-shaped performance mark, adidas has grown into one of the world's most recognizable sports brands through a relentless focus on sport, culture, and sustainability.",
  url: "https://adidas.com",
  industry: "sportswear",
  categories: ["sportswear", "geometric-logos", "minimal-logos"],
  tags: [
    "sportswear",
    "footwear",
    "apparel",
    "athletics",
    "fashion",
    "streetwear",
    "sustainability",
  ],
  colors: [
    {
      name: "adidas Black",
      hex: "#000000",
      usage:
        "Primary brand color. Used for the logo, wordmark, Three Stripes mark, and primary text across all brand communications.",
    },
    {
      name: "adidas White",
      hex: "#FFFFFF",
      usage:
        "Primary background and inverse color. Used for light backgrounds and white logo variants.",
    },
    {
      name: "Light Grey",
      hex: "#ECECE6",
      usage:
        "Secondary neutral. Used for subtle backgrounds, off-white surfaces, and muted content areas.",
    },
    {
      name: "Performance Blue",
      hex: "#0060A9",
      usage:
        "Sport sub-brand accent. Used in adidas performance and sport-specific product lines.",
    },
  ],
  typography: [
    {
      name: "AdihausDIN",
      role: "Primary Brand Typeface",
      weights: ["300", "400", "500", "700"],
      category: "sans-serif",
      designer: "adidas Design Team",
      foundry: "adidas",
    },
  ],
  assets: [
    {
      label: "Three Stripes Mark — Black",
      src: "/brands/adidas/adidas-logo-black.svg",
      width: 200,
      height: 126,
      format: "svg",
    },
    {
      label: "Three Stripes Mark — White",
      src: "/brands/adidas/adidas-logo-white.svg",
      width: 200,
      height: 126,
      format: "svg",
    },
    {
      label: "adidas Wordmark — Black",
      src: "/brands/adidas/adidas-wordmark-black.svg",
      width: 725,
      height: 500,
      format: "svg",
    },
    {
      label: "adidas Wordmark — White",
      src: "/brands/adidas/adidas-wordmark-white.svg",
      width: 725,
      height: 500,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Three Stripes Mark — Black",
    src: "/brands/adidas/adidas-logo-black.svg",
    width: 200,
    height: 126,
    format: "svg",
  },
  thumbnailDark: {
    label: "Three Stripes Mark — White",
    src: "/brands/adidas/adidas-logo-white.svg",
    width: 200,
    height: 126,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 1949,
  headquarters: "Herzogenaurach, Bavaria, Germany",
  designer: "Adolf Dassler (founder), adidas Design Team",
  lastRebranded: "2014",
  philosophy:
    "Through sport, we have the power to change lives. adidas's bold black-and-white identity strips away distraction — the Three Stripes and the iconic mountain mark have become universal symbols of athletic achievement, cultural relevance, and the belief that sport is the great equalizer.",
  legal: {
    guidelinesUrl: "https://www.adidas-group.com/en/brands/adidas/",
    dos: [
      "Use the adidas logo in black or white only on approved backgrounds",
      "Maintain minimum clear space around the Three Stripes mark",
      "Use officially licensed adidas brand assets from official brand kits",
      "Ensure the logo always appears legible and without visual interference",
    ],
    donts: [
      "Modify, distort, or add effects to the adidas logo or Three Stripes mark",
      "Use the adidas logo in unauthorized colors or with added gradients",
      "Reproduce the Three Stripes in a manner that could imply endorsement",
      "Use adidas trademarks in a way that suggests partnership without authorization",
      "Place the logo on busy or low-contrast backgrounds that reduce legibility",
    ],
  },
}
