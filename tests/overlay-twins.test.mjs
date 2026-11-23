// Overlay twins: every public site skin has an overlay skin of the same visual identity, so a streamer's OBS overlays match their site.
// This test reads catalogue/twins.json (which pairs a site skin with its overlay twin) and guards the pairing without the core:
//  - every site skin of catalogue/index.json has a twin (or is listed in "planned" while a series of changes is under way: the list must be empty at the end);
//  - a twin exists, is an overlay skin, is listed in catalogue/overlay-skins.json, and is the twin of one site skin only;
//  - the twin cannot drift from its site skin: the key colours it declares are the site skin's own, every colour it uses is a colour of the site skin,
//    and its font stacks are the site's stacks. Since core 0.47.0 (skin contract 6) an overlay skin embeds fonts: a twin of a site skin that ships fonts ships the very same
//    files (same bytes, same family, weight, style and licence text) and writes the site's declared families in its stacks; only the names an overlay stack may not carry
//    (fontDrop: families that are neither declared nor known system fonts) are left out;
//  - the pairing is machine readable: "twinOf" in skin.json and in the catalogue entry names the site skin, and both agree with catalogue/twins.json;
//  - the pairing is visible to people: the description says "Overlay twin of the <site skin>" and the repository README lists the pair.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => readFileSync(path.join(root, ...p), "utf8");
const json = (...p) => JSON.parse(read(...p));
const twins = json("catalogue", "twins.json");
const siteIds = json("catalogue", "index.json").skins.map((s) => s.id);
const overlayIds = json("catalogue", "overlay-skins.json").skins.map((s) => s.id);
const readme = read("README.md");
const overlayEntries = json("catalogue", "overlay-skins.json").skins;
const sha = (...p) => createHash("sha256").update(readFileSync(path.join(root, ...p))).digest("hex");

