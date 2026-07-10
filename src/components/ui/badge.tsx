import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none",
  {
    variants: {
      variant: {
        default: "border-base-border bg-base-hover text-ink-secondary",
        blue: "border-accent-blue/25 bg-accent-blue/10 text-accent-blue",
        green: "border-accent-green/25 bg-accent-green/10 text-accent-green",
        violet: "border-accent-violet/25 bg-accent-violet/10 text-accent-violet",
        red: "border-accent-red/25 bg-accent-red/10 text-accent-red",
        amber: "border-accent-amber/25 bg-accent-amber/10 text-accent-amber",
        outline: "border-base-border text-ink-secondary",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
