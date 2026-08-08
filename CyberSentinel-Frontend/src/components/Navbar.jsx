export default function Navbar() {
  return (
    <nav className="w-full border-b border-emerald-500/10 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Brand */}
        <a
          href="#dashboard"
          className="flex items-center gap-3"
        >

          <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/10">

           <img
             src="/cybersentinel-logo.png"
             alt="CyberSentinel IDS Logo"
             className="w-full h-full object-contain"
           />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white tracking-tight">
              CyberSentinel IDS
            </h1>

            <p className="text-xs text-slate-400">
              AI-Powered Intrusion Detection Platform
            </p>

          </div>

        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">

          <a
            href="#dashboard"
            className="hover:text-emerald-400 transition"
          >
            Dashboard
          </a>

          <a
            href="#upload"
            className="hover:text-emerald-400 transition"
          >
            Upload
          </a>

          <a
            href="#reports"
            className="hover:text-emerald-400 transition"
          >
            Reports
          </a>

        </div>

      </div>

    </nav>
  );
}