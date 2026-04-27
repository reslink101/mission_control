import type { Theme } from "../types";
import { SEGMENTS, INIT_FIELDS, buildFieldRow } from "../data/mockData";
import { useRegistryFlash } from "../hooks/useRegistryFlash";

interface Props { p: Theme }

export default function KlaviyoStatus({ p }: Props) {
  const { rows: fieldRows, flashIdx: fieldFlash, setRef: setFieldRef } = useRegistryFlash(
    INIT_FIELDS,
    (seed, i) => buildFieldRow(seed, i),
    700
  );

  const mismatchCount = fieldRows.filter((f) => f.status === "Mismatch").length;

  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      <div className="page-header" style={{ marginBottom:20 }}>
        <div>
          <h1 className="page-h1" style={{ color:p.t1, margin:0 }}>Klaviyo Status</h1>
          <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>Live segment sync status between Attio and Klaviyo</p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <span style={{ fontSize:11, background:"#fef3c7", color:"#d97706", padding:"5px 12px", borderRadius:99, fontWeight:600, border:"1px solid #fde68a" }}>⚠ 1 Segment Error</span>
          <button style={{ fontSize:12, padding:"6px 14px", background:"#0f172a", color:"#fff", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>↻ Sync All</button>
        </div>
      </div>

      {/* Healthy segments */}
      <div className="three-col">
        {SEGMENTS.filter((s) => s.status !== "error").map((seg, i) => (
          <div key={i} style={{ background:p.surf, border:"1px solid #e2e8f0", borderRadius:12, padding:"16px 18px", position:"relative", overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>{seg.icon}</span>
                <span style={{ fontSize:13, fontWeight:700, color:p.t2 }}>{seg.name}</span>
              </div>
              <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99, background:"#dcfce7", color:"#16a34a" }}>✓ Healthy</span>
            </div>
            <div style={{ fontSize:26, fontWeight:800, color:p.t1, letterSpacing:"-0.02em" }}>{seg.members.toLocaleString()}</div>
            <div style={{ fontSize:11, color:p.t6, marginTop:2 }}>members in segment</div>
            <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:11, color:"#64748b" }}>Last sync: {seg.sync}</span>
              <button style={{ fontSize:10, padding:"3px 8px", background:p.surf2, color:p.t4, border:"1px solid "+p.bdr, borderRadius:5, cursor:"pointer", fontWeight:600 }}>↻ Sync</button>
            </div>
          </div>
        ))}
      </div>

      {/* Error segments */}
      {SEGMENTS.filter((s) => s.status === "error").map((seg, i) => (
        <div key={i} style={{ background:p.surf, border:"1px solid #fca5a5", borderRadius:12, padding:"18px 22px", position:"relative", overflow:"hidden", marginBottom:14 }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"#ef4444" }}/>
          <div className="kl-error-row">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{seg.icon}</span>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:p.t2 }}>{seg.name}</span>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:"#fee2e2", color:"#dc2626" }}>ERROR</span>
                </div>
                <div style={{ fontSize:11, color:"#dc2626", marginTop:2 }}>Last sync: {seg.sync}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
              <span style={{ fontSize:32, fontWeight:800, color:p.t1, letterSpacing:"-0.02em" }}>{seg.members.toLocaleString()}</span>
              <span style={{ fontSize:12, color:p.t6 }}>members in segment</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"8px 14px", fontSize:11, color:"#dc2626", fontWeight:600 }}>
                ⚠ Sync failed — check field mapping
              </div>
              <button style={{ fontSize:11, padding:"7px 14px", background:"#0f172a", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>↻ Retry Sync</button>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginBottom:10 }}/>

      {/* Field sync table */}
      <div style={{ background:p.surf, border:"1px solid "+p.bdr, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid "+p.bdr2, display:"flex", justifyContent:"space-between", alignItems:"center", background:p.surf2, zIndex:10, boxShadow:"0 1px 0 "+p.bdr }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:p.t1 }}>Field Sync Status</div>
            <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>Attio → Klaviyo custom property mapping</div>
          </div>
          <span style={{ fontSize:11, background:"#fef3c7", color:"#d97706", padding:"3px 10px", borderRadius:99, fontWeight:600 }}>
            {mismatchCount} mismatch out of {fieldRows.length}
          </span>
        </div>

        <div ref={(el) => setFieldRef(el as HTMLElement | null)} style={{ overflowY:"auto", overflowX:"auto", height:"400px", position:"relative" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:500 }}>
            <thead style={{ position:"sticky", top:0, zIndex:10, background:p.surf2 }}>
              <tr>
                {["Field Name","Status","Details",""].map((h) => (
                  <th key={h} style={{ padding:"10px 18px", fontSize:11, fontWeight:600, color:p.t5, textAlign:"left", borderBottom:"1px solid "+p.bdr, boxShadow:"0 1px 0 "+p.bdr }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fieldRows.map((f, i) => {
                const mismatch   = f.status === "Mismatch";
                const isFlashing = fieldFlash === i;
                return (
                  <tr key={i}
                    style={{ borderBottom:"1px solid "+p.bdr2, background: isFlashing ? p.amber : mismatch ? p.amber : "", outline: isFlashing ? "1px solid #fde68a" : "none" }}
                    onMouseEnter={(e) => { if (!isFlashing) e.currentTarget.style.background = mismatch ? p.amber : p.surf2; }}
                    onMouseLeave={(e) => { if (!isFlashing) e.currentTarget.style.background = mismatch ? p.amber : ""; }}>
                    <td style={{ padding:"12px 18px", fontSize:12, fontWeight:600, color: isFlashing ? "#92400e" : p.t2, fontFamily:"monospace" }}>{f.field}</td>
                    <td style={{ padding:"12px 18px" }}>
                      <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99, background:mismatch?"#fef3c7":"#dcfce7", color:mismatch?"#d97706":"#16a34a" }}>{f.status}</span>
                    </td>
                    <td style={{ padding:"12px 18px", fontSize:12, color:mismatch?"#d97706":"#94a3b8" }}>{f.note}</td>
                    <td style={{ padding:"12px 18px" }}>
                      {mismatch && (
                        <button style={{ fontSize:11, padding:"3px 9px", background:p.surf, color:"#d97706", border:"1px solid #fde68a", borderRadius:6, cursor:"pointer", fontWeight:600 }}>Fix Mapping</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
