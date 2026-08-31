// Build: emit ESM + .d.ts from src/ via tsc, then copy the stylesheets alongside.
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

rmSync(dist, { recursive: true, force: true });
execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { cwd: root, stdio: "inherit" });

mkdirSync(dist, { recursive: true });
for (const file of readdirSync(join(root, "src"))) {
  if (file.endsWith(".css")) cpSync(join(root, "src", file), join(dist, file));
}
console.log("build ok ->", dist);
