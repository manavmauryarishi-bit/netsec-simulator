import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const getNavClass = ({ isActive }) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 active:scale-98 duration-150 mx-2 transition-colors ";
    if (isActive) {
      return baseClass + "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 rounded-l-md";
    }
    return baseClass + "text-slate-500 hover:bg-slate-900/80 hover:text-cyan-200 rounded-md";
  };

  const getIconStyle = ({ isActive }) => {
    return isActive ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <aside className="bg-slate-950/90 backdrop-blur-xl font-mono text-xs uppercase tracking-widest fixed left-0 top-0 h-full w-64 z-40 border-r border-slate-800 hidden md:flex flex-col pt-20 pb-6">
      <div className="px-6 mb-8">
        <h2 className="text-cyan-500 font-bold mb-1">Simulator Engine</h2>
        <p className="text-slate-500">v2.4.0-stable</p>
      </div>
      <nav className="flex-1 flex flex-col space-y-1">
        <NavLink to="/" className={getNavClass} end>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>grid_view</span> Home
            </>
          )}
        </NavLink>
        <NavLink to="/simulation" className={getNavClass}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>biotech</span> Simulation
            </>
          )}
        </NavLink>
        <NavLink to="/business-impact" className={getNavClass}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>query_stats</span> Business Impact
            </>
          )}
        </NavLink>
        <NavLink to="/about" className={getNavClass}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>info</span> About
            </>
          )}
        </NavLink>
      </nav>
      <div className="mt-auto flex flex-col space-y-1">
        <NavLink to="/logs" className={getNavClass}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>terminal</span> Security Logs
            </>
          )}
        </NavLink>
        <NavLink to="/support" className={getNavClass}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-[20px]" style={getIconStyle({ isActive })}>help_center</span> Support
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
