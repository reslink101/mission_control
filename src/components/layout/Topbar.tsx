import type { Theme } from "../../types";

interface Props {
  title:        string;
  onMenuOpen:   () => void;
  p:            Theme;
}

export default function Topbar({ title, onMenuOpen, p }: Props) {
  return (
    <div style={{
      height:52, background:p.surf, borderBottom:"1px solid "+p.bdr,
      display:"flex", alignItems:"center", gap:14, padding:"0 16px",
      flexShrink:0, zIndex:30,
    }}>
      {/* Hamburger button */}
      <button onClick={onMenuOpen}
        style={{ background:"none", border:"none", cursor:"pointer", padding:"6px 8px", borderRadius:8, display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
        <span style={{ display:"block", width:20, height:2, background:p.t4, borderRadius:2 }}/>
        <span style={{ display:"block", width:20, height:2, background:p.t4, borderRadius:2 }}/>
        <span style={{ display:"block", width:20, height:2, background:p.t4, borderRadius:2 }}/>
      </button>

      {/* Screen title */}
      <span className="topbar-title" style={{ color:p.t1 }}>{title}</span>
    </div>
  );
}
