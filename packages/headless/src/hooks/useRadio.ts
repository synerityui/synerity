import type React from "react";

type UseRadioProps = {
  value: string;
  disabled?: boolean | undefined;
  name?: string | undefined;
};

type UseRadioReturn = {
  radioProps: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Props for a single radio button within a RadioGroup.
 * Use useRadioGroup to manage the group state.
 */
export function useRadio({ value, disabled = false, name }: UseRadioProps): UseRadioReturn {
  const radioProps: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "radio",
    value,
    disabled,
    name,
  };

  return { radioProps };
}
