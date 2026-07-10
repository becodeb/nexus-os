import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-blue text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_0_0_1px_rgba(59,130,246,0.4)] hover:bg-accent-blue-dim hover:shadow-glow",
        secondary:
          "bg-base-card text-ink-primary border border-base-border hover:bg-base-hover hover:border-zinc-600",
        ghost: "text-ink-secondary hover:bg-base-hover hover:text-ink-primary",
        outline: "border border-base-border text-ink-primary hover:bg-base-hover",
        destructive: "bg-accent-red/10 text-accent-red border border-accent-red/25 hover:bg-accent-red/20",
        link: "text-accent-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-[34px] px-3",
        lg: "h-10 px-4 text-[15px]",
        icon: "size-8",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
