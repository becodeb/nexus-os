import { departmentBudget } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

const colors = ["#3B82F6", "#8B5CF6", "#22C55E", "#F59E0B", "#71717A"];

export function BudgetChart() {
  const total = departmentBudget.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-3">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {departmentBudget.map((d, i) => (
          <div key={d.department} style={{ width: `${(d.value / total) * 100}%`, backgroundColor: colors[i] }} />
        ))}
      </div>
      <div className="space-y-2.5">
        {departmentBudget.map((d, i) => (
          <div key={d.department} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-secondary">
              <span className="size-2 rounded-full" style={{ backgroundColor: colors[i] }} />
              {d.department}
            </span>
            <span className="numeric font-medium text-ink-primary">{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
