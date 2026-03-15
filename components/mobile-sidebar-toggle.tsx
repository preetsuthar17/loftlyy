"use client"

import { Suspense, useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { IconMenu2, IconX, IconHeart } from "@tabler/icons-react"
import { getAllBrands } from "@/data/brands"
import { LocaleSwitcher } from "./locale-switcher"

const BrandSidebarSearch = dynamic(
  () => import("./brand-sidebar-search").then((m) => m.BrandSidebarSearch),
  { ssr: false }
)

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false)
  const brands = getAllBrands()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  // Set inert on main content when sidebar is open
  useEffect(() => {
    if (!open) return
    const main =
      document.querySelector("main") ?? document.getElementById("main-content")
    if (main) main.setAttribute("inert", "")
    return () => {
      main?.removeAttribute("inert")
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-neutral-800"
        aria-label="Open sidebar"
      >
        <IconMenu2 className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 animate-in bg-black/20 backdrop-blur-sm duration-200 fade-in"
            onClick={close}
            aria-label="Close sidebar"
          />
          <aside
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 left-0 z-50 flex w-[272px] animate-in flex-col gap-4 overflow-hidden overscroll-y-contain bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-xl duration-200 slide-in-from-left dark:bg-neutral-950"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-5 pt-5 lg:pt-0">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo.webp"
                  alt="Loftlyy"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    Loftlyy
                  </span>
                  <a
                    href="https://hanoa.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    by Hanoa Studio
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LocaleSwitcher />
                <button
                  onClick={close}
                  className="inline-flex size-11 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-neutral-800"
                  aria-label="Close sidebar"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 px-0">
              <Suspense>
                <BrandSidebarSearch brands={brands} onNavigate={close} />
              </Suspense>
            </div>
            <div className="shrink-0 px-5 pb-5">
              <a
                href="https://github.com/sponsors/preetsuthar17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-[13px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200"
              >
                <IconHeart size={15} />
                Support us
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
