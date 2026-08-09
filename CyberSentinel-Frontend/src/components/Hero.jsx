import { motion } from "framer-motion";
import { ShieldCheck, Database, BrainCircuit } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

      <div className="absolute -top-52 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-300">

          <ShieldCheck size={18}/>
          AI-Powered Security Analytics

        </div>

        <h1 className="mt-8 text-6xl md:text-7xl font-black tracking-tight text-white">

          CyberSentinel

          <span className="text-emerald-400"> IDS</span>

        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">

          Detect intrusions, classify cyber attacks, and analyze
          network traffic using Machine Learning, FastAPI and
          an interactive security dashboard.

        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <a
            href="#upload"
            className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-emerald-400"
          >
            Analyze Dataset
          </a>

          <a
            href="https://github.com/Udkk/AI-Intrusion-Detection-System.git"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white"
          >
            GitHub
          </a>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">

            <Database className="mb-3 text-emerald-400"/>

            <h2 className="text-3xl font-bold text-white">
              125K+
            </h2>

            <p className="mt-2 text-slate-400">
              Network Records
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">

            <BrainCircuit className="mb-3 text-emerald-400"/>

            <h2 className="text-3xl font-bold text-white">
              99.8%
            </h2>

            <p className="mt-2 text-slate-400">
              Model Accuracy
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">

            <ShieldCheck className="mb-3 text-emerald-400"/>

            <h2 className="text-3xl font-bold text-white">
              5
            </h2>

            <p className="mt-2 text-slate-400">
              Attack Categories
            </p>

          </div>

        </div>

      </motion.div>
    </section>
  );
}