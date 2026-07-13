import { detectMermaid, validateMermaidBlocks } from "@core/mermaid";

describe("mermaid utilities", () => {
  it("detects mermaid fenced code blocks", () => {
    expect(detectMermaid("```mermaid\ngraph TD\nA-->B\n```")).toBe(true);
    expect(detectMermaid("```ts\nconsole.log('hi')\n```")).toBe(false);
  });

  it("rejects unsafe directives", () => {
    const result = validateMermaidBlocks(
      "```mermaid\ngraph TD\nA-->B\nclick A javascript:alert(1)\n```",
    );
    expect(result.errors[0]).toContain("unsafe");
  });
});
