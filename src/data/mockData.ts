import type {
  KpiItem,
  FeedEvent,
  FitRow,
  AgentRow,
  FieldRow,
  ActionCardData,
  Pipeline,
} from "../types";

// ─── Navigation ────────────────────────────────────────────────────
export const NAV = [
  { label: "Command Center",       icon: "⚡" },
  { label: "Cross-Entity Pipeline", icon: "🔀" },
  { label: "AI Actions Queue",     icon: "🤖", badge: 8 },
  { label: "Agent Console",        icon: "🖥" },
  { label: "Compliance Alerts",    icon: "🛡",  badge: 3, badgeColor: "#ef4444" },
  { label: "Klaviyo Status",       icon: "📧", badge: "!", badgeColor: "#ef4444" },
];

export const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// ─── KPI cards ─────────────────────────────────────────────────────
export const KPI_DATA: KpiItem[] = [
  { label: "Total Physicians",     value: "1,247", sub: "↑23 this week",                          icon: "👨‍⚕️", bc: "#bfdbfe", upColor: "#16a34a" },
  { label: "Path Peptides Active", value: "892",   sub: "71.5% of base",                          icon: "💊",   bc: "#a7f3d0", upColor: "#16a34a" },
  { label: "Pharmacy Distribution",value: "156",   sub: "Active accounts · +12 onboarding",       icon: "🏥",   bc: "#ddd6fe", upColor: "#64748b" },
  { label: "Vysta Telemedicine",   value: "43",    sub: "Live providers · 4 in credentialing",    icon: "📱",   bc: "#99f6e4", upColor: "#0d9488" },
  { label: "Pending AI Actions",   value: "8",     sub: "2 high-risk flagged",                    icon: "⚠️",  bc: "#fde68a", upColor: "#ef4444" },
  { label: "Monthly AI Cost",      value: "$187",  sub: "$290 budget · 64% used",                 icon: "💰",   bc: "#e2e8f0", bar: 64 },
];

// ─── Live feed events ──────────────────────────────────────────────
export const FEED_DATA: FeedEvent[] = [
  { dot: "#22c55e", time: "10:14 AM", text: "New order: Dr. Rachel Goldberg — $8,900 bulk order (TB-500, BPC-157, Thymosin Alpha-1)",                          tag: "Order",      tc: { bg: "#dcfce7", c: "#16a34a" } },
  { dot: "#3b82f6", time: "10:05 AM", text: "Stage advance: Dr. Robert Kim → Active (second order confirmed — 7-day reorder)",                                 tag: "Pipeline",   tc: { bg: "#dbeafe", c: "#2563eb" } },
  { dot: "#22c55e", time: "9:58 AM",  text: "New order: Dr. Carlos Mendez — $3,120 (CJC-1295 w/DAC 30 vials + Semaglutide 5mg x5)",                           tag: "Order",      tc: { bg: "#dcfce7", c: "#16a34a" } },
  { dot: "#3b82f6", time: "9:45 AM",  text: "Pharmacy pipeline: Dr. Craig Henderson → Active (first compound order placed #PHM-001)",                          tag: "Pipeline",   tc: { bg: "#dbeafe", c: "#2563eb" } },
  { dot: "#8b5cf6", time: "6:04 AM",  text: "Enrichment complete: 47 new physician records enriched via NPI · specialty, practice info updated",               tag: "Enrichment", tc: { bg: "#ede9fe", c: "#7c3aed" } },
  { dot: "#ef4444", time: "12:03 AM", text: "High churn risk: Dr. Marcus Webb — 61 days inactive · $2.1K/mo at risk · win-back queued",                       tag: "Risk",       tc: { bg: "#fee2e2", c: "#dc2626" } },
  { dot: "#ef4444", time: "12:03 AM", text: "High churn risk: Dr. Kevin Park — 47 days inactive · Gold tier · $2.8K/mo at risk",                              tag: "Risk",       tc: { bg: "#fee2e2", c: "#dc2626" } },
  { dot: "#f59e0b", time: "8:00 AM",  text: "Compliance: Dr. Yolanda Fuentes — State Pharmacy License expiring in 8 days",                                    tag: "Compliance", tc: { bg: "#fef3c7", c: "#d97706" } },
];

