/* global React */
const { useState, useEffect, useRef, useMemo } = React;
const { Mono, Eyebrow, SectionTitle, Card, Icon, ICONS } = window.SynA;

// ════════════════════════════════════════════════════════════
// SHARED CONTROLS
// ════════════════════════════════════════════════════════════

const Button = ({ variant = "solid", size = "md", leftIcon, rightIcon, loading, disabled, children, onClick }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const styles = {
    solid: {
      background: hover ? "var(--syn-primary-hover)" : "var(--syn-primary)",
      color: "var(--syn-primary-fg)",
      border: "1px solid transparent",
    },
    outline: {
      background: hover ? "var(--syn-primary-subtle)" : "transparent",
      color: "var(--syn-primary)",
      border: "1px solid var(--syn-border-strong)",
    },
    ghost: {
      background: hover ? "var(--syn-bg-sunken)" : "transparent",
      color: "var(--syn-text)",
      border: "1px solid transparent",
    },
    danger: {
      background: hover ? "oklch(0.55 0.22 25)" : "var(--syn-danger)",
      color: "white",
      border: "1px solid transparent",
    },
    link: {
      background: "transparent",
      color: "var(--syn-primary)",
      border: "none",
      textDecoration: hover ? "underline" : "none",
      padding: 0,
    },
  };
  const sizes = {
    sm: { height: "var(--syn-control-h-sm)", padding: "0 var(--syn-control-px-sm)", fontSize: 13 },
    md: { height: "var(--syn-control-h-md)", padding: "0 var(--syn-control-px-md)", fontSize: 14 },
    lg: { height: "var(--syn-control-h-lg)", padding: "0 var(--syn-control-px-lg)", fontSize: 15 },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--syn-font-sans)",
        fontWeight: 500,
        borderRadius: "var(--syn-radius-md)",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "all var(--syn-dur-fast) var(--syn-ease)",
        opacity: disabled ? 0.5 : 1,
        transform: active ? "scale(0.98)" : "scale(1)",
        ...styles[variant],
        ...sizes[size],
      }}>
      {loading && <Spinner size={14}/>}
      {!loading && leftIcon && <Icon d={leftIcon} size={size === "sm" ? 14 : 16}/>}
      {children}
      {rightIcon && <Icon d={rightIcon} size={size === "sm" ? 14 : 16}/>}
    </button>
  );
};

const Spinner = ({ size = 16 }) => (
  <span style={{
    display: "inline-block", width: size, height: size,
    border: `2px solid var(--syn-border)`,
    borderTopColor: "currentColor",
    borderRadius: "50%",
    animation: "syn-spin 0.7s linear infinite",
  }}/>
);

const Input = ({ size = "md", invalid, disabled, placeholder, value, onChange, leftIcon, rightIcon, type = "text" }) => {
  const [focused, setFocused] = useState(false);
  const sizes = {
    sm: { height: "var(--syn-control-h-sm)", fontSize: 13 },
    md: { height: "var(--syn-control-h-md)", fontSize: 14 },
    lg: { height: "var(--syn-control-h-lg)", fontSize: 15 },
  };
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: disabled ? "var(--syn-bg-sunken)" : "var(--syn-bg)",
      border: `1px solid ${invalid ? "var(--syn-danger)" : focused ? "var(--syn-primary)" : "var(--syn-border-strong)"}`,
      borderRadius: "var(--syn-radius-md)",
      padding: "0 12px",
      transition: "border-color var(--syn-dur-fast) var(--syn-ease), box-shadow var(--syn-dur-fast) var(--syn-ease)",
      boxShadow: focused ? `0 0 0 3px ${invalid ? "oklch(0.62 0.21 25 / 0.15)" : "var(--syn-primary-subtle)"}` : "none",
      ...sizes[size],
    }}>
      {leftIcon && <Icon d={leftIcon} size={16} stroke="var(--syn-text-muted)"/>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, border: "none", background: "transparent", outline: "none",
          color: "var(--syn-text)",
          fontSize: "inherit", fontFamily: "var(--syn-font-sans)",
          padding: leftIcon ? "0 0 0 8px" : "0",
        }}/>
      {rightIcon && <Icon d={rightIcon} size={16} stroke="var(--syn-text-muted)"/>}
    </div>
  );
};

