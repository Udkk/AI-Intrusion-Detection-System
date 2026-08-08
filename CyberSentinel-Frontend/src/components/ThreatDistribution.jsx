import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  Normal: "#10b981",
  DoS: "#ef4444",
  Probe: "#3b82f6",
  R2L: "#f59e0b",
  U2R: "#8b5cf6",
};

export default function ThreatDistribution({ distribution }) {
  if (!distribution) return null;

  const data = Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl h-full">

      <h2 className="text-2xl font-bold text-white mb-6">
        Threat Distribution
      </h2>

      <div className="h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={120}
              paddingAngle={4}
              animationDuration={900}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}