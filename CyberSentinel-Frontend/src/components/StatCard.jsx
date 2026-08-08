import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color = "emerald",
}) {

  const colors = {
    emerald:
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    red:
      "bg-red-500/10 border-red-500/30 text-red-400",
    blue:
      "bg-sky-500/10 border-sky-500/30 text-sky-400",
    purple:
      "bg-purple-500/10 border-purple-500/30 text-purple-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-xl"
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-2xl border p-4 transition-all duration-300 group-hover:scale-110 ${colors[color]}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}