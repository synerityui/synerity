import { useState } from "react";
import { Pagination } from "@synerity/ui";
import { DemoSection } from "./shared";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [smPage, setSmPage] = useState(1);
  const [lgPage, setLgPage] = useState(1);

  return (
    <>
      <DemoSection
        title="Basic"
        col
        code={`const [page, setPage] = useState(1);\n\n<Pagination total={100} page={page} onChange={setPage} />\n<p>Current page: {page}</p>`}
      >
        <Pagination total={100} page={page} onChange={setPage} />
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--synerity-color-text-subtle)" }}>
          Current page: <strong>{page}</strong>
        </p>
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Pagination size="sm" total={100} page={page} onChange={setPage} />\n<Pagination size="md" total={100} page={page} onChange={setPage} />\n<Pagination size="lg" total={100} page={page} onChange={setPage} />`}
      >
        <Pagination size="sm" total={100} page={smPage} onChange={setSmPage} />
        <Pagination size="md" total={100} page={page} onChange={setPage} />
        <Pagination size="lg" total={100} page={lgPage} onChange={setLgPage} />
      </DemoSection>
    </>
  );
}
