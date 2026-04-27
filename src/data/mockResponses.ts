// ─── Quick-ask shortcuts ────────────────────────────────────────────
export const QUICK_ASKS = [
  { icon:"📋", label:"Today's snapshot",     prompt:"Give me Abel's full mission control summary for today." },
  { icon:"🔴", label:"At-risk accounts",     prompt:"Who are my at-risk accounts this week?" },
  { icon:"🎯", label:"Pharmacy cross-sells", prompt:"Top Tier 1 pharmacy cross-sells?" },
  { icon:"📱", label:"Vysta prospects",      prompt:"Top Vysta Tier 1 prospects not yet recruited?" },
  { icon:"👤", label:"Inactive VIPs",        prompt:"VIPs inactive 30+ days?" },
  { icon:"📍", label:"Florida network",      prompt:"Physicians licensed in Florida?" },
  { icon:"💰", label:"Revenue breakdown",    prompt:"Revenue by entity this quarter?" },
  { icon:"🏆", label:"Top Platinum LTV",     prompt:"Highest LTV physicians in Platinum?" },
  { icon:"🌎", label:"Bilingual MDs",        prompt:"Show all bilingual physicians eligible for Vysta." },
  { icon:"💊", label:"GLP-1 pipeline",       prompt:"Who are my top GLP-1 prescribers?" },
  { icon:"🤖", label:"Agent status",         prompt:"What did the agents do last night?" },
  { icon:"🛡️", label:"Compliance urgent",   prompt:"What compliance actions are urgent right now?" },
  { icon:"📧", label:"Klaviyo issues",       prompt:"Is there anything broken in Klaviyo right now?" },
  { icon:"🔀", label:"Multi-entity wins",    prompt:"Which physicians are in all 3 entities?" },
  { icon:"💸", label:"AI cost & ROI",        prompt:"What's the ROI on the AI agents this month?" },
  { icon:"🆕", label:"New leads today",      prompt:"Who are the newest physicians in the pipeline?" },
  { icon:"🏥", label:"Pharmacy pipeline",    prompt:"How is the Pharmacy Distribution pipeline performing?" },
  { icon:"⚡", label:"Approve queue",        prompt:"What's in my AI Actions Queue right now?" },
  { icon:"🧬", label:"Top products",         prompt:"What are the top-selling peptide products this month?" },
  { icon:"🗺️", label:"Texas network",       prompt:"Give me a full breakdown of my Texas physician network." },
];

