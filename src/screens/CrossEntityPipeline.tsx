import { useState } from "react";
import type { Theme, Pipeline, PipelineCard } from "../types";
import { PIPELINES, getTierTheme } from "../data/mockData";

interface Props { p: Theme }

interface PipelineBoardProps {
  p:     Pipeline;
  theme: Theme;
}

function PipelineBoard({ p, theme }: PipelineBoardProps) {
  const [modal, setModal] = useState<PipelineCard | null>(null);
  const dk = theme.t1 === "#f0f6fc";

  return (
    <div style={{ marginBottom:28 }}>
      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)}
          style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background:theme.surf, borderRadius:14, padding:24, width:300, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:15, color:theme.t1 }}>{modal.name}</div>
                <div style={{ fontSize:12, color:theme.t5, marginTop:2 }}>{modal.spec}</div>
              </div>
              <button onClick={() => setModal(null)}
                style={{ background:theme.surf3, border:"none", borderRadius:6, width:26, height:26, cursor:"pointer", fontSize:14, color:theme.t5 }}>✕</button>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              {(() => {
                const mt = getTierTheme(modal.tier, dk);
                return <span style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:99, background:mt.bg, color:mt.color, border:`1px solid ${mt.border}` }}>{modal.tier}</span>;
              })()}
              <span style={{ fontSize:11, padding:"3px 9px", borderRadius:99, background:theme.surf2, color:theme.t4, border:"1px solid "+theme.bdr }}>{modal.days}d in stage</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, borderTop:"1px solid "+theme.bdr, paddingTop:14 }}>
              <button style={{ padding:"9px", background:p.accent, color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer" }}>Open in Attio →</button>
              <button style={{ padding:"9px", background:theme.surf2, color:theme.t4, border:"1px solid "+theme.bdr, borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer" }}>Add AI Action</button>
            </div>
          </div>
        </div>
      )}

      {/* Board header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>{p.emoji}</span>
          <h2 style={{ margin:0, fontSize:15, fontWeight:800, color:theme.t1 }}>{p.title}</h2>
        </div>
        <div style={{ display:"flex", gap:10, fontSize:11, color:theme.t5, background:p.aLight, border:`1px solid ${p.aBorder}`, borderRadius:99, padding:"4px 12px", flexWrap:"wrap" }}>
          <span><b style={{ color:p.aText }}>{p.summary.funnel.toLocaleString()}</b> in funnel</span>
          <span style={{ borderLeft:`1px solid ${p.aBorder}`, paddingLeft:10 }}><b style={{ color:p.aText }}>{p.summary.conv}</b> conv.</span>
          <span style={{ borderLeft:`1px solid ${p.aBorder}`, paddingLeft:10 }}>Avg <b style={{ color:p.aText }}>{p.summary.avg}d</b></span>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="pipeline-scroll">
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${p.cols.length}, minmax(150px, 1fr))`, gap:10, minWidth:`${p.cols.length * 160}px` }}>
          {p.cols.map((col) => (
            <div key={col.name} style={{ minWidth:160 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 10px", background:p.aLight, border:`1px solid ${p.aBorder}`, borderRadius:"8px 8px 0 0" }}>
                <span style={{ fontSize:10, fontWeight:700, color:p.aText, textTransform:"uppercase", letterSpacing:"0.04em" }}>{col.name}</span>
                <span style={{ fontSize:10, fontWeight:700, background:p.accent, color:"#fff", borderRadius:99, padding:"1px 6px" }}>{col.count.toLocaleString()}</span>
              </div>
              <div style={{ border:`1px solid ${p.aBorder}`, borderTop:"none", borderRadius:"0 0 8px 8px", background:theme.surf, padding:7, display:"flex", flexDirection:"column", gap:7 }}>
                {col.cards.map((card, ki) => {
                  const t = getTierTheme(card.tier, dk);
                  return (
                    <div key={ki} onClick={() => setModal(card)}
                      style={{ background:theme.surf2, border:"1px solid "+theme.bdr, borderRadius:7, padding:"9px 10px", cursor:"pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.12)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.bdr; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ fontSize:11, fontWeight:700, color:theme.t1, marginBottom:4 }}>{card.name}</div>
                      <div style={{ fontSize:10, color:theme.t4, marginBottom:5 }}>{card.spec}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:99, background:t.bg, color:t.color, border:`1px solid ${t.border}` }}>{card.tier}</span>
                        <span style={{ fontSize:10, color:card.days>30?"#ef4444":card.days>14?"#f59e0b":theme.t5, fontWeight:600 }}>{card.days}d</span>
                      </div>
                    </div>
                  );
                })}
                <button style={{ width:"100%", padding:"5px", background:"transparent", border:`1px dashed ${p.aBorder}`, borderRadius:6, fontSize:10, color:p.aText, cursor:"pointer", fontWeight:600 }}>+{col.count} total</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CrossEntityPipeline({ p }: Props) {
  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      <div className="page-header">
        <div>
          <h1 className="page-h1" style={{ color:p.t1 }}>Cross-Entity Pipeline</h1>
          <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>Live Kanban across all three business entities</p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {([
            ["💊 Path Peptides","#eff6ff","#2563eb","#bfdbfe"],
            ["🏥 Pharmacy",     "#faf5ff","#7c3aed","#ddd6fe"],
            ["📱 Vysta",        "#f0fdfa","#0f766e","#99f6e4"],
          ] as [string,string,string,string][]).map(([l,bg,c,b]) => (
            <span key={l} style={{ fontSize:11, background:bg, color:c, padding:"5px 12px", borderRadius:99, fontWeight:600, border:`1px solid ${b}` }}>{l}</span>
          ))}
        </div>
      </div>

      {PIPELINES.map((pl) => (
        <PipelineBoard key={pl.id} p={pl} theme={p}/>
      ))}
    </main>
  );
}
