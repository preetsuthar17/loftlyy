import type { Brand } from "@/lib/types"

export const youtube: Brand = {
  slug: "youtube",
  name: "YouTube",
  description:
    "YouTube is the world's largest video-sharing platform, allowing users to upload, watch, and share videos. Founded in 2005 and acquired by Google in 2006, YouTube has become the go-to destination for video content, from music and education to entertainment and live streaming, serving over 2 billion logged-in users monthly.",
  url: "https://youtube.com",
  industry: "entertainment",
  categories: ["entertainment", "social-media", "technology"],
  tags: ["video", "streaming", "social-media", "creators", "music"],
  colors: [
    {
      name: "YouTube Red",
      hex: "#FF0000",
      usage:
        "Primary brand color, used in the play button icon and key interactive elements.",
    },
    {
      name: "Almost Black",
      hex: "#282828",
      usage:
        "Dark background color, used in the app's dark theme and secondary branding.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Light background and text color, used for clean layouts and contrast.",
    },
  ],
  typography: [
    {
      name: "Roboto",
      role: "UI / Body Text",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "Christian Robertson",
      foundry: "Google",
      fontUrl: "/brands/youtube/fonts/roboto-regular.woff2",
    },
  ],
  assets: [
    {
      label: "YouTube Icon — Red",
      src: "/brands/youtube/youtube-icon-red.svg",
      width: 168,
      height: 165,
      format: "svg",
    },
    {
      label: "YouTube Icon — White",
      src: "/brands/youtube/youtube-icon-white.svg",
      width: 168,
      height: 165,
      format: "svg",
    },
    {
      label: "YouTube Icon — Black",
      src: "/brands/youtube/youtube-icon-black.svg",
      width: 168,
      height: 165,
      format: "svg",
    },
    {
      label: "YouTube Logo — Dark",
      src: "/brands/youtube/youtube-logo-red.svg",
      width: 508,
      height: 113,
      format: "svg",
    },
    {
      label: "YouTube Logo — White",
      src: "/brands/youtube/youtube-logo-white.svg",
      width: 508,
      height: 113,
      format: "svg",
    },
    {
      label: "YouTube Logo — Black",
      src: "/brands/youtube/youtube-logo-black.svg",
      width: 508,
      height: 113,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "YouTube Icon — Red",
    src: "/brands/youtube/youtube-icon-red.svg",
    width: 168,
    height: 165,
    format: "svg",
  },
  thumbnailDark: {
    label: "YouTube Icon — White",
    src: "/brands/youtube/youtube-icon-white.svg",
    width: 168,
    height: 165,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2005,
  headquarters: "San Bruno, California",
  designer: "YouTube Design Team",
  lastRebranded: "2017",
  philosophy:
    "Bold, playful, and universally accessible. YouTube's identity centers on the iconic red play button — a universal symbol for 'press play' — paired with clean typography that puts content first and invites everyone to broadcast themselves.",
  legal: {
    guidelinesUrl: "https://brand.youtube/",
    dos: [
      "Use the official YouTube logo from brand.youtube",
      "Maintain clear space around the logo equal to the width of the play button triangle",
      "Use the full-color icon on white or dark backgrounds for best visibility",
    ],
    donts: [
      "Alter the YouTube logo colors, proportions, or shape",
      "Use the play button icon without the rounded rectangle container",
      "Place the YouTube logo on busy or low-contrast backgrounds",
      "Use the YouTube name or logo to imply endorsement without written permission",
    ],
  },
}
