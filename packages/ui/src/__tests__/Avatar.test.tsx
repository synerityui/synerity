import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Avatar, AvatarGroup } from "../components/Avatar";

describe("Avatar", () => {
  it("renders initials from name", () => {
    render(<Avatar name="Alice Brown" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders ? when no name or src", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("renders single initial for one-word name", () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("has role=img", () => {
    render(<Avatar name="Alice Brown" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("has aria-label from alt prop", () => {
    render(<Avatar name="Alice" alt="Profile photo" />);
    expect(screen.getByLabelText("Profile photo")).toBeInTheDocument();
  });

  it("renders img element when src is provided", () => {
    const { container } = render(<Avatar src="https://example.com/avatar.png" alt="Test" name="Test" />);
    expect(container.querySelector("img")).not.toBeNull();
  });
});

describe("AvatarGroup", () => {
  it("renders children", () => {
    render(
      <AvatarGroup>
        <Avatar name="Alice Brown" />
        <Avatar name="Bob Smith" />
      </AvatarGroup>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
    expect(screen.getByText("BS")).toBeInTheDocument();
  });
});
