import { useState } from "react";
import type { Theme, ActionCardData } from "../../types";
import { ES, AS, REJECT_REASONS } from "../../data/mockData";

interface Props {
  card:      ActionCardData;
  onApprove: (id: number) => void;
  onReject:  (id: number, reason: string) => void;
  p:         Theme;
}

export default function ActionCard({ card, onApprove, onReject, p }: Props) {
  const [flash,          setFlash]          = useState<"a" | "r" | null>(null);
  const [showReject,     setShowReject]     = useState(false);
  const [reason,         setReason]         = useState("");
  const [showFullDraft,  setShowFullDraft]  = useState(false);
  const [isEditing,      setIsEditing]      = useState(false);
  const [draftText,      setDraftText]      = useState(card.draft);

  const es = ES[card.entity] ?? ES.Path;
  const as = AS[card.action] ?? { bg: "#f1f5f9", color: p.t4 };

  const approve = () => {
    setFlash("a");
    setTimeout(() => onApprove(card.id), 500);
  };
  const confirmReject = () => {
    if (!reason) return;
    setFlash("r");
    setTimeout(() => onReject(card.id, reason), 500);
  };

  return (
    <div style={{
      background: flash === "a" ? "#f0fdf4" : flash === "r" ? "#fef2f2" : "#fff",
      border: `1px solid ${flash === "a" ? "#86efac" : flash === "r" ? "#fca5a5" : "#e2e8f0"}`,
      borderRadius: 10, padding: 13, marginBottom: 9,
    }}>
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:7, gap:4 }}>
        <div style={{ fontWeight:700, fontSize:12, color:p.t1, lineHeight:1.3, flex:1 }}>{card.name}</div>
        <div style={{ display:"flex", gap:3, flexShrink:0 }}>
          <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:es.bg, color:es.color, border:`1px solid ${es.border}` }}>{card.entity}</span>
          <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:card.risk==="HIGH"?"#fee2e2":"#dcfce7", color:card.risk==="HIGH"?"#dc2626":"#16a34a" }}>{card.risk}</span>
        </div>
      </div>

      {/* Action badge */}
      <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:99, background:as.bg, color:as.color, display:"inline-block", marginBottom:7 }}>{card.action}</span>

      {/* Reasoning */}
      <div style={{ fontSize:10, color:p.t5, fontStyle:"italic", lineHeight:1.5, marginBottom:7, borderLeft:"2px solid #e2e8f0", paddingLeft:7 }}>{card.reasoning}</div>

      {/* Draft area: collapsed/expanded + edit mode */}
      {!isEditing ? (
        <div
          onClick={() => setShowFullDraft(!showFullDraft)}
          title="Click to toggle full draft"
          style={{ fontSize:10, color:p.t4, background:p.surf2, border:"1px solid #f1f5f9", borderRadius:5, padding:"6px 8px", marginBottom:8, fontFamily:"monospace", lineHeight:1.5, cursor:"pointer" }}
        >
          {showFullDraft ? draftText : `${draftText.slice(0, 80)}${draftText.length > 80 ? "…" : ""}`}
          {!showFullDraft && draftText.length > 80 && (
            <span style={{ color:"#2563eb", fontWeight:700, marginLeft:4 }}>Read more</span>
          )}
        </div>
      ) : (
        <div style={{ marginBottom:8 }}>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            style={{ width:"100%", height:90, padding:8, fontSize:11, fontFamily:"monospace", border:"1px solid #3b82f6", borderRadius:6, resize:"none", outline:"none", boxSizing:"border-box" }}
          />
        </div>
      )}

      {/* Reject reason picker */}
      {showReject && (
        <div style={{ marginBottom:8, background:"#fff8f8", border:"1px solid #fca5a5", borderRadius:7, padding:"8px" }}>
          <div style={{ fontSize:10, fontWeight:600, color:"#dc2626", marginBottom:5 }}>Reason:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom: reason ? 6 : 0 }}>
            {REJECT_REASONS.map((r) => (
              <button key={r} onClick={() => setReason(r)}
                style={{ fontSize:9, padding:"2px 7px", borderRadius:99, border:`1px solid ${reason===r?"#ef4444":"#fca5a5"}`, background:reason===r?"#fee2e2":"#fff", color:reason===r?"#dc2626":"#94a3b8", cursor:"pointer", fontWeight:reason===r?700:400 }}>
                {r}
              </button>
            ))}
          </div>
          {reason && (
            <button onClick={confirmReject}
              style={{ width:"100%", padding:"5px", background:"#ef4444", color:"#fff", border:"none", borderRadius:5, fontSize:10, fontWeight:700, cursor:"pointer" }}>
              Confirm Reject
            </button>
          )}
        </div>
      )}

      {/* Action buttons */}
      {!showReject && (
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {showFullDraft && (
            <div style={{ display:"flex" }}>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{ flex:1, padding:"6px", background: isEditing ? "#f59e0b" : "#3b82f6", color:"#fff", border:"none", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>
                {isEditing ? "✓ Save Edit" : "✎ Edit draft"}
              </button>
            </div>
          )}
          <div style={{ display:"flex", gap:5 }}>
            <button onClick={approve}
              style={{ flex:1, padding:"6px", background:"#16a34a", color:"#fff", border:"none", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>
              ✓ Approve
            </button>
            <button onClick={() => setShowReject(true)}
              style={{ flex:1, padding:"6px", background:p.surf, color:"#ef4444", border:"1px solid #fca5a5", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>
              ✕ Reject
            </button>
          </div>
        </div>
      )}

      {showReject && !reason && (
        <button onClick={() => setShowReject(false)}
          style={{ width:"100%", padding:"4px", background:"transparent", border:"none", color:p.t6, fontSize:10, cursor:"pointer" }}>
          ← Cancel
        </button>
      )}
    </div>
  );
}
