import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ConfidenceChart({ predictions }) {
  if (!predictions) return null;

  const data = predictions.map((item) => ({
    row: item.row,
    confidence: item.confidence,
  }));

  return (
    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          AI Confidence Trend
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Confidence score for the analyzed records
        </p>
      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">

                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#10b981"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="row"
              stroke="#94a3b8"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="confidence"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#confidenceGradient)"
              animationDuration={1000}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}