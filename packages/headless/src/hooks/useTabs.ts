import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { Key } from "../utils/keyboard";

type UseTabsProps = {
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
};

type TabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { "data-value": string };

type UseTabsReturn = {
  tablistProps: React.HTMLAttributes<HTMLElement>;
  getTabProps: (value: string, disabled?: boolean) => TabProps;
  getTabPanelProps: (value: string) => React.HTMLAttributes<HTMLElement>;
  selectedValue: string | undefined;
};

/**
 * Provides ARIA tablist/tab/tabpanel props with keyboard navigation.
 * Arrow keys move between tabs; selection follows focus.
 */
export function useTabs({
  value,
  defaultValue,
  onChange,
  orientation = "horizontal",
}: UseTabsProps = {}): UseTabsReturn {
  const [selectedValue, setSelectedValue] = useControllable({ value, defaultValue, onChange });
  const baseId = useId("tabs");

  const tabId = (v: string) => `${baseId}-tab-${v}`;
  const panelId = (v: string) => `${baseId}-panel-${v}`;

  const tablistProps: React.HTMLAttributes<HTMLElement> = {
    role: "tablist",
    "aria-orientation": orientation,
  };

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tabValues: string[]) => {
      const currentValue = event.currentTarget.dataset["value"] ?? "";
      const currentIndex = tabValues.indexOf(currentValue);
      const isHorizontal = orientation === "horizontal";
      const prevKey = isHorizontal ? Key.ArrowLeft : Key.ArrowUp;
      const nextKey = isHorizontal ? Key.ArrowRight : Key.ArrowDown;

      let nextIndex: number | null = null;

      if (event.key === nextKey) nextIndex = (currentIndex + 1) % tabValues.length;
      else if (event.key === prevKey) nextIndex = (currentIndex - 1 + tabValues.length) % tabValues.length;
      else if (event.key === Key.Home) nextIndex = 0;
      else if (event.key === Key.End) nextIndex = tabValues.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        const nextValue = tabValues[nextIndex];
        if (nextValue !== undefined) {
          setSelectedValue(nextValue);
          const tablist = event.currentTarget.closest('[role="tablist"]');
          const nextTab = tablist?.querySelector<HTMLButtonElement>(`[data-value="${nextValue}"]`);
          nextTab?.focus();
        }
      }
    },
    [orientation, setSelectedValue],
  );

  const getTabProps = useCallback(
    (tabValue: string, disabled = false): TabProps => ({
      id: tabId(tabValue),
      role: "tab",
      type: "button",
      disabled,
      "aria-selected": selectedValue === tabValue,
      "aria-controls": panelId(tabValue),
      tabIndex: selectedValue === tabValue ? 0 : -1,
      "data-value": tabValue,
      onClick: () => !disabled && setSelectedValue(tabValue),
      onKeyDown: (e) => handleTabKeyDown(e, []),
    }),
    [selectedValue, setSelectedValue, handleTabKeyDown, baseId],
  );

  const getTabPanelProps = useCallback(
    (panelValue: string): React.HTMLAttributes<HTMLElement> => ({
      id: panelId(panelValue),
      role: "tabpanel",
      "aria-labelledby": tabId(panelValue),
      tabIndex: 0,
      hidden: selectedValue !== panelValue,
    }),
    [selectedValue, baseId],
  );

  return { tablistProps, getTabProps, getTabPanelProps, selectedValue };
}

import type React from "react";
