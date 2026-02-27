"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export function Slider({ label, className, id, ...props }: SliderProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}
      <input
        id={id}
        type="range"
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700 dark:accent-indigo-400",
          className
        )}
        {...props}
      />
    </div>
  );
}