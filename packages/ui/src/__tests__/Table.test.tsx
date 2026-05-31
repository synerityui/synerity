import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "../components/Table";

function SimpleTable() {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Alice</Td>
            <Td>Engineer</Td>
          </Tr>
          <Tr>
            <Td>Bob</Td>
            <Td>Designer</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

describe("Table", () => {
  it("renders a table element", () => {
    render(<SimpleTable />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<SimpleTable />);
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Role" })).toBeInTheDocument();
  });

  it("renders data cells", () => {
    render(<SimpleTable />);
    expect(screen.getByRole("cell", { name: "Alice" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Engineer" })).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    render(<SimpleTable />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("applies custom className to Table", () => {
    render(
      <Table className="data-table">
        <Tbody><Tr><Td>x</Td></Tr></Tbody>
      </Table>,
    );
    expect(screen.getByRole("table")).toHaveClass("data-table");
  });
});
