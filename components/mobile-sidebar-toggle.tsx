"use client"

import { Suspense, useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { getAllBrands } from "@/data/brands"
import { LocaleSwitcher } from "./locale-switcher"

const BrandSidebarSearch = dynamic(
  () =>
    import("./brand-sidebar-search").then((m) => m.BrandSidebarSearch),
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
    const main = document.querySelector("main") ?? document.getElementById("main-content")
    if (main) main.setAttribute("inert", "")
    return () => { main?.removeAttribute("inert") }
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
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={close}
            aria-label="Close sidebar"
          />
          <aside
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col gap-4 overscroll-y-contain bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-xl animate-in slide-in-from-left duration-200 dark:bg-neutral-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo.png"
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
            <Suspense>
              <BrandSidebarSearch brands={brands} onNavigate={close} />
            </Suspense>
          </aside>
        </>
      )}
    </>
  )
}
