import type { Brand } from "@/lib/types"

export const toyota: Brand = {
  slug: "toyota",
  name: "Toyota",
  description:
    "Toyota Motor Corporation is the world's largest automobile manufacturer, producing approximately 10 million vehicles per year. Founded in 1937 by Kiichiro Toyoda, the company is headquartered in Toyota City, Japan, and is known for pioneering hybrid technology and the Toyota Production System.",
  url: "https://toyota.com",
  industry: "automotive",
  categories: ["automotive", "technology", "geometric-logos"],
  tags: [
    "automotive",
    "manufacturing",
    "hybrid",
    "innovation",
    "hardware",
  ],
  colors: [
    {
      name: "Toyota Red",
      hex: "#EB0A1E",
      usage:
        "Primary brand color — the color of excitement, energy, and confidence.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Typography, dark backgrounds, high-contrast logo applications.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "White space to promote visibility and impact.",
    },
    {
      name: "Gray",
      hex: "#58595B",
      usage: "Secondary color for headlines and body text.",
    },
  ],
  typography: [
    {
      name: "Toyota Type",
      role: "Primary / Headings",
      weights: ["300", "400", "600"],
      category: "sans-serif",
      designer: "Steve Matteson",
      foundry: "Monotype",
      fontUrl: "/brands/toyota/fonts/ToyotaType-Semibold.woff2",
    },
    {
      name: "Toyota Type Book",
      role: "Body / UI",
      weights: ["400"],
      category: "sans-serif",
      designer: "Steve Matteson",
      foundry: "Monotype",
      fontUrl: "/brands/toyota/fonts/ToyotaType-Book.woff2",
    },
  ],
  assets: [
    {
      label: "Toyota Logo + Wordmark — Red",
      src: "/brands/toyota/toyota-logo-red.svg",
      width: 772,
      height: 140,
      format: "svg",
    },
    {
      label: "Toyota Logo + Wordmark — Black",
      src: "/brands/toyota/toyota-logo-black.svg",
      width: 772,
      height: 140,
      format: "svg",
    },
    {
      label: "Toyota Logo + Wordmark — White",
      src: "/brands/toyota/toyota-logo-white.svg",
      width: 772,
      height: 140,
      format: "svg",
    },
    {
      label: "Toyota Emblem — Red",
      src: "/brands/toyota/toyota-emblem-red.svg",
      width: 200,
      height: 130,
      format: "svg",
    },
    {
      label: "Toyota Emblem — Black",
      src: "/brands/toyota/toyota-emblem-black.svg",
      width: 200,
      height: 130,
      format: "svg",
    },
    {
      label: "Toyota Emblem — White",
      src: "/brands/toyota/toyota-emblem-white.svg",
      width: 200,
      height: 130,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Toyota Emblem — Black",
    src: "/brands/toyota/toyota-emblem-black.svg",
    width: 200,
    height: 130,
    format: "svg",
  },
  thumbnailDark: {
    label: "Toyota Emblem — White",
    src: "/brands/toyota/toyota-emblem-white.svg",
    width: 200,
    height: 130,
    format: "svg",
  },
  dateAdded: "2026-03-21",
  founded: 1937,
  headquarters: "Toyota City, Aichi, Japan",
  designer: "Toyota In-House / The&Partnership",
  lastRebranded: "2020",
  philosophy:
    "Toyota's identity is anchored by its iconic three-overlapping-ellipses emblem, representing the unification of customer hearts and Toyota's heart, and the limitless possibilities of technology. The clean, geometric mark conveys trust, reliability, and global unity — core to Toyota's kaizen philosophy of continuous improvement.",
  legal: {
    guidelinesUrl: "https://brand.toyota.com/guidelines",
    dos: [
      "Use only official Toyota-provided logos and marks",
      "Maintain minimum clear space around the Toyota emblem",
      "Use Toyota Red, black, or white for logo applications",
    ],
    donts: [
      "Modify, distort, or alter the Toyota emblem in any way",
      "Use the Toyota name or logo to imply endorsement without permission",
      "Combine the Toyota logo with other logos or brand elements",
      "Reproduce the Toyota logo on merchandise without written authorization",
    ],
  },
}
