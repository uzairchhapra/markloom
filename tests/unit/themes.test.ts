import { resolveTheme } from "@themes/index";

describe("theme resolution", () => {
  it("resolves known themes", () => {
    expect(resolveTheme("minimal").label).toBe("Minimal");
  });

  it("rejects unknown themes with an actionable message", () => {
    expect(() => resolveTheme("unknown")).toThrow("Supported themes");
  });
});
