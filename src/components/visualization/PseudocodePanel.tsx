"use client";

import { cn } from "@/lib/cn";

interface PseudocodePanelProps {
  lines: string[];
  activeLines: number[];
  description?: string;
}

export function PseudocodePanel({ lines, activeLines, description }: PseudocodePanelProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
      <div className="border-b border-slate-200 px-4 py-2 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Pseudocode
        </h3>
      </div>

      <div className="max-h-72 overflow-y-auto p-2">
        <pre className="text-xs leading-relaxed">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded px-2 py-0.5 transition-colors duration-150",
                activeLines.includes(idx)
                  ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/50 dark:text-indigo-200"
                  : "text-slate-600 dark:text-slate-400"
              )}
            >
              <span className="mr-3 inline-block w-5 text-right text-slate-400 dark:text-slate-600">
                {idx + 1}
              </span>
              {line}
            </div>
          ))}
        </pre>
      </div>

      {description && (
        <div className="border-t border-slate-200 px-4 py-2 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            💡 {description}
          </p>
        </div>
      )}
    </div>
  );
}