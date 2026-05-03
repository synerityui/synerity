import clsx from "clsx";
import { useAccordion } from "@synerity/headless";

import * as styles from "./Accordion.module.css";

type AccordionType = "single" | "multiple";

export type AccordionProps = {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: ((v: string | undefined) => void) | ((v: string[]) => void);
  items: Array<{
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  className?: string;
};

/**
 * Collapsible accordion with single or multiple open items.
 */
export function Accordion({ type = "single", value, defaultValue, onChange, items, className }: AccordionProps) {
  const accordionProps =
    type === "single"
      ? { type: "single" as const, value: value as string | undefined, defaultValue: defaultValue as string | undefined, onChange: onChange as (v: string | undefined) => void }
      : { type: "multiple" as const, value: value as string[] | undefined, defaultValue: defaultValue as string[] | undefined, onChange: onChange as (v: string[]) => void };

  const { getItemProps } = useAccordion(accordionProps);

  return (
    <div className={clsx(styles.root, className)}>
      {items.map((item) => {
        const { isExpanded, triggerProps, panelProps } = getItemProps(item.value);
        return (
          <div key={item.value} className={clsx(styles.item, isExpanded && styles.expanded)}>
            <button className={styles.trigger} {...triggerProps} disabled={item.disabled}>
              <span>{item.title}</span>
              <ChevronIcon className={styles.chevron} />
            </button>
            {isExpanded && (
              <div className={styles.panel} {...panelProps}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
