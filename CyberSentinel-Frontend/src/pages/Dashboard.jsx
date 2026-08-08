import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import StatsCards from "../components/StatsCards";
import ThreatDistribution from "../components/ThreatDistribution";
import PredictionTable from "../components/PredictionTable";
import AIInsights from "../components/AIInsights";
import ConfidenceChart from "../components/ConfidenceChart";
import ScanHistory from "../components/ScanHistory";

import { Download } from "lucide-react";
import { exportReport } from "../utils/exportReport";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("scanHistory");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleResult = (data) => {
    setResult(data);

    const newHistory = [
      {
        time: new Date().toLocaleString(),
        data,
      },
      ...history,
    ].slice(0, 10);

    setHistory(newHistory);

    localStorage.setItem(
      "scanHistory",
      JSON.stringify(newHistory)
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <Hero />

      <main className="max-w-screen-2xl mx-auto px-6 pb-20">

        {/* Upload */}
        <section id="upload">
          <UploadCard onResult={handleResult} />
        </section>

        {result && (
          <section id="reports">
            {/* Stats */}
            <StatsCards summary={result.summary} />

            {/* Export PDF */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => exportReport(result)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 transition"
              >
                <Download size={18} />
                Export PDF Report
              </button>
            </div>

            {/* Charts */}
            <div className="grid gap-8 lg:grid-cols-2 mt-10">

              <ThreatDistribution
                distribution={result.attack_distribution}
                total={result.summary.total_records}
              />

              <AIInsights
                summary={result.summary}
                distribution={result.attack_distribution}
              />

            </div>

            {/* Confidence */}
            <ConfidenceChart
              predictions={result.preview}
            />

            {/* Scan History */}
            <ScanHistory
              history={history}
              onSelect={setResult}
            />

            {/* Prediction Table */}
            <div className="mt-10">
              <PredictionTable
                predictions={result.preview}
              />
            </div>

          </section>
        )}
      </main>
    </div>
  );
}