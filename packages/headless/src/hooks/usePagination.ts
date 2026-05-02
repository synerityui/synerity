type UsePaginationProps = {
  total: number;
  page: number;
  /** Items per page. Default: 10 */
  pageSize?: number | undefined;
  /** Sibling pages shown on each side of current. Default: 1 */
  siblings?: number | undefined;
  /** Boundary pages shown at start and end. Default: 1 */
  boundaries?: number | undefined;
  onChange?: ((page: number) => void) | undefined;
};

type PageItem =
  | { type: "page"; page: number; isActive: boolean }
  | { type: "ellipsis"; key: string }
  | { type: "previous"; disabled: boolean }
  | { type: "next"; disabled: boolean };

type UsePaginationReturn = {
  items: PageItem[];
  totalPages: number;
  currentPage: number;
  goTo: (page: number) => void;
  previous: () => void;
  next: () => void;
};

/**
 * Computes a pagination item array with ellipsis for rendering.
 * Pure logic — no ARIA or DOM. Combine with any rendering layer.
 */
export function usePagination({
  total,
  page,
  pageSize = 10,
  siblings = 1,
  boundaries = 1,
  onChange,
}: UsePaginationProps): UsePaginationReturn {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== currentPage) onChange?.(clamped);
  };

  function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const leftBoundaryEnd = boundaries;
  const rightBoundaryStart = totalPages - boundaries + 1;
  const leftSiblingStart = Math.max(currentPage - siblings, leftBoundaryEnd + 1);
  const rightSiblingEnd = Math.min(currentPage + siblings, rightBoundaryStart - 1);

  const leftPages = range(1, leftBoundaryEnd);
  const rightPages = range(rightBoundaryStart, totalPages);
  const siblingPages = range(
    Math.max(leftSiblingStart, leftBoundaryEnd + 1),
    Math.min(rightSiblingEnd, rightBoundaryStart - 1),
  );

  const showLeftEllipsis = siblingPages.length > 0 && siblingPages[0]! > leftBoundaryEnd + 1;
  const showRightEllipsis =
    siblingPages.length > 0 && siblingPages[siblingPages.length - 1]! < rightBoundaryStart - 1;

  const pageNumbers = [
    ...leftPages,
    ...(showLeftEllipsis ? [] : range(leftBoundaryEnd + 1, siblingPages[0]! - 1)),
    ...siblingPages,
    ...(showRightEllipsis ? [] : range(siblingPages[siblingPages.length - 1]! + 1, rightBoundaryStart - 1)),
    ...rightPages,
  ].filter((p) => p >= 1 && p <= totalPages);

  const uniquePages = [...new Set(pageNumbers)].sort((a, b) => a - b);

  const items: PageItem[] = [
    { type: "previous", disabled: currentPage === 1 },
  ];

  let prev = 0;
  for (const p of uniquePages) {
    if (p - prev > 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${prev}-${p}` });
    }
    items.push({ type: "page", page: p, isActive: p === currentPage });
    prev = p;
  }

  items.push({ type: "next", disabled: currentPage === totalPages });

  return {
    items,
    totalPages,
    currentPage,
    goTo,
    previous: () => goTo(currentPage - 1),
    next: () => goTo(currentPage + 1),
  };
}
