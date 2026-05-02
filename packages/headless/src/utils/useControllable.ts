import { useCallback, useRef, useState } from "react";

type UseControllableProps<T> = {
  value?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: ((value: T) => void) | undefined;
};

/**
 * Manages controlled vs uncontrolled state.
 * When `value` is provided, the component is controlled — the caller owns state.
 * When only `defaultValue` is provided, the component is uncontrolled — state lives here.
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableProps<T>): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);

  // Track the latest onChange in a ref so the callback is stable
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [isControlled ? value : uncontrolledValue, setValue];
}
