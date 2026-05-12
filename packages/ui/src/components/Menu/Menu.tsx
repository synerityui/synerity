import { forwardRef } from "react";
import React from "react";
import clsx from "clsx";
import { useMenu } from "@synerity/headless";

import styles from "./Menu.module.css";

export type MenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string) => void;
  /** The trigger element that opens the menu. Must accept a ref and onClick. */
  trigger: React.ReactNode;
  children?: React.ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  className?: string;
};

export type MenuItemProps = {
  value: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLLIElement>;

export type MenuDividerProps = { className?: string };

export type MenuGroupProps = {
  label: string;
  children?: React.ReactNode;
  className?: string;
};

const PLACEMENT_CLASSES: Record<NonNullable<MenuProps["placement"]>, string> = {
  "bottom-start": styles.bottom_start ?? "",
  "bottom-end": styles.bottom_end ?? "",
  "top-start": styles.top_start ?? "",
  "top-end": styles.top_end ?? "",
};

/**
 * Dropdown menu following the ARIA menu pattern.
 * Keyboard: arrow keys navigate, Enter/Space activate, Escape closes.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      open,
      defaultOpen,
      onOpenChange,
      onSelect,
      trigger,
      children,
      placement = "bottom-start",
      className,
    },
    ref,
  ) => {
    const { isOpen, triggerProps, triggerRef, menuProps, menuRef } = useMenu({
      open,
      defaultOpen,
      onOpenChange,
      onSelect,
    });

    const clonedTrigger = React.isValidElement(trigger)
      ? React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
          ...triggerProps,
          ref: triggerRef,
        })
      : trigger;

    return (
      <div ref={ref} className={clsx(styles.root, className)}>
        {clonedTrigger}
        {isOpen && (
          <ul
            ref={menuRef as React.RefObject<HTMLUListElement>}
            className={clsx(styles.menu, PLACEMENT_CLASSES[placement])}
            {...menuProps}
          >
            {children}
          </ul>
        )}
      </div>
    );
  },
);

Menu.displayName = "Menu";

/**
 * Individual menu item. Accepts an optional left/right icon and disabled state.
 */
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ value: _value, disabled, leftIcon, rightIcon, children, className, ...rest }, ref) => (
    <li
      ref={ref}
      role="menuitem"
      aria-disabled={disabled || undefined}
      className={clsx(styles.item, disabled && styles.itemDisabled, className)}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {leftIcon && <span className={styles.iconLeft} aria-hidden>{leftIcon}</span>}
      <span className={styles.itemLabel}>{children}</span>
      {rightIcon && <span className={styles.iconRight} aria-hidden>{rightIcon}</span>}
    </li>
  ),
);

MenuItem.displayName = "MenuItem";

/**
 * Visual separator between menu items.
 */
export function MenuDivider({ className }: MenuDividerProps) {
  return <li role="separator" className={clsx(styles.divider, className)} />;
}

MenuDivider.displayName = "MenuDivider";

/**
 * Labelled group of menu items.
 */
export function MenuGroup({ label, children, className }: MenuGroupProps) {
  return (
    <li role="none" className={clsx(styles.group, className)}>
      <span className={styles.groupLabel} role="presentation">{label}</span>
      <ul role="group" className={styles.groupItems}>
        {children}
      </ul>
    </li>
  );
}

MenuGroup.displayName = "MenuGroup";
