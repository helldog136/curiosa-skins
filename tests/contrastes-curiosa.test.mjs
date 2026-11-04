// Contrastes du skin « curiosa » (WCAG 2.x, même formule que le cœur) : les couples texte / fond de chaque mode.
// Le laiton, la terre cuite et la sauge de la marque ne portent jamais de texte courant sur le crème (environ 3 pour 1) :
// ils servent de fonds, de traits et de pastilles, avec un texte en nuit d'encre.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "skins", "curiosa");
const tokens = JSON.parse(readFileSync(path.join(dir, "tokens.json"), "utf8"));
const css = readFileSync(path.join(dir, "skin.css"), "utf8");

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

const INK = "#1b1a2e", CREAM = "#f4ede0";
const BRICKS = { laiton: "#b8862b", terreCuite: "#c4552d", sauge: "#6e8b74" };
const TINTS = ["#e6cb8f", "#f0bfa9", "#c4d6c8"]; // fonds des pastilles : texte en nuit d'encre

for (const mode of ["light", "dark"]) {
  const t = { ...tokens.common, ...tokens[mode] };
  const pairs = [
    ["texte / fond", t["--v-fg"], t["--v-bg"], 4.5],
    ["texte / cartes", t["--v-fg"], t["--v-surface"], 4.5],
    ["texte secondaire / fond", t["--v-muted"], t["--v-bg"], 4.5],
    ["texte secondaire / cartes", t["--v-muted"], t["--v-surface"], 4.5],
    ["texte des boutons / bouton", t["--v-accent-fg"], t["--v-accent"], 4.5],
    ["liens / fond", t["--sk-color-link"], t["--v-bg"], 4.5],
    ["liens / cartes", t["--sk-color-link"], t["--v-surface"], 4.5],
    ["couleur principale / fond", t["--v-accent"], t["--v-bg"], 3],
    ["anneau de focus / fond", t["--sk-color-focus"], t["--v-bg"], 3],
    ["anneau de focus / cartes", t["--sk-color-focus"], t["--v-surface"], 3],
  ];
  for (const [name, fg, bg, min] of pairs) {
    test(`curiosa ${mode} : ${name} au moins ${min}`, () => {
      assert.ok(fg && bg, "couleur absente");
      assert.ok(ratio(fg, bg) >= min, `${fg} sur ${bg} : ${ratio(fg, bg).toFixed(2)}`);
    });
  }
}

test("curiosa : les pastilles (texte en nuit d'encre) ont au moins 4,5", () => {
  for (const tint of [...TINTS, ...Object.values(BRICKS).filter((c) => c !== BRICKS.terreCuite)]) assert.ok(ratio(INK, tint) >= 4.5, `${INK} sur ${tint}`);
});

test("curiosa : le laiton, la terre cuite et la sauge ne servent pas de couleur de texte", () => {
  const colors = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(?:^|[;{\s])color\s*:\s*([^;}]+)/g)].map((m) => m[1].trim().toLowerCase());
  for (const c of colors) for (const b of Object.values(BRICKS)) assert.ok(!c.includes(b), `color: ${c}`);
  for (const mode of ["light", "dark"]) for (const k of ["--v-fg", "--v-muted", "--sk-color-link"]) for (const b of Object.values(BRICKS)) assert.notEqual(tokens[mode][k], b, `${mode} ${k}`);
});

test("curiosa : aucune adresse externe dans la feuille ni les jetons", () => {
  assert.ok(!/https?:\/\//i.test(css), "URL externe dans skin.css");
  assert.ok(!/@import/i.test(css));
  assert.ok(!/https?:\/\//i.test(JSON.stringify(tokens)));
});

test("curiosa : le nom Curiosa n'est jamais restylé (couleur seulement)", () => {
  assert.ok(!/brand-mark/.test(css) || !/brand-mark[^{]*\{[^}]*font/.test(css));
});
