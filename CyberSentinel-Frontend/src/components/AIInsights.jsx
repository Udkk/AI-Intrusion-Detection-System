import { Brain, ShieldCheck, TrendingUp, Radar } from "lucide-react";

export default function AIInsights({ summary, distribution }) {
  if (!summary) return null;

  const topThreat =
    Object.entries(distribution)
      .filter(([name]) => name !== "Normal")
      .sort((a, b) => b[1] - a[1])[0] || ["None", 0];

  const health =
    summary.total_attacks < summary.normal_traffic
      ? "GOOD"
      : "CRITICAL";

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl">

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
          <Brain className="text-purple-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Security Insights
          </h2>

          <p className="text-sm text-slate-400">
            Automated analysis summary
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" />
          <span>
            Network Health:
            <strong className="ml-2 text-white">{health}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Radar className="text-red-400" />
          <span>
            Dominant Threat:
            <strong className="ml-2 text-white">{topThreat[0]}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="text-sky-400" />
          <span>
            AI Confidence:
            <strong className="ml-2 text-white">
              {summary.average_confidence}%
            </strong>
          </span>
        </div>

      </div>
    </div>
  );
}