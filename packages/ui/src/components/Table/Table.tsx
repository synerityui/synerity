import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Table.module.css";

/* ─────────────────────── TableContainer ─────────────────────── */

export type TableContainerProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Wraps a Table in a horizontally scrollable container.
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  ),
);
TableContainer.displayName = "TableContainer";

/* ─────────────────────── Table ─────────────────────── */

export type TableProps = {
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: "sm" | "md" | "lg";
  stickyHeader?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

/**
 * Semantic HTML table with optional striped rows, hover highlight, borders, and sticky header.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      striped = false,
      hoverable = false,
      bordered = false,
      size = "md",
      stickyHeader = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <table
      ref={ref}
      className={clsx(
        styles.table,
        styles[size],
        striped && styles.striped,
        hoverable && styles.hoverable,
        bordered && styles.bordered,
        stickyHeader && styles.stickyHeader,
        className,
      )}
      {...rest}
    >
      {children}
    </table>
  ),
);
Table.displayName = "Table";

/* ─────────────────────── Thead ─────────────────────── */

export type TheadProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLTableSectionElement>;

/** Table head section. */
export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ className, children, ...rest }, ref) => (
    <thead ref={ref} className={clsx(styles.thead, className)} {...rest}>
      {children}
    </thead>
  ),
);
Thead.displayName = "Thead";

/* ─────────────────────── Tbody ─────────────────────── */

export type TbodyProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLTableSectionElement>;

/** Table body section. */
export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ className, children, ...rest }, ref) => (
    <tbody ref={ref} className={clsx(styles.tbody, className)} {...rest}>
      {children}
    </tbody>
  ),
);
Tbody.displayName = "Tbody";

/* ─────────────────────── Tr ─────────────────────── */

export type TrProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLTableRowElement>;

/** Table row. */
export const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ className, children, ...rest }, ref) => (
    <tr ref={ref} className={clsx(styles.tr, className)} {...rest}>
      {children}
    </tr>
  ),
);
Tr.displayName = "Tr";

/* ─────────────────────── Th ─────────────────────── */

export type ThProps = {
  align?: "left" | "center" | "right";
  className?: string;
  children?: React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

/** Table header cell. */
export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ align = "left", className, children, ...rest }, ref) => (
    <th
      ref={ref}
      className={clsx(styles.th, styles[`align-${align}`], className)}
      {...rest}
    >
      {children}
    </th>
  ),
);
Th.displayName = "Th";

/* ─────────────────────── Td ─────────────────────── */

export type TdProps = {
  align?: "left" | "center" | "right";
  className?: string;
  children?: React.ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

/** Table data cell. */
export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ align = "left", className, children, ...rest }, ref) => (
    <td
      ref={ref}
      className={clsx(styles.td, styles[`align-${align}`], className)}
      {...rest}
    >
      {children}
    </td>
  ),
);
Td.displayName = "Td";
