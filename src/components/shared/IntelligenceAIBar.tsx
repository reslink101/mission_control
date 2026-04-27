import { useState, useRef, useEffect } from "react";
import { QUICK_ASKS, resolveResponse } from "../../data/mockResponses";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function IntelligenceAIBar() {
  const [input,        setInput]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focused,      setFocused]      = useState(false);
  const [messages,     setMessages]     = useState<Message[]>([]);
  const dropdownTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat container only — never touches page scroll
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const ask = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setInput("");
    setDropdownOpen(false);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    const mock = resolveResponse(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: mock }]);
      setLoading(false);
    }, 650);
  };

  const handleSend   = () => { if (input.trim()) ask(input.trim()); };
  const openDropdown = () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); setDropdownOpen(true); };
  const closeDropdown= () => { dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120); };
  const hasHistory   = messages.length > 0;

  return (
    <>
      <style>{`
        @keyframes iaSpinKf   { to { transform: rotate(360deg); } }
        @keyframes iaBounceKf { 0%,80%,100%{transform:translateY(0);opacity:0.35} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes iaFadeInKf { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes iaBubbleIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .ia-qa-row:hover        { background: rgba(99,102,241,0.10) !important; color: #c7d2fe !important; }
        .ia-send-btn:not(:disabled):hover { box-shadow: 0 0 0 3px rgba(99,102,241,0.25); transform: scale(1.04); }
        .ia-quick-trigger:hover .ia-chevron { transform: rotate(180deg); }
        .ia-chevron { transition: transform 0.2s; display:inline-block; }
        .ia-qa-list::-webkit-scrollbar       { width: 4px; }
        .ia-qa-list::-webkit-scrollbar-track { background: transparent; }
        .ia-qa-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .ia-qa-list::-webkit-scrollbar-thumb:hover { background: #475569; }
        .ia-chat-scroll::-webkit-scrollbar       { width: 4px; }
        .ia-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .ia-chat-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .ia-msg-bubble { animation: iaBubbleIn 0.2s ease; }
      `}</style>

      <div style={{
        background: "linear-gradient(160deg, #0c1424 0%, #0f172a 50%, #111827 100%)",
        border: "1px solid #1e293b", borderRadius: 16, padding: "14px 14px",
        marginBottom: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
        position: "relative",
      }}>

        {/* ── Conversation history ── */}
        {(hasHistory || loading) && (
          <div ref={chatContainerRef} className="ia-chat-scroll"
            style={{ maxHeight:360, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, marginBottom:16, paddingBottom:4 }}>
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div key={idx} className="ia-msg-bubble" style={{ display:"flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "82%", padding: "10px 14px",
                    borderRadius: isUser ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                    background: isUser ? "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)" : "rgba(255,255,255,0.05)",
                    border: isUser ? "none" : "1px solid #1e293b",
                    boxShadow: isUser ? "0 4px 16px rgba(99,102,241,0.22)" : "none",
                  }}>
                    <div style={{ fontSize:13, lineHeight:1.65, letterSpacing:"0.01em", color: isUser ? "#e0e7ff" : "#cbd5e1", whiteSpace:"pre-wrap" }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="ia-msg-bubble" style={{ display:"flex", justifyContent:"flex-start" }}>
                <div style={{ padding:"10px 16px", borderRadius:"4px 12px 12px 12px", background:"rgba(255,255,255,0.05)", border:"1px solid #1e293b" }}>
                  <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:`rgba(99,102,241,${0.5+i*0.15})`, animation:`iaBounceKf 1.1s ease-in-out ${i*0.18}s infinite` }}/>
                    ))}
                    <span style={{ fontSize:11, color:"#475569", marginLeft:6 }}>Analyzing your network data…</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(hasHistory || loading) && <div style={{ borderTop:"1px solid #1a2540", marginBottom:16 }}/>}

        {/* ── Input row ── */}
        <div className="ia-input-row">
          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, boxShadow:"0 4px 12px rgba(99,102,241,0.35)", flexShrink:0 }}>🧠</div>
            <div className="ia-label-text">AI</div>
          </div>

          <div className="ia-divider"/>

          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, minWidth:0, width:"100%" }}>
            {/* Text input */}
            <div style={{ flex:1, display:"flex", alignItems:"center", background: focused ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.04)", border:`1.5px solid ${focused ? "rgba(99,102,241,0.5)" : "#253047"}`, borderRadius:10, overflow:"hidden", transition:"border-color 0.2s, background 0.2s", boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none" }}>
              <span style={{ paddingLeft:14, fontSize:20, color:"#6366f1", flexShrink:0, lineHeight:1 }}>✦</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Ask anything"
                style={{ flex:1, padding:"11px 14px", background:"transparent", border:"none", outline:"none", fontSize:13.5, color:"#f1f5f9", fontFamily:"inherit", letterSpacing:"0.01em" }}
              />
              {input && (
                <button onClick={() => setInput("")}
                  style={{ padding:"0 12px", background:"transparent", border:"none", cursor:"pointer", color:"#475569", fontSize:16, lineHeight:1 }}>×</button>
              )}
            </div>

            {/* Quick asks dropdown */}
            <div style={{ position:"relative", flexShrink:0 }} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <button className="ia-quick-trigger"
                style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 13px", background:"rgba(255,255,255,0.05)", border:"1px solid #253047", borderRadius:10, cursor:"pointer", color:"#94a3b8", fontSize:12, fontWeight:600, whiteSpace:"nowrap", transition:"border-color 0.2s, background 0.2s" }}>
                <span>⚡</span>
                <span className="ia-qa-label">Quick Asks</span>
                <span className="ia-chevron" style={{ fontSize:9 }}>▼</span>
              </button>

              {dropdownOpen && (
                <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:340, background:"#0d1829", border:"1px solid #1e293b", borderRadius:12, boxShadow:"0 16px 48px rgba(0,0,0,0.45)", zIndex:100, animation:"iaFadeInKf 0.18s ease", maxWidth:"calc(100vw - 24px)" }}>
                  <div style={{ padding:"10px 14px 8px", borderBottom:"1px solid #1e293b", display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em" }}>Suggested Prompts</span>
                  </div>
                  <div className="ia-qa-list" style={{ maxHeight:276, overflowY:"auto" }}>
                    {QUICK_ASKS.map((q, i) => (
                      <button key={i} className="ia-qa-row" onClick={() => ask(q.prompt)}
                        style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"transparent", border:"none", borderBottom: i < QUICK_ASKS.length-1 ? "1px solid #1a2540" : "none", cursor:"pointer", color:"#94a3b8", textAlign:"left", transition:"background 0.15s, color 0.15s" }}>
                        <span style={{ width:26, height:26, borderRadius:7, flexShrink:0, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#818cf8" }}>
                          {q.icon}
                        </span>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:"inherit", marginBottom:1 }}>{q.label}</div>
                          <div style={{ fontSize:10, color:"#475569", lineHeight:1.3 }}>{q.prompt}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Send button */}
          <button className="ia-send-btn" onClick={handleSend} disabled={loading || !input.trim()}
            style={{ flexShrink:0, width:42, height:42, borderRadius:10, border:"none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", background: loading || !input.trim() ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", color: loading || !input.trim() ? "#334155" : "#fff", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s", boxShadow: !loading && input.trim() ? "0 4px 14px rgba(99,102,241,0.4)" : "none" }}>
            {loading
              ? <span style={{ width:14, height:14, border:"2px solid #334155", borderTopColor:"#6366f1", borderRadius:"50%", display:"inline-block", animation:"iaSpinKf 0.75s linear infinite" }}/>
              : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15V3M9 3L4 8M9 3L14 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
          </button>
        </div>
      </div>
    </>
  );
}
