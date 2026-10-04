# Offline Observable libraries

These distributions match the default dependency versions in Quarto 1.9.38.
`manifest.json` records exact source URLs and SHA-256 hashes; `licenses/` retains
each upstream license. Runtime files total about 526 KB (uncompressed).

| Library | Version | Dependency |
|---|---|---|
| D3 | 7.8.5 | none (full bundle) |
| Observable Plot | 0.6.11 | D3 |
| Observable Inputs | 0.10.6 | HTL |
| HTL | 0.3.1 | none |
| Marked (OJS `md`) | 0.3.12 | none for plain markdown |

`scripts/offline-site.py`, a Quarto post-render hook, replaces the generated OJS
runtime's default CDN resolver with `resolve.js`. It changes no installed Quarto
files. It also removes Quarto's obsolete remote ES6 polyfill tag and supplies missing
project-offset metadata for category links on protected pages. This is needed
for both normal and protected builds. Relative module URLs work on nested pages,
at a domain root and under `/kavosh/`. Repeated preview renders are supported.

Verify files offline with `python scripts/vendor-ojs.py`. To restore the **same**
files online, use `python scripts/vendor-ojs.py --fetch`; downloaded bytes must
match the committed hashes. Neither rendering nor preview downloads packages.

When upgrading Quarto or adding a library:

1. Inspect the generated `site_libs/quarto-ojs/quarto-ojs-runtime.js` dependency
   constants and the upstream distribution's AMD dependencies.
2. Fetch the chosen distribution and all transitive dependencies, retain licenses,
   and review new source URLs and hashes in `manifest.json`. Never update hashes
   merely to silence a mismatch.
3. Add the exact package identifiers to `resolve.js`. Its aliases intentionally
   support unversioned names and exact pins, not arbitrary npm version ranges.
4. Render both profiles. If Quarto changed its resolver signature, the hook fails;
   adapt it deliberately and retain the regression test.
5. Test in a fresh browser with all non-local requests blocked: plots must render
   and respond to controls, including after unlocking protected pages. Repeat an
   incremental `quarto preview` render. Update AGENTS.md and this table.

Other optional stdlib features are not included (for example KaTeX `tex`, SQL,
Vega, and highlighting code inside `md`). Ordinary Quarto math/code is local.
Explicit remote imports, fetches and file attachments in new note code still
need the author's attention; keep data local and repeat the offline check.
