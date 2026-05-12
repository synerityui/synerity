import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge } from "@synerity/ui";
import { DemoSection } from "./shared";

const users = [
  { name: "Alice Nguyen", role: "Admin", status: "active" },
  { name: "Bob Smith", role: "Editor", status: "inactive" },
  { name: "Carol Jones", role: "Viewer", status: "active" },
];

type UserStatus = "active" | "inactive";

const statusVariant: Record<UserStatus, "success" | "danger"> = {
  active: "success",
  inactive: "danger",
};


export function TableDemo() {
  return (
    <>
      <DemoSection
        title="Basic"
        col
        code={`<TableContainer>\n  <Table>\n    <Thead><Tr><Th>Name</Th><Th>Role</Th><Th>Status</Th></Tr></Thead>\n    <Tbody>\n      {users.map(u => (\n        <Tr key={u.name}><Td>{u.name}</Td><Td>{u.role}</Td><Td>{u.status}</Td></Tr>\n      ))}\n    </Tbody>\n  </Table>\n</TableContainer>`}
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u) => (
                <Tr key={u.name}>
                  <Td>{u.name}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <Badge variant={statusVariant[u.status as UserStatus]}>
                      {u.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection
        title="Striped & hoverable"
        col
        code={`<TableContainer>\n  <Table striped hoverable>…</Table>\n</TableContainer>`}
      >
        <TableContainer>
          <Table striped hoverable>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u) => (
                <Tr key={u.name}>
                  <Td>{u.name}</Td>
                  <Td>{u.role}</Td>
                  <Td>{u.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Table size="sm">…</Table>\n<Table size="md">…</Table>\n<Table size="lg">…</Table>`}
      >
        {(["sm", "md", "lg"] as const).map((size) => (
          <TableContainer key={size}>
            <Table size={size}>
              <Thead>
                <Tr>
                  <Th>Name ({size})</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.slice(0, 2).map((u) => (
                  <Tr key={u.name}>
                    <Td>{u.name}</Td>
                    <Td>{u.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ))}
      </DemoSection>
    </>
  );
}
