"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { IconDownload } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { BrandAsset } from "@/lib/types"

const WHITESPACE_RE = /\s+/g
const LIGHT_ASSET_RE = /ivory|white|light/i
const DARK_ASSET_RE = /black|dark|slate|navy/i

function needsDarkBg(label: string): boolean {
  return LIGHT_ASSET_RE.test(label)
}

function needsLightBg(label: string): boolean {
  return DARK_ASSET_RE.test(label)
}

function getSpan(asset: BrandAsset): "wide" | "normal" {
  return asset.width / asset.height > 2.5 ? "wide" : "normal"
}

function rasterizeToCanvas(blob: Blob, scale = 2): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth * scale
      canvas.height = img.naturalHeight * scale
      const ctx = canvas.getContext("2d")!
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob((result) => {
        if (result) resolve(result)
        else reject(new Error("Canvas toBlob failed"))
      }, "image/png")
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Image load failed"))
    }
    img.src = url
  })
}

export function BrandAssets({
  assets,
  brandName,
}: {
  assets: BrandAsset[]
  brandName: string
}) {
  const t = useTranslations("brand")

  if (assets.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[13px] font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        {t("assets")}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => {
          const span = getSpan(asset)
          return (
            <AssetCard
              key={asset.src}
              asset={asset}
              brandName={brandName}
              span={span}
            />
          )
        })}
      </div>
    </section>
  )
}

function AssetCard({
  asset,
  brandName,
  span,
}: {
  asset: BrandAsset
  brandName: string
  span: "wide" | "normal"
}) {
  const [copied, setCopied] = useState<"image" | "svg" | false>(false)
  const t = useTranslations("brand")
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const filename = `${brandName}-${asset.label}`
    .toLowerCase()
    .replace(WHITESPACE_RE, "-")
  const isSvg = asset.format === "svg"

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  async function downloadAs(format: "svg" | "png") {
    const src = asset.srcFull ?? asset.src

    if (format === "svg") {
      const link = document.createElement("a")
      link.href = src
      link.download = `${filename}.svg`
      link.click()
    } else {
      const response = await fetch(src)
      const blob = await response.blob()
      const pngBlob = await rasterizeToCanvas(blob)
      const a = document.createElement("a")
      a.href = URL.createObjectURL(pngBlob)
      a.download = `${filename}.png`
      a.click()
      URL.revokeObjectURL(a.href)
    }
  }

  async function copyImage() {
    try {
      const src = asset.srcFull ?? asset.src
      const response = await fetch(src)
      const blob = await response.blob()
      const pngBlob =
        blob.type === "image/svg+xml" ? await rasterizeToCanvas(blob) : blob
      await navigator.clipboard.write([
        new ClipboardItem({ [pngBlob.type]: pngBlob }),
      ])
      setCopied("image")
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard write failed
    }
  }

  async function copySvgCode() {
    try {
      const src = asset.srcFull ?? asset.src
      const response = await fetch(src)
      const text = await response.text()
      await navigator.clipboard.writeText(text)
      setCopied("svg")
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard write failed
    }
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900",
        span === "wide" && "sm:col-span-2"
      )}
    >
      {/* Asset preview */}
      <div
        className={cn(
          "flex flex-1 items-center justify-center p-8",
          needsDarkBg(asset.label)
            ? "bg-neutral-800 dark:bg-neutral-800"
            : needsLightBg(asset.label)
              ? "bg-neutral-50 dark:bg-neutral-200"
              : "bg-neutral-50 dark:bg-neutral-900"
        )}
      >
        <Image
          src={asset.src}
          alt={`${brandName} ${asset.label}`}
          width={asset.width}
          height={asset.height}
          className="h-auto max-h-[120px] w-auto max-w-full object-contain"
          unoptimized={asset.format === "svg"}
        />
      </div>

      {/* Mobile: label + download below the image */}
      <div className="flex items-center justify-between px-4 py-3 sm:hidden">
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
            {asset.label}
          </span>
          <span className="text-[11px] text-neutral-500 uppercase dark:text-neutral-400">
            {asset.format}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-ring dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            aria-label={t("download")}
          >
            <IconDownload className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" sideOffset={8}>
            {isSvg && (
              <DropdownMenuItem onClick={() => downloadAs("svg")}>
                {t("downloadSvg")}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => downloadAs("png")}>
              {t("downloadPng")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyImage}>
              {copied === "image" ? (
                <span className="text-green-600">{t("copied")}</span>
              ) : (
                t("copyImage")
              )}
            </DropdownMenuItem>
            {isSvg && (
              <DropdownMenuItem onClick={copySvgCode}>
                {copied === "svg" ? (
                  <span className="text-green-600">{t("copied")}</span>
                ) : (
                  t("copySvg")
                )}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: hover overlay */}
      <div className="absolute inset-x-0 bottom-0 hidden h-full items-end justify-between bg-gradient-to-t from-black/50 via-black/15 to-transparent px-4 pb-3 transition-opacity duration-200 sm:flex sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-white">
            {asset.label}
          </span>
          <span className="text-[11px] text-white/70 uppercase">
            {asset.format}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-11 items-center justify-center rounded-lg bg-white text-black backdrop-blur-sm transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t("download")}
          >
            <IconDownload className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" sideOffset={8}>
            {isSvg && (
              <DropdownMenuItem onClick={() => downloadAs("svg")}>
                {t("downloadSvg")}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => downloadAs("png")}>
              {t("downloadPng")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyImage}>
              {copied === "image" ? (
                <span className="text-green-600">{t("copied")}</span>
              ) : (
                t("copyImage")
              )}
            </DropdownMenuItem>
            {isSvg && (
              <DropdownMenuItem onClick={copySvgCode}>
                {copied === "svg" ? (
                  <span className="text-green-600">{t("copied")}</span>
                ) : (
                  t("copySvg")
                )}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
