const MERMAID_BLOCK_PATTERN = /```mermaid\s+[\s\S]*?```/g;
const HAS_MERMAID_BLOCK_PATTERN = /```mermaid\s+[\s\S]*?```/;
const UNSAFE_MERMAID_PATTERN =
  /\b(click|href|javascript:|<script|<\/script)\b/i;

export interface MermaidValidationResult {
  hasMermaid: boolean;
  errors: string[];
}

export function detectMermaid(markdown: string): boolean {
  return HAS_MERMAID_BLOCK_PATTERN.test(markdown);
}

export function validateMermaidBlocks(
  markdown: string,
): MermaidValidationResult {
  const blocks = markdown.match(MERMAID_BLOCK_PATTERN) ?? [];
  const errors = blocks.flatMap((block, index) => {
    if (UNSAFE_MERMAID_PATTERN.test(block)) {
      return [
        `Mermaid block ${index + 1} contains unsafe directives or links.`,
      ];
    }

    return [];
  });

  return {
    hasMermaid: blocks.length > 0,
    errors,
  };
}
