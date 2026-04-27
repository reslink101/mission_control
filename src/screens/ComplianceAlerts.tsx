import { useState } from "react";
import type { Theme } from "../types";
import { EXPIRED_DATA, EXPIRING_DATA } from "../data/mockData";

interface Props { p: Theme }

interface SectionProps {
  title:    string;
  count:    number;
  color:    string;
  bg:       string;
  border:   string;
  children: React.ReactNode;
  p:        Theme;
}

function Section({ title, count, color, bg, border, children, p }: SectionProps) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 18px", background:bg, border:`1px solid ${border}`, borderRadius:"10px 10px 0 0" }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:color }}/>
        <span style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.01em" }}>{title}</span>
        <span style={{ fontSize:12, fontWeight:700, background:color, color:"#fff", borderRadius:99, padding:"1px 8px", marginLeft:2 }}>{count}</span>
      </div>
      <div style={{ border:`1px solid ${border}`, borderTop:"none", borderRadius:"0 0 10px 10px", background:p.surf }}>
        {children}
      </div>
    </div>
  );
}

export default function ComplianceAlerts({ p }: Props) {
  const [sent, setSent] = useState<Record<string, boolean>>({});
  const sendReminder = (id: string) => setSent((s) => ({ ...s, [id]: true }));

  const rowBtns = (id: string) => (
    <div style={{ display:"flex", gap:6, flexShrink:0, flexWrap:"wrap" }}>
      <button onClick={() => sendReminder(id)}
        style={{ fontSize:11, padding:"4px 10px", background:sent[id]?"#f0fdf4":"#fff", color:sent[id]?"#16a34a":"#475569", border:`1px solid ${sent[id]?"#86efac":"#e2e8f0"}`, borderRadius:6, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
        {sent[id] ? "✓ Sent" : "📧 Remind"}
      </button>
      <button style={{ fontSize:11, padding:"4px 10px", background:p.surf2, color:"#2563eb", border:"1px solid #bfdbfe", borderRadius:6, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
        Attio ↗
      </button>
    </div>
  );

  return (
    <main className="screen-main" style={{ minHeight:"100%", background:p.canvas }}>
      <div style={{ marginBottom:20 }}>
        <h1 className="page-h1" style={{ color:p.t1, margin:0 }}>Compliance Alerts</h1>
        <p style={{ color:p.t5, margin:"4px 0 0", fontSize:13 }}>License and document monitoring across the physician network</p>
      </div>

      {/* Summary cards */}
      <div className="three-col" style={{ marginBottom:20 }}>
        {([
          ["Expired",       3,    "#ef4444", "#fee2e2"],
          ["Expiring Soon", 8,    "#d97706", "#fef3c7"],
          ["Valid",         1236, "#16a34a", "#dcfce7"],
        ] as [string, number, string, string][]).map(([l, v, c, bg]) => (
          <div key={l} style={{ background:bg, border:`1px solid ${c}30`, borderRadius:10, padding:"14px 16px", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ fontSize:26, fontWeight:800, color:c }}>{v}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:c }}>{l}</div>
              <div style={{ fontSize:11, color:c+"aa" }}>documents</div>
            </div>
          </div>
        ))}
      </div>

      {/* Expired */}
      <Section title="EXPIRED" count={3} color="#dc2626" bg="#fff1f2" border="#fecaca" p={p}>
        {EXPIRED_DATA.map((r, i) => (
          <div key={i} className="compliance-row" style={{ borderBottom:i<EXPIRED_DATA.length-1?"1px solid #fef2f2":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
              <div style={{ width:34, height:34, borderRadius:8, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>
                {r.type==="physician" ? "👨‍⚕️" : "🏥"}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:p.t2 }}>{r.name}</div>
                <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>
                  {r.doc} · {r.state} · <span style={{ color:"#dc2626", fontWeight:600 }}>{r.date}</span>
                </div>
              </div>
            </div>
            {rowBtns(`exp_${i}`)}
          </div>
        ))}
      </Section>

      {/* Expiring soon */}
      <Section title="EXPIRING SOON" count={8} color="#d97706" bg="#fffbeb" border="#fde68a" p={p}>
        {EXPIRING_DATA.map((r, i) => (
          <div key={i} className="compliance-row" style={{ borderBottom:i<EXPIRING_DATA.length-1?"1px solid #fffbeb":"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
              <div style={{ width:34, height:34, borderRadius:8, background:"#fef3c7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>
                {r.type==="physician" ? "👨‍⚕️" : "🏥"}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:p.t2 }}>{r.name}</div>
                <div style={{ fontSize:11, color:p.t6, marginTop:1 }}>{r.doc} · {r.state}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0, flexWrap:"wrap" }}>
              <span style={{ fontSize:12, fontWeight:700, color:r.days<=7?"#dc2626":r.days<=14?"#d97706":"#92400e", background:r.days<=7?"#fee2e2":"#fef3c7", padding:"3px 9px", borderRadius:99, whiteSpace:"nowrap" }}>
                {r.days}d left
              </span>
              {rowBtns(`soon_${i}`)}
            </div>
          </div>
        ))}
      </Section>

      {/* Valid */}
      <Section title="VALID" count={1236} color="#16a34a" bg="#f0fdf4" border="#86efac" p={p}>
        <div style={{ padding:"18px 20px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>✅</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#15803d" }}>1,236 documents valid</div>
            <div style={{ fontSize:12, color:"#4ade80", marginTop:2 }}>Across 892 active physicians · All within compliance window</div>
          </div>
        </div>
      </Section>
    </main>
  );
}
