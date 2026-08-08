import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadDataset } from "../services/api";

export default function UploadCard({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const result = await uploadDataset(file);
      onResult(result);
    } catch (err) {
      alert("Upload Failed");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section
      id="upload"
      className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl"
    >
      <h2 className="text-3xl font-bold text-white">
        Upload Network Dataset
      </h2>

      <p className="mt-2 text-slate-400">
        Supported formats: CSV, TXT (NSL-KDD Dataset)
      </p>

      <div
        className={`mt-8 rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 cursor-pointer ${
          dragging
            ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
            : "border-slate-700 hover:border-emerald-400"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <UploadCloud
          size={56}
          className={`mx-auto transition-all duration-300 ${
            dragging
              ? "text-emerald-300 scale-110"
              : "text-emerald-400"
          }`}
        />

        <h3 className="mt-5 text-xl font-semibold text-white">
          {dragging
            ? "Drop your dataset here"
            : "Drag & Drop your dataset"}
        </h3>

        <p className="mt-2 text-slate-400">
          or click below to browse files
        </p>

        {file && (
          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <p className="font-medium text-emerald-400">
              ✅ Selected File
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {file.name}
            </p>
          </div>
        )}

        <input
          type="file"
          accept=".csv,.txt"
          className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-emerald-400"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="mt-8 w-full rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "🔍 Analyzing Dataset..." : "🚀 Analyze Dataset"}
      </button>
    </section>
  );
}