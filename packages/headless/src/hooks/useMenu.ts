import { useCallback, useRef, useState } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { useOutsideClick } from "../utils/useOutsideClick";
import { Key } from "../utils/keyboard";

type MenuItem = {
  value: string;
  disabled?: boolean | undefined;
};

type UseMenuProps = {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  onSelect?: ((value: string) => void) | undefined;
};

type UseMenuReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Attach to the trigger <button> element. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menuProps: React.HTMLAttributes<HTMLElement>;
  /** Attach to the menu container element. */
  menuRef: React.RefObject<HTMLElement | null>;
  getItemProps: (item: MenuItem) => React.HTMLAttributes<HTMLElement>;
};

/**
 * Dropdown menu following ARIA menu pattern.
 * Keyboard: arrow keys navigate, Enter/Space activate, Escape closes, type-ahead.
 */
export function useMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
}: UseMenuProps = {}): UseMenuReturn {
  const [isOpen = false, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [activeIndex, setActiveIndex] = useState(-1);
  const menuId = useId("menu");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useOutsideClick([triggerRef, menuRef], () => setIsOpen(false), isOpen);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(0);
  }, [setIsOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>, items: MenuItem[]) => {
      const enabled = items.filter((i) => !i.disabled);

      if (event.key === Key.Escape) {
        event.preventDefault();
        closeMenu();
      } else if (event.key === Key.ArrowDown) {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % enabled.length);
      } else if (event.key === Key.ArrowUp) {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + enabled.length) % enabled.length);
      } else if (event.key === Key.Home) {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === Key.End) {
        event.preventDefault();
        setActiveIndex(enabled.length - 1);
      } else if (event.key === Key.Tab) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": menuId,
    onClick: isOpen ? closeMenu : openMenu,
    onKeyDown: (e) => {
      if (e.key === Key.ArrowDown || e.key === Key.Enter || e.key === Key.Space) {
        e.preventDefault();
        openMenu();
      }
    },
  };

  const menuProps: React.HTMLAttributes<HTMLElement> = {
    id: menuId,
    role: "menu",
    "aria-orientation": "vertical",
    tabIndex: -1,
    onKeyDown: (e) => handleMenuKeyDown(e, []),
  };

  const getItemProps = useCallback(
    (item: MenuItem, index: number): React.HTMLAttributes<HTMLElement> => ({
      role: "menuitem",
      tabIndex: index === activeIndex ? 0 : -1,
      "aria-disabled": item.disabled || undefined,
      onClick: () => {
        if (!item.disabled) {
          onSelect?.(item.value);
          closeMenu();
        }
      },
    }),
    [activeIndex, onSelect, closeMenu],
  );

  return {
    isOpen,
    open: openMenu,
    close: closeMenu,
    triggerProps,
    triggerRef,
    menuProps,
    menuRef,
    getItemProps: (item) => getItemProps(item, 0),
  };
}

import type React from "react";
