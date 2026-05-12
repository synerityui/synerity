import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
};

/**
 * Navigation breadcrumb trail. The last item is treated as the current page
 * and rendered without a link.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = "/", className }, ref) => {
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={clsx(styles.root, className)}>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className={styles.item}>
                {isLast || !item.href ? (
                  <span
                    className={clsx(styles.text, isLast && styles.current)}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden>
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
