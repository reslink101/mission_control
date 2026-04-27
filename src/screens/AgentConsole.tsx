import { useState, useRef, useEffect } from "react";
import type { Theme } from "../types";
import { AGENT_DEFS, INIT_AGENTS_DATA, buildAgentRow } from "../data/mockData";
import { useRegistryFlash } from "../hooks/useRegistryFlash";

interface Props { p: Theme }

const STATUS_COLOR: Record<string, string> = { idle:"#94a3b8", scheduled:"#3b82f6", "on-demand":"#a855f7" };
const STATUS_BG:    Record<string, string> = { idle:"#f1f5f9", scheduled:"#eff6ff", "on-demand":"#faf5ff" };
const STATUS_TEXT:  Record<string, string> = { idle:"#64748b", scheduled:"#2563eb", "on-demand":"#9333ea" };

export default function AgentConsole({ p }: Props) {
  const [states, setStates] = useState(AGENT_DEFS.map(() => ({ running:false, toast:false })));
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Sync right panel height to left panel
  useEffect(() => {
    const sync = () => {
      if (leftColRef.current && rightColRef.current) {
        const h = leftColRef.current.getBoundingClientRect().height;
        rightColRef.current.style.maxHeight = h + "px";
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    if (leftColRef.current) ro.observe(leftColRef.current);
    return () => ro.disconnect();
  }, []);

  const { rows: agentRows, flashIdx: agentFlash, setRef: setAgentRef } = useRegistryFlash(
    INIT_AGENTS_DATA,
    (seed, i) => buildAgentRow(seed, i),
    600
  );

  const trigger = (i: number) => {
    const ns = [...states];
    ns[i] = { running:true, toast:false };
    setStates(ns);
    setTimeout(() => {
      const ns2 = [...states];
      ns2[i] = { running:false, toast:true };
      setStates(ns2);
    }, 2000);
    setTimeout(() => {
      const ns3 = [...states];
      ns3[i] = { running:false, toast:false };
      setStates(ns3);
    }, 5000);
  };

  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      <div style={{ marginBottom:20 }}>
        <h1 className="page-h1" style={{ color:p.t1, margin:0 }}>Agent Console</h1>
        <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>Monitor and manually trigger AI agents across Mission Control</p>
      </div>

      <div className="two-col-agent" style={{ alignItems:"start" }}>
        {/* Left: detail cards */}
        <div ref={leftColRef} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {AGENT_DEFS.map((a, i) => {
            const st = states[i];
            return (
              <div key={a.name} style={{ background:p.surf, border:"1px solid "+p.bdr, borderRadius:12, padding:"20px 22px", boxShadow:"0 1px 3px rgba(0,0,0,0.05)", position:"relative", overflow:"hidden" }}>
                {st.toast && (
                  <div style={{ position:"absolute", top:12, right:12, background:"#0f172a", color:"#fff", fontSize:11, fontWeight:600, padding:"6px 12px", borderRadius:8, zIndex:10, boxShadow:"0 4px 14px rgba(0,0,0,0.2)" }}>
                    ✓ Completed — {a.processed} items processed
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                    <div style={{ width:42, height:42, borderRadius:10, background:p.surf2, border:"1px solid "+p.bdr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:p.t1 }}>{a.name}</div>
                      <div style={{ fontSize:11, color:p.t6, marginTop:2, lineHeight:1.4 }}>{a.desc}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
                  {st.running
                    ? <span style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, background:"#eff6ff", color:"#2563eb", display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ display:"inline-block", width:10, height:10, border:"2px solid #bfdbfe", borderTopColor:"#2563eb", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
                        Running...
                      </span>
                    : <span style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, background:STATUS_BG[a.status], color:STATUS_TEXT[a.status], textTransform:"uppercase", letterSpacing:"0.03em" }}>{a.status}</span>
                  }
                </div>

                <div className="agent-stat-3">
                  {[
                    { label:"Last Run",     val:a.lastRun,                      color: p.t2 },
                    { label:"Processed",    val:`${a.processed.toLocaleString()} ${a.unit}`, color: p.t2 },
                    { label:"Success Rate", val:`${a.successRate}%`,             color: a.successRate===100?"#16a34a":"#f59e0b" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background:p.surf2, borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ fontSize:10, color:p.t6, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" }}>{stat.label}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:stat.color, marginTop:3 }}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                {"flagged" in a && a.flagged && (
                  <div style={{ fontSize:11, color:p.t5, marginBottom:12, background:"#fef9c3", border:"1px solid #fde68a", borderRadius:6, padding:"5px 10px" }}>
                    🚩 {(a as any).flagged} flagged this run
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontSize:11, color:p.t6 }}>Next: <b style={{ color:p.t4 }}>{a.nextRun}</b></div>
                  <button onClick={() => trigger(i)} disabled={st.running}
                    style={{ padding:"7px 16px", background:st.running?"#f1f5f9":"#0f172a", color:st.running?"#94a3b8":"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:st.running?"not-allowed":"pointer" }}>
                    {st.running ? "Running..." : "▶ Trigger Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Agent status live list */}
        <div ref={rightColRef} style={{ background:p.surf, borderRadius:12, border:"1px solid "+p.bdr, overflow:"hidden", display:"flex", flexDirection:"column", position:"sticky", top:0 }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid "+p.bdr2, display:"flex", justifyContent:"space-between", alignItems:"center", background:p.surf2, zIndex:10, boxShadow:"0 1px 0 "+p.bdr, flexShrink:0 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:p.t1 }}>Agent Status</div>
              <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>{agentRows.length} agents monitored</div>
            </div>
            <span style={{ fontSize:11, background:"#eff6ff", color:"#3b82f6", padding:"3px 10px", borderRadius:99, fontWeight:600 }}>Live</span>
          </div>

          <div ref={(el) => setAgentRef(el as HTMLElement | null)} style={{ flex:1, overflowY:"auto", minHeight:0 }}>
            {agentRows.map((a, i) => {
              const isFlashing = agentFlash === i;
              return (
                <div key={i}
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", borderBottom:i<agentRows.length-1?"1px solid #f8fafc":"none", background: isFlashing ? "#eff6ff" : "" }}
                  onMouseEnter={(e) => { if (!isFlashing) e.currentTarget.style.background = p.surf2; }}
                  onMouseLeave={(e) => { if (!isFlashing) e.currentTarget.style.background = ""; }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background: isFlashing ? "#2563eb" : STATUS_COLOR[a.status] ?? "#94a3b8", flexShrink:0 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color: isFlashing ? "#2563eb" : p.t2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</div>
                    <div style={{ fontSize:11, color:p.t6, marginTop:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.detail}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, textTransform:"uppercase", background: isFlashing ? "#dbeafe" : STATUS_BG[a.status] ?? "#f1f5f9", color: isFlashing ? "#2563eb" : STATUS_TEXT[a.status] ?? "#64748b", flexShrink:0 }}>{a.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
