import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it } from "vitest";
import BasePanel from "../components/BasePanel";
import { theme } from "../theme";

describe("BasePanel", () => {
  it("renders with message", () => {
    render(
      <ThemeProvider theme={theme}>
        <BasePanel msg="Test Message" />
      </ThemeProvider>,
    );
    expect(screen.getByText("Test Message")).toBeDefined();
  });
});
