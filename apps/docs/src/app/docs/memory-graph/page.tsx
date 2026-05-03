import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "@synerity/memory-graph" };

const API = [
  { sig: "graph.add(content, meta?)", returns: "MemoryNode", desc: "Add a fact node. meta accepts tags, importance (0–1), source, createdAt, expiresAt." },
  { sig: "graph.update(id, patch)", returns: "MemoryNode", desc: "Update node metadata. Content is immutable after creation." },
  { sig: "graph.remove(id)", returns: "void", desc: "Delete a node and all edges incident to it." },
  { sig: "graph.get(id)", returns: "MemoryNode | undefined", desc: "Retrieve a single node by ID." },
  { sig: "graph.nodes()", returns: "MemoryNode[]", desc: "Return all nodes in insertion order." },
  { sig: "graph.relate(from, to, type, weight?)", returns: "MemoryEdge", desc: "Create a typed directed edge. weight defaults to 1." },
  { sig: "graph.unrelate(from, to, type?)", returns: "void", desc: "Remove edges. Omit type to remove all edges between the pair." },
  { sig: "graph.neighbors(id, depth?)", returns: "MemoryNode[]", desc: "BFS traversal. depth defaults to 1." },
  { sig: "graph.query(prompt, opts?)", returns: "MemoryNode[]", desc: "Score and rank nodes by keyword overlap with prompt + importance." },
  { sig: "graph.toContext(opts?)", returns: "string", desc: "Pack highest-ranked nodes under a maxTokens budget into a formatted string." },
  { sig: "graph.estimateTokens(text?)", returns: "number", desc: "Estimate tokens for text, or the entire graph if omitted." },
  { sig: "graph.setTokenizer(fn)", returns: "void", desc: "Replace the default estimator (length/4) with any tokenizer function." },
  { sig: "graph.prune(opts)", returns: "{ removed: number }", desc: "Evict nodes by strategy: lru, fifo, or importance. Also enforces maxAge and minImportance." },
  { sig: "graph.serialize()", returns: "string", desc: "JSON snapshot of nodes and edges. Lossless round-trip." },
  { sig: "MemoryGraph.deserialize(json)", returns: "MemoryGraph", desc: "Restore a graph from a serialize() snapshot." },
];

export default function MemoryGraphPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Packages
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>@synerity/memory-graph</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          Zero-dependency TypeScript knowledge graphs for LLM context management. Store facts as nodes,
          link them with typed edges, then retrieve only the most relevant subset under a token budget — no vector DB required.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {["Zero dependencies", "Node.js 18+ & browser", "Dual CJS + ESM", "Full TypeScript"].map((tag) => (
            <span key={tag} style={{
              padding: "3px 10px", borderRadius: "var(--syn-radius-full)", fontSize: 12,
              fontFamily: "var(--syn-font-mono)", background: "var(--syn-primary-subtle)", color: "var(--syn-primary)",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Installation</h2>
      <CodeBlock lang="bash" code="npm install @synerity/memory-graph" />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Chatbot session memory</h2>
      <CodeBlock code={`import { MemoryGraph } from '@synerity/memory-graph'

const memory = new MemoryGraph({ maxNodes: 200 })

// Add facts
memory.add('User prefers dark mode',          { tags: ['preference'], importance: 0.9 })
memory.add('Asked about billing on 2026-05-01', { tags: ['billing'] })
memory.add('Subscription: Pro, renews 2026-06-01', { tags: ['billing'], importance: 1.0 })

// Retrieve what's relevant, under a token budget
const context = memory.toContext({
  prompt:    'user asking about invoice',
  maxTokens: 400,
  format:    'markdown',
})
// Only billing-related nodes are included, ordered by relevance × importance`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Agent workspace</h2>
      <CodeBlock code={`import { MemoryGraph } from '@synerity/memory-graph'

const workspace = new MemoryGraph()

const task = workspace.add('Task: refactor auth module',           { importance: 1.0 })
const obs  = workspace.add('Found: JWT secret hardcoded in config.ts line 42')
const dec  = workspace.add('Decision: move secret to env variable')

workspace.relate(task.id, obs.id, 'depends_on')
workspace.relate(obs.id,  dec.id, 'causes')

// Serialize between agent turns
localStorage.setItem('workspace', workspace.serialize())

// Restore
const restored = MemoryGraph.deserialize(localStorage.getItem('workspace')!)`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Custom tokenizer</h2>
      <CodeBlock code={`import { MemoryGraph } from '@synerity/memory-graph'
import { encode } from 'gpt-tokenizer'  // or tiktoken, etc.

const graph = new MemoryGraph()

// Replace the default length/4 estimator
graph.setTokenizer((text) => encode(text).length)

// Now toContext() uses exact token counts
const context = graph.toContext({ maxTokens: 1000 })`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>API reference</h2>
      <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden" }}>
        {API.map(({ sig, returns, desc }, i) => (
          <div key={sig} style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            alignItems: "start", gap: 16, padding: "12px 16px",
            background: "var(--syn-bg-raised)",
            borderBottom: i < API.length - 1 ? "1px solid var(--syn-border)" : "none",
          }}>
            <div>
              <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)", display: "block", marginBottom: 4 }}>{sig}</code>
              <div style={{ fontSize: 12, color: "var(--syn-text-muted)", lineHeight: 1.5 }}>{desc}</div>
            </div>
            <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-subtle)", whiteSpace: "nowrap", paddingTop: 2 }}>{returns}</code>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 12px" }}>Edge types</h2>
      <p style={{ color: "var(--syn-text-muted)", fontSize: 14, marginBottom: 12 }}>
        Built-in semantic types. Any string is also valid for custom relationships.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["relates_to", "contradicts", "depends_on", "follows", "part_of", "causes"].map((t) => (
          <code key={t} style={{
            fontFamily: "var(--syn-font-mono)", fontSize: 12,
            background: "var(--syn-bg-sunken)", border: "1px solid var(--syn-border)",
            padding: "4px 10px", borderRadius: "var(--syn-radius-full)", color: "var(--syn-text)",
          }}>{t}</code>
        ))}
      </div>
    </>
  );
}