const Badge = ({ variant = "neutral", children, dot }) => {
  const styles = {
    neutral: { bg: "var(--syn-bg-sunken)", fg: "var(--syn-text)", b: "var(--syn-border)" },
    primary: { bg: "var(--syn-primary-subtle)", fg: "var(--syn-primary)", b: "var(--syn-primary)" },
    success: { bg: "var(--syn-success-subtle)", fg: "var(--syn-success)", b: "var(--syn-success)" },
    warning: { bg: "var(--syn-warning-subtle)", fg: "oklch(0.5 0.15 80)", b: "var(--syn-warning)" },
    danger: { bg: "var(--syn-danger-subtle)", fg: "var(--syn-danger)", b: "var(--syn-danger)" },
    info: { bg: "var(--syn-info-subtle)", fg: "var(--syn-info)", b: "var(--syn-info)" },
  };
  const s = styles[variant];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: s.bg, color: s.fg,
      padding: "2px 8px",
      borderRadius: "var(--syn-radius-full)",
      fontSize: 12, fontWeight: 500,
      fontFamily: "var(--syn-font-sans)",
      border: `1px solid ${s.b}33`,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.fg }}/>}
      {children}
    </span>
  );
};

// ════════════════════════════════════════════════════════════
// 06 — BUTTONS
// ════════════════════════════════════════════════════════════

