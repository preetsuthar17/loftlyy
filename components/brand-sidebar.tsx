import { Suspense } from "react"
import Image from "next/image"
import { IconHeart } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { getAllSidebarBrands } from "@/data/brands"
import { LocaleSwitcher } from "./locale-switcher"
import { BrandSidebarSearch } from "./brand-sidebar-search"

export function BrandSidebar() {
  const brands = getAllSidebarBrands()

  return (
    <aside
      className="hidden h-full w-[272px] shrink-0 flex-col bg-white lg:flex dark:bg-neutral-950"
      id="brand-sidebar"
    >
      {/* Header — fixed top */}
      <div className="shrink-0 p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex w-fit items-center justify-between gap-3">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <Image
                src="/logo.webp"
                alt="Loftlyy"
                width={28}
                height={28}
                className="rounded-lg"
              />
            </Link>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Loftlyy
              </span>
              <Link
                href="https://hanoa.studio"
                target="_blank"
                className="flex w-fit items-center gap-2.5"
              >
                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                  by Hanoa Studio
                </span>
              </Link>
            </div>
          </div>

          <LocaleSwitcher />
        </div>
      </div>

      {/* Brand list — scrollable middle */}
      <div className="min-h-0 flex-1 px-4 pt-4">
        <Suspense>
          <BrandSidebarSearch brands={brands} />
        </Suspense>
      </div>

      {/* Sponsor — fixed bottom */}
      <div className="shrink-0 p-4 pt-2">
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
  )
}
