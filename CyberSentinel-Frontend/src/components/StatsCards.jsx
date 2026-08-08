import {
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsCards({ summary }) {

  if (!summary) return null;

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Records"
        value={summary.total_records.toLocaleString()}
        icon={<Activity size={28} />}
        color="blue"
      />

      <StatCard
        title="Threats Detected"
        value={summary.total_attacks.toLocaleString()}
        icon={<AlertTriangle size={28} />}
        color="red"
      />

      <StatCard
        title="Normal Traffic"
        value={summary.normal_traffic.toLocaleString()}
        icon={<CheckCircle size={28} />}
        color="emerald"
      />

      <StatCard
        title="AI Confidence"
        value={`${summary.average_confidence}%`}
        icon={<Shield size={28} />}
        color="purple"
      />

    </div>
  );
}