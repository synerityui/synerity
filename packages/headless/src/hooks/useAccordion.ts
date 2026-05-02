import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";

type UseAccordionProps =
  | { type: "single"; value?: string | undefined; defaultValue?: string | undefined; onChange?: ((value: string | undefined) => void) | undefined }
  | { type: "multiple"; value?: string[] | undefined; defaultValue?: string[] | undefined; onChange?: ((value: string[]) => void) | undefined };

type UseAccordionReturn = {
  getItemProps: (value: string) => {
    isExpanded: boolean;
    triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    panelProps: React.HTMLAttributes<HTMLElement>;
  };
};

/**
 * Accordion with single or multiple open items.
 * Trigger gets role="button" + aria-expanded; panel gets aria-labelledby.
 */
export function useAccordion(props: UseAccordionProps): UseAccordionReturn {
  const baseId = useId("accordion");
  const isSingle = props.type === "single";

  const [singleValue, setSingleValue] = useControllable<string | undefined>({
    value: isSingle ? props.value : undefined,
    defaultValue: isSingle ? props.defaultValue : undefined,
    onChange: isSingle ? props.onChange : undefined,
  });

  const [multiValue, setMultiValue] = useControllable<string[]>({
    value: !isSingle ? props.value : undefined,
    defaultValue: !isSingle ? props.defaultValue : undefined,
    onChange: !isSingle ? props.onChange : undefined,
  });

  const isExpanded = useCallback(
    (value: string) => {
      if (isSingle) return singleValue === value;
      return (multiValue ?? []).includes(value);
    },
    [isSingle, singleValue, multiValue],
  );

  const toggle = useCallback(
    (value: string) => {
      if (isSingle) {
        setSingleValue(singleValue === value ? undefined : value);
      } else {
        const current = multiValue ?? [];
        setMultiValue(
          current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
        );
      }
    },
    [isSingle, singleValue, multiValue, setSingleValue, setMultiValue],
  );

  const getItemProps = useCallback(
    (value: string) => {
      const triggerId = `${baseId}-trigger-${value}`;
      const panelId = `${baseId}-panel-${value}`;
      const expanded = isExpanded(value);

      return {
        isExpanded: expanded,
        triggerProps: {
          id: triggerId,
          type: "button" as const,
          "aria-expanded": expanded,
          "aria-controls": panelId,
          onClick: () => toggle(value),
        },
        panelProps: {
          id: panelId,
          role: "region" as const,
          "aria-labelledby": triggerId,
          hidden: !expanded,
        },
      };
    },
    [baseId, isExpanded, toggle],
  );

  return { getItemProps };
}

import type React from "react";
