import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-[linear-gradient(110deg,#18181b,45%,#232327,55%,#18181b)] bg-[length:200%_100%] animate-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