// ─── Tier theme maps ───────────────────────────────────────────────
export const TC_LIGHT: Record<string, { bg: string; color: string; border: string }> = {
  Silver:   { bg: "#f1f5f9", color: "#475569", border: "#cbd5e1" },
  Gold:     { bg: "#fef9c3", color: "#a16207", border: "#fde047" },
  Platinum: { bg: "#f0f9ff", color: "#0369a1", border: "#7dd3fc" },
  VIP:      { bg: "#fdf4ff", color: "#7e22ce", border: "#d8b4fe" },
};
export const TC_DARK: Record<string, { bg: string; color: string; border: string }> = {
  Silver:   { bg: "#1e2530", color: "#94a3b8", border: "#334155" },
  Gold:     { bg: "#2d2200", color: "#fbbf24", border: "#92400e" },
  Platinum: { bg: "#0c1a2e", color: "#60a5fa", border: "#1e40af" },
  VIP:      { bg: "#1a0a2e", color: "#c084fc", border: "#6b21a8" },
};
export function getTierTheme(tier: string, dark: boolean) {
  const map = dark ? TC_DARK : TC_LIGHT;
  return (
    map[tier] ??
    (dark
      ? { bg: "#1c2128", color: "#8b949e", border: "#30363d" }
      : { bg: "#f8fafc", color: "#64748b", border: "#e2e8f0" })
  );
}

// ─── Name / data pools ─────────────────────────────────────────────
export const FIRST_NAMES = ["Sarah","Carlos","Marco","Rachel","Orlando","Alejandro","Hector","Nina","Rafael","Samuel","Elena","Diana","James","Wei","Sofia","Angela","Thomas","Kevin","Craig","Patricia","Maria","Robert","Brian","Monica","Yolanda","Eduardo","Jennifer","Frank","Amy","Benjamin","Lisa","Marcus","Victor","Christine","Denise","Derek","Gabriela","Ivan","Jasmine","Kenneth","Laura","Miguel","Nathan","Olivia","Philip","Quinn","Rosa","Steven","Tina","Uma"];
export const LAST_NAMES  = ["Chen","Mendez","Rivera","Goldberg","Vásquez","Cruz","Delgado","Castillo","Gomez","Torres","Kim","Park","Walsh","Zhang","Ramirez","Santos","Hartley","Henderson","Morrison","Fuentes","Rodriguez","Lee","Okafor","Webb","Bernard","Vega","Brooks","Reyes","Volkov","Castillo","Gomez","Torres","Chan","Lopez","Nguyen","Patel","Martin","Thompson","Jackson","White","Harris","Clark","Lewis","Robinson","Walker","Hall","Allen","Young","King","Scott"];
export const SPECS       = ["Anti-Aging","Endocrinology","Weight Mgmt","Internal Med","Family Med","Dermatology","Sports Med","HRT Specialist","Functional Med","Cardiology"];
export const TIERS       = ["VIP","Platinum","Gold","Silver"];
export const PHARM_TIERS = ["Tier 1","Tier 2","Tier 3"];
export const PRIORITIES  = ["HIGH","MEDIUM","LOW"];
export const AGENT_NAMES = ["Enrichment Agent","Cross-Sell Agent","Churn Agent","Outreach Draft","Data Cleanup","Sync Agent","Validation Agent","Scoring Agent","Alert Agent","Pipeline Agent"];
export const AGENT_STATUSES = ["idle","scheduled","on-demand"];
export const FIELD_TYPES = ["tier","risk","status","ltv","score","segment","tag","flag","source","stage"];

// ─── Row builder helpers ───────────────────────────────────────────
export function rndInt(min: number, max: number, seed?: number) {
  const s = seed ?? Math.random() * 9999;
  return min + Math.floor(((s * 1.618033) % 1) * (max - min + 1));
}
export function rndName(seed: number) {
  const f = FIRST_NAMES[(seed * 7 + 3) % FIRST_NAMES.length];
  const l = LAST_NAMES[(seed * 13 + 5) % LAST_NAMES.length];
  return `Dr. ${f} ${l}`;
}

