import { useState } from "react";
import type { Theme, ActionCardData } from "../types";
import { INIT_PENDING, PRE_APPROVED, AUTO_EX, ES, AS } from "../data/mockData";
import ActionCard from "../components/shared/ActionCard";

interface Props { p: Theme }

export default function AIActionsQueue({ p }: Props) {
  const [pending,  setPending]  = useState<ActionCardData[]>(INIT_PENDING);
  const [approved, setApproved] = useState<ActionCardData[]>(PRE_APPROVED);
  const [rejected, setRejected] = useState<ActionCardData[]>([]);
  const [banner,   setBanner]   = useState(true);
  const [fAction,  setFA]       = useState("All");
  const [fRisk,    setFR]       = useState("All");
  const [fEntity,  setFE]       = useState("All");

  const approve = (id: number) => {
    const c = pending.find((x) => x.id === id)!;
    setPending((prev) => prev.filter((x) => x.id !== id));
    setApproved((prev) => [c, ...prev]);
  };
  const reject = (id: number, reason: string) => {
    const c = pending.find((x) => x.id === id)!;
    setPending((prev) => prev.filter((x) => x.id !== id));
    setRejected((prev) => [{ ...c, reason }, ...prev]);
  };
  const approveLow = () => {
    const low = pending.filter((c) => c.risk === "LOW");
    setPending((prev) => prev.filter((c) => c.risk === "HIGH"));
    setApproved((prev) => [...low, ...prev]);
  };

  const actionTypes = ["All", ...Array.from(new Set(INIT_PENDING.map((c) => c.action)))];
  const filtered = pending.filter(
    (c) =>
      (fAction === "All" || c.action  === fAction) &&
      (fRisk   === "All" || c.risk    === fRisk)   &&
      (fEntity === "All" || c.entity  === fEntity)
  );

  const col = (bc: string) => ({ minWidth:0, background:p.surf, border:`1px solid ${bc}`, borderRadius:12, overflow:"hidden" });
  const ch  = (label: string, cnt: number, bg: string, bc: string, tc: string) => (
    <div style={{ padding:"11px 14px", background:bg, borderBottom:`1px solid ${bc}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:12, fontWeight:700, color:tc }}>{label}</span>
      <span style={{ fontSize:11, fontWeight:700, background:bc, color:"#fff", borderRadius:99, padding:"1px 8px" }}>{cnt}</span>
    </div>
  );

  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      <div style={{ marginBottom:16 }}>
        <h1 className="page-h1" style={{ color:p.t1, margin:0 }}>AI Actions Queue</h1>
        <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>Review, approve or reject AI-suggested actions before execution</p>
      </div>

      {banner && (
        <div className="ai-banner">
          <span style={{ fontSize:18, flexShrink:0 }}>⚡</span>
          <div style={{ flex:1, fontSize:13, color:"#92400e", fontWeight:600, minWidth:180 }}>
            Cross-Sell Outreach has a <b style={{ color:"#d97706" }}>91% approval rate</b> over 30 days. Move to auto-execute?
          </div>
          <div style={{ display:"flex", gap:7, flexShrink:0 }}>
            <button style={{ padding:"5px 13px", background:"#f59e0b", color:"#fff", border:"none", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Confirm</button>
            <button onClick={() => setBanner(false)} style={{ padding:"5px 13px", background:"transparent", color:"#92400e", border:"1px solid #fde68a", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="filter-bar">
        <span style={{ fontSize:12, fontWeight:600, color:p.t5 }}>Filter:</span>
        <select value={fAction} onChange={(e) => setFA(e.target.value)}
          style={{ fontSize:12, border:"1px solid "+p.bdr, borderRadius:6, padding:"4px 9px", background:p.surf2, color:p.t3, cursor:"pointer" }}>
          {actionTypes.map((a) => <option key={a}>{a}</option>)}
        </select>
        <div style={{ display:"flex", border:"1px solid "+p.bdr, borderRadius:7, overflow:"hidden" }}>
          {["All","LOW","HIGH"].map((r) => (
            <button key={r} onClick={() => setFR(r)}
              style={{ padding:"4px 10px", fontSize:11, fontWeight:fRisk===r?700:400, border:"none", cursor:"pointer", background:fRisk===r?(r==="HIGH"?"#fee2e2":r==="LOW"?"#dcfce7":"#6366f1"):"#f8fafc", color:fRisk===r?(r==="HIGH"?"#dc2626":r==="LOW"?"#16a34a":"#fff"):"#64748b" }}>
              {r}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", border:"1px solid "+p.bdr, borderRadius:7, overflow:"hidden" }}>
          {["All","Path","Pharmacy","Vysta"].map((e) => (
            <button key={e} onClick={() => setFE(e)}
              style={{ padding:"4px 10px", fontSize:11, fontWeight:fEntity===e?700:400, border:"none", cursor:"pointer", background:fEntity===e?"#6366f1":"#f8fafc", color:fEntity===e?"#fff":"#64748b" }}>
              {e}
            </button>
          ))}
        </div>
        <span style={{ marginLeft:"auto", fontSize:11, color:p.t6 }}>{filtered.length} shown</span>
      </div>

      {/* 4-column Kanban */}
      <div className="four-col">
        {/* Pending */}
        <div style={col("#fde68a")}>
          {ch(`Pending Review (${filtered.length})`, filtered.length, "#fffbeb", "#f59e0b", "#92400e")}
          <div style={{ padding:"9px 9px 4px" }}>
            <button onClick={approveLow}
              style={{ width:"100%", padding:"6px", background:"#f0fdf4", color:"#16a34a", border:"1px solid #86efac", borderRadius:6, fontSize:10, fontWeight:700, cursor:"pointer", marginBottom:9 }}>
              ✓ Approve All Low-Risk ({filtered.filter((c) => c.risk === "LOW").length})
            </button>
            {filtered.length === 0 && <div style={{ textAlign:"center", color:p.t6, fontSize:12, padding:"16px 0" }}>No actions match</div>}
            {filtered.map((c) => (
              <ActionCard key={c.id} card={c} onApprove={approve} onReject={reject} p={p}/>
            ))}
          </div>
        </div>

        {/* Approved */}
        <div style={col("#86efac")}>
          {ch(`Approved (${approved.length})`, approved.length, "#f0fdf4", "#16a34a", "#15803d")}
          <div style={{ padding:9, maxHeight:680, overflowY:"auto" }}>
            {approved.map((c) => {
              const es = ES[c.entity] ?? ES.Path;
              const as = AS[c.action] ?? { bg:"#f1f5f9", color:p.t4 };
              return (
                <div key={c.id} style={{ background:p.surf2, border:"1px solid "+p.bdr, borderRadius:9, padding:11, marginBottom:8, opacity:0.88 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
                    <span style={{ color:"#16a34a" }}>✓</span>
                    <span style={{ fontWeight:700, fontSize:12, color:p.t2 }}>{c.name}</span>
                  </div>
                  <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                    <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:es.bg, color:es.color, border:`1px solid ${es.border}` }}>{c.entity}</span>
                    <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:as.bg, color:as.color }}>{c.action}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rejected */}
        <div style={col("#fca5a5")}>
          {ch(`Rejected (${rejected.length})`, rejected.length, "#fff1f2", "#ef4444", "#dc2626")}
          <div style={{ padding:9, maxHeight:680, overflowY:"auto" }}>
            {rejected.length === 0 && <div style={{ textAlign:"center", color:p.t6, fontSize:12, padding:"16px 0" }}>No rejected actions</div>}
            {rejected.map((c) => {
              const es = ES[c.entity] ?? ES.Path;
              return (
                <div key={c.id} style={{ background:"#fff8f8", border:"1px solid #fecaca", borderRadius:9, padding:11, marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
                    <span style={{ color:"#ef4444" }}>✕</span>
                    <span style={{ fontWeight:700, fontSize:12, color:p.t2 }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:es.bg, color:es.color, border:`1px solid ${es.border}` }}>{c.entity}</span>
                  {c.reason && <div style={{ fontSize:10, color:p.t6, fontStyle:"italic", marginTop:5 }}>Reason: {c.reason}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto-executed */}
        <div style={col("#c7d2fe")}>
          {ch("Auto-Executed (47)", 47, "#eef2ff", "#6366f1", "#4338ca")}
          <div style={{ padding:9 }}>
            <div style={{ background:"#eef2ff", border:"1px solid #c7d2fe", borderRadius:8, padding:"10px", marginBottom:9, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:800, color:"#4338ca" }}>47</div>
              <div style={{ fontSize:11, color:"#6366f1", fontWeight:600 }}>actions this month</div>
              <div style={{ fontSize:10, color:"#818cf8", marginTop:1 }}>$0 human review time</div>
            </div>
            {AUTO_EX.map((a) => (
              <div key={a.id} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 9px", background:"#f8faff", border:"1px solid #e0e7ff", borderRadius:7, marginBottom:6 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#6366f1", flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:p.t2 }}>{a.name}</div>
                  <div style={{ fontSize:10, color:p.t6 }}>{a.action} · {a.time}</div>
                </div>
                <span style={{ fontSize:9, color:"#6366f1", fontWeight:700, background:"#e0e7ff", padding:"1px 5px", borderRadius:3 }}>AUTO</span>
              </div>
            ))}
            <button style={{ width:"100%", padding:"6px", background:"transparent", border:"1px dashed #c7d2fe", borderRadius:6, fontSize:10, color:"#6366f1", fontWeight:600, cursor:"pointer", marginTop:3 }}>View all 47 →</button>
          </div>
        </div>
      </div>
    </main>
  );
}
