import { useState } from "react";
import type { Theme } from "./types";
import Sidebar              from "./components/layout/Sidebar";
import Topbar               from "./components/layout/Topbar";
import CommandCenter        from "./screens/CommandCenter";
import CrossEntityPipeline  from "./screens/CrossEntityPipeline";
import AIActionsQueue       from "./screens/AIActionsQueue";
import AgentConsole         from "./screens/AgentConsole";
import ComplianceAlerts     from "./screens/ComplianceAlerts";
import KlaviyoStatus        from "./screens/KlaviyoStatus";

export default function App() {
  const [active, setActive] = useState("Command Center");
  const [open,   setOpen]   = useState(false);
  const [dk,     setDk]     = useState(false);

  // ── Theme palette (light / dark) ─────────────────────────────────
  const p: Theme = {
    canvas:  dk ? "#0d1117" : "#f1f5f9",
    surf:    dk ? "#161b22" : "#ffffff",
    surf2:   dk ? "#1c2128" : "#f8fafc",
    surf3:   dk ? "#21262d" : "#f1f5f9",
    bdr:     dk ? "#30363d" : "#e2e8f0",
    bdr2:    dk ? "#21262d" : "#f1f5f9",
    t1:      dk ? "#f0f6fc" : "#0f172a",
    t2:      dk ? "#e6edf3" : "#1e293b",
    t3:      dk ? "#cdd9e5" : "#334155",
    t4:      dk ? "#adbac7" : "#475569",
    t5:      dk ? "#8b949e" : "#64748b",
    t6:      dk ? "#6e7681" : "#94a3b8",
    inp:     dk ? "#21262d" : "#ffffff",
    blue:    dk ? "#0d1f3c" : "#eff6ff",  blueT:   dk ? "#60a5fa" : "#2563eb",
    green:   dk ? "#052e16" : "#dcfce7",  greenT:  dk ? "#4ade80" : "#16a34a",
    red:     dk ? "#2d0a0a" : "#fee2e2",  redT:    dk ? "#f87171" : "#dc2626",
    amber:   dk ? "#1c1400" : "#fef3c7",  amberT:  dk ? "#fbbf24" : "#d97706",
    purple:  dk ? "#1a0a2e" : "#faf5ff",  purpleT: dk ? "#c084fc" : "#9333ea",
    indigo:  dk ? "#0f1329" : "#eef2ff",  indigoT: dk ? "#818cf8" : "#4338ca",
  };

  const screen = () => {
    switch (active) {
      case "Command Center":         return <CommandCenter       p={p}/>;
      case "Cross-Entity Pipeline":  return <CrossEntityPipeline p={p}/>;
      case "AI Actions Queue":       return <AIActionsQueue      p={p}/>;
      case "Agent Console":          return <AgentConsole        p={p}/>;
      case "Compliance Alerts":      return <ComplianceAlerts    p={p}/>;
      case "Klaviyo Status":         return <KlaviyoStatus       p={p}/>;
      default:                       return null;
    }
  };

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"'Inter',sans-serif", background:p.canvas, overflow:"hidden" }}>
      {/* Dynamic CSS — scrollbar tint + filter-bar theme tokens */}
      <style>{`
        ::-webkit-scrollbar-thumb { background: ${dk ? "#30363d" : "#cbd5e1"}; }
        .filter-bar { background: ${p.surf}; border: 1px solid ${p.bdr}; border-radius: 10px; padding: 8px 10px; }
        @media (min-width: 700px) { .filter-bar { padding: 9px 13px; } }
      `}</style>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        active={active}
        onNavigate={setActive}
        dark={dk}
        onToggleDark={() => setDk((d) => !d)}
        p={p}
      />

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <Topbar title={active} onMenuOpen={() => setOpen((o) => !o)} p={p}/>
        <div style={{ flex:1, overflowY:"auto", background:p.canvas }}>
          {screen()}
        </div>
      </div>
    </div>
  );
}
