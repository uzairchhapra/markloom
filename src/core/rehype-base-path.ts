import { sitePath } from "./urls";

interface HastNode {
  type?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function rewriteSrcSet(value: string, base: string): string {
  return value
    .split(",")
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [sitePath(url, base), ...descriptor].join(" ");
    })
    .join(", ");
}

export function rehypeBasePath(options: { base: string }) {
  return function transform(tree: HastNode) {
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.properties) {
        for (const property of ["href", "src", "poster"]) {
          const value = node.properties[property];
          if (typeof value === "string") {
            node.properties[property] = sitePath(value, options.base);
          }
        }

        const srcSet = node.properties.srcSet;
        if (typeof srcSet === "string") {
          node.properties.srcSet = rewriteSrcSet(srcSet, options.base);
        }
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
