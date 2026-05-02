import { describe, it, expect, vi } from "vitest";

import { usePagination } from "../hooks/usePagination";

// usePagination is pure logic — no hooks, so we call it directly
function paginate(props: Parameters<typeof usePagination>[0]) {
  return usePagination(props);
}

describe("usePagination", () => {
  it("computes totalPages correctly", () => {
    expect(paginate({ total: 100, page: 1, pageSize: 10 }).totalPages).toBe(10);
    expect(paginate({ total: 101, page: 1, pageSize: 10 }).totalPages).toBe(11);
    expect(paginate({ total: 0, page: 1 }).totalPages).toBe(1);
  });

  it("clamps currentPage to valid range", () => {
    expect(paginate({ total: 100, page: 0 }).currentPage).toBe(1);
    expect(paginate({ total: 100, page: 999 }).currentPage).toBe(10);
  });

  it("previous is disabled on first page", () => {
    const { items } = paginate({ total: 100, page: 1 });
    const prev = items.find((i) => i.type === "previous");
    expect(prev?.type === "previous" && prev.disabled).toBe(true);
  });

  it("next is disabled on last page", () => {
    const { items } = paginate({ total: 100, page: 10 });
    const next = items.find((i) => i.type === "next");
    expect(next?.type === "next" && next.disabled).toBe(true);
  });

  it("active page item is marked isActive", () => {
    const { items } = paginate({ total: 100, page: 5 });
    const active = items.filter((i) => i.type === "page" && i.isActive);
    expect(active).toHaveLength(1);
    expect(active[0]?.type === "page" && active[0].page).toBe(5);
  });

  it("includes ellipsis for large page counts", () => {
    const { items } = paginate({ total: 200, page: 10, pageSize: 10 });
    const hasEllipsis = items.some((i) => i.type === "ellipsis");
    expect(hasEllipsis).toBe(true);
  });

  it("goTo calls onChange with clamped value", () => {
    const onChange = vi.fn();
    const { goTo } = paginate({ total: 100, page: 5, onChange });
    goTo(3);
    expect(onChange).toHaveBeenCalledWith(3);
    goTo(999);
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("previous() calls onChange with page-1", () => {
    const onChange = vi.fn();
    const { previous } = paginate({ total: 100, page: 5, onChange });
    previous();
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("next() calls onChange with page+1", () => {
    const onChange = vi.fn();
    const { next } = paginate({ total: 100, page: 5, onChange });
    next();
    expect(onChange).toHaveBeenCalledWith(6);
  });
});
