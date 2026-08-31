// Build: emit ESM + .d.ts from src/ via tsc, then emit the stylesheets.
//
// The CSS is authored as a three-file chain (tokens -> base -> components) for
// readability, but consumers get a single flattened `components.css`. The
// design-sync converter copies only the entry stylesheet, so a relative
// `@import` between them would dangle and every token would resolve to
// nothing — components would ship unstyled. Flattening here keeps the source
// split without depending on the import chain surviving packaging.
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "src");
const dist = join(root, "dist");

rmSync(dist, { recursive: true, force: true });
execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { cwd: root, stdio: "inherit" });
mkdirSync(dist, { recursive: true });

// Remote @import rules (webfonts) must precede every other rule in the output,
// so hoist them out of the parts and re-emit them at the top of the file.
const remoteImports = [];
const parts = ["tokens.css", "base.css", "components.css"].map((name) => {
  const body = readFileSync(join(src, name), "utf8")
    .replace(/^@import\s+url\([^)]*\);?[ \t]*$/gm, (rule) => {
      remoteImports.push(rule.trim());
      return "";
    })
    // Drop the local chain imports — the files are being concatenated instead.
    .replace(/^@import\s+"\.\/[^"]+";?[ \t]*$/gm, "")
    .trim();
  return `/* ── ${name} ${"─".repeat(Math.max(0, 56 - name.length))} */\n${body}`;
});

const flattened = [...new Set(remoteImports)].join("\n") + "\n\n" + parts.join("\n\n") + "\n";
writeFileSync(join(dist, "components.css"), flattened);

// tokens.css also ships standalone so the converter can surface it as tokens/.
cpSync(join(src, "tokens.css"), join(dist, "tokens.css"));

console.log(`build ok -> ${dist} (components.css ${(flattened.length / 1024).toFixed(1)} KB)`);
