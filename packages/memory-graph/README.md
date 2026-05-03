# @synerity/memory-graph

Zero-dependency TypeScript knowledge graphs for LLM context management. Store facts as nodes, link them with typed edges, then retrieve only the most relevant subset under a token budget — no vector database required.

Works in **Node.js 18+** and modern **browsers**. Dual CJS + ESM. No React dependency.

## Installation

```bash
npm install @synerity/memory-graph
```

## Usage

### Chatbot session memory

```ts
import { MemoryGraph } from '@synerity/memory-graph'

const memory = new MemoryGraph({ maxNodes: 200 })

memory.add('User prefers dark mode',              { tags: ['preference'], importance: 0.9 })
memory.add('Asked about billing on 2026-05-01',   { tags: ['billing'] })
memory.add('Subscription: Pro, renews 2026-06-01', { tags: ['billing'], importance: 1.0 })

// Inject only what's relevant, within a token budget
const context = memory.toContext({
  prompt:    'user asking about invoice',
  maxTokens: 400,
  format:    'markdown',
})
```

### Agent workspace with typed edges

```ts
const workspace = new MemoryGraph()

const task = workspace.add('Refactor auth module',          { importance: 1.0 })
const obs  = workspace.add('JWT secret hardcoded line 42')
const dec  = workspace.add('Move secret to env variable')

workspace.relate(task.id, obs.id, 'depends_on')
workspace.relate(obs.id,  dec.id, 'causes')

// Serialize between agent turns
const snapshot = workspace.serialize()
const restored = MemoryGraph.deserialize(snapshot)
```

### Custom tokenizer

```ts
import { encode } from 'gpt-tokenizer'

graph.setTokenizer((text) => encode(text).length)
// toContext() now uses exact token counts
```

## API

```ts
// Nodes
graph.add(content, meta?)       → MemoryNode
graph.update(id, patch)         → MemoryNode
graph.remove(id)                → void
graph.nodes()                   → MemoryNode[]

// Edges
graph.relate(from, to, type, weight?)  → MemoryEdge
graph.unrelate(from, to, type?)        → void
graph.neighbors(id, depth?)            → MemoryNode[]

// Query
graph.query(prompt, opts?)      → MemoryNode[]
graph.toContext(opts?)          → string   // packed under maxTokens
graph.estimateTokens(text?)     → number

// Persistence
graph.serialize()               → string   // JSON
MemoryGraph.deserialize(json)   → MemoryGraph

// Pruning
graph.prune(opts)               → { removed: number }
// opts: { maxNodes?, maxAge?, minImportance?, strategy: 'lru'|'fifo'|'importance' }
```

## Edge types

Built-in: `relates_to` · `contradicts` · `depends_on` · `follows` · `part_of` · `causes`

Any string is valid for custom edge types.

## License

MIT © [Synerity Labs](https://github.com/synerityui)
