import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { revenueData } from "@/data/mock";
import { formatCompact, formatCurrency } from "@/lib/utils";

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#27272A" strokeDasharray="3 6" />
        <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: "#71717A", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatCompact(v)}
        />
        <Tooltip
          cursor={{ stroke: "#3F3F46", strokeWidth: 1 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-base-border bg-[#0e0e10] px-3 py-2 shadow-popover">
                <p className="mb-1 text-xs text-ink-tertiary">{label} 2026</p>
                <p className="numeric text-sm font-semibold text-ink-primary">
                  {formatCurrency(payload[0].value as number)}
                </p>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#revFill)"
          dot={false}
          isAnimationActive={false}
          activeDot={{ r: 4, fill: "#3B82F6", stroke: "#09090B", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="target"
          stroke="#3F3F46"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
