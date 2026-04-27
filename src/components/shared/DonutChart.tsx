import type { Theme } from "../../types";

interface Props {
  p: Theme;
}

export default function DonutChart({ p }: Props) {
  const total = 1192, high = 67, med = 234, low = 891;
  const r = 60, cx = 76, cy = 76, stroke = 18;
  const circ = 2 * Math.PI * r;
  const highDash = circ * (high / total);
  const medDash  = circ * (med  / total);
  const lowDash  = circ * (low  / total);
  const gap = 2;

  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
      <svg width={152} height={152} style={{ flexShrink:0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22c55e" strokeWidth={stroke}
          strokeDasharray={`${lowDash-gap} ${circ-(lowDash-gap)}`} strokeDashoffset={circ*0.25}
          strokeLinecap="round" style={{ transition:"all 0.6s" }}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth={stroke}
          strokeDasharray={`${medDash-gap} ${circ-(medDash-gap)}`} strokeDashoffset={circ*0.25-lowDash}
          strokeLinecap="round" style={{ transition:"all 0.6s" }}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth={stroke}
          strokeDasharray={`${highDash-gap} ${circ-(highDash-gap)}`} strokeDashoffset={circ*0.25-lowDash-medDash}
          strokeLinecap="round" style={{ transition:"all 0.6s" }}/>
        <text x={cx} y={cy-6} textAnchor="middle" fontSize="19" fontWeight="800" fill="#0f172a">{total.toLocaleString()}</text>
        <text x={cx} y={cx+10} textAnchor="middle" fontSize="10" fill="#94a3b8">Active</text>
      </svg>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {([["#ef4444","High Risk",high],["#f59e0b","Medium Risk",med],["#22c55e","Low Risk",low]] as [string,string,number][]).map(([c,l,v]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:c, flexShrink:0 }}/>
            <div style={{ fontSize:11, color:p.t4, width:82 }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:700, color:p.t1 }}>{v}</div>
            <div style={{ fontSize:11, color:p.t6 }}>{(v/total*100).toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
