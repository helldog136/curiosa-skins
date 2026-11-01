// Contrat : le nom « Curiosa » (le lien dans la pièce `credit`, « Propulsé par Curiosa ») garde partout sa police, sa graisse,
// son style, sa casse, son espacement et son soulignement de marque. Un skin habille « Propulsé par », jamais le mot.
//
// Ce test reproduit la règle RÉELLE de l'assainisseur du cœur (src/core/skins/brand.ts, code `kit-brand-restyled`, cœur 0.6.1) :
// le cœur REFUSE toute déclaration de propriété verrouillée qui atteint le mot, même une remise à zéro (`text-transform: none`) :
//   - « own »       : le sélecteur vise `brand-mark`, ou le lien du crédit (`credit a`, `credit > a`, `credit a:hover`) :
//                     aucune des propriétés de OWN (police, casse, espacements, taille, soulignement) ;
//   - « inherited » : le sélecteur vise `credit` lui-même (le mot en hérite) : aucune des propriétés de INHERITED.
// Seuls la couleur, l'alignement, la marge et le fond restent permis. Le cœur impose de toute façon le rendu du mot en `!important`
// après la feuille du skin : ces lignes seraient inutiles.
// Le test lit skin.css de chaque skin (aucune dépendance).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "skins");

// Copie de BRAND_LOCKED_INHERITED / BRAND_LOCKED_OWN (cœur 0.6.1).
const INHERITED = new Set([
  "font", "font-family", "font-weight", "font-style", "font-variant", "font-variant-caps", "font-variant-numeric", "font-variant-ligatures",
  "font-variant-east-asian", "font-variant-alternates", "font-variant-position", "font-feature-settings", "font-variation-settings", "font-kerning",
  "font-stretch", "font-synthesis", "font-optical-sizing", "text-transform", "letter-spacing", "word-spacing",
]);
const OWN = new Set([
  ...INHERITED, "font-size", "font-size-adjust",
  "text-decoration", "text-decoration-line", "text-decoration-style", "text-decoration-thickness", "text-decoration-skip-ink",
  "text-underline-offset", "text-underline-position",
]);

export const rules = (css) => [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
  selectors: splitTop(m[1], ","),
  props: m[2].split(";").map((d) => d.split(":")[0].trim().toLowerCase()).filter(Boolean),
}));

/** Coupe `s` sur `sep` hors parenthèses et crochets. */
function splitTop(s, sep) {
  const out = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (ch === sep && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}
/** Découpe un sélecteur complexe en composés et combinateurs. */
function complex(sel) {
  const compounds = [], combs = []; let depth = 0, cur = "";
  const flush = () => { if (cur) compounds.push(cur); cur = ""; };
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (depth === 0 && /[\s>+~]/.test(ch)) {
      flush();
      let j = i; while (j < sel.length && /[\s>+~]/.test(sel[j])) j++;
      const run = sel.slice(i, j).trim();
      if (compounds.length && j < sel.length) combs.push(run || " ");
      i = j - 1;
    } else cur += ch;
  }
  flush();
  return { compounds, combs };
}
/** Pièces ancrées par un composé (y compris dans :is()/:where(), pas dans :not()). */
const partsOf = (c) => [...c.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, "").matchAll(/\[data-skin-part=["']?([\w-]+)["']?\]/g)].map((m) => m[1]);
const canBeLink = (c) => !/^[a-z]/i.test(c) || /^a(?![\w-])/i.test(c);

/** Comment le sélecteur atteint le mot : "own", "inherited" ou null (même logique que brandReach du cœur). */
export function reach(sel) {
  const { compounds, combs } = complex(sel);
  if (!compounds.length) return null;
  const last = compounds[compounds.length - 1];
  const lp = partsOf(last);
  if (lp.includes("brand-mark")) return "own";
  const viaCredit = compounds.slice(0, -1).some((c, i) => partsOf(c).includes("credit") && combs.slice(i).every((k) => k === " " || k === ">"));
  if (viaCredit && canBeLink(last)) return "own";
  if (lp.includes("credit")) return "inherited";
  return null;
}

export function problemsOf(css) {
  const problems = [];
  for (const r of rules(css)) {
    for (const sel of r.selectors) {
      const how = reach(sel);
      if (!how) continue;
      const locked = how === "own" ? OWN : INHERITED;
      for (const p of r.props) if (locked.has(p)) problems.push(`${sel} { ${p} } atteint le mot Curiosa (${how === "own" ? "direct" : "par héritage du crédit"}) : le cœur refuse le skin`);
    }
  }
  return problems;
}

test("la règle de marque repère bien les sélecteurs fautifs (et seulement eux)", () => {
  const bad = [
    '[data-skin-part="credit"] a { text-transform: none; letter-spacing: normal; }',
    '[data-skin-part="credit"] > a:hover { font-weight: 400 }',
    '[data-skin-part="brand-mark"] { text-decoration: none }',
    '[data-skin-part="credit"] { letter-spacing: .1em }',
    '[data-skin-part="credit"] { font-family: serif; }',
    '@media (min-width: 40em) { [data-skin-part="credit"] { text-transform: uppercase } }',
    '[data-skin-part="credit"]:is(a, span) { word-spacing: 1px }',
  ];
  for (const css of bad) assert.notEqual(problemsOf(css).length, 0, css);
  const good = [
    '[data-skin-part="credit"] a { color: red; }',
    '[data-skin-part="credit"] { font-size: .8rem; color: red; padding: 1px }',
    '[data-skin-part="brand-mark"] { color: red; margin: 0 }',
    '[data-skin-part="footer-link"] { letter-spacing: .1em; text-transform: uppercase }',
    '[data-skin-part="credit"] span { letter-spacing: .1em }',
  ];
  for (const css of good) assert.deepEqual(problemsOf(css), [], css);
});

for (const id of existsSync(root) ? readdirSync(root) : []) {
  const file = path.join(root, id, "skin.css");
  if (!existsSync(file)) continue;
  test(`${id} : le nom Curiosa garde son rendu de marque`, () => {
    const problems = problemsOf(readFileSync(file, "utf8"));
    assert.deepEqual(problems, [], `Le cœur refuserait ce skin (kit-brand-restyled). Retirez ces déclarations :\n- ${problems.join("\n- ")}`);
  });
}
