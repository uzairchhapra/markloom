import { spawn } from "node:child_process";

interface RunPnpmOptions {
  env?: typeof process.env;
}

export function runPnpm(
  args: string[],
  options: RunPnpmOptions = {},
): Promise<void> {
  const pnpmPath = process.env.npm_execpath;
  const command = pnpmPath ? process.execPath : "corepack";
  const commandArgs = pnpmPath ? [pnpmPath, ...args] : ["pnpm", ...args];

  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      env: options.env ?? process.env,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const result = signal ? `signal ${signal}` : `exit code ${code}`;
      reject(new Error(`pnpm ${args.join(" ")} failed with ${result}`));
    });
  });
}
