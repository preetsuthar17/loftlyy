export function AdBanner() {
  return (
    <a
      href="https://x.com/preetsuthar17"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden shrink-0 items-center justify-center self-stretch rounded-xl border-2 border-dashed border-neutral-300 px-10 text-sm text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-500 lg:flex dark:border-neutral-700 dark:text-neutral-500 dark:hover:border-neutral-600 dark:hover:text-neutral-400"
    >
      <span className="flex flex-col items-center gap-1">
        <span>Show your brand ad here</span>
        <span className="text-xs text-neutral-400 dark:text-neutral-600">
          Send a DM
        </span>
      </span>
    </a>
  )
}