const LTV_AMOUNTS = [1200,2400,3600,4800,6000,7200,8400,9600,10800,12000,14400,16800,19200,21600,24000,28000,32000,36000,40000,44000,48000,52000,56000,61000,68000,75000,82000,88000,96000,104000,112000];

export function buildFitRow(seed: number, i: number): FitRow {
  const s = (seed + i * 7) % 9999;
  const ltv = LTV_AMOUNTS[(s * 17) % LTV_AMOUNTS.length];
  return {
    name:     rndName(s),
    spec:     SPECS[s % SPECS.length],
    tier:     TIERS[s % TIERS.length],
    pharm:    PHARM_TIERS[s % PHARM_TIERS.length],
    vysta:    PHARM_TIERS[(s + 1) % PHARM_TIERS.length],
    priority: PRIORITIES[s % PRIORITIES.length],
    ltv:      `$${ltv.toLocaleString()}`,
  };
}

export function buildAgentRow(seed: number, i: number): AgentRow {
  const s = (seed + i * 11) % 9999;
  const processedAmounts = [47,89,156,234,312,445,567,678,789,892,1024,1100,1192,1247,1312,1456,1589,1634,1712,1800];
  const lastTimes = ["6:04 AM","9:18 AM","10:30 AM","midnight","2:08 AM","7:00 AM","11:15 PM","Apr 20","Apr 21","Apr 22","Apr 14","Apr 15","Apr 18","1:00 AM","3:30 PM"];
  const nextTimes = ["6:00 AM","Sunday 9 AM","midnight","On demand","Monday 2:00 AM","Tomorrow 6:00 AM","Next Wednesday","Tonight","Saturday noon"];
  const processed = processedAmounts[(s * 3) % processedAmounts.length];
  const status = AGENT_STATUSES[s % AGENT_STATUSES.length];
  return {
    name:      AGENT_NAMES[s % AGENT_NAMES.length] + ` #${(s % 99) + 1}`,
    status,
    processed,
    detail:    `Last run ${lastTimes[(s * 7) % lastTimes.length]} · ${processed.toLocaleString()} scanned · Next ${nextTimes[(s * 5) % nextTimes.length]}`,
  };
}

export function buildFieldRow(seed: number, i: number): FieldRow {
  const s = (seed + i * 9) % 9999;
  const isMismatch = s % 7 === 0;
  const hrsAgo = (s % 23) + 1;
  return {
    field:  `custom_field_${(s % 98) + 1}_${FIELD_TYPES[s % FIELD_TYPES.length]}`,
    status: isMismatch ? "Mismatch" : "Synced",
    note:   isMismatch
      ? ["Attio type conflict → Check Klaviyo mapping","Schema version mismatch → Re-map required","Null value conflict → Attio default missing"][s % 3]
      : `Last synced ${hrsAgo}h ago`,
  };
}

// ─── Stable initial datasets (55 rows each) ────────────────────────
export const INIT_FIT_ROWS:    FitRow[]    = Array.from({ length: 55 }, (_, i) => buildFitRow(i * 97 + 13, i));
export const INIT_AGENTS_DATA: AgentRow[]  = Array.from({ length: 55 }, (_, i) => buildAgentRow(i * 83 + 7, i));
export const INIT_FIELDS:      FieldRow[]  = Array.from({ length: 55 }, (_, i) => buildFieldRow(i * 71 + 11, i));

