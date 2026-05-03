/**
 * Crude but zero-dependency token estimator: ~4 characters per token.
 * Replace via `MemoryGraph.setTokenizer()` to use a real tokenizer such as
 * `gpt-tokenizer` or `tiktoken`.
 */
export function defaultTokenizer(text: string): number {
  return Math.ceil(text.length / 4);
}
