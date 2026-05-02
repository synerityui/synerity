import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";

type UseToggleGroupProps =
  | {
      type: "single";
      value?: string | undefined;
      defaultValue?: string | undefined;
      onChange?: ((value: string | undefined) => void) | undefined;
      disabled?: boolean | undefined;
    }
  | {
      type: "multiple";
      value?: string[] | undefined;
      defaultValue?: string[] | undefined;
      onChange?: ((value: string[]) => void) | undefined;
      disabled?: boolean | undefined;
    };

type UseToggleGroupReturn = {
  groupProps: React.HTMLAttributes<HTMLElement>;
  getItemProps: (value: string, disabled?: boolean) => React.ButtonHTMLAttributes<HTMLButtonElement>;
  isSelected: (value: string) => boolean;
};

/**
 * A group of toggle buttons with single or multiple selection.
 */
export function useToggleGroup(props: UseToggleGroupProps): UseToggleGroupReturn {
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

  const isSelected = useCallback(
    (value: string) => {
      if (isSingle) return singleValue === value;
      return (multiValue ?? []).includes(value);
    },
    [isSingle, singleValue, multiValue],
  );

  const toggle = useCallback(
    (value: string) => {
      if (props.disabled) return;
      if (isSingle) {
        setSingleValue(singleValue === value ? undefined : value);
      } else {
        const current = multiValue ?? [];
        setMultiValue(
          current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
        );
      }
    },
    [isSingle, singleValue, multiValue, setSingleValue, setMultiValue, props.disabled],
  );

  const groupProps: React.HTMLAttributes<HTMLElement> = {
    role: "group",
  };

  const getItemProps = useCallback(
    (value: string, itemDisabled = false): React.ButtonHTMLAttributes<HTMLButtonElement> => ({
      type: "button",
      role: "button",
      "aria-pressed": isSelected(value),
      disabled: props.disabled || itemDisabled,
      onClick: () => toggle(value),
    }),
    [isSelected, toggle, props.disabled],
  );

  return { groupProps, getItemProps, isSelected };
}

import type React from "react";
