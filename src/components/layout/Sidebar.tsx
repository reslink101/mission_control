import type { Theme } from "../../types";
import { NAV } from "../../data/mockData";

interface Props {
  open:      boolean;
  onClose:   () => void;
  active:    string;
  onNavigate:(label: string) => void;
  dark:      boolean;
  onToggleDark: () => void;
  p:         Theme;
}

export default function Sidebar({ open, onClose, active, onNavigate, dark, onToggleDark, p }: Props) {
  return (
    <>
      <aside style={{
        width:220, minWidth:220, background:"#0f172a",
        display:"flex", flexDirection:"column", overflowY:"auto", flexShrink:0,
        position:"fixed", top:0, left:0, bottom:0, zIndex:50,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* Logo */}
        <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid #1e293b", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚕</div>
            <div>
              <div style={{ color:"#f8fafc", fontWeight:700, fontSize:13 }}>Path Peptides</div>
              <div style={{ color:"#8b949e", fontSize:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Mission Control</div>
            </div>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"none", color:"#6e7681", cursor:"pointer", fontSize:18, padding:4, lineHeight:1, borderRadius:6 }}>
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding:"12px 10px", flex:1 }}>
          {NAV.map((item) => {
            const on = active === item.label;
            return (
              <button key={item.label}
                onClick={() => { onNavigate(item.label); onClose(); }}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, marginBottom:2, border:"none", cursor:"pointer", textAlign:"left", background: on ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "transparent", color: on ? "#ffffff" : "#adbac7", fontWeight: on ? 600 : 400, fontSize:13 }}>
                <span style={{ fontSize:14 }}>{item.icon}</span>
                <span style={{ flex:1 }}>{item.label}</span>
                {item.badge != null && (
                  <span style={{ background: item.badgeColor ?? "#ef4444", color:"#fff", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:99 }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dark mode toggle */}
        <div style={{ padding:"12px 16px", borderTop:"1px solid #1e293b" }}>
          <button onClick={onToggleDark}
            style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, border:"1px solid #1e293b", background: dark ? "#0d1117" : "#1e293b", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:16 }}>{dark ? "🌙" : "☀️"}</span>
              <span style={{ fontSize:12, fontWeight:600, color:"#adbac7" }}>{dark ? "Dark" : "Light"} Mode</span>
            </div>
            <div style={{ width:36, height:20, borderRadius:99, background: dark ? "#6366f1" : "#334155", position:"relative" }}>
              <div style={{ position:"absolute", top:3, left: dark ? 19 : 3, width:14, height:14, borderRadius:"50%", background:p.surf, transition:"left 0.22s" }}/>
            </div>
          </button>
        </div>

        {/* User info */}
        <div style={{ padding:"14px 20px", borderTop:"1px solid #1e293b" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13 }}>A</div>
            <div>
              <div style={{ color:"#e6edf3", fontSize:12, fontWeight:600 }}>Abel</div>
              <div style={{ color:"#8b949e", fontSize:10 }}>Admin · Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40 }}/>}
    </>
  );
}
