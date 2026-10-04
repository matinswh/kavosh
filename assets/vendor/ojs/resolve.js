// This module is imported by the generated Quarto OJS runtime after rendering.
// Paths are relative to THIS file, so nested pages and /kavosh/ work identically.
// Keep versions equal to Quarto's Library defaults and manifest.json.
const packages = [
  ["d3", "7.8.5", "dist/d3.min.js", "d3.min.js"],
  ["@observablehq/plot", "0.6.11", "dist/plot.umd.min.js", "plot.umd.min.js"],
  ["@observablehq/inputs", "0.10.6", "dist/inputs.min.js", "inputs.min.js"],
  ["htl", "0.3.1", "dist/htl.min.js", "htl.min.js"],
  ["marked", "0.3.12", "marked.min.js", "marked.min.js"]
];
const aliases = new Map();
for (const [name, version, entry, file] of packages) {
  const url = new URL(file, import.meta.url).href;
  for (const key of [name, `${name}@${version}`, `${name}@${version}/${entry}`]) {
    aliases.set(key, url);
  }
}

export function resolveOffline(name, base) {
  const local = aliases.get(name);
  if (local) return local;
  // Explicit local require("./...") modules remain available to note authors.
  if (/^(\.{0,2}\/|https?:)/.test(name)) {
    const url = new URL(name, base || document.baseURI);
    if (url.origin === location.origin) return url.href;
  }
  throw new Error(`Offline OJS: ${name} is not bundled. Add a local copy and its dependencies to assets/vendor/ojs; see guide/workflow.html#working-offline.`);
}
