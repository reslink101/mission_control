import type { Theme } from "../../types";

interface Props {
  p: Theme;
}

export default function TierBar({ p }: Props) {
  const tiers = [
    { name:"Silver",   count:423, ltv:"$180K", color:p.t6,      pct:30  },
    { name:"Gold",     count:312, ltv:"$890K", color:"#f59e0b",  pct:45  },
    { name:"Platinum", count:134, ltv:"$1.2M", color:"#0ea5e9",  pct:65  },
    { name:"VIP",      count:23,  ltv:"$680K", color:"#8b5cf6",  pct:100 },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {tiers.map((t) => (
        <div key={t.name}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:t.color }}/>
              <span style={{ fontSize:12, fontWeight:600, color:p.t3 }}>{t.name}</span>
              <span style={{ fontSize:11, color:p.t6 }}>{t.count} physicians</span>
            </div>
            <span style={{ fontSize:12, fontWeight:700, color:p.t1 }}>{t.ltv} LTV</span>
          </div>
          <div style={{ height:8, background:p.surf3, borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${t.pct}%`, background:t.color, borderRadius:99, transition:"width 0.8s" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}