// ─── Exact-match responses ─────────────────────────────────────────
export const MOCK_RESPONSES: Record<string, string> = {
  "Give me Abel's full mission control summary for today.":
    "📊 Mission Control Summary — Today\n\nRevenue: $14,320 across 3 orders (Goldberg $8.9K, Mendez $3.1K, Morrison $2.3K). Physician base: 1,247 total · 892 Path Peptides active · 156 pharmacy accounts · 43 Vysta live.\n\n🔴 Urgent: 3 high-risk churn accounts (Hartley 89d, Webb 61d, Park 47d). Win-back drafts are queued — approve them now.\n\n🤖 Overnight agents ran clean: 47 records enriched, 12 cross-sell flags raised, 3 compliance reminders sent. Klaviyo sync has 1 active warning on the Martinez sequence.\n\n✅ Overall status: Systems nominal. 12 AI actions pending your approval.",

  "Who are my at-risk accounts this week?":
    "🔴 3 physicians need immediate attention.\n\nDr. Thomas Hartley (Silver, FL) — 89 days inactive, 1 day from auto-churn threshold. No email opens since Feb.\n\nDr. Marcus Webb (Gold, FL, $24.3K LTV) — 61 days, no response to 2 Klaviyo win-back sequences.\n\nDr. Kevin Park (Gold, GA, $19.8K LTV) — 47 days, zero email opens in 35 days.\n\nWin-back drafts for Webb and Park are waiting in your AI Actions Queue — approve them to trigger outreach immediately.",

  "Top Tier 1 pharmacy cross-sells?":
    "🎯 Top 5 Pharmacy Tier 1 candidates not yet in the distribution pipeline:\n\n1. Dr. Rachel Goldberg (VIP, NY, $112.8K LTV)\n2. Dr. Sarah Chen (VIP, FL, $87.4K LTV) — entity link creation queued ✓\n3. Dr. Angela Kim (Platinum, CA, $51.2K)\n4. Dr. Elena Volkov (Platinum, NY, $44.6K)\n5. Dr. Nina Castillo (Platinum, FL, $41.2K)\n\nCombined LTV: $347.4K. Approve the queued action for Chen to start the conversation today.",

  "Top Vysta Tier 1 prospects not yet recruited?":
    "📱 Top 5 Vysta Telemedicine Tier 1 prospects:\n\n1. Dr. Alejandro Cruz (Gold, FL, bilingual EN/ES) — high fit, no credential started\n2. Dr. Sofia Ramirez (Platinum, TX, $62K LTV) — telehealth-ready practice\n3. Dr. Eduardo Vega (Gold, CA, $38K LTV) — expressed interest via Klaviyo click\n4. Dr. Diana Santos (Platinum, FL, $44K LTV) — multi-state licensed\n5. Dr. Rafael Castillo (Silver, NY, $28K LTV) — HRT specialist, strong Vysta fit\n\nThe Outreach Draft agent has pre-built introductory emails for Cruz and Ramirez — approve to send.",

  "VIPs inactive 30+ days?":
    "👤 Good news — none of your 23 VIP physicians are 30+ days inactive right now.\n\nClosest: Dr. Rachel Goldberg at 6 days (NY, $112.8K LTV) and Dr. Sarah Chen at 4 days (FL, $87.4K).\n\nMost recent VIP order: Dr. Rachel Goldberg today — $8,900 bulk purchase (TB-500, BPC-157, Thymosin Alpha-1).\n\nVIP retention rate this month: 100%. Solid.",

  "Physicians licensed in Florida?":
    "📍 Florida Physician Network — 287 licensed physicians on file.\n\nBreakdown: 112 Path Peptides active · 44 pharmacy accounts · 18 Vysta providers · 113 pipeline/prospect.\n\nTop LTV in FL: Dr. Sarah Chen (VIP, $87.4K) · Dr. Nina Castillo (Platinum, $41.2K) · Dr. Thomas Hartley (Silver — churn risk ⚠️).\n\nCompliance note: 1 FL physician (Dr. Yolanda Fuentes) has a state pharmacy license expiring in 8 days. Action queued.",

  "Revenue by entity this quarter?":
    "💰 Q2 Revenue Breakdown (Apr 1 – Today):\n\n💊 Path Peptides: $284,700 (63% of total)\n🏥 Pharmacy Distribution: $121,400 (27%)\n📱 Vysta Telemedicine: $44,200 (10%)\n\nTotal: $450,300\n\nTop contributors: Dr. Rachel Goldberg ($112.8K cumulative LTV), Dr. Sarah Chen ($87.4K), Dr. Angela Kim ($51.2K). Q2 pace is 14% ahead of Q1 at this point in the quarter.",

  "Highest LTV physicians in Platinum?":
    "🏆 Top 5 Platinum Tier by Lifetime Value:\n\n1. Dr. Angela Kim (CA) — $51,200 LTV · Anti-Aging · Path + Pharmacy\n2. Dr. Elena Volkov (NY) — $44,600 LTV · HRT Specialist · Path only\n3. Dr. Diana Santos (FL) — $44,200 LTV · Functional Med · Path + Pharmacy\n4. Dr. Sofia Ramirez (TX) — $41,800 LTV · Weight Mgmt · Path only\n5. Dr. Marco Rivera (IL) — $38,900 LTV · Sports Med · Path + Vysta\n\nAll 5 have reorder cycles under 30 days. Enrichment Agent flagged Rivera for a Pharmacy cross-sell — action queued.",

  "Show all bilingual physicians eligible for Vysta.":
    "🌎 Bilingual Physicians — Vysta Eligible (not yet credentialed):\n\n🇪🇸 Spanish: Dr. Alejandro Cruz (FL), Dr. Carlos Mendez (TX), Dr. Sofia Ramirez (TX), Dr. Eduardo Vega (CA), Dr. Rafael Castillo (NY), Dr. Gabriela Torres (FL)\n🇨🇳 Mandarin: Dr. Wei Zhang (CA), Dr. Sarah Chen (FL)\n🇷🇺 Russian: Dr. Elena Volkov (NY), Dr. Ivan Volkov (NJ)\n\nTotal: 10 physicians. Vysta's bilingual patient demand is highest in FL and CA. Outreach drafts ready for top 3 — approve to send.",

  "Who are my top GLP-1 prescribers?":
    "💊 Top GLP-1 / Semaglutide Prescribers (Path Peptides Active):\n\n1. Dr. Carlos Mendez (TX, Gold) — 48 scripts/mo · Semaglutide + Tirzepatide\n2. Dr. Rachel Goldberg (NY, VIP) — 41 scripts/mo · Semaglutide 5mg + CJC-1295\n3. Dr. Sofia Ramirez (TX, Platinum) — 37 scripts/mo · GLP-1 + BPC-157 combos\n4. Dr. Kevin Park (GA, Gold) — 29 scripts/mo · ⚠️ 47d inactive, at risk\n5. Dr. Angela Kim (CA, Platinum) — 26 scripts/mo · Weight Mgmt specialty\n\nNote: Park's prescribing dropped 60% in last 45 days — correlated with inactivity. Win-back queued.",

  "What did the agents do last night?":
    "🤖 Overnight Agent Run — Summary (Apr 25, 11PM–6AM):\n\n✅ Enrichment Agent #12: 47 new NPI records enriched · specialty + practice info updated\n✅ Cross-Sell Agent #7: 12 new cross-sell flags raised · 3 entity link creations queued\n✅ Churn Agent #3: 8 churn risk scores updated · Webb and Park escalated to HIGH\n✅ Scoring Agent #9: Re-scored 1,192 physicians · 67 moved to high-risk tier\n⚠️ Sync Agent #4: 6 field mismatches detected in Attio↔Klaviyo sync · Fix Mapping available in Klaviyo Status\n\n8 actions are waiting in your AI Actions Queue.",

  "What compliance actions are urgent right now?":
    "🛡️ Active Compliance Alerts (3 Urgent):\n\n🔴 Dr. Yolanda Fuentes (FL) — State Pharmacy License expires in 8 days. Renewal reminder sent via Klaviyo. No response yet.\n🔴 Dr. Brian Morrison (TX) — DEA registration expired 3 days ago. Order hold in place. Action queued.\n🟡 Dr. Patricia Walsh (CA) — Malpractice insurance renewal due in 21 days. Pre-emptive reminder queued.\n\nAll 3 have draft compliance emails in your AI Actions Queue. Approve to send. DEA lapse for Morrison is blocking his next order — prioritize.",

  "Is there anything broken in Klaviyo right now?":
    "📧 Klaviyo Status — 1 Active Warning:\n\n⚠️ 'Win-Back Sequence v3' (Martinez segment) — Flow trigger mismatch. Sending paused. 6 physicians in queue affected.\n\n✅ All other flows nominal: 'New Physician Welcome' (342 active), 'Reorder Reminder' (892 active), 'VIP Concierge' (23 active), 'GLP-1 Education' (156 active).\n\nAPI Sync: Last successful push 7 minutes ago. Field sync: 6 custom field mismatches detected — visible in Klaviyo Status screen. Open rate this week: 38.4% (industry avg: 21.2%).",

  "Which physicians are in all 3 entities?":
    "🔀 Multi-Entity Champions — Physicians in Path Peptides + Pharmacy + Vysta:\n\n1. Dr. Marco Rivera (IL, Platinum) — $38.9K LTV · All 3 active\n2. Dr. Alejandro Cruz (FL, Gold, bilingual) — All 3 active · Reorder every 22d\n3. Dr. Diana Santos (FL, Platinum) — All 3 active · $44.2K LTV\n\nTotal: 3 physicians fully enrolled. 14 additional physicians are in 2 of 3 entities — top cross-sell targets for completing the trifecta are flagged in your Cross-Entity Pipeline.",

  "What's the ROI on the AI agents this month?":
    "💸 AI Agent ROI — April (Month to Date):\n\n💰 Budget used: $187 of $290 (64%)\nRevenue attributed to AI actions: $61,400\nROI multiple: 328x\n\nBreakdown:\n• Cross-sell actions triggered: $38,200 in new pipeline\n• Churn prevented (win-backs approved): $14,700 saved\n• Enrichment → pipeline conversion: $8,500\n\nHighest-value action: Chen entity link creation queued ($87.4K LTV at stake). Approve it. Cost to run the action: $0.06.",

  "Who are the newest physicians in the pipeline?":
    "🆕 Newest Physician Leads (Last 7 Days):\n\n1. Dr. Quinn Scott (NY, Anti-Aging) — Added Apr 25 · NPI enriched ✓\n2. Dr. Uma Patel (CA, Endocrinology) — Added Apr 24 · Welcome email sent\n3. Dr. Tina Young (FL, Weight Mgmt) — Added Apr 23 · Klaviyo sequence active\n4. Dr. Steven Hall (TX, HRT Specialist) — Added Apr 22 · GLP-1 interest flagged\n5. Dr. Rosa King (GA, Family Med) — Added Apr 21 · Scoring Agent assigned Silver tier\n\n47 new records enriched overnight via NPI. 5 have been auto-scored and entered the welcome sequence.",

  "How is the Pharmacy Distribution pipeline performing?":
    "🏥 Pharmacy Distribution Pipeline — Live Status:\n\n✅ Active accounts: 156\n🔄 Onboarding: 12 (avg 14-day cycle)\n🎯 Pipeline (qualified, not yet active): 34\n\nThis week: Dr. Craig Henderson converted to Active (first compound order #PHM-001 placed today). Top active pharmacy accounts by order volume: Chen ($87.4K), Kim ($51.2K), Volkov ($44.6K).\n\nRevenue Q2 MTD: $121,400. On track to hit $180K quarterly target. Cross-Sell Agent flagged 8 new Tier 1 pharmacy prospects — approve entity link creations to start onboarding.",

  "What's in my AI Actions Queue right now?":
    "⚡ AI Actions Queue — 8 Pending:\n\n🔴 HIGH (2):\n• Win-back email: Dr. Marcus Webb (61d inactive, $24.3K) — approve to send\n• Win-back email: Dr. Kevin Park (47d inactive, $19.8K) — approve to send\n\n🟡 MEDIUM (4):\n• Entity link: Dr. Sarah Chen → Pharmacy pipeline\n• Compliance reminder: Dr. Yolanda Fuentes (license exp. 8d)\n• Compliance reminder: Dr. Brian Morrison (DEA expired)\n• Cross-sell outreach: Dr. Alejandro Cruz → Vysta credentialing\n\n🟢 LOW (2):\n• Enrichment: 12 new NPI records pending review\n• Sync fix: 6 field mismatches in Attio (Klaviyo Status)",

  "What are the top-selling peptide products this month?":
    "🧬 Top-Selling Peptide Products — April MTD:\n\n1. Semaglutide 5mg — $48,200 (34% of revenue)\n2. BPC-157 — $31,400 (22%)\n3. CJC-1295 w/DAC — $24,800 (17%)\n4. TB-500 — $18,600 (13%)\n5. Thymosin Alpha-1 — $12,100 (9%)\n6. Tirzepatide — $6,400 (5%)\n\nSemaglutide demand up 22% vs March. BPC-157 + TB-500 combo orders increasing — 14 physicians reordered both together this month. Consider a bundle offer to the Platinum tier.",

  "Give me a full breakdown of my Texas physician network.":
    "🗺️ Texas Physician Network — Full Breakdown:\n\n👥 Total: 203 physicians on file\n💊 Path Peptides Active: 89\n🏥 Pharmacy Accounts: 31\n📱 Vysta Providers: 7\n🔄 Pipeline: 76\n\nTop LTV in TX: Dr. Carlos Mendez (Gold, $38.9K, GLP-1 specialist) · Dr. Sofia Ramirez (Platinum, $41.8K, Weight Mgmt) · Dr. Steven Hall (Silver, new lead)\n\nSpecialty mix: Weight Mgmt 31% · HRT 22% · Family Med 19% · Anti-Aging 15% · Other 13%.\n\nChurn risk in TX: 2 physicians flagged (medium risk). No HIGH risk in TX currently. Cross-sell opportunity: 18 TX physicians are Pharmacy-eligible but not yet onboarded.",
};

