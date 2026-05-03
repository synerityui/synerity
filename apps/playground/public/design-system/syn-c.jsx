/* global React */
const { useState, useEffect, useRef, useMemo } = React;
const { Mono, Eyebrow, SectionTitle, Card, Icon, ICONS } = window.SynA;
const { Button, Badge } = window.SynB;

// ════════════════════════════════════════════════════════════
// 09 — OVERLAYS
// ════════════════════════════════════════════════════════════

const OverlaysArtboard = () => {
  const [tooltip, setTooltip] = useState(false);
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 800 }}>
      <SectionTitle idx="09" title="Overlays" subtitle="Modals, popovers, tooltips, and menus. Floating UI handles positioning. Focus traps activate only on modal dialogs — popovers stay light." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Modal */}
        <Card padding={0} style={{ overflow: "hidden", height: 360, position: "relative", background: "var(--syn-bg-sunken)" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgb(0 0 0 / 0.4)" }}/>
          <div style={{
            position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            width: "calc(100% - 64px)", maxWidth: 360,
            background: "var(--syn-bg-raised)", borderRadius: "var(--syn-radius-xl)",
            boxShadow: "var(--syn-shadow-xl)", border: "1px solid var(--syn-border)",
            padding: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Delete this component?</div>
              <Icon d={ICONS.X} size={18} stroke="var(--syn-text-muted)"/>
            </div>
            <div style={{ fontSize: 13, color: "var(--syn-text-muted)", marginBottom: 20 }}>
              "Button" will be permanently removed from your project. This cannot be undone.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button variant="danger" size="sm">Delete</Button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>Modal · role=dialog · focus trapped</div>
        </Card>

        {/* Popover */}
        <Card padding={0} style={{ overflow: "hidden", height: 360, position: "relative", background: "var(--syn-bg-sunken)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <Button variant="outline" leftIcon={ICONS.Bell}>Notifications</Button>
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", left: 0, width: 280,
              background: "var(--syn-bg-raised)", borderRadius: "var(--syn-radius-lg)",
              boxShadow: "var(--syn-shadow-lg)", border: "1px solid var(--syn-border)",
              padding: 8,
            }}>
              {[
                { t: "Build succeeded", s: "2 min ago", v: "success" },
                { t: "PR #247 needs review", s: "1 hr ago", v: "info" },
                { t: "Token quota at 78%", s: "3 hr ago", v: "warning" },
              ].map((n, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr",
                  gap: 10, padding: 10,
                  borderRadius: "var(--syn-radius-sm)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--syn-bg-sunken)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: `var(--syn-${n.v})`, marginTop: 6 }}/>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{n.t}</div>
                    <div style={{ fontSize: 11, color: "var(--syn-text-muted)", fontFamily: "var(--syn-font-mono)", marginTop: 2 }}>{n.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>Popover · placement=bottom-start</div>
        </Card>

        {/* Tooltip */}
        <Card padding={0} style={{ overflow: "hidden", height: 240, position: "relative", background: "var(--syn-bg-sunken)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <button style={{
              width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border-strong)",
              borderRadius: "var(--syn-radius-md)", color: "var(--syn-text)", cursor: "pointer",
            }}>
              <Icon d={ICONS.Settings} size={16}/>
            </button>
            <div style={{
              position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
              background: "var(--syn-n-11)", color: "var(--syn-n-1)",
              padding: "6px 10px", borderRadius: "var(--syn-radius-sm)",
              fontSize: 12, whiteSpace: "nowrap",
              boxShadow: "var(--syn-shadow-md)",
            }}>
              Open settings <span style={{ opacity: 0.5, marginLeft: 6, fontFamily: "var(--syn-font-mono)" }}>⌘,</span>
              <div style={{
                position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                width: 0, height: 0,
                borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                borderTop: "5px solid var(--syn-n-11)",
              }}/>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>Tooltip · 300ms delay</div>
        </Card>

        {/* Menu */}
        <Card padding={0} style={{ overflow: "hidden", height: 240, position: "relative", background: "var(--syn-bg-sunken)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 220,
            background: "var(--syn-bg-raised)", borderRadius: "var(--syn-radius-md)",
            boxShadow: "var(--syn-shadow-lg)", border: "1px solid var(--syn-border)",
            padding: 4, fontSize: 13,
          }}>
            {[
              { i: ICONS.Edit, l: "Edit", k: "⌘E" },
              { i: ICONS.Copy, l: "Duplicate", k: "⌘D" },
              { i: ICONS.Download, l: "Export…", k: "⌘⇧E" },
              { divider: true },
              { i: ICONS.Trash, l: "Delete", k: "⌫", danger: true },
            ].map((m, i) => m.divider ? (
              <div key={i} style={{ height: 1, background: "var(--syn-border)", margin: "4px 0" }}/>
            ) : (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto",
                alignItems: "center", gap: 10, padding: "6px 10px",
                borderRadius: "var(--syn-radius-sm)", cursor: "pointer",
                color: m.danger ? "var(--syn-danger)" : "inherit",
              }}
              onMouseEnter={e => e.currentTarget.style.background = m.danger ? "var(--syn-danger-subtle)" : "var(--syn-primary-subtle)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <Icon d={m.i} size={14}/>
                <span>{m.l}</span>
                <Mono style={{ fontSize: 11, color: m.danger ? "var(--syn-danger)" : "var(--syn-text-muted)" }}>{m.k}</Mono>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>Menu · type-ahead, arrow nav</div>
        </Card>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 10 — NAVIGATION
// ════════════════════════════════════════════════════════════

const NavigationArtboard = () => {
  const [tab, setTab] = useState("tokens");
  const [page, setPage] = useState(3);
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
      <SectionTitle idx="10" title="Navigation" subtitle="Tabs, breadcrumbs, steppers, pagination. Roving tabindex throughout — arrow keys move within a group, Tab moves between groups." />

      <div style={{ display: "grid", gap: 24 }}>
        <Card>
          <Eyebrow>Tabs — line</Eyebrow>
          <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--syn-border)", marginBottom: 16 }}>
            {[
              { id: "tokens", l: "Tokens" },
              { id: "headless", l: "Headless" },
              { id: "ui", l: "UI" },
              { id: "forms", l: "Forms" },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 14px", background: "transparent", border: "none",
                borderBottom: `2px solid ${tab === t.id ? "var(--syn-primary)" : "transparent"}`,
                color: tab === t.id ? "var(--syn-text)" : "var(--syn-text-muted)",
                fontWeight: tab === t.id ? 600 : 500, fontSize: 14,
                cursor: "pointer", marginBottom: -1, fontFamily: "inherit",
              }}>{t.l}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>
            Current panel: <Mono>{tab}</Mono>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Card>
            <Eyebrow>Tabs — pills</Eyebrow>
            <div style={{ display: "inline-flex", padding: 4, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-md)", gap: 2 }}>
              {["Day", "Week", "Month", "Year"].map((l, i) => (
                <button key={l} style={{
                  padding: "6px 12px", border: "none",
                  background: i === 1 ? "var(--syn-bg-raised)" : "transparent",
                  boxShadow: i === 1 ? "var(--syn-shadow-sm)" : "none",
                  borderRadius: "var(--syn-radius-sm)",
                  fontSize: 13, fontWeight: 500, fontFamily: "inherit",
                  color: i === 1 ? "var(--syn-text)" : "var(--syn-text-muted)",
                  cursor: "pointer",
                }}>{l}</button>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Breadcrumb</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <span style={{ color: "var(--syn-text-muted)" }}>Docs</span>
              <Icon d={ICONS.ChevronRight} size={12} stroke="var(--syn-text-subtle)"/>
              <span style={{ color: "var(--syn-text-muted)" }}>Components</span>
              <Icon d={ICONS.ChevronRight} size={12} stroke="var(--syn-text-subtle)"/>
              <span style={{ color: "var(--syn-text-muted)" }}>Forms</span>
              <Icon d={ICONS.ChevronRight} size={12} stroke="var(--syn-text-subtle)"/>
              <span style={{ color: "var(--syn-text)", fontWeight: 500 }}>Combobox</span>
            </div>
          </Card>
        </div>

        <Card>
          <Eyebrow>Stepper</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {["Install", "Configure", "Build", "Deploy"].map((l, i) => {
              const done = i < 2, active = i === 2;
              return (
                <React.Fragment key={l}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "var(--syn-primary)" : active ? "var(--syn-bg)" : "var(--syn-bg-sunken)",
                      border: `1.5px solid ${done || active ? "var(--syn-primary)" : "var(--syn-border-strong)"}`,
                      color: done ? "var(--syn-primary-fg)" : active ? "var(--syn-primary)" : "var(--syn-text-muted)",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {done ? <Icon d={ICONS.Check} size={14}/> : i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: active ? "var(--syn-text)" : done ? "var(--syn-text)" : "var(--syn-text-muted)" }}>{l}</div>
                      <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-subtle)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {done ? "complete" : active ? "current" : "upcoming"}
                      </div>
                    </div>
                  </div>
                  {i < 3 && <div style={{ flex: 1, height: 1, background: i < 1 ? "var(--syn-primary)" : "var(--syn-border)", margin: "0 16px" }}/>}
                </React.Fragment>
              );
            })}
          </div>
        </Card>

        <Card>
          <Eyebrow>Pagination</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setPage(Math.max(1, page - 1))} style={pgBtn(false)}>
              <Icon d={ICONS.ArrowLeft} size={14}/>
            </button>
            {[1, 2, 3, 4, 5, "...", 12].map((n, i) => (
              <button key={i} onClick={() => typeof n === "number" && setPage(n)} style={pgBtn(n === page, typeof n !== "number")}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(12, page + 1))} style={pgBtn(false)}>
              <Icon d={ICONS.ArrowRight} size={14}/>
            </button>
            <span style={{ marginLeft: "auto", fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text-muted)" }}>
              page {page} / 12
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

const pgBtn = (active, disabled) => ({
  minWidth: 32, height: 32, padding: "0 8px",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  border: `1px solid ${active ? "var(--syn-primary)" : "var(--syn-border)"}`,
  background: active ? "var(--syn-primary)" : "var(--syn-bg)",
  color: active ? "var(--syn-primary-fg)" : disabled ? "var(--syn-text-disabled)" : "var(--syn-text)",
  borderRadius: "var(--syn-radius-sm)",
  fontSize: 13, fontFamily: "inherit", cursor: disabled ? "default" : "pointer",
  pointerEvents: disabled ? "none" : "auto",
});

// ════════════════════════════════════════════════════════════
// 11 — DATA DISPLAY
// ════════════════════════════════════════════════════════════

const DataArtboard = () => (
  <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 800 }}>
    <SectionTitle idx="11" title="Data Display" subtitle="Cards, tables, stats. The bones of dashboards. Monospace numerals so columns line up; inline trend badges to communicate direction without color alone." />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
      {[
        { l: "Total downloads", v: "184,290", d: "+12.4%", t: "up" },
        { l: "Active projects", v: "1,427", d: "+3.1%", t: "up" },
        { l: "Bundle size", v: "38.2kB", d: "−4.0%", t: "down-good" },
        { l: "Open issues", v: "27", d: "+2", t: "up-bad" },
      ].map(s => (
        <Card key={s.l}>
          <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{s.l}</div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "var(--syn-tracking-tight)", fontFamily: "var(--syn-font-mono)", lineHeight: 1 }}>{s.v}</div>
          <div style={{ marginTop: 10 }}>
            <Badge variant={(s.t === "up" || s.t === "down-good") ? "success" : "danger"}>{s.d}</Badge>
          </div>
        </Card>
      ))}
    </div>

    <Card padding={0} style={{ overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--syn-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Component registry</div>
          <div style={{ fontSize: 12, color: "var(--syn-text-muted)", marginTop: 2 }}>14 components in @synerity/ui</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm" leftIcon={ICONS.Filter}>Filter</Button>
          <Button variant="outline" size="sm" leftIcon={ICONS.Download}>Export</Button>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--syn-bg-sunken)" }}>
            {["Component", "Package", "Status", "Bundle", "Coverage", ""].map((h, i) => (
              <th key={i} style={{
                padding: "10px 16px", textAlign: i === 0 ? "left" : i === 5 ? "right" : "left",
                fontFamily: "var(--syn-font-mono)", fontSize: 11, fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.08em",
                color: "var(--syn-text-muted)", borderBottom: "1px solid var(--syn-border)",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { c: "Button", p: "ui", s: "stable", b: "2.4kB", t: 98 },
            { c: "Input", p: "ui", s: "stable", b: "3.1kB", t: 94 },
            { c: "Modal", p: "ui", s: "stable", b: "5.8kB", t: 91 },
            { c: "Combobox", p: "ui", s: "beta", b: "7.2kB", t: 84 },
            { c: "DateInput", p: "ui", s: "alpha", b: "9.4kB", t: 62 },
          ].map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--syn-border)" }}>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "var(--syn-radius-sm)", background: "var(--syn-primary-subtle)", color: "var(--syn-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon d={ICONS.Code} size={14}/>
                  </div>
                  <span style={{ fontWeight: 500 }}>{r.c}</span>
                </div>
              </td>
              <td style={{ padding: "12px 16px" }}><Mono style={{ color: "var(--syn-text-muted)" }}>@synerity/{r.p}</Mono></td>
              <td style={{ padding: "12px 16px" }}>
                <Badge variant={r.s === "stable" ? "success" : r.s === "beta" ? "warning" : "info"} dot>{r.s}</Badge>
              </td>
              <td style={{ padding: "12px 16px" }}><Mono>{r.b}</Mono></td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 80, height: 4, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-full)", overflow: "hidden" }}>
                    <div style={{ width: `${r.t}%`, height: "100%", background: r.t > 90 ? "var(--syn-success)" : r.t > 75 ? "var(--syn-warning)" : "var(--syn-danger)" }}/>
                  </div>
                  <Mono style={{ fontSize: 12 }}>{r.t}%</Mono>
                </div>
              </td>
              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                <Icon d={ICONS.ChevronRight} size={14} stroke="var(--syn-text-muted)"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

window.SynC = { OverlaysArtboard, NavigationArtboard, DataArtboard };
