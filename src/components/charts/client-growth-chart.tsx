import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { clientGrowthData } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

export function ClientGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={clientGrowthData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#27272A" strokeDasharray="3 6" />
        <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ stroke: "#3F3F46", strokeWidth: 1 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-base-border bg-[#0e0e10] px-3 py-2 shadow-popover">
                <p className="mb-1 text-xs text-ink-tertiary">{label} 2026</p>
                <p className="numeric text-sm font-semibold text-ink-primary">{formatNumber(payload[0].value as number)} clientes</p>
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="clients"
          stroke="#8B5CF6"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#8B5CF6", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#8B5CF6", stroke: "#09090B", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
