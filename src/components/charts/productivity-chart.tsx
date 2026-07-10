import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { productivityData } from "@/data/mock";

export function ProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={productivityData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }} barCategoryGap="28%">
        <XAxis dataKey="day" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-base-border bg-[#0e0e10] px-3 py-2 shadow-popover">
                <p className="mb-1 text-xs text-ink-tertiary">{label}</p>
                <p className="numeric text-sm font-semibold text-ink-primary">{payload[0].value}%</p>
              </div>
            );
          }}
        />
        <Bar dataKey="score" radius={[6, 6, 6, 6]} isAnimationActive={false}>
          {productivityData.map((d, i) => (
            <Cell key={i} fill={d.score >= 80 ? "#22C55E" : d.score >= 65 ? "#3B82F6" : "#3F3F46"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
