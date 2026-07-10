import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { projectStatusData } from "@/data/mock";

export function ProjectStatusChart() {
  const total = projectStatusData.reduce((s, d) => s + d.count, 0);
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-[140px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={projectStatusData}
              dataKey="count"
              nameKey="status"
              innerRadius={44}
              outerRadius={68}
              paddingAngle={3}
              stroke="none"
              isAnimationActive={false}
            >
              {projectStatusData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg border border-base-border bg-[#0e0e10] px-3 py-2 shadow-popover">
                    <p className="text-xs text-ink-primary">{d.status}: {d.count}</p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="numeric text-xl font-semibold text-ink-primary">{total}</span>
          <span className="text-[10px] text-ink-tertiary">proyectos</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {projectStatusData.map((d) => (
          <div key={d.status} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-ink-secondary">
              <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
              {d.status}
            </span>
            <span className="numeric font-medium text-ink-primary">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
