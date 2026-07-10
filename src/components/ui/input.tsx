import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-[34px] w-full rounded-lg border border-base-border bg-base-bg px-3 text-sm text-ink-primary placeholder:text-ink-tertiary transition-colors focus-visible:outline-none focus-visible:border-accent-blue/60 focus-visible:ring-2 focus-visible:ring-accent-blue/20 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
