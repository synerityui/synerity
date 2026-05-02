/** Key name constants aligned with KeyboardEvent.key */
export const Key = {
  Enter: "Enter",
  Space: " ",
  Escape: "Escape",
  Tab: "Tab",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Home: "Home",
  End: "End",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Backspace: "Backspace",
  Delete: "Delete",
} as const;

export type KeyName = (typeof Key)[keyof typeof Key];

/** Returns true if the event key matches any of the provided keys. */
export function isKey(event: KeyboardEvent | React.KeyboardEvent, ...keys: KeyName[]): boolean {
  return keys.includes(event.key as KeyName);
}

/** Returns true if the event is an activation key (Enter or Space). */
export function isActivationKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, Key.Enter, Key.Space);
}

/** Returns true if the event is a vertical navigation key. */
export function isVerticalNavigationKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, Key.ArrowUp, Key.ArrowDown, Key.Home, Key.End);
}

/** Returns true if the event is a horizontal navigation key. */
export function isHorizontalNavigationKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, Key.ArrowLeft, Key.ArrowRight, Key.Home, Key.End);
}

import type React from "react";
