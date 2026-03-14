import { Suspense } from "react"
import Image from "next/image"
import { getAllBrands } from "@/data/brands"
import { LocaleSwitcher } from "./locale-switcher"
import { BrandSidebarSearch } from "./brand-sidebar-search"

export function BrandSidebar() {
  const brands = getAllBrands()

  return (
    <aside
      className="hidden h-full w-[272px] shrink-0 flex-col bg-white lg:flex dark:bg-neutral-950 p-4 gap-4"
      id="brand-sidebar"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
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
          <LocaleSwitcher />
        </div>
      </div>
      <Suspense>
        <BrandSidebarSearch brands={brands} />
      </Suspense>
    </aside>
  )
}
