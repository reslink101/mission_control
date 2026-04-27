// ─── Shared Theme / Palette type ──────────────────────────────────
export interface Theme {
  canvas:  string;
  surf:    string;
  surf2:   string;
  surf3:   string;
  bdr:     string;
  bdr2:    string;
  t1:      string;
  t2:      string;
  t3:      string;
  t4:      string;
  t5:      string;
  t6:      string;
  inp:     string;
  blue:    string; blueT:   string;
  green:   string; greenT:  string;
  red:     string; redT:    string;
  amber:   string; amberT:  string;
  purple:  string; purpleT: string;
  indigo:  string; indigoT: string;
}

// ─── KPI card data shape ───────────────────────────────────────────
export interface KpiItem {
  label:   string;
  value:   string;
  sub:     string;
  icon:    string;
  bc:      string;
  upColor?: string;
  bar?:    number;
}

// ─── Feed event shape ─────────────────────────────────────────────
export interface FeedEvent {
  dot:  string;
  time: string;
  text: string;
  tag:  string;
  tc:   { bg: string; c: string };
}

// ─── Cross-sell fit row shape ─────────────────────────────────────
export interface FitRow {
  name:     string;
  spec:     string;
  tier:     string;
  pharm:    string;
  vysta:    string;
  priority: string;
  ltv:      string;
}

// ─── Agent row shape (for registry flash) ─────────────────────────
export interface AgentRow {
  name:      string;
  status:    string;
  processed: number;
  detail:    string;
}

// ─── Field sync row shape ─────────────────────────────────────────
export interface FieldRow {
  field:  string;
  status: string;
  note:   string;
}

// ─── AI Action card shape ─────────────────────────────────────────
export interface ActionCardData {
  id:        number;
  name:      string;
  entity:    string;
  action:    string;
  risk:      string;
  reasoning: string;
  draft:     string;
  reason?:   string;
}

// ─── Pipeline column card shape ───────────────────────────────────
export interface PipelineCard {
  name: string;
  spec: string;
  tier: string;
  days: number;
}

export interface PipelineCol {
  name:  string;
  count: number;
  cards: PipelineCard[];
}

export interface Pipeline {
  id:      string;
  title:   string;
  emoji:   string;
  accent:  string;
  aLight:  string;
  aBorder: string;
  aText:   string;
  summary: { funnel: number; conv: string; avg: number };
  cols:    PipelineCol[];
}