// ─── Keyword-based fallback responses ──────────────────────────────
export const KEYWORD_RESPONSES: { keys: string[]; response: string }[] = [
  { keys:["churn","at risk","at-risk","inactive","lapsed","lost","win-back","winback"],   response:"⚠️ 67 physicians are flagged high churn risk right now. Most urgent: Dr. Thomas Hartley (Silver, FL, 89d — 1 day from auto-churn) · Dr. Marcus Webb (Gold, FL, 61d, $24.3K LTV) · Dr. Kevin Park (Gold, GA, 47d, $19.8K LTV). Win-back drafts for Webb and Park are waiting in your AI Actions Queue. Medium-risk pool: 234 physicians — 4 are Gold tier with LTV over $20K." },
  { keys:["cross-sell","cross sell","upsell","up-sell","opportunity","opportunities"],     response:"🎯 156 physicians are flagged as cross-sell opportunities this cycle. Top targets: Dr. Sarah Chen (VIP, FL, $87.4K — pharmacy entity link creation queued) · Dr. Rachel Goldberg (VIP, NY, $112.8K — pharmacy Tier 1) · Dr. Alejandro Cruz (Gold, FL, bilingual — both Pharmacy + Vysta Tier 1). Approve the 3 cross-sell actions in your AI Queue to trigger outreach immediately." },
  { keys:["revenue","sales","money","earnings","income","billing"],                       response:"💰 Q2 MTD Revenue: $450,300 total. Path Peptides: $284,700 (63%) · Pharmacy: $121,400 (27%) · Vysta: $44,200 (10%). Today's orders: $14,320 across 3 transactions. Pace is 14% ahead of Q1 at this point in the quarter. Top earner: Dr. Rachel Goldberg at $112.8K cumulative LTV." },
  { keys:["agent","agents","automation","overnight","ran","run","bot"],                    response:"🤖 Last overnight run (Apr 25): Enrichment Agent enriched 47 records · Cross-Sell Agent raised 12 flags · Churn Agent updated 8 risk scores · Scoring Agent re-scored 1,192 physicians. One sync warning: 6 field mismatches in Attio↔Klaviyo. 8 actions waiting in your AI Actions Queue." },
  { keys:["florida","fl ","miami","orlando","tampa","jacksonville"],                       response:"📍 287 physicians licensed in Florida. 112 Path Peptides active · 44 pharmacy accounts · 18 Vysta providers. Compliance alert: Dr. Yolanda Fuentes has a state pharmacy license expiring in 8 days. Churn risk: Dr. Thomas Hartley (89d inactive) and Dr. Marcus Webb (61d inactive) are both FL-based." },
  { keys:["texas","tx ","dallas","houston","austin","san antonio"],                        response:"🗺️ 203 Texas physicians on file. 89 Path Peptides active · 31 pharmacy accounts · 7 Vysta providers. Top LTV: Dr. Carlos Mendez ($38.9K) and Dr. Sofia Ramirez ($41.8K). 18 TX physicians are pharmacy-eligible but not yet onboarded — strong pipeline opportunity." },
  { keys:["klaviyo","email","flow","sequence","campaign","open rate"],                     response:"📧 Klaviyo Status: 1 active warning on the Win-Back Sequence v3 (Martinez segment — flow trigger mismatch, sending paused). All other flows nominal. Open rate this week: 38.4% (industry avg 21.2%). Last sync: 7 minutes ago. 6 field mismatches in custom field mapping — visible in Klaviyo Status." },
  { keys:["compliance","license","dea","malpractice","expire","expiring","legal"],         response:"🛡️ 3 active compliance alerts. Urgent: Dr. Yolanda Fuentes (FL pharmacy license, 8 days) · Dr. Brian Morrison (DEA expired 3 days ago — order hold active). Medium: Dr. Patricia Walsh (CA malpractice renewal, 21 days). All have draft compliance emails in your AI Actions Queue." },
  { keys:["vip","platinum","gold","silver","tier","ltv","lifetime value"],                 response:"💎 Tier breakdown: 23 VIP (avg LTV $89K) · 134 Platinum (avg $44K) · 312 Gold (avg $28K) · 423 Silver (avg $8K). Top VIPs by LTV: Goldberg $112.8K · Chen $87.4K · Kim $51.2K. VIP retention this month: 100%. Gold churn risk: 2 accounts flagged." },
  { keys:["glp","glp-1","semaglutide","tirzepatide","weight","obesity","peptide"],         response:"💊 Semaglutide is your #1 product at $48,200 MTD (34% of revenue). Top GLP-1 prescribers: Mendez (48 scripts/mo) · Goldberg (41) · Ramirez (37) · Park (29 — ⚠️ at risk). Demand up 22% vs March. BPC-157 + TB-500 combo reorders also trending up this month." },
  { keys:["vysta","telemedicine","telehealth","tele","virtual","credentialing"],           response:"📱 43 Vysta live providers · 4 in credentialing. Top prospects not yet recruited: Dr. Alejandro Cruz (FL, bilingual) · Dr. Sofia Ramirez (TX) · Dr. Eduardo Vega (CA). Outreach drafts ready for Cruz and Ramirez in your AI Actions Queue. Bilingual providers have 2.3x higher Vysta patient volume." },
  { keys:["pharmacy","distribution","compound","compounding","phm","dispensing"],          response:"🏥 156 active pharmacy accounts · 12 onboarding · 34 qualified pipeline. Q2 MTD: $121,400. Today: Dr. Craig Henderson placed first compound order (#PHM-001). Top accounts: Chen · Kim · Volkov. 8 new Tier 1 pharmacy prospects flagged by Cross-Sell Agent — approve entity links to start onboarding." },
  { keys:["hello","hi","hey","good morning","good afternoon","what can you"],              response:"👋 Hi Abel! I'm your Mission Control AI — I have full visibility into your physician network, pipeline, agents, compliance, Klaviyo, and revenue.\n\nTry asking:\n• \"Who's at risk this week?\"\n• \"What did the agents do last night?\"\n• \"Top Vysta prospects?\"\n• \"Revenue breakdown this quarter?\"\n\nOr use ⚡ Quick Asks for one-tap insights." },
];

