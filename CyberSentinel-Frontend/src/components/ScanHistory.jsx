import { History, ShieldAlert } from "lucide-react";

export default function ScanHistory({ history, onSelect }) {
  if (!history.length) return null;

  return (
    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <History className="text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">
          Recent Scan History
        </h2>
      </div>

      <div className="space-y-4">

        {history.map((scan, index) => (

          <button
            key={index}
            onClick={() => onSelect(scan.data)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-800/40 p-4 text-left transition hover:border-emerald-400 hover:bg-slate-800"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="font-semibold text-white">
                  Scan #{history.length - index}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {scan.time}
                </p>

              </div>

              <div className="text-right">

                <div className="flex items-center justify-end gap-2 text-red-400">
                  <ShieldAlert size={18} />
                  {scan.data.summary.total_attacks} Threats
                </div>

                <p className="text-sm text-slate-400">
                  {scan.data.summary.total_records.toLocaleString()} Records
                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}