import { AdvertiseSpots } from "@/components/advertise-dialog"
import CarbonAds from "@/components/carbon-ad"

export default function BrandDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        {children}
      </div>
      <aside className="hidden w-68 shrink-0 flex-col gap-4 border-l border-neutral-200 p-4 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:overflow-y-auto dark:border-neutral-800/50">
        <AdvertiseSpots className="flex flex-col gap-3" compact />
        <CarbonAds />
      </aside>
    </div>
  )
}
