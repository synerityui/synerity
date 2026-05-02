import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders header, body, and footer", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Card ref={ref}>content</Card>);
    expect(ref.current).not.toBeNull();
  });
});
