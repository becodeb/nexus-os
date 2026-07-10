import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  accent: "blue" | "green" | "violet" | "amber";
  index?: number;
}

const accentMap = {
  blue: "text-accent-blue bg-accent-blue/10",
  green: "text-accent-green bg-accent-green/10",
  violet: "text-accent-violet bg-accent-violet/10",
  amber: "text-accent-amber bg-accent-amber/10",
};

export function KpiCard({ label, value, delta, icon: Icon, accent, index = 0 }: KpiCardProps) {
  const positive = delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group relative overflow-hidden p-4 transition-colors hover:border-zinc-600">
        <div className="flex items-start justify-between">
          <p className="text-[13px] font-medium text-ink-secondary">{label}</p>
          <div className={cn("flex size-7 items-center justify-center rounded-lg", accentMap[accent])}>
            <Icon className="size-3.5" />
          </div>
        </div>
        <p className="numeric mt-3 text-[26px] font-semibold tracking-tight text-ink-primary">{value}</p>
        <div className="mt-2 flex items-center gap-1">
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              positive ? "text-accent-green" : "text-accent-red",
            )}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta)}%
          </span>
          <span className="text-xs text-ink-tertiary">vs. mes anterior</span>
        </div>
        <div
          className={cn(
            "pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.12]",
            accent === "blue" && "bg-accent-blue",
            accent === "green" && "bg-accent-green",
            accent === "violet" && "bg-accent-violet",
            accent === "amber" && "bg-accent-amber",
          )}
        />
      </Card>
    </motion.div>
  );
}
