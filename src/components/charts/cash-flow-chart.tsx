import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cashFlowData } from "@/data/mock";
import { formatCompact, formatCurrency } from "@/lib/utils";

export function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={cashFlowData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={4}>
        <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: "#71717A", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatCompact(v)}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-base-border bg-[#0e0e10] px-3 py-2 shadow-popover space-y-1">
                <p className="text-xs text-ink-tertiary">{label} 2026</p>
                {payload.map((p) => (
                  <p key={String(p.dataKey)} className="numeric text-xs font-medium" style={{ color: p.color }}>
                    {p.dataKey === "inflow" ? "Ingresos" : "Gastos"}: {formatCurrency(p.value as number)}
                  </p>
                ))}
              </div>
            );
          }}
        />
        <Legend
          formatter={(v) => <span className="text-xs text-ink-secondary">{v === "inflow" ? "Ingresos" : "Gastos"}</span>}
          iconType="circle"
          iconSize={8}
        />
        <Bar dataKey="inflow" fill="#22C55E" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        <Bar dataKey="outflow" fill="#EF4444" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}
