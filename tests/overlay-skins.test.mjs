// Overlay skins (core 0.8.0): what this repository promises about its overlay skins, without the core. The core's own check (`npm run skin:check`, run by the Skin workflow)
// judges tokens, rules, contrast and (contract 4) the animation recipe; this test only guards the repository: kind and contract, no code or assets, the catalogue
// entry, the preview, the tag name.
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
    // contract 3 (core 0.9.0), or contract 4 (core 0.30.0) for a skin that ships an animation recipe (animation.json: data drawn by the core's engine),
    // or contract 6 (core 0.47.0) for a skin that embeds woff2 fonts (the only asset an overlay skin may carry here)
    const fonts = m.assets ?? [];
    const [contract, core] = fonts.length ? [6, "0.47.0"] : m.animation ? [4, "0.30.0"] : [3, "0.9.0"];
    assert.deepEqual([m.kind, m.skinContract, m.minCore, m.license], ["overlay", contract, core, "MIT"]);
    assert.match(m.version, /^1\.\d+\.\d+$/);
    // fonts (contract 6): woff2 only, declared one by one, at most 4 of 150 KB and 400 KB together, with the licence text shipped next to them
    assert.ok(fonts.length <= 4, "4 fonts at most");
    let total = 0;
    for (const a of fonts) {
      assert.equal(a.kind, "font", "overlay skins ship fonts only (no image)");
      assert.match(a.file, /^fonts\/[a-z0-9._-]+\.woff2$/);
      assert.match(a.family, /^[A-Za-z0-9 _-]{1,41}$/); assert.ok(["normal", "italic"].includes(a.style)); assert.match(a.weight, /^[1-9]00( [1-9]00)?$/);
      assert.ok(a.license && a.author && a.source && a.licenseFile, "licence, author, source and licence file are credited");
      const bytes = readFileSync(path.join(root, "skins", id, a.file)); total += bytes.length;
      assert.equal(bytes.subarray(0, 4).toString("latin1"), "wOF2", `${a.file} is a real woff2`);
      assert.ok(bytes.length <= 150 * 1024, `${a.file} is over 150 KB`);
      assert.match(read("skins", id, a.licenseFile), /SIL OPEN FONT LICENSE Version 1\.1/, `${a.licenseFile} is the OFL text`);
    }
    assert.ok(total <= 400 * 1024, "400 KB of fonts at most");
    assert.ok(m.name.fr && m.name.en && m.description.fr && m.description.en);
    assert.deepEqual([e.version, e.ref, e.subdir, e.skinContract, e.requires.core], [m.version, `${id}/v${m.version}`, `skins/${id}`, contract, core]);
    assert.equal(e.twinOf, m.twinOf, "the catalogue entry and skin.json name the same site skin (twinOf), or none");
    assert.equal(e.previewAnim, `skins/${id}/previews/overlay-anim.webp`); assert.deepEqual(m.previews.map((p) => p.file), ["previews/overlay-640.webp", "previews/overlay-anim.webp"]);
    assert.equal(e.preview, `skins/${id}/${m.previews[0].file}`);
    const png = readFileSync(path.join(root, "skins", id, m.previews[0].file));
    assert.equal(png.subarray(0, 4).toString("latin1"), "RIFF"); assert.equal(png.subarray(8, 12).toString("latin1"), "WEBP");
    assert.ok(png.length < 150 * 1024, "still preview weight");
    const anim = readFileSync(path.join(root, "skins", id, m.previews[1].file));
    assert.equal(anim.subarray(0, 4).toString("latin1"), "RIFF"); assert.equal(anim.subarray(8, 12).toString("latin1"), "WEBP"); assert.ok(anim.includes("ANIM") && anim.includes("ANMF"), "an animated webp (several frames)");
    assert.ok(anim.length <= 450 * 1024, "animated preview weight");
    assert.ok(m.previews.every((p) => p.alt.fr && p.alt.en));
    assert.ok(existsSync(path.join(root, "skins", id, "LICENSE")) && existsSync(path.join(root, "skins", id, "README.md")));
    assert.deepEqual(readdirSync(path.join(root, "skins", id)).sort(), ["LICENSE", "README.md", ...(m.animation ? ["animation.json"] : []), ...(fonts.length ? ["LICENSES", "fonts"] : []), "previews", "skin.css", "skin.json", "tokens.json"].sort(), "no other file");
    if (fonts.length) {
      assert.deepEqual(readdirSync(path.join(root, "skins", id, "fonts")).sort(), fonts.map((a) => path.basename(a.file)).sort(), "every font file is declared, every declared font exists");
      assert.deepEqual(readdirSync(path.join(root, "skins", id, "LICENSES")).sort(), [...new Set(fonts.map((a) => path.basename(a.licenseFile)))].sort(), "one licence text per font project");
    }
    if (m.animation) {
      assert.equal(m.animation, "animation.json");
      const a = JSON.parse(read("skins", id, "animation.json"));
      assert.equal(a.animateContract, 1); assert.ok(a.genres && typeof a.genres === "object");
      // data only: no address, no markup, no script-like text anywhere in the recipe
      assert.doesNotMatch(read("skins", id, "animation.json"), /https?:|url\(|<|javascript:|function|=>/);
    }
  });
  test(`${id}: tokens are --ov-* only, the sheet is data (no at-rule, url, class or !important)`, () => {
    const tokens = JSON.parse(read("skins", id, "tokens.json")).tokens;
    assert.ok(tokens["--ov-fg"] && tokens["--ov-surface"]);
    for (const k of Object.keys(tokens)) assert.match(k, /^--ov-[a-z-]+$/);
    const css = read("skins", id, "skin.css").replace(/\/\*[\s\S]*?\*\//g, "");
    assert.doesNotMatch(css, /@|url\(|!important|expression|javascript:|<|\.\w+\s*\{|#\w+\s*\{/);
    // contract 3: only closed preset names, never raw clip-path, pseudo-elements, positions or animations
    assert.doesNotMatch(css, /clip-path|::?(before|after)|(^|[;{\s])position\s*:|animation|content\s*:|keyframes/);
    for (const sel of [...css.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim())) for (const one of sel.split(",")) assert.match(one.trim(), /^\[data-ov-(part|region)="[a-z0-9-]+"\]/, one);
  });
}