const ButtonsArtboard = () => (
  <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
    <SectionTitle idx="06" title="Buttons" subtitle="Five variants × three sizes. Loading state replaces left icon with a spinner. Click feedback via subtle scale (0.98). All states honor density & radius tokens." />

    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)" }}>
      <Mono style={{ color: "var(--syn-text-muted)" }}>variant</Mono>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)" }}>
      <Mono style={{ color: "var(--syn-text-muted)" }}>size</Mono>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)" }}>
      <Mono style={{ color: "var(--syn-text-muted)" }}>with icon</Mono>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button leftIcon={ICONS.Plus}>New</Button>
        <Button variant="outline" rightIcon={ICONS.ArrowRight}>Continue</Button>
        <Button variant="ghost" leftIcon={ICONS.Download}>Export</Button>
        <Button variant="solid" size="sm" leftIcon={ICONS.Search}>Search</Button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)" }}>
      <Mono style={{ color: "var(--syn-text-muted)" }}>state</Mono>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center" }}>
      <Mono style={{ color: "var(--syn-text-muted)" }}>icon-only</Mono>
      <div style={{ display: "flex", gap: 8 }}>
        {[ICONS.Plus, ICONS.Edit, ICONS.Trash, ICONS.Settings, ICONS.Refresh].map((d, i) => (
          <button key={i} style={{
            width: "var(--syn-control-h-md)", height: "var(--syn-control-h-md)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "1px solid var(--syn-border-strong)",
            borderRadius: "var(--syn-radius-md)", color: "var(--syn-text)", cursor: "pointer",
            transition: "all var(--syn-dur-fast) var(--syn-ease)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--syn-bg-sunken)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Icon d={d} size={16}/>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// 07 — FORMS
// ════════════════════════════════════════════════════════════

const Checkbox = ({ checked, onChange, label, indeterminate }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
    <span style={{
      width: 18, height: 18,
      background: checked || indeterminate ? "var(--syn-primary)" : "var(--syn-bg)",
      border: `1.5px solid ${checked || indeterminate ? "var(--syn-primary)" : "var(--syn-border-strong)"}`,
      borderRadius: "var(--syn-radius-sm)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      transition: "all var(--syn-dur-fast) var(--syn-ease)",
      color: "var(--syn-primary-fg)",
    }}
    onClick={() => onChange?.(!checked)}>
      {checked && <Icon d={ICONS.Check} size={12} stroke="currentColor"/>}
      {indeterminate && !checked && <span style={{ width: 8, height: 2, background: "currentColor", borderRadius: 1 }}/>}
    </span>
    {label}
  </label>
);

const Switch = ({ checked, onChange, label }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
    <span style={{
      width: 36, height: 20,
      background: checked ? "var(--syn-primary)" : "var(--syn-border-strong)",
      borderRadius: "var(--syn-radius-full)", padding: 2,
      transition: "background var(--syn-dur-normal) var(--syn-ease)",
      cursor: "pointer",
    }} onClick={() => onChange?.(!checked)}>
      <span style={{
        display: "block", width: 16, height: 16, background: "white",
        borderRadius: "50%",
        transform: checked ? "translateX(16px)" : "translateX(0)",
        transition: "transform var(--syn-dur-normal) var(--syn-ease)",
        boxShadow: "var(--syn-shadow-sm)",
      }}/>
    </span>
    {label}
  </label>
);

const Radio = ({ checked, onChange, label }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
    <span style={{
      width: 18, height: 18, borderRadius: "50%",
      border: `1.5px solid ${checked ? "var(--syn-primary)" : "var(--syn-border-strong)"}`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      transition: "all var(--syn-dur-fast) var(--syn-ease)",
    }} onClick={() => onChange?.(true)}>
      {checked && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--syn-primary)" }}/>}
    </span>
    {label}
  </label>
);

const FormsArtboard = () => {
  const [text, setText] = useState("ada@synerity.dev");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [sw, setSw] = useState(true);
  const [radio, setRadio] = useState("md");
  const [select, setSelect] = useState(false);

  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
      <SectionTitle idx="07" title="Forms" subtitle="Inputs share a single shape. Focus rings derive from the primary token; invalid states swap in danger. All controls scale with density." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div style={{ display: "grid", gap: 24 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
            <Input value={text} onChange={e => setText(e.target.value)} leftIcon={ICONS.Mail}/>
            <div style={{ fontSize: 12, color: "var(--syn-text-muted)", marginTop: 6 }}>We'll never share your email.</div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Search</label>
            <Input placeholder="Search components..." leftIcon={ICONS.Search}/>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Password</label>
            <Input type="password" value="••••••••••" invalid leftIcon={ICONS.Lock}/>
            <div style={{ fontSize: 12, color: "var(--syn-danger)", marginTop: 6 }}>Must contain at least one number.</div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Disabled</label>
            <Input value="Read-only field" disabled/>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Sizes</label>
            <div style={{ display: "grid", gap: 8 }}>
              <Input size="sm" placeholder="Small"/>
              <Input size="md" placeholder="Medium"/>
              <Input size="lg" placeholder="Large"/>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <Card>
            <Eyebrow>Checkbox</Eyebrow>
            <div style={{ display: "grid", gap: 12 }}>
              <Checkbox checked={check1} onChange={setCheck1} label="Subscribe to release notes"/>
              <Checkbox checked={check2} onChange={setCheck2} label="Send me beta invites"/>
              <Checkbox indeterminate label="Indeterminate state"/>
              <Checkbox checked label="Disabled checked"/>
            </div>
          </Card>

          <Card>
            <Eyebrow>Switch</Eyebrow>
            <div style={{ display: "grid", gap: 12 }}>
              <Switch checked={sw} onChange={setSw} label="Enable analytics"/>
              <Switch checked={false} label="Auto-save drafts"/>
            </div>
          </Card>

          <Card>
            <Eyebrow>Radio group</Eyebrow>
            <div style={{ display: "flex", gap: 20 }}>
              {["sm", "md", "lg"].map(v => (
                <Radio key={v} checked={radio === v} onChange={() => setRadio(v)} label={v.toUpperCase()}/>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Select</Eyebrow>
            <div style={{ position: "relative" }}>
              <button onClick={() => setSelect(!select)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                height: "var(--syn-control-h-md)", padding: "0 12px",
                background: "var(--syn-bg)", border: "1px solid var(--syn-border-strong)",
                borderRadius: "var(--syn-radius-md)", fontSize: 14, fontFamily: "inherit", color: "var(--syn-text)",
                cursor: "pointer",
              }}>
                <span>United Kingdom</span>
                <Icon d={ICONS.ChevronDown} size={14} stroke="var(--syn-text-muted)"/>
              </button>
              {select && (
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 10,
                  background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
                  borderRadius: "var(--syn-radius-md)", boxShadow: "var(--syn-shadow-lg)",
                  padding: 4,
                }}>
                  {["United Kingdom", "United States", "Germany", "Japan"].map(c => (
                    <div key={c} style={{
                      padding: "8px 10px", borderRadius: "var(--syn-radius-sm)",
                      cursor: "pointer", fontSize: 14,
                      background: c === "United Kingdom" ? "var(--syn-primary-subtle)" : "transparent",
                      color: c === "United Kingdom" ? "var(--syn-primary)" : "inherit",
                    }} onClick={() => setSelect(false)}>{c}</div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 08 — FEEDBACK
// ════════════════════════════════════════════════════════════

const Alert = ({ variant = "info", title, children, onClose }) => {
  const conf = {
    info: { c: "var(--syn-info)", bg: "var(--syn-info-subtle)", icon: ICONS.Info },
    success: { c: "var(--syn-success)", bg: "var(--syn-success-subtle)", icon: ICONS.Check },
    warning: { c: "var(--syn-warning)", bg: "var(--syn-warning-subtle)", icon: ICONS.AlertCircle },
    danger: { c: "var(--syn-danger)", bg: "var(--syn-danger-subtle)", icon: ICONS.AlertCircle },
  }[variant];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12,
      background: conf.bg, padding: "12px 14px",
      borderRadius: "var(--syn-radius-md)",
      borderLeft: `3px solid ${conf.c}`,
    }}>
      <div style={{ color: conf.c, marginTop: 2 }}><Icon d={conf.icon} size={18}/></div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--syn-text-muted)", padding: 0 }}>
          <Icon d={ICONS.X} size={16}/>
        </button>
      )}
    </div>
  );
};

const Progress = ({ value, max = 100 }) => (
  <div style={{ height: 6, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-full)", overflow: "hidden" }}>
    <div style={{
      height: "100%", width: `${(value / max) * 100}%`,
      background: "var(--syn-primary)",
      borderRadius: "var(--syn-radius-full)",
      transition: "width var(--syn-dur-slow) var(--syn-ease)",
    }}/>
  </div>
);

const Skeleton = ({ width, height = 12, radius = "var(--syn-radius-sm)" }) => (
  <div style={{
    width, height, borderRadius: radius,
    background: "linear-gradient(90deg, var(--syn-bg-sunken), var(--syn-border), var(--syn-bg-sunken))",
    backgroundSize: "200% 100%",
    animation: "syn-shimmer 1.4s ease infinite",
  }}/>
);

const FeedbackArtboard = () => {
  const [progress, setProgress] = useState(45);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 1), 80);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
      <SectionTitle idx="08" title="Feedback & Status" subtitle="Alerts, badges, progress, and skeletons. Each maps to a semantic token — not an arbitrary color — so theme switches stay coherent." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <Eyebrow>Alerts</Eyebrow>
          <div style={{ display: "grid", gap: 10 }}>
            <Alert variant="info" title="A new version is available" onClose={() => {}}>v1.0.4 includes the new Combobox component and 12 bug fixes.</Alert>
            <Alert variant="success" title="Build succeeded">All 247 tests passed in 4.2s.</Alert>
            <Alert variant="warning" title="Approaching token budget">You've used 78% of your monthly context allowance.</Alert>
            <Alert variant="danger" title="Schema validation failed">Field 'email' must be a valid email address.</Alert>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <Card>
            <Eyebrow>Badges</Eyebrow>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success" dot>Live</Badge>
              <Badge variant="warning" dot>Beta</Badge>
              <Badge variant="danger">Deprecated</Badge>
              <Badge variant="info">v1.0</Badge>
            </div>
          </Card>

          <Card>
            <Eyebrow>Progress</Eyebrow>
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--syn-text-muted)", fontFamily: "var(--syn-font-mono)", marginBottom: 6 }}>
                  <span>building packages</span><span>{progress}%</span>
                </div>
                <Progress value={progress}/>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--syn-text-muted)", fontFamily: "var(--syn-font-mono)", marginBottom: 6 }}>
                  <span>tests</span><span>247 / 247</span>
                </div>
                <Progress value={100}/>
              </div>
            </div>
          </Card>

          <Card>
            <Eyebrow>Skeleton</Eyebrow>
            <div style={{ display: "grid", gap: 8 }}>
              <Skeleton width="60%" height={16}/>
              <Skeleton width="100%"/>
              <Skeleton width="92%"/>
              <Skeleton width="74%"/>
            </div>
          </Card>

          <Card>
            <Eyebrow>Spinner</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Spinner size={16}/>
              <Spinner size={20}/>
              <Spinner size={28}/>
              <span style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>Loading components…</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

window.SynB = { Button, Spinner, Input, Badge, Checkbox, Switch, Radio, Alert, Progress, Skeleton, ButtonsArtboard, FormsArtboard, FeedbackArtboard };