// ---- helpers -------------------------------------------------------------------------------------------------------------------------------------------
const hex = (h) => h.toLowerCase();
const toHex = (r, g, b) => "#" + [r, g, b].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
/** The opaque colour of a value: "#rrggbb" or "rgb(a)(r, g, b…)" (alpha ignored), else null. */
const colour = (v) => {
  if (typeof v !== "string") return null;
  const h = /^#([0-9a-f]{6})\b/i.exec(v.trim()); if (h) return hex("#" + h[1]);
  const m = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i.exec(v.trim()); return m ? toHex(m[1], m[2], m[3]) : null;
};
/** Every colour written in a text (hex and rgb()/rgba(), comma or space syntax), as opaque hex. */
const coloursIn = (text) => {
  const out = new Set();
  for (const m of text.matchAll(/#([0-9a-f]{6})\b/gi)) out.add(hex("#" + m[1]));
  for (const m of text.matchAll(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/gi)) out.add(toHex(m[1], m[2], m[3]));
  return out;
};
const NEUTRAL = new Set(["#000000", "#ffffff"]); // black and white (shadows, text on a coloured panel) are not part of anyone's palette
const siteTokens = (id, mode, key) => { const t = json("skins", id, "tokens.json"); return t[mode]?.[key] ?? t.common?.[key]; };
const splitTop = (s) => { const out = []; let cur = "", q = null; for (const ch of s) { if (q) { cur += ch; if (ch === q) q = null; } else if (ch === '"' || ch === "'") { q = ch; cur += ch; } else if (ch === ",") { out.push(cur.trim()); cur = ""; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };

// ---- the catalogue-wide rules ---------------------------------------------------------------------------------------------------------------------------
test("every public site skin has an overlay twin (or is planned in this series), and nothing else is paired", () => {
  const paired = twins.twins.map((t) => t.site), planned = twins.planned ?? [];
  assert.equal(new Set(paired).size, paired.length, "a site skin has one twin only");
  assert.equal(new Set(twins.twins.map((t) => t.overlay)).size, twins.twins.length, "an overlay skin is the twin of one site skin only");
  for (const id of [...paired, ...planned]) assert.ok(siteIds.includes(id), `${id} is not a site skin of catalogue/index.json`);
  for (const id of planned) assert.ok(!paired.includes(id), `${id} is both planned and paired`);
  const missing = siteIds.filter((id) => !paired.includes(id) && !planned.includes(id));
  assert.deepEqual(missing, [], `site skin(s) without an overlay twin: add an overlay skin of the same identity and a row in catalogue/twins.json (see docs/OVERLAY-TWINS.md)`);
});

test("the repository README lists every pair", () => {
  for (const t of twins.twins) {
    const row = readme.split("\n").find((l) => l.includes(`skins/${t.site}\``) && l.includes(`skins/${t.overlay}\``));
    assert.ok(row, `README.md: no row of the twin table names skins/${t.site} and skins/${t.overlay}`);
  }
});

// ---- one pair ------------------------------------------------------------------------------------------------------------------------------------------
for (const t of twins.twins) {
  test(`${t.overlay} is the overlay twin of ${t.site} (${t.status})`, () => {
    assert.ok(["new", "adopted"].includes(t.status), "status is new or adopted");
    assert.ok(overlayIds.includes(t.overlay), `${t.overlay} is listed in catalogue/overlay-skins.json`);
    const o = json("skins", t.overlay, "skin.json"), s = json("skins", t.site, "skin.json");
    assert.equal(o.kind, "overlay"); assert.notEqual(s.kind, "overlay");
    const tk = json("skins", t.overlay, "tokens.json").tokens;
    const mode = t.siteMode; assert.ok(["light", "dark"].includes(mode) && (s.modes ?? []).includes(mode), `${t.site} has a ${mode} mode`);

    // The key colours the twin takes from its site skin are equal (opacity aside).
    assert.ok(Object.keys(t.match).length >= 3, "at least three key colours are matched");
    for (const [ov, site] of Object.entries(t.match)) {
      const a = colour(tk[ov]), b = colour(siteTokens(t.site, mode, site));
      assert.ok(a && b, `${ov} / ${site} are colours`);
      assert.equal(a, b, `${t.overlay} ${ov} (${tk[ov]}) diverges from ${t.site} ${mode} ${site} (${siteTokens(t.site, mode, site)})`);
    }
    if (t.status === "adopted") return; // an existing skin is adopted as it is: no wording or font rule is imposed on it

    // Every colour the twin writes belongs to the site skin (its tokens or its style sheet): no colour of its own.
    const siteColours = new Set([...coloursIn(read("skins", t.site, "tokens.json")), ...coloursIn(read("skins", t.site, "skin.css"))]);
    for (const c of [...coloursIn(read("skins", t.overlay, "tokens.json")), ...coloursIn(read("skins", t.overlay, "skin.css"))]) {
      assert.ok(NEUTRAL.has(c) || siteColours.has(c), `${t.overlay} uses ${c}, which ${t.site} does not use`);
    }

    // twinOf: skin.json, the catalogue entry and twins.json name the same site skin (core 0.47.0 reads it; an older core ignores it).
    assert.equal(o.twinOf, t.site, `${t.overlay}: skin.json twinOf`);
    assert.equal(overlayEntries.find((e) => e.id === t.overlay)?.twinOf, t.site, `${t.overlay}: catalogue twinOf`);
    assert.notEqual(o.twinOf, t.overlay); assert.notEqual(o.twinOf, "basic");

    // Fonts: the site's stack. Where the site ships fonts, the twin ships the same files and names the declared families; the entries listed in fontDrop are the ones
    // an overlay stack may not carry (neither declared nor a known system font) and a token takes 7 names at most.
    const siteFonts = (s.assets ?? []).filter((a) => a.kind === "font");
    const ownFonts = (o.assets ?? []);
    assert.ok(ownFonts.every((a) => a.kind === "font"), "an overlay twin ships fonts only");
    if (!siteFonts.length) {
      assert.equal(ownFonts.length, 0, `${t.site} ships no font: ${t.overlay} ships none either (same system stack)`);
      assert.deepEqual([o.skinContract, o.minCore], [3, "0.9.0"], "no font: the contract and the minimum core do not change");
    } else {
      assert.ok(ownFonts.length >= 1 && ownFonts.length <= 4, `${t.overlay} ships 1 to 4 of the site's fonts`);
      assert.deepEqual([o.skinContract, o.minCore], [6, "0.47.0"], "fonts: contract 6 and core 0.47.0");
      for (const a of ownFonts) {
        const src = siteFonts.find((x) => x.file === a.file);
        assert.ok(src, `${t.overlay} ${a.file} is one of ${t.site}'s fonts`);
        for (const k of ["family", "weight", "style", "license", "licenseFile", "author", "source"]) assert.equal(a[k], src[k], `${a.file} ${k}`);
        assert.equal(sha("skins", t.overlay, a.file), sha("skins", t.site, src.file), `${a.file} has the site's bytes`);
        assert.equal(sha("skins", t.overlay, a.licenseFile), sha("skins", t.site, src.licenseFile), `${a.licenseFile} is the site's licence text`);
      }
      // the heading and the body family of the site are both carried (the pairing is the point), and each declared family is used by a stack or the sheet
      const css = read("skins", t.overlay, "skin.css");
      const declared = new Set(ownFonts.map((a) => a.family));
      for (const f of declared) assert.ok(tk["--ov-font"].includes(`"${f}"`) || tk["--ov-font-heading"].includes(`"${f}"`) || css.includes(`"${f}"`), `${f} is used`);
    }
    for (const [ov, site] of Object.entries(t.fonts)) {
      const drop = t.fontDrop?.[ov] ?? [];
      const expected = splitTop(siteTokens(t.site, mode, site)).filter((f) => !drop.includes(f));
      assert.ok(expected.length >= 2 && expected.length <= 7, `${ov}: ${expected.length} names`);
      assert.deepEqual(splitTop(tk[ov]), expected, `${t.overlay} ${ov} is not ${t.site}'s ${site} (minus fontDrop)`);
    }
    // the site's first family (its own, shipped font) leads the twin's stack when the twin ships it
    for (const [ov, site] of Object.entries(t.fonts)) {
      const lead = splitTop(siteTokens(t.site, mode, site))[0];
      if (siteFonts.some((a) => `"${a.family}"` === lead)) assert.equal(splitTop(tk[ov])[0], lead, `${ov} starts with the site's own font ${lead}`);
    }

    // The pairing says so in the description (both languages), the tags name the site mode, the README names the site skin.
    assert.ok(o.description.en.startsWith(`Overlay twin of the ${s.name.en} site skin`), `EN description starts with "Overlay twin of the ${s.name.en} site skin"`);
    assert.ok(o.description.fr.startsWith(`Jumeau d'overlay du skin de site ${s.name.fr}`), `FR description starts with "Jumeau d'overlay du skin de site ${s.name.fr}"`);
    assert.ok(o.tags.includes(mode), `tags include ${mode}`);
    assert.ok(existsSync(path.join(root, "skins", t.overlay, "README.md")) && read("skins", t.overlay, "README.md").includes(`\`${t.site}\``), "the overlay README names the site skin id");
    assert.ok(o.name.en.includes(s.name.en) || o.name.fr.includes(s.name.fr) || o.name.fr.includes(s.name.fr.split(" ")[0]), "the name makes the pairing obvious");
  });
}
