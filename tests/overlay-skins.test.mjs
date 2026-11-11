// Overlay skins (core 0.8.0): what this repository promises about its overlay skins, without the core. The core's own check (`npm run skin:check`, run by the Skin workflow)
// judges tokens, rules and contrast; this test only guards the repository: kind and contract, no code or assets, the catalogue entry, the preview, the tag name.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => readFileSync(path.join(root, ...p), "utf8");
const catalogue = JSON.parse(read("catalogue", "overlay-skins.json"));
const overlay = readdirSync(path.join(root, "skins")).filter((d) => { try { return JSON.parse(read("skins", d, "skin.json")).kind === "overlay"; } catch { return false; } });

test("every overlay skin is listed in catalogue/overlay-skins.json, and only those (never in the site catalogue)", () => {
  assert.ok(overlay.length >= 8, `${overlay.length} overlay skins`);
  assert.deepEqual(catalogue.skins.map((s) => s.id).sort(), [...overlay].sort());
  const site = JSON.parse(read("catalogue", "index.json")).skins.map((s) => s.id);
  for (const id of overlay) assert.ok(!site.includes(id), `${id} must not be in the site catalogue (an older core would list it as incompatible)`);
});

for (const id of overlay) {
  test(`${id}: manifest, catalogue entry, tag, preview`, () => {
    const m = JSON.parse(read("skins", id, "skin.json")), e = catalogue.skins.find((s) => s.id === id);
    assert.deepEqual([m.kind, m.skinContract, m.minCore, m.license], ["overlay", 2, "0.8.0", "MIT"]);
    assert.equal(m.assets, undefined, "overlay skins ship no font or image");
    assert.ok(m.name.fr && m.name.en && m.description.fr && m.description.en);
    assert.deepEqual([e.version, e.ref, e.subdir, e.skinContract, e.requires.core], [m.version, `${id}/v${m.version}`, `skins/${id}`, 2, "0.8.0"]);
    assert.equal(e.preview, `skins/${id}/${m.previews[0].file}`);
    const png = readFileSync(path.join(root, "skins", id, m.previews[0].file));
    assert.equal(png.subarray(0, 4).toString("latin1"), "RIFF"); assert.equal(png.subarray(8, 12).toString("latin1"), "WEBP");
    assert.ok(png.length < 150 * 1024, "preview weight");
    assert.ok(m.previews[0].alt.fr && m.previews[0].alt.en);
    assert.ok(existsSync(path.join(root, "skins", id, "LICENSE")) && existsSync(path.join(root, "skins", id, "README.md")));
    assert.deepEqual(readdirSync(path.join(root, "skins", id)).sort(), ["LICENSE", "README.md", "previews", "skin.css", "skin.json", "tokens.json"], "no other file");
  });
  test(`${id}: tokens are --ov-* only, the sheet is data (no at-rule, url, class or !important)`, () => {
    const tokens = JSON.parse(read("skins", id, "tokens.json")).tokens;
    assert.ok(tokens["--ov-fg"] && tokens["--ov-surface"]);
    for (const k of Object.keys(tokens)) assert.match(k, /^--ov-[a-z-]+$/);
    const css = read("skins", id, "skin.css").replace(/\/\*[\s\S]*?\*\//g, "");
    assert.doesNotMatch(css, /@|url\(|!important|expression|javascript:|<|\.\w+\s*\{|#\w+\s*\{/);
    for (const sel of [...css.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim())) for (const one of sel.split(",")) assert.match(one.trim(), /^\[data-ov-(part|region)="[a-z0-9-]+"\]/, one);
  });
}
