/** Returns true if the value is an HTMLElement. */
export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

/** Returns the ownerDocument of a node, falling back to document. */
export function getOwnerDocument(node: Node | null | undefined): Document {
  return node?.ownerDocument ?? document;
}

/** Returns the ownerWindow of a node, falling back to window. */
export function getOwnerWindow(node: Node | null | undefined): Window & typeof globalThis {
  return getOwnerDocument(node).defaultView ?? window;
}

/** Returns all focusable elements within a container. */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
    "[contenteditable]",
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.closest("[hidden]") && !el.closest("[inert]"),
  );
}

/** Returns the first and last focusable elements in a container. */
export function getFirstAndLastFocusable(
  container: HTMLElement,
): [HTMLElement | undefined, HTMLElement | undefined] {
  const els = getFocusableElements(container);
  return [els[0], els[els.length - 1]];
}
