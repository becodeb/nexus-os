import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHeader({
  title, description, actions,
}: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-wrap items-end justify-between gap-3"
    >
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-ink-primary">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-ink-secondary">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