// ─── Agent definitions (detail cards) ─────────────────────────────
export const AGENT_DEFS = [
  { name: "Enrichment Agent", icon: "🔍", status: "idle",      lastRun: "6:04 AM today",      nextRun: "Tomorrow 6:00 AM", processed: 47,   unit: "NPI verified",        successRate: 100,              desc: "NPI verification & AI research summary for new physician records — auto-executes on every new contact" },
  { name: "Cross-Sell Agent", icon: "🎯", status: "scheduled", lastRun: "Apr 20 · 9:18 AM",   nextRun: "Sunday 9:00 AM",   processed: 1247, unit: "physicians scanned",  successRate: 100, flagged: 14,  desc: "Reads all physicians, scores Pharmacy & Vysta fit, queues Tier 1 cross-sell actions for approval" },
  { name: "Churn Agent",      icon: "⚠️", status: "idle",      lastRun: "Midnight today",      nextRun: "Midnight tonight", processed: 1192, unit: "accounts checked",    successRate: 100, flagged: 67,  desc: "Monitors order gaps daily, auto-scores churn risk, queues win-back drafts for high-risk physicians" },
  { name: "Outreach Draft",   icon: "✉️", status: "on-demand", lastRun: "10:30 AM today",      nextRun: "On demand",        processed: 3,    unit: "drafts generated",    successRate: 100,              desc: "AI-generated personalized outreach drafts for approved queue items — always queued for Abel's review" },
  { name: "Data Cleanup",     icon: "🧹", status: "scheduled", lastRun: "Apr 14 · 2:08 AM",   nextRun: "Monday 2:00 AM",   processed: 1247, unit: "records scanned",     successRate: 100,              desc: "Duplicate detection & auto-merge for obvious matches — ambiguous cases queued for manual review" },
];

