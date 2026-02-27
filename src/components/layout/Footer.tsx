"use client";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Built with Next.js, TypeScript & TailwindCSS
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Space = Play/Pause &middot; ← → = Step &middot; R = Reset
          </span>
        </div>
      </div>
    </footer>
  );
}