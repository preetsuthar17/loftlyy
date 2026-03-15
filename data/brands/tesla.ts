import type { Brand } from "@/lib/types"

export const tesla: Brand = {
  slug: "tesla",
  name: "Tesla",
  description:
    "Tesla is a global electric vehicle and clean energy company that designs, manufactures, and sells electric cars, battery energy storage systems, and solar products. Founded in 2003, Tesla has redefined the automotive industry with its focus on sustainable energy and cutting-edge technology.",
  url: "https://tesla.com",
  industry: "automotive",
  categories: ["automotive", "technology", "minimal-logos", "geometric-logos"],
  tags: [
    "electric-vehicles",
    "clean-energy",
    "innovation",
    "hardware",
    "software",
  ],
  colors: [
    {
      name: "Tesla Red",
      hex: "#E82127",
      usage: "Primary brand color, marketing, logo accent.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary text, dark backgrounds, logo applications.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Light backgrounds, reversed logo applications.",
    },
    {
      name: "Silver",
      hex: "#C0C0C0",
      usage: "Vehicle badges, metallic accents, product branding.",
    },
  ],
  typography: [
    {
      name: "Gotham",
      role: "Primary / Headings",
      weights: ["400", "500"],
      category: "sans-serif",
      designer: "Tobias Frere-Jones",
      foundry: "Hoefler & Co.",
      fontUrl: "/brands/tesla/fonts/gotham-book.woff2",
    },
    {
      name: "Gotham Medium",
      role: "Body / UI",
      weights: ["500"],
      category: "sans-serif",
      designer: "Tobias Frere-Jones",
      foundry: "Hoefler & Co.",
      fontUrl: "/brands/tesla/fonts/gotham-medium.woff2",
    },
  ],
  assets: [
    {
      label: "Tesla Logo + Wordmark — Red",
      src: "/brands/tesla/tesla-logo-red.svg",
      width: 560,
      height: 400,
      format: "svg",
    },
    {
      label: "Tesla Logo + Wordmark — Black",
      src: "/brands/tesla/tesla-logo-black.svg",
      width: 560,
      height: 400,
      format: "svg",
    },
    {
      label: "Tesla Logo + Wordmark — White",
      src: "/brands/tesla/tesla-logo-white.svg",
      width: 560,
      height: 400,
      format: "svg",
    },
    {
      label: "Tesla T Icon — Black",
      src: "/brands/tesla/tesla-icon-black.svg",
      width: 278,
      height: 310,
      format: "svg",
    },
    {
      label: "Tesla T Icon — White",
      src: "/brands/tesla/tesla-icon-white.svg",
      width: 278,
      height: 310,
      format: "svg",
    },
    {
      label: "Tesla T Icon — Red",
      src: "/brands/tesla/tesla-icon-red.svg",
      width: 278,
      height: 310,
      format: "svg",
    },
    {
      label: "Tesla Wordmark — Black",
      src: "/brands/tesla/tesla-wordmark-black.svg",
      width: 240,
      height: 40,
      format: "svg",
    },
    {
      label: "Tesla Wordmark — White",
      src: "/brands/tesla/tesla-wordmark-white.svg",
      width: 240,
      height: 40,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Tesla T Icon — Black",
    src: "/brands/tesla/tesla-icon-black.svg",
    width: 278,
    height: 310,
    format: "svg",
  },
  thumbnailDark: {
    label: "Tesla T Icon — White",
    src: "/brands/tesla/tesla-icon-white.svg",
    width: 278,
    height: 310,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2003,
  headquarters: "Austin, TX",
  designer: "RO Studio",
  lastRebranded: "2017",
  philosophy:
    "Tesla's identity centers on its iconic T emblem — a stylized cross-section of an electric motor rotor — that signals technology-driven disruption over traditional automotive heritage. The minimal, geometric mark positions Tesla as a Silicon Valley tech company that happens to make cars.",
  legal: {
    guidelinesUrl:
      "https://www.tesla.com/about/legal#trademark-usage-guidelines",
    dos: [
      "Use only official Tesla-provided logos and marks",
      "Maintain minimum clear space around the Tesla logo",
      "Use the Tesla logo in red, black, white, or silver only",
    ],
    donts: [
      "Modify, distort, or alter the Tesla logo in any way",
      "Use the Tesla name or logo to imply endorsement or sponsorship",
      "Combine the Tesla logo with other logos or symbols",
      "Use the Tesla logo on merchandise without written permission",
    ],
  },
}
