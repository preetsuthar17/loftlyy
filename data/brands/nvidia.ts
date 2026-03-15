import type { Brand } from "@/lib/types"

export const nvidia: Brand = {
  slug: "nvidia",
  name: "NVIDIA",
  description:
    "NVIDIA is a global technology company that designs graphics processing units (GPUs) and system-on-chip units. A pioneer in accelerated computing, NVIDIA's platforms power everything from gaming and professional visualization to data centers and autonomous vehicles, and have become the backbone of modern artificial intelligence.",
  url: "https://nvidia.com",
  industry: "technology",
  categories: ["technology", "ai", "geometric-logos"],
  tags: [
    "artificial-intelligence",
    "machine-learning",
    "gpu",
    "gaming",
    "data-center",
    "autonomous-vehicles",
  ],
  colors: [
    {
      name: "NVIDIA Green",
      hex: "#76B900",
      usage:
        "Primary brand color, used in the eye mark and as the signature accent across all brand touchpoints.",
    },
    {
      name: "NVIDIA Black",
      hex: "#000000",
      usage:
        "Primary text color and wordmark fill, used for high-contrast applications and dark backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Used for text and logos on dark backgrounds, ensuring readability and contrast.",
    },
    {
      name: "Dark Gray",
      hex: "#1A1A1A",
      usage:
        "Secondary dark tone used for website backgrounds and UI surfaces.",
    },
  ],
  typography: [
    {
      name: "NVIDIA Sans",
      role: "Primary / UI / Headings",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "sans-serif",
      designer: "NVIDIA Brand Team",
      foundry: "NVIDIA",
      fontUrl: "/brands/nvidia/fonts/nvidia-sans-variable.woff2",
    },
  ],
  assets: [
    {
      label: "NVIDIA Logo — Color",
      src: "/brands/nvidia/nvidia-logo-color.svg",
      width: 975,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Logo — Black",
      src: "/brands/nvidia/nvidia-logo-black.svg",
      width: 975,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Logo — White",
      src: "/brands/nvidia/nvidia-logo-white.svg",
      width: 975,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Logo — Green",
      src: "/brands/nvidia/nvidia-logo-green.svg",
      width: 975,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Logo — Green + White",
      src: "/brands/nvidia/nvidia-logo-green-white.svg",
      width: 975,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Eye Mark — Green",
      src: "/brands/nvidia/nvidia-eye-green.svg",
      width: 272,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Eye Mark — Black",
      src: "/brands/nvidia/nvidia-eye-black.svg",
      width: 272,
      height: 180,
      format: "svg",
    },
    {
      label: "NVIDIA Eye Mark — White",
      src: "/brands/nvidia/nvidia-eye-white.svg",
      width: 272,
      height: 180,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "NVIDIA Eye Mark — Green",
    src: "/brands/nvidia/nvidia-eye-green.svg",
    width: 272,
    height: 180,
    format: "svg",
  },
  thumbnailDark: {
    label: "NVIDIA Eye Mark — White",
    src: "/brands/nvidia/nvidia-eye-white.svg",
    width: 272,
    height: 180,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 1993,
  headquarters: "Santa Clara, CA",
  designer: "NVIDIA Brand Team",
  lastRebranded: "2024",
  philosophy:
    "Bold, technical, and forward-driven. NVIDIA's identity is anchored by the iconic eye mark — a symbol of visual computing and vision — paired with the signature green that conveys energy, innovation, and the power of accelerated computing.",
  legal: {
    guidelinesUrl:
      "https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage/",
    dos: [
      "Use the two-color logo (green eye + black wordmark) whenever possible",
      "Maintain minimum clear space equal to the height of the letter 'n' on all sides",
      "Use the logo as large and bold as possible",
      "Ensure a minimum contrast ratio of 1:10 against the background",
    ],
    donts: [
      "Separate the eye mark from the wordmark or scale them independently",
      "Modify, customize, or recreate the logo design",
      "Rearrange proportions or alter the register mark",
      "Use the logo without written authorization from NVIDIA",
    ],
  },
}
