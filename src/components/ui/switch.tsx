import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-[20px] w-[34px] shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors data-[state=unchecked]:bg-base-hover-strong data-[state=checked]:bg-accent-blue disabled:cursor-not-allowed disabled:opacity-40",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[16px]" />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
