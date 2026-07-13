import { runPnpm } from "./run-pnpm";

const outDir = process.env.MARKLOOM_OUT_DIR ?? "dist";

await runPnpm(["exec", "astro", "build"]);
await runPnpm(["exec", "pagefind", "--site", outDir]);
