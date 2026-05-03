/* global React */
const { useState, useEffect, useRef, useMemo } = React;
const { Mono, Eyebrow, SectionTitle, Card, Icon, ICONS } = window.SynA;
const { Badge } = window.SynB;

// ════════════════════════════════════════════════════════════
// 12 — MEMORY GRAPH (showcase)
// ════════════════════════════════════════════════════════════

const NODES = [
  { id: "n1", x: 180, y: 140, label: "User prefers dark mode", tag: "preference", imp: 0.9 },
  { id: "n2", x: 460, y: 80, label: "Asked about billing", tag: "billing", imp: 0.6 },
  { id: "n3", x: 720, y: 140, label: "Subscription: Pro plan", tag: "billing", imp: 1.0 },
  { id: "n4", x: 280, y: 320, label: "Timezone: Europe/London", tag: "preference", imp: 0.7 },
  { id: "n5", x: 600, y: 300, label: "Renewal: 2026-06-01", tag: "billing", imp: 0.85 },
  { id: "n6", x: 880, y: 280, label: "Card ending 4242", tag: "billing", imp: 0.5 },
  { id: "n7", x: 440, y: 460, label: "Last login: 2 days ago", tag: "session", imp: 0.4 },
  { id: "n8", x: 760, y: 460, label: "Open: invoice question", tag: "billing", imp: 0.95 },
];

const EDGES = [
  { from: "n2", to: "n3", type: "relates_to" },
  { from: "n3", to: "n5", type: "depends_on" },
  { from: "n3", to: "n6", type: "part_of" },
  { from: "n2", to: "n8", type: "causes" },
  { from: "n8", to: "n5", type: "relates_to" },
  { from: "n1", to: "n4", type: "relates_to" },
  { from: "n4", to: "n7", type: "follows" },
];

const TAG_COLORS = {
  preference: "var(--syn-info)",
  billing: "var(--syn-primary)",
  session: "var(--syn-warning)",
};

