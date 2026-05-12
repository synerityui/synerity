import { forwardRef } from "react";
import clsx from "clsx";
import { usePagination } from "@synerity/headless";

import styles from "./Pagination.module.css";

export type PaginationSize = "sm" | "md" | "lg";

export type PaginationProps = {
  /** Total number of items (not pages). */
  total: number;
  page: number;
  onChange: (page: number) => void;
  pageSize?: number;
  siblings?: number;
  boundaries?: number;
  size?: PaginationSize;
  className?: string;
};

/**
 * Page navigation with ellipsis for large page counts.
 * Renders a `<nav>` with `aria-label="Pagination"` and `aria-current="page"` on the active page.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      page,
      onChange,
      pageSize = 10,
      siblings = 1,
      boundaries = 1,
      size = "md",
      className,
    },
    ref,
  ) => {
    const { items, goTo, previous, next } = usePagination({
      total,
      page,
      pageSize,
      siblings,
      boundaries,
      onChange,
    });

    return (
      <nav ref={ref} aria-label="Pagination" className={clsx(styles.root, className)}>
        <ul className={clsx(styles.list, styles[size])}>
          {items.map((item) => {
            if (item.type === "previous") {
              return (
                <li key="prev">
                  <button
                    type="button"
                    className={clsx(styles.item, styles.control, item.disabled && styles.disabled)}
                    onClick={previous}
                    disabled={item.disabled}
                    aria-label="Previous page"
                    data-testid="pagination-prev"
                  >
                    <PrevIcon />
                  </button>
                </li>
              );
            }

            if (item.type === "next") {
              return (
                <li key="next">
                  <button
                    type="button"
                    className={clsx(styles.item, styles.control, item.disabled && styles.disabled)}
                    onClick={next}
                    disabled={item.disabled}
                    aria-label="Next page"
                    data-testid="pagination-next"
                  >
                    <NextIcon />
                  </button>
                </li>
              );
            }

            if (item.type === "ellipsis") {
              return (
                <li key={item.key}>
                  <span className={clsx(styles.item, styles.ellipsis)} aria-hidden>
                    &hellip;
                  </span>
                </li>
              );
            }

            return (
              <li key={item.page}>
                <button
                  type="button"
                  className={clsx(styles.item, styles.page, item.isActive && styles.active)}
                  onClick={() => goTo(item.page)}
                  aria-label={`Page ${item.page}`}
                  aria-current={item.isActive ? "page" : undefined}
                  data-testid={`pagination-page-${item.page}`}
                >
                  {item.page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

function PrevIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
