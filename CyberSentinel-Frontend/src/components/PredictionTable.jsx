import { useState } from "react";
import { Search } from "lucide-react";

export default function PredictionTable({ predictions }) {

  const [search, setSearch] = useState("");

  if (!predictions) return null;

  const filtered = predictions.filter((item) =>
    item.actual.toLowerCase().includes(search.toLowerCase()) ||
    item.prediction.toLowerCase().includes(search.toLowerCase())
  );

  const badgeColor = (attack) => {

    switch (attack) {

      case "Normal":
        return "bg-emerald-500";

      case "DoS":
        return "bg-red-500";

      case "Probe":
        return "bg-sky-500";

      case "R2L":
        return "bg-amber-500";

      case "U2R":
        return "bg-purple-500";

      default:
        return "bg-slate-500";

    }

  };

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Recent Predictions
          </h2>

          <p className="text-sm text-slate-400">
            First 100 analyzed records
          </p>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="rounded-xl bg-slate-800 py-2 pl-10 pr-4 outline-none border border-slate-700 focus:border-emerald-400"
          />

        </div>

      </div>

      <div className="max-h-[520px] overflow-auto">

        <table className="w-full">

          <thead className="sticky top-0 bg-slate-900">

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="py-4">Row</th>
              <th>Actual</th>
              <th>Prediction</th>
              <th>Confidence</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item)=>(

              <tr
                key={item.row}
                className="border-b border-slate-800 transition hover:bg-slate-800/70"
              >

                <td className="py-4 font-medium">
                  {item.row}
                </td>

                <td className="capitalize">
                  {item.actual}
                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeColor(item.prediction)}`}
                  >
                    {item.prediction}
                  </span>

                </td>

                <td>

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-32 rounded-full bg-slate-800">

                      <div
                        className="h-2 rounded-full bg-emerald-400"
                        style={{
                          width:`${item.confidence}%`
                        }}
                      />

                    </div>

                    <span className="font-medium">
                      {item.confidence}%
                    </span>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}