import { forwardRef, useState } from "react";
import clsx from "clsx";

import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * User avatar with image + initials fallback.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, name, size = "md", className, ...rest }, ref) => {
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = src && !imgFailed;
    const initials = name ? getInitials(name) : "?";

    return (
      <span
        ref={ref}
        className={clsx(styles.root, styles[size], className)}
        aria-label={alt ?? name}
        role="img"
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? ""}
            className={styles.image}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span aria-hidden>{initials}</span>
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

export type AvatarGroupProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function AvatarGroup({ children, className, ...rest }: AvatarGroupProps) {
  return (
    <div className={clsx(styles.group, className)} {...rest}>
      {children}
    </div>
  );
}