// ─── Response resolver ─────────────────────────────────────────────
export function resolveResponse(prompt: string): string {
  const exact = MOCK_RESPONSES[prompt];
  if (exact) return exact;

  const lower = prompt.toLowerCase();
  for (const kr of KEYWORD_RESPONSES) {
    if (kr.keys.some((k) => lower.includes(k))) return kr.response;
  }

  if (lower.includes("how many") || lower.includes("count") || lower.includes("total")) {
    return "📊 Current totals: 1,247 total physicians · 892 Path Peptides active · 156 pharmacy accounts · 43 Vysta providers · 67 high churn risk · 8 AI actions pending. Revenue Q2 MTD: $450,300. Use Quick Asks for detailed breakdowns by segment.";
  }
  if (lower.includes("who") || lower.includes("which") || lower.includes("list")) {
    return "👥 I can pull physician lists by tier, risk level, state, specialty, entity, or product. Try: \"VIPs inactive 30+ days\", \"Top Platinum LTV\", \"Florida network\", or \"Bilingual MDs eligible for Vysta\" for specific lists.";
  }
  return "⚡ I've scanned your network data. For the most accurate answer, try rephrasing with a specific metric — like a physician name, state, tier, product, or timeframe. Or use ⚡ Quick Asks for pre-built insights across all your key data points.";
}
