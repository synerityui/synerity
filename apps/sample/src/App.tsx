import { useState } from "react";
import {
  Alert,
  Accordion,
  Avatar, AvatarGroup,
  Badge,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Checkbox,
  Group,
  Heading,
  Input,
  Modal,
  Spinner,
  Stack,
  Switch,
  Tabs,
  Text,
  Textarea,
  Tooltip,
} from "@synerity/ui";
import {
  Download, Check, Star, Bell, Settings,
  Search, Trash, Plus, AlertCircle,
} from "@synerity/icons";
import { MemoryGraph } from "@synerity/memory-graph";
import { LoginForm } from "./LoginForm";

// ── Memory graph demo (tested at module load) ────────────────────────────────
const graph = new MemoryGraph();
graph.add("User prefers dark mode",       { tags: ["preference"], importance: 0.9 });
graph.add("Subscription: Pro plan",       { tags: ["billing"],    importance: 1.0 });
graph.add("Last login: 2 days ago",       { tags: ["session"],    importance: 0.4 });
const context = graph.toContext({ prompt: "billing", maxTokens: 200 });

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{
        fontFamily: "var(--synerity-font-mono)", fontSize: 11, fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.1em",
        color: "var(--synerity-color-text-secondary)", marginBottom: 20,
        paddingBottom: 12, borderBottom: "1px solid var(--synerity-color-border)",
      }}>
        {title}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [switched, setSwitched] = useState(false);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <div style={{ minHeight: "100%", background: "var(--synerity-color-surface)" }}>
      {/* Header */}
      <header style={{
        padding: "0 40px", height: 60, display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid var(--synerity-color-border)",
        position: "sticky", top: 0, background: "var(--synerity-color-surface)", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <circle cx="12" cy="12" r="6" fill="var(--synerity-color-primary)" />
            <circle cx="28" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="28" r="6" fill="currentColor" />
            <line x1="12" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="28" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>Synerity</span>
          <Badge variant="primary">v0.1.0 — from npm</Badge>
        </div>
        <Group gap="8px">
          <Tooltip content={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            <Button variant="outline" size="sm" onClick={toggleTheme} leftIcon={<Settings size={14} />}>
              {theme === "light" ? "Dark" : "Light"} mode
            </Button>
          </Tooltip>
        </Group>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 40px" }}>

        {/* Alerts */}
        <Section title="Alert">
          <Stack gap="10px">
            <Alert variant="info" title="Packages installed from npm">
              This app uses @synerity/ui, @synerity/icons, @synerity/tokens, @synerity/forms, and @synerity/memory-graph — all from the published v0.1.0 registry packages.
            </Alert>
            <Alert variant="success" title="Published">All 9 packages live on npm.</Alert>
            <Alert variant="warning">Token quota is at 80%. Consider upgrading your plan.</Alert>
            <Alert variant="danger" title="Build failed">Deployment to production failed. Check the logs.</Alert>
          </Stack>
        </Section>

        {/* Buttons */}
        <Section title="Button">
          <Stack gap="16px">
            <Group gap="8px">
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </Group>
            <Group gap="8px">
              <Button size="sm" leftIcon={<Download size={14} />}>Download</Button>
              <Button size="md" leftIcon={<Plus size={16} />}>New project</Button>
              <Button size="lg" rightIcon={<Check size={18} />}>Confirm</Button>
            </Group>
            <Group gap="8px">
              <Button loading>Saving…</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" leftIcon={<Trash size={14} />} style={{ color: "var(--synerity-color-danger)", borderColor: "var(--synerity-color-danger)" }}>Delete</Button>
            </Group>
          </Stack>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <Group gap="8px" wrap>
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success" dot>Success</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="danger" dot>Danger</Badge>
            <Badge variant="info">Info</Badge>
          </Group>
        </Section>

        {/* Inputs */}
        <Section title="Input · Textarea · Checkbox · Switch">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Stack gap="12px">
              <Input placeholder="Search anything…" />
              <Input invalid placeholder="Invalid state" />
              <Input disabled placeholder="Disabled" />
              <div style={{ position: "relative" }}>
                <Input placeholder="With icon" style={{ paddingLeft: 36 }} />
                <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--synerity-color-text-secondary)", pointerEvents: "none" }} />
              </div>
            </Stack>
            <Stack gap="12px">
              <Textarea placeholder="Write a description…" rows={4} />
              <Stack gap="10px">
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="Accept terms and conditions" />
                <Checkbox indeterminate label="Indeterminate state" />
                <Checkbox disabled label="Disabled checkbox" />
              </Stack>
              <Switch checked={switched} onChange={(e) => setSwitched(e.target.checked)} label={switched ? "Notifications on" : "Notifications off"} />
            </Stack>
          </div>
        </Section>

        {/* Cards & Avatars */}
        <Section title="Card · Avatar · Spinner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <CardHeader>
                <Group gap="12px">
                  <Avatar name="Bhushan Gadekar" size="md" />
                  <div>
                    <Heading level={4}>Bhushan Gadekar</Heading>
                    <Text size="sm" color="muted">Admin · Pro plan</Text>
                  </div>
                </Group>
              </CardHeader>
              <CardBody>
                <Text size="sm" color="muted">
                  Building Synerity — a headless React component library with zero-runtime CSS and full WCAG compliance.
                </Text>
              </CardBody>
              <CardFooter>
                <Group gap="8px">
                  <Button size="sm" variant="outline" leftIcon={<Bell size={14} />}>Follow</Button>
                  <Button size="sm" leftIcon={<Star size={14} />}>Star</Button>
                </Group>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Heading level={4}>Team</Heading>
              </CardHeader>
              <CardBody>
                <Stack gap="12px">
                  <AvatarGroup>
                    {["Alice", "Bob", "Charlie", "Diana", "Eve"].map((name) => (
                      <Avatar key={name} name={name} size="sm" />
                    ))}
                  </AvatarGroup>
                  <Group gap="12px" align="center">
                    <Spinner size="sm" />
                    <Text size="sm" color="muted">Loading member data…</Text>
                  </Group>
                  <Group gap="12px" align="center">
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </Group>
                </Stack>
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <Stack gap="16px">
            <Tabs
              defaultValue="overview"
              variant="line"
              items={[
                { value: "overview",  label: "Overview",  content: <Text size="sm" color="muted" style={{ paddingTop: 12 }}>Project overview and recent activity.</Text> },
                { value: "analytics", label: "Analytics", content: <Text size="sm" color="muted" style={{ paddingTop: 12 }}>Download stats and usage metrics.</Text> },
                { value: "settings",  label: "Settings",  content: <Text size="sm" color="muted" style={{ paddingTop: 12 }}>Configure project settings.</Text> },
              ]}
            />
            <Tabs
              defaultValue="day"
              variant="pills"
              items={[
                { value: "day",   label: "Day",   content: null },
                { value: "week",  label: "Week",  content: null },
                { value: "month", label: "Month", content: null },
                { value: "year",  label: "Year",  content: null },
              ]}
            />
          </Stack>
        </Section>

        {/* Accordion */}
        <Section title="Accordion">
          <Accordion
            type="single"
            defaultValue="q1"
            items={[
              { value: "q1", title: "What is Synerity?", content: "A headless React UI library — logic in @synerity/headless, tokens in @synerity/tokens, styled components in @synerity/ui. Copy-paste via @synerity/cli." },
              { value: "q2", title: "Is it RSC compatible?", content: "Yes. CSS Modules with no runtime means components render server-side without use client wrappers for styling." },
              { value: "q3", title: "How do I theme it?", content: "Override any --synerity-* CSS custom property. Change --synerity-color-primary and every component repaints." },
            ]}
          />
        </Section>

        {/* Modal */}
        <Section title="Modal · Tooltip">
          <Group gap="12px">
            <Button onClick={() => setModalOpen(true)} leftIcon={<AlertCircle size={16} />}>
              Open modal
            </Button>
            <Tooltip content="This tooltip appears on hover">
              <Button variant="outline">Hover for tooltip</Button>
            </Tooltip>
            <Tooltip content="Appears below" placement="bottom">
              <Button variant="ghost">Below tooltip</Button>
            </Tooltip>
          </Group>

          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Delete component?"
            footer={
              <Group gap="8px" justify="flex-end">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="solid" onClick={() => setModalOpen(false)}>Confirm</Button>
              </Group>
            }
          >
            <Text size="sm" color="muted">
              "Button" will be permanently removed from your project. This action cannot be undone.
            </Text>
          </Modal>
        </Section>

        {/* Forms */}
        <Section title="@synerity/forms — Login form with Zod validation">
          <div style={{ maxWidth: 400 }}>
            <LoginForm />
          </div>
        </Section>

        {/* Memory graph */}
        <Section title="@synerity/memory-graph — Token-budget context retrieval">
          <Card>
            <CardBody>
              <Stack gap="16px">
                <Group gap="16px">
                  <Badge variant="primary">{graph.nodes().length} nodes</Badge>
                  <Text size="sm" color="muted">Query: "billing" · maxTokens: 200</Text>
                </Group>
                <pre style={{
                  fontFamily: "var(--synerity-font-mono)", fontSize: 12, lineHeight: 1.65,
                  background: "var(--synerity-color-surface-overlay)",
                  padding: "16px 20px", borderRadius: "var(--synerity-radius-md)",
                  color: "var(--synerity-color-text-primary)", margin: 0, whiteSpace: "pre-wrap",
                }}>
                  {context}
                </pre>
              </Stack>
            </CardBody>
          </Card>
        </Section>

      </main>
    </div>
  );
}
