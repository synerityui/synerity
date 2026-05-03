import { createContext, useContext } from "react";
import clsx from "clsx";
import { useTabs } from "@synerity/headless";

import styles from "./Tabs.module.css";

export type TabsVariant = "line" | "pills";

type TabsContextValue = ReturnType<typeof useTabs> & { variant: TabsVariant };
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used inside <Tabs>");
  return ctx;
}

export type TabsProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: TabsVariant;
  children: React.ReactNode;
  className?: string;
};

export function Tabs({
  value,
  defaultValue,
  onChange,
  orientation = "horizontal",
  variant = "line",
  children,
  className,
}: TabsProps) {
  const tabs = useTabs({ value, defaultValue, onChange, orientation });

  return (
    <TabsContext.Provider value={{ ...tabs, variant }}>
      <div className={clsx(styles.root, styles[variant], className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabListProps = { children: React.ReactNode; className?: string };

export function TabList({ children, className }: TabListProps) {
  const { tablistProps } = useTabsContext();
  return (
    <div className={clsx(styles.tablist, className)} {...tablistProps}>
      {children}
    </div>
  );
}

export type TabProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Tab({ value, disabled, children, className }: TabProps) {
  const { getTabProps, selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;
  const props = getTabProps(value, disabled);
  return (
    <button
      className={clsx(styles.tab, isSelected && styles.tabSelected, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export type TabPanelProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { getTabPanelProps } = useTabsContext();
  const props = getTabPanelProps(value);
  if (props.hidden) return null;
  return (
    <div className={clsx(styles.panel, className)} {...props}>
      {children}
    </div>
  );
}
