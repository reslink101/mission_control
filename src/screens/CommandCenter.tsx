import { useRef, useEffect, useState } from "react";
import type { Theme } from "../types";
import { useRegistryFlash } from "../hooks/useRegistryFlash";
import {
  KPI_DATA, FEED_DATA, INIT_FIT_ROWS,
  buildFitRow, getTierTheme, today,
} from "../data/mockData";
import DonutChart        from "../components/shared/DonutChart";
import TierBar           from "../components/shared/TierBar";
import IntelligenceAIBar from "../components/shared/IntelligenceAIBar";

interface Props { p: Theme }

function fitBadge(tier: string) {
  const map: Record<string, { bg: string; color: string }> = {
    "Tier 1": { bg:"#f0fdf4", color:"#16a34a" },
    "Tier 2": { bg:"#eff6ff", color:"#2563eb" },
    "Tier 3": { bg:"#f8fafc", color:"#64748b" },
  };
  const s = map[tier] ?? map["Tier 3"];
  return (
    <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99, background:s.bg, color:s.color }}>
      {tier}
    </span>
  );
}

export default function CommandCenter({ p }: Props) {
  const dk = p.t1 === "#f0f6fc";

  const { rows: fitRows, flashIdx: fitFlash, setRef: setFitRef } = useRegistryFlash(
    INIT_FIT_ROWS,
    (seed, i) => buildFitRow(seed, i),
    380
  );

  // Match live-feed height to left column height
  const leftColRef  = useRef<HTMLDivElement>(null);
  const [liveFeedH, setLiveFeedH] = useState<number | null>(null);
  useEffect(() => {
    const measure = () => {
      if (leftColRef.current) setLiveFeedH(leftColRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (leftColRef.current) ro.observe(leftColRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-h1" style={{ color:p.t1 }}>Command Center</h1>
          <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>Abel's AI-Powered Healthcare Empire</p>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ fontSize:12, color:p.t5, background:p.surf, border:"1px solid "+p.bdr, borderRadius:8, padding:"6px 14px", fontWeight:500 }}>
            📅 {today}
          </div>
          <div style={{ marginTop:8, display:"flex", gap:6, justifyContent:"flex-end", flexWrap:"wrap" }}>
            <span style={{ fontSize:11, background:"#dcfce7", color:"#16a34a", padding:"3px 10px", borderRadius:99, fontWeight:600 }}>● Systems Nominal</span>
            <span style={{ fontSize:11, background:"#fef3c7", color:"#d97706", padding:"3px 10px", borderRadius:99, fontWeight:600 }}>12 Pending Actions</span>
          </div>
        </div>
      </div>

      <IntelligenceAIBar />

      {/* KPI grid */}
      <div className="kpi-grid">
        {KPI_DATA.map((k) => (
          <div key={k.label} style={{ background:p.surf, border:`1px solid ${k.bc}`, borderRadius:9, padding:"10px 12px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:10, fontWeight:600, color:p.t5, textTransform:"uppercase", letterSpacing:"0.04em", lineHeight:1.2, paddingRight:4 }}>{k.label}</span>
              <span style={{ fontSize:14, lineHeight:1, flexShrink:0 }}>{k.icon}</span>
            </div>
            <div className="kpi-value" style={{ color:p.t1 }}>{k.value}</div>
            {/* Use p.t5 as fallback so the sub-text is always visible in dark mode */}
            <div style={{ marginTop:3, fontSize:10, fontWeight:500, color:k.upColor ?? p.t5, lineHeight:1.3 }}>{k.sub}</div>
            {k.bar != null && (
              <div style={{ marginTop:6, height:3, background:p.surf3, borderRadius:99, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${k.bar}%`, background:k.bar > 80 ? "#ef4444" : "#f59e0b", borderRadius:99 }}/>
              </div>
            )}
          </div>
        ))}

        {/* Stat cards */}
        {([
          { label:"Revenue MTD",     value:"$94,200", change:"+20.8% QoQ",        up:true,  bc:"#e2e8f0" },
          { label:"Avg Order Value", value:"$3,108",  change:"+$240 vs last mo.", up:true,  bc:"#e2e8f0" },
          { label:"Churn Risk High", value:"67 MDs",  change:"2 win-backs queued",up:false, bc:"#fecaca" },
        ] as const).map((s) => (
          <div key={s.label} style={{ background:p.surf, border:`1px solid ${s.bc}`, borderRadius:9, padding:"10px 12px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:0 }}>
            <div style={{ fontSize:10, color:p.t5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em", lineHeight:1.2, marginBottom:4 }}>{s.label}</div>
            <div className="kpi-value" style={{ color:p.t1 }}>{s.value}</div>
            <div style={{ marginTop:3, fontSize:10, fontWeight:600, color:s.up?"#16a34a":"#ef4444", lineHeight:1.3 }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="two-col-main" style={{ alignItems:"start" }}>
        {/* Left column */}
        <div ref={leftColRef} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div className="two-col-inner">
            {/* Donut chart */}
            <div style={{ background:p.surf, border:"1px solid "+p.bdr, borderRadius:12, padding:"20px 22px" }}>
              <div style={{ fontSize:14, fontWeight:700, color:p.t1, marginBottom:4 }}>Churn Risk Distribution</div>
              <div style={{ fontSize:11, color:p.t6, marginBottom:18 }}>1,192 active physicians</div>
              <DonutChart p={p}/>
            </div>
            {/* Tier bar */}
            <div style={{ background:p.surf, border:"1px solid "+p.bdr, borderRadius:12, padding:"20px 22px" }}>
              <div style={{ fontSize:14, fontWeight:700, color:p.t1, marginBottom:4 }}>Account Tier Breakdown</div>
              <div style={{ fontSize:11, color:p.t6, marginBottom:18 }}>LTV by tier segment</div>
              <TierBar p={p}/>
            </div>
          </div>

          {/* Cross-sell table */}
          <div style={{ background:p.surf, border:"1px solid "+p.bdr, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid "+p.bdr2, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:p.t1 }}>Top Cross-Sell Opportunities</div>
                <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>AI-ranked fit scores across entities · Live sync</div>
              </div>
              <span style={{ fontSize:11, background:"#eff6ff", color:"#2563eb", padding:"3px 10px", borderRadius:99, fontWeight:600 }}>{fitRows.length} total</span>
            </div>
            <div ref={(el) => setFitRef(el as HTMLElement | null)} style={{ overflowY:"auto", overflowX:"auto", height:"360px", position:"relative" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
                <thead style={{ position:"sticky", top:0, zIndex:10, background:p.surf2 }}>
                  <tr>
                    {["Physician","Specialty","Account Tier","Pharmacy Fit","Vysta Fit","Priority","LTV",""].map((h) => (
                      <th key={h} style={{ padding:"10px 16px", fontSize:11, fontWeight:600, color:p.t5, textAlign:"left", borderBottom:"1px solid "+p.bdr, whiteSpace:"nowrap", boxShadow:"0 1px 0 "+p.bdr }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map((row, i) => {
                    const isFlashing  = fitFlash === i;
                    const tierTheme   = getTierTheme(row.tier, dk);
                    return (
                      <tr key={i}
                        style={{ borderBottom:"1px solid "+p.bdr2, background: isFlashing ? "#fef9c3" : "", transition: isFlashing ? "background 0.08s" : "background 0.3s", outline: isFlashing ? "1px solid #fde68a" : "none" }}
                        onMouseEnter={(e) => { if (!isFlashing) e.currentTarget.style.background = p.surf2; }}
                        onMouseLeave={(e) => { if (!isFlashing) e.currentTarget.style.background = ""; }}>
                        <td style={{ padding:"11px 16px", fontSize:13, fontWeight:600, color:isFlashing?"#92400e":p.t2, whiteSpace:"nowrap" }}>{row.name}</td>
                        <td style={{ padding:"11px 16px", fontSize:12, color:p.t5 }}>{row.spec}</td>
                        <td style={{ padding:"11px 16px" }}>
                          <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99, background:tierTheme.bg, color:tierTheme.color, border:`1px solid ${tierTheme.border}` }}>{row.tier}</span>
                        </td>
                        <td style={{ padding:"11px 16px" }}>{fitBadge(row.pharm)}</td>
                        <td style={{ padding:"11px 16px" }}>{fitBadge(row.vysta)}</td>
                        <td style={{ padding:"11px 16px" }}>
                          <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:row.priority==="HIGH"?"#fee2e2":row.priority==="MEDIUM"?"#fef3c7":"#f0fdf4", color:row.priority==="HIGH"?"#dc2626":row.priority==="MEDIUM"?"#d97706":"#16a34a" }}>{row.priority}</span>
                        </td>
                        <td style={{ padding:"11px 16px", fontSize:12, fontWeight:700, color:isFlashing?"#d97706":p.t1 }}>{row.ltv}</td>
                        <td style={{ padding:"11px 16px" }}>
                          <button style={{ fontSize:11, padding:"4px 10px", background:"#eff6ff", color:"#2563eb", border:"1px solid #bfdbfe", borderRadius:6, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>View in Attio →</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Live feed */}
        <div style={{ background:p.surf, borderRadius:12, border:"1px solid "+p.bdr, display:"flex", flexDirection:"column", overflow:"hidden", height: liveFeedH ?? undefined, minHeight:300 }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid "+p.bdr2, display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:p.t1 }}>Live Feed</div>
              <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>Real-time AI events</div>
            </div>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 0 3px #dcfce7", display:"inline-block" }}/>
          </div>

          <div style={{ overflowY:"auto", flex:1 }}>
            {FEED_DATA.map((ev, i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:"11px 20px", borderBottom:i<FEED_DATA.length-1?"1px solid "+p.bdr2:"none", alignItems:"flex-start" }}>
                <div style={{ marginTop:4, width:8, height:8, borderRadius:"50%", flexShrink:0, background:ev.dot }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, color:p.t3, lineHeight:1.45, fontWeight:500, wordBreak:"break-word", overflowWrap:"break-word" }}>{ev.text}</div>
                  <div style={{ display:"flex", gap:8, marginTop:4, alignItems:"center" }}>
                    <span style={{ fontSize:10, color:p.t6 }}>{ev.time}</span>
                    <span style={{ fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:99, background:ev.tc.bg, color:ev.tc.c }}>{ev.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding:"12px 20px", borderTop:"1px solid "+p.bdr, flexShrink:0 }}>
            <button style={{ width:"100%", padding:"8px", background:p.surf2, border:"1px solid "+p.bdr, borderRadius:8, fontSize:12, color:p.t5, fontWeight:600, cursor:"pointer" }}>View All Events →</button>
          </div>
        </div>
      </div>
    </main>
  );
}