const MemoryGraphArtboard = () => {
  const [hover, setHover] = useState(null);
  const [query, setQuery] = useState("invoice");
  const [budget, setBudget] = useState(120);

  // simulate scoring: nodes whose label or tag matches query get higher score
  const scored = useMemo(() => NODES.map(n => {
    const q = query.toLowerCase();
    const hit = q && (n.label.toLowerCase().includes(q) || n.tag.includes(q));
    const score = (hit ? 1 : 0.3) * n.imp;
    return { ...n, score, hit };
  }), [query]);

  const ranked = [...scored].sort((a, b) => b.score - a.score);
  let used = 0;
  const included = new Set();
  for (const n of ranked) {
    const tokens = Math.ceil(n.label.length / 4);
    if (used + tokens > budget) continue;
    used += tokens;
    included.add(n.id);
  }

  const nodeById = id => NODES.find(n => n.id === id);

  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 900 }}>
      <SectionTitle idx="12" title="@synerity/memory-graph"
        subtitle="Zero-dependency knowledge graphs for LLM context. Add facts as nodes, link with typed edges, then retrieve only what's relevant for a prompt — under a token budget. No vector DB required." />

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--syn-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Memory graph — chatbot session</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Badge variant="primary" dot>{NODES.length} nodes</Badge>
              <Badge variant="neutral">{EDGES.length} edges</Badge>
            </div>
          </div>
          <div style={{ position: "relative", background: "var(--syn-bg-sunken)", height: 540 }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--syn-border)" strokeWidth="0.5"/>
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--syn-border-strong)"/>
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>

              {EDGES.map((e, i) => {
                const a = nodeById(e.from), b = nodeById(e.to);
                const both = included.has(e.from) && included.has(e.to);
                return (
                  <g key={i}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={both ? "var(--syn-primary)" : "var(--syn-border-strong)"}
                      strokeWidth={both ? 1.5 : 1}
                      strokeOpacity={both ? 0.9 : 0.5}
                      markerEnd="url(#arrow)"/>
                    <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 6}
                      fontSize="10" fontFamily="var(--syn-font-mono)"
                      fill="var(--syn-text-subtle)" textAnchor="middle">
                      {e.type}
                    </text>
                  </g>
                );
              })}

              {scored.map(n => {
                const isIn = included.has(n.id);
                const r = 10 + n.imp * 18;
                return (
                  <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                    <circle cx={n.x} cy={n.y} r={r + 6} fill={TAG_COLORS[n.tag]} opacity={isIn ? 0.15 : 0}/>
                    <circle cx={n.x} cy={n.y} r={r}
                      fill={isIn ? TAG_COLORS[n.tag] : "var(--syn-bg-raised)"}
                      stroke={TAG_COLORS[n.tag]}
                      strokeWidth={hover === n.id ? 3 : 1.5}/>
                    <text x={n.x} y={n.y + r + 16}
                      fontSize="11" fontFamily="var(--syn-font-sans)" fontWeight="500"
                      fill="var(--syn-text)" textAnchor="middle">{n.label}</text>
                    <text x={n.x} y={n.y + r + 30}
                      fontSize="9" fontFamily="var(--syn-font-mono)"
                      fill="var(--syn-text-muted)" textAnchor="middle"
                      style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>{n.tag} · imp {n.imp}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Card>

        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Card>
            <Eyebrow>Query</Eyebrow>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "var(--syn-text-muted)", display: "block", marginBottom: 6 }}>prompt</label>
              <input value={query} onChange={e => setQuery(e.target.value)}
                style={{
                  width: "100%", height: 36, padding: "0 12px",
                  background: "var(--syn-bg)", border: "1px solid var(--syn-border-strong)",
                  borderRadius: "var(--syn-radius-md)", fontFamily: "var(--syn-font-mono)",
                  fontSize: 13, color: "var(--syn-text)",
                }}/>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--syn-text-muted)", marginBottom: 6 }}>
                <span>maxTokens</span><Mono>{budget}</Mono>
              </div>
              <input type="range" min={20} max={300} value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--syn-primary)" }}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--syn-border)", fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
              <span style={{ color: "var(--syn-text-muted)" }}>used</span>
              <span><span style={{ color: "var(--syn-primary)" }}>{used}</span> / {budget} tokens</span>
            </div>
          </Card>

          <Card padding={0}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--syn-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>graph.toContext()</div>
              <Badge variant="success" dot>{included.size} nodes</Badge>
            </div>
            <div style={{ padding: 16, fontFamily: "var(--syn-font-mono)", fontSize: 12, lineHeight: 1.6, color: "var(--syn-text)", maxHeight: 280, overflow: "auto" }}>
              <span style={{ color: "var(--syn-text-muted)" }}># Context</span>{"\n"}
              {ranked.filter(n => included.has(n.id)).map((n, i) => (
                <div key={n.id}>
                  <span style={{ color: "var(--syn-text-muted)" }}>—</span> {n.label}{" "}
                  <span style={{ color: TAG_COLORS[n.tag], fontSize: 10 }}>[{n.tag}]</span>
                </div>
              ))}
              {included.size === 0 && <span style={{ color: "var(--syn-text-muted)" }}>// budget too low — no nodes fit</span>}
            </div>
          </Card>

          <Card>
            <Eyebrow>Edge types</Eyebrow>
            <div style={{ display: "grid", gap: 6, fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
              {["relates_to", "contradicts", "depends_on", "follows", "part_of", "causes"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 24, height: 1, background: "var(--syn-border-strong)" }}/>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 13 — MOTION
// ════════════════════════════════════════════════════════════

const MotionArtboard = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1800);
    return () => clearInterval(t);
  }, []);
  const durations = [
    { n: "fast", v: "100ms" },
    { n: "normal", v: "200ms" },
    { n: "slow", v: "300ms" },
    { n: "slower", v: "500ms" },
  ];
  const easings = [
    { n: "ease", v: "cubic-bezier(0.4, 0, 0.2, 1)" },
    { n: "ease-in", v: "cubic-bezier(0.4, 0, 1, 1)" },
    { n: "ease-out", v: "cubic-bezier(0, 0, 0.2, 1)" },
    { n: "ease-spring", v: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  ];
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
      <SectionTitle idx="13" title="Motion" subtitle="Four durations, four easings. Spring is reserved for affordances that need character — toasts, popovers, drag-release. Everything else uses ease." count={8}/>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card>
          <Eyebrow>Duration</Eyebrow>
          <div style={{ display: "grid", gap: 14 }}>
            {durations.map(d => (
              <div key={d.n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
                  <span>duration-{d.n}</span>
                  <span style={{ color: "var(--syn-text-muted)" }}>{d.v}</span>
                </div>
                <div style={{ height: 14, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-full)", overflow: "hidden", position: "relative" }}>
                  <div key={tick} style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: "var(--syn-primary)",
                    animation: `syn-slide ${d.v} var(--syn-ease) forwards`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>Easing</Eyebrow>
          <div style={{ display: "grid", gap: 14 }}>
            {easings.map(e => (
              <div key={e.n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
                  <span>{e.n}</span>
                  <span style={{ color: "var(--syn-text-muted)", fontSize: 10 }}>{e.v.replace("cubic-bezier", "cb")}</span>
                </div>
                <div style={{ height: 14, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-full)", overflow: "hidden", position: "relative" }}>
                  <div key={tick} style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: "var(--syn-text)",
                    animation: `syn-slide 600ms ${e.v} forwards`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16 }}>
        {[
          { t: "Tooltip in", d: "150ms ease-out" },
          { t: "Modal in", d: "200ms ease-out" },
          { t: "Toast spring", d: "300ms ease-spring" },
        ].map(p => (
          <Card key={p.t} style={{ height: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{p.t}</div>
            <Mono style={{ color: "var(--syn-text-muted)" }}>{p.d}</Mono>
          </Card>
        ))}
      </div>
    </div>
  );
};

window.SynD = { MemoryGraphArtboard, MotionArtboard };
