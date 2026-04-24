export default function TopNavBar() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md font-inter tracking-tight text-sm fixed w-full top-0 z-50 border-b border-slate-800 shadow-[0_1px_10px_rgba(0,255,255,0.05)] flex justify-between items-center h-16 px-6">
      <div className="text-lg font-black tracking-widest text-cyan-500 uppercase">NetSec Simulator</div>
      <div className="flex items-center gap-6">
        <span className="text-cyan-400 font-bold hidden md:inline-block">System Status: Active</span>
        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 transition-all active:opacity-80 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 transition-all active:opacity-80 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