// ─── AI Actions Queue data ─────────────────────────────────────────
export const ES: Record<string, { bg: string; color: string; border: string }> = {
  Path:     { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Pharmacy: { bg: "#faf5ff", color: "#6d28d9", border: "#ddd6fe" },
  Vysta:    { bg: "#f0fdfa", color: "#0f766e", border: "#99f6e4" },
};
export const AS: Record<string, { bg: string; color: string }> = {
  "Send Outreach":     { bg: "#eff6ff", color: "#2563eb" },
  "Create Entity Link":{ bg: "#f0fdf4", color: "#15803d" },
  "Churn Intervention":{ bg: "#fff7ed", color: "#c2410c" },
  "Move Stage":        { bg: "#fdf4ff", color: "#7e22ce" },
  "Merge Duplicate":   { bg: "#fef3c7", color: "#92400e" },
};
export const REJECT_REASONS = ["Not relevant","Wrong timing","Already handled","Other"];

export const INIT_PENDING: ActionCardData[] = [
  { id:1, name:"Dr. Carlos Mendez",         entity:"Vysta",    action:"Send Outreach",     risk:"LOW",  reasoning:"Bilingual MD licensed in FL, TX, AZ. Active VIP Path customer $61.2K LTV. Tier 1 Vysta fit — endocrinologist, bilingual, GLP-1 focused.", draft:"Dr. Mendez, as one of our most valued Path Peptides partners, I wanted to personally invite you to join Vysta — our Hispanic-first telehealth platform launching this summer. With your bilingual skills and GLP-1 expertise, you could serve an entirely new patient population. Founding providers receive a 90-day fee waiver and marketing support. Let's arrange a brief 10-minute intro call next Tuesday. Best, Abel." },
  { id:2, name:"Dr. Sarah Chen",            entity:"Pharmacy", action:"Create Entity Link", risk:"LOW",  reasoning:"VIP Path customer $87.4K LTV. MD in FL, Miami Longevity medspa. Tier 1 Pharmacy fit on all 4 criteria — license, state, volume, clinic type.", draft:"Creating Pharmacy Distribution entity link at AI Identified stage for Dr. Sarah Chen (NPI). Miami Longevity & Wellness clinic, 3 providers, $18.4K monthly clinic revenue. Cross-sell outreach to follow immediately. Ensure the CRM linkage is verified before the automated outreach flow begins." },
  { id:3, name:"Dr. Marcus Webb",           entity:"Path",     action:"Churn Intervention", risk:"HIGH", reasoning:"61 days inactive. Was ordering $2.1K/mo consistently. No Klaviyo opens in 45 days. No compliance issues. Likely evaluating competitor. Gold tier revenue at risk.", draft:"Dr. Webb, I noticed it's been a couple months since your last order — I wanted to reach out personally. If there's anything about our service or pricing I can improve, I'd love to hear it. As a thank-you for being part of our network, I'd like to offer you 10% off your next order. Your patients count on you, and we count on being your trusted supplier. Use promo code PATH10 at checkout." },
  { id:4, name:"Dr. Craig Henderson",       entity:"Pharmacy", action:"Move Stage",         risk:"LOW",  reasoning:"Onboarding complete. FL pharmacy license verified. DEA confirmed. First training call done Apr 18. First compound order placed today #PHM-001.", draft:"Pipeline action: Move Dr. Craig Henderson from Pharmacy Distribution → Onboarded to → Active. Trigger: First compound order confirmed #PHM-001. Update account record and notify Meridian rep assigned to FL region. Follow up in 3 days to ensure the first shipment arrived safely." },
  { id:5, name:"Dr. Amy Torres",            entity:"Vysta",    action:"Send Outreach",     risk:"LOW",  reasoning:"Bilingual MD in San Antonio. FL + TX licensed. Weight management specialty. Sees majority Hispanic patients. Tier 1 Vysta fit. Active Gold Path customer.", draft:"Dr. Torres, you've been a fantastic partner for Path Peptides, and I wanted to share an exciting opportunity aligned with your practice. Vysta is our new telehealth platform specifically for Hispanic patients seeking GLP-1 therapies. As a bilingual physician licensed in both TX and FL, you're exactly who our patients need. Founding providers receive priority patient matching and zero platform fees for 90 days. We'd love to have you on board. Let me know if you have time for a quick chat this week." },
  { id:6, name:"Dr. Kevin Park",            entity:"Path",     action:"Churn Intervention", risk:"HIGH", reasoning:"47 days inactive. Gold tier — $2.8K/mo at risk. Historical cadence 12-16 days. No email opens in 35 days. Not responding to automated Klaviyo sequences. Needs personal outreach.", draft:"Dr. Park, I'm reaching out personally because you've been a valued part of our physician network and I want to make sure we're serving you well. It looks like it's been a while since your last order, and I'd love to understand if there's anything I can do better — turnaround time, product selection, pricing, or anything else entirely. Would you be open to a quick call?" },
  { id:7, name:"Dr. Wei Zhang (Duplicate)", entity:"Path",     action:"Merge Duplicate",   risk:"HIGH", reasoning:"2 records share NPI 3234567890: 'Wei Zhang MD' (wzhang@dallaswellness.com) and 'Dr. W. Zhang' (wzhang2@dallasint.com). Same phone prefix. Ambiguous email conflict blocks auto-merge.", draft:"Merge action: Primary record ph_021 Wei Zhang (wzhang@dallaswellness.com, 4 orders, $7.8K LTV) ← absorb duplicate (wzhang2@dallasint.com, 0 orders). Keep primary email, merge order history, archive duplicate, update Klaviyo profile. Note: DEA expired Feb 3 — compliance hold active on both records. Ensure compliance alerts are not duplicated." },
  { id:8, name:"Dr. Robert Kim",            entity:"Path",     action:"Move Stage",         risk:"LOW",  reasoning:"Placed first order Apr 15, second order now confirmed Apr 22 — 7-day reorder cycle indicates high engagement. Auto-advance to Active stage per pipeline rules.", draft:"Pipeline action: Move Dr. Robert Kim from Path Peptides → First Order to → Active. Trigger: Second order confirmed (SHP-10238, GHK-Cu 50mg x20, $1,200). Update stage in Attio, add to Gold Upsell Klaviyo segment, schedule Cross-Sell agent scan for next Sunday. Monitor for a potential third order pattern." },
];

export const PRE_APPROVED: ActionCardData[] = [
  { id:101, name:"Dr. Sofia Ramirez",   entity:"Vysta",    action:"Send Outreach",     risk:"LOW", reasoning:"Bilingual MD in Orlando FL, large Hispanic patient base, Tier 1 Vysta fit — has expressed interest in telehealth expansion",                draft:"Dr. Ramirez, as a bilingual physician in Orlando serving a predominantly Hispanic community, I want to personally invite you to join Vysta, our new platform specifically built for Hispanic patients seeking GLP-1 therapies. You'd be a perfect fit. Please let me know your availability for a demo next week." },
  { id:102, name:"Dr. Rafael Gomez",    entity:"Vysta",    action:"Create Entity Link", risk:"LOW", reasoning:"Responded positively to Vysta outreach. Demo scheduled Apr 24. Bilingual MD, TX+CA+NM licensed.",                                          draft:"Create entity link: Dr. Rafael Gomez → Vysta Telemedicine pipeline at Demo Booked stage. Demo date: April 24, 2025 2:00 PM EST. Notify the onboarding team to prepare the welcome packet." },
  { id:103, name:"Dr. Alejandro Cruz",  entity:"Pharmacy", action:"Send Outreach",     risk:"LOW", reasoning:"Bilingual MD in Miami, FL+TX+AZ licensed, Tier 1 pharmacy fit. Active Gold tier Path customer $16.2K LTV. High priority.",                 draft:"Dr. Cruz, given your practice in Miami and your licenses across FL, TX, and Arizona, I'd love to introduce you to Everest Pharmacy and how we're serving physicians across those states. Everest can handle your compounding needs with 2-day turnaround times. Let's schedule a time to talk!" },
];

export const AUTO_EX = [
  { id:201, name:"Dr. Marco Rivera",     action:"Move Stage",     time:"Apr 20" },
  { id:202, name:"Dr. Robert Kim",       action:"Move Stage",     time:"today" },
  { id:203, name:"Dr. Craig Henderson",  action:"Move Stage",     time:"today" },
  { id:204, name:"Dr. Yolanda Fuentes",  action:"Update Segment", time:"Apr 21" },
  { id:205, name:"Dr. Carlos Mendez",    action:"Update Segment", time:"Apr 21" },
];

// ─── Compliance data ───────────────────────────────────────────────
export const EXPIRED_DATA = [
  { name:"Dr. Wei Zhang",      doc:"Medical License + DEA Certificate", state:"TX", date:"Expired Feb 3 · Compliance hold active", type:"physician" },
  { name:"Dr. Wei Zhang",      doc:"DEA Certificate",                   state:"TX", date:"Expired Feb 3 · Orders blocked",          type:"physician" },
  { name:"Dr. Helen Chambers", doc:"Distributor Agreement",             state:"GA", date:"Expired Mar 1 · Renewal pending",         type:"physician" },
];
export const EXPIRING_DATA = [
  { name:"Dr. Yolanda Fuentes", doc:"State Pharmacy License",       state:"TX", days:8,  type:"physician" },
  { name:"Dr. Nina Castillo",   doc:"NPI Verification",             state:"FL", days:14, type:"physician" },
  { name:"Dr. Monique Bernard", doc:"Medical License",              state:"FL", days:14, type:"physician" },
  { name:"Dr. Brian Morrison",  doc:"Medical License",              state:"FL", days:26, type:"physician" },
  { name:"Dr. James Rodriguez", doc:"Medical License",              state:"TX", days:28, type:"physician" },
  { name:"Dr. Patricia Okafor", doc:"DEA Certificate",              state:"FL", days:30, type:"physician" },
  { name:"Dr. Samuel Torres",   doc:"Hold Harmless Agreement",      state:"AZ", days:22, type:"physician" },
  { name:"Dr. Craig Henderson", doc:"Provider Credentialing",       state:"FL", days:23, type:"physician" },
];

// ─── Klaviyo segments ──────────────────────────────────────────────
export const SEGMENTS = [
  { name:"Path — At Risk",        members:67,  sync:"2h ago",  status:"healthy", icon:"⚠️", desc:"churn_risk=High · win-back flow active" },
  { name:"Cross-Sell: Pharmacy",  members:156, sync:"2h ago",  status:"healthy", icon:"🏥", desc:"Pharmacy fit Tier 1 · not yet active" },
  { name:"Cross-Sell: Vysta",     members:234, sync:"2h ago",  status:"healthy", icon:"📱", desc:"Vysta fit Tier 1 · provider recruitment" },
  { name:"VIP Accounts",          members:57,  sync:"2h ago",  status:"healthy", icon:"⭐", desc:"Platinum + VIP tier · retention priority" },
  { name:"New — No Order Yet",    members:23,  sync:"2h ago",  status:"healthy", icon:"🆕", desc:"Docs Submitted stage · onboarding nudge" },
  { name:"Multi-Entity Partners", members:189, sync:"2h ago",  status:"healthy", icon:"🔀", desc:"Active in 2+ entities · highest LTV 3.2×" },
  { name:"Gold Upsell",           members:312, sync:"6h ago",  status:"error",   icon:"💛", desc:"Gold tier · cross_sell_priority=High" },
];

// ─── Pipeline factory helpers ──────────────────────────────────────
function mkPP() {
  return [
    { name:"New Lead",       count:3,   cards:[{ name:"Dr. Stephanie Brooks", spec:"Anti-Aging",                     tier:"Silver",   days:1  },{ name:"Dr. Eduardo Vega",       spec:"Endocrinology",                tier:"Silver",   days:2  }]},
    { name:"Docs Submitted", count:7,   cards:[{ name:"Dr. Eduardo Vega",       spec:"Bilingual · Endocrinology",     tier:"Silver",   days:3  },{ name:"Dr. Stephanie Brooks",   spec:"Anti-Aging · Boca Raton FL",   tier:"Silver",   days:5  }]},
    { name:"First Order",    count:12,  cards:[{ name:"Dr. Robert Kim",         spec:"Dermatology · GHK-Cu",          tier:"Silver",   days:8  },{ name:"Dr. Maria Santos",       spec:"Weight Mgmt · Bilingual",      tier:"Silver",   days:14 }]},
    { name:"Active",         count:892, cards:[{ name:"Dr. James Rodriguez",    spec:"Family Med · Austin TX",        tier:"Platinum", days:28 },{ name:"Dr. Alejandro Cruz",     spec:"Internal Med · Bilingual FL",  tier:"Gold",     days:10 }]},
    { name:"VIP",            count:34,  cards:[{ name:"Dr. Sarah Chen",         spec:"Anti-Aging · Miami FL",         tier:"VIP",      days:4  },{ name:"Dr. Carlos Mendez",      spec:"Endocrinology · Tampa FL",     tier:"VIP",      days:2  }]},
    { name:"At Risk",        count:67,  cards:[{ name:"Dr. Marcus Webb",        spec:"Anti-Aging · Fort Lauderdale",  tier:"Gold",     days:61 },{ name:"Dr. Kevin Park",         spec:"Internal Med · Atlanta GA",    tier:"Gold",     days:47 }]},
    { name:"Churned",        count:229, cards:[{ name:"Dr. Thomas Hartley",     spec:"Sports Med · West Palm Beach",  tier:"Silver",   days:89 },{ name:"Dr. Christine Lee",      spec:"Anti-Aging · San Diego CA",    tier:"Silver",   days:72 }]},
  ];
}
function mkPH() {
  return [
    { name:"AI Identified", count:89,  cards:[{ name:"Dr. Sarah Chen",       spec:"MD · FL · Tier 1 fit 94%",    tier:"Tier 1", days:1  },{ name:"Dr. Rachel Goldberg",  spec:"MD · NY · Tier 1 fit 91%",    tier:"Tier 1", days:2  }]},
    { name:"Outreach Sent", count:23,  cards:[{ name:"Dr. Alejandro Cruz",   spec:"MD · FL/TX/AZ · Bilingual",   tier:"Tier 1", days:5  },{ name:"Dr. Angela Kim",       spec:"DO · CA · Sports Med",        tier:"Tier 1", days:6  }]},
    { name:"Interested",    count:11,  cards:[{ name:"Dr. Hector Delgado",   spec:"MD · CA/NV/AZ · Bilingual",   tier:"Tier 1", days:10 },{ name:"Dr. Orlando Vásquez",  spec:"MD · TX/CA · Weight Mgmt",    tier:"Tier 1", days:12 }]},
    { name:"Licensing",     count:6,   cards:[{ name:"Dr. Jennifer Walsh",   spec:"MD · NJ/NY",                  tier:"Tier 1", days:14 },{ name:"Dr. Samuel Torres",    spec:"MD · AZ/TX/CA",               tier:"Tier 1", days:16 }]},
    { name:"Pricing",       count:4,   cards:[{ name:"Dr. Rafael Gomez",     spec:"MD · TX · Anti-Aging",        tier:"Tier 1", days:18 },{ name:"Dr. Frank Deluca",     spec:"MD · NJ/NY · HRT",            tier:"Tier 1", days:20 }]},
    { name:"Onboarded",     count:3,   cards:[{ name:"Dr. Craig Henderson",  spec:"MD · FL/GA · Internal Med",   tier:"Tier 1", days:7  },{ name:"Dr. Diana Castillo",   spec:"MD · TX/NM · Weight Mgmt",    tier:"Tier 1", days:4  }]},
    { name:"Active",        count:156, cards:[{ name:"Dr. Carlos Mendez",    spec:"MD · FL/TX/AZ · VIP",         tier:"Tier 1", days:60 },{ name:"Dr. Yolanda Fuentes",  spec:"MD · TX/FL/NM · Bilingual",   tier:"Tier 1", days:90 }]},
  ];
}
function mkVY() {
  return [
    { name:"AI Identified", count:156, cards:[{ name:"Dr. Sofia Ramirez",    spec:"Bilingual · Internal Med · FL",  tier:"Tier 1", days:1  },{ name:"Dr. Ana Reyes",        spec:"Bilingual · Family Med · CA",    tier:"Tier 1", days:2  }]},
    { name:"Outreach Sent", count:34,  cards:[{ name:"Dr. Alejandro Cruz",   spec:"Bilingual · Miami FL",           tier:"Tier 1", days:5  },{ name:"Dr. Maria Santos",     spec:"Bilingual · Dallas TX",          tier:"Tier 1", days:6  }]},
    { name:"Demo Booked",   count:12,  cards:[{ name:"Dr. Rafael Gomez",     spec:"Bilingual · Houston TX",         tier:"Tier 1", days:10 },{ name:"Dr. Amy Torres",       spec:"Bilingual · San Antonio TX",     tier:"Tier 1", days:9  }]},
    { name:"Agreement",     count:7,   cards:[{ name:"Dr. Marco Rivera",     spec:"Bilingual · Houston TX",         tier:"Tier 1", days:14 },{ name:"Dr. Hector Delgado",   spec:"Bilingual · LA CA",              tier:"Tier 1", days:16 }]},
    { name:"Credentialing", count:4,   cards:[{ name:"Dr. Orlando Vásquez",  spec:"Bilingual · Phoenix AZ",         tier:"Tier 1", days:18 },{ name:"Dr. Nina Gomez",       spec:"Bilingual · San Diego CA",       tier:"Tier 1", days:11 }]},
    { name:"Live",          count:43,  cards:[{ name:"Dr. Carlos Mendez",    spec:"Bilingual · Tampa FL",           tier:"Tier 1", days:45 },{ name:"Dr. Yolanda Fuentes",  spec:"Bilingual · San Antonio TX",     tier:"Tier 1", days:60 }]},
    { name:"Completed",     count:18,  cards:[{ name:"Dr. Elena Ramirez",    spec:"Bilingual · Houston TX",         tier:"Tier 1", days:92 },{ name:"Dr. Victor Santos",    spec:"Bilingual · Orlando FL",         tier:"Tier 1", days:78 }]},
  ];
}

export const PIPELINES: Pipeline[] = [
  { id:"pp", title:"Path Peptides Pipeline",       emoji:"💊", accent:"#3b82f6", aLight:"#eff6ff", aBorder:"#bfdbfe", aText:"#1d4ed8", summary:{ funnel:1244, conv:"71.5%", avg:34 }, cols:mkPP() },
  { id:"ph", title:"Pharmacy Distribution Pipeline",emoji:"🏥", accent:"#8b5cf6", aLight:"#faf5ff", aBorder:"#ddd6fe", aText:"#6d28d9", summary:{ funnel:302,  conv:"51.7%", avg:22 }, cols:mkPH() },
  { id:"vy", title:"Vysta Telemedicine Pipeline",  emoji:"📱", accent:"#0d9488", aLight:"#f0fdfa", aBorder:"#99f6e4", aText:"#0f766e", summary:{ funnel:256,  conv:"27.6%", avg:18 }, cols:mkVY() },
];
