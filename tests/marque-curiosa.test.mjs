// Contrat : le nom « Curiosa » (le lien dans la pièce `credit`, « Propulsé par Curiosa ») garde partout sa police, sa graisse,
// son style, sa casse et son espacement de marque. Un skin habille « Propulsé par », jamais le mot.
// Le test lit skin.css de chaque skin (aucune dépendance) et échoue si la règle touche le mot ou si elle s'y propage sans remise à zéro.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "skins");
// Réglages de typographie qui changeraient le rendu du mot (la couleur suit le fond du pied : elle reste libre, pour la lisibilité).
const TYPO = ["font-family", "font-weight", "font-style", "font-size", "font-variant", "font-stretch", "font", "text-transform", "letter-spacing", "word-spacing", "text-decoration-thickness", "text-decoration-style", "text-underline-offset", "font-feature-settings", "font-variation-settings"];
const RESET = { "text-transform": ["none"], "letter-spacing": ["normal"], "word-spacing": ["normal"] };
// Réglages hérités par le lien : permis sur `credit` seulement s'ils sont remis à zéro sur `credit a`.
const INHERITED = ["text-transform", "letter-spacing", "word-spacing"];
// Réglages hérités qu'aucune remise à zéro ne peut rendre à la marque : interdits sur `credit`.
const NEVER_ON_PARENT = ["font-weight", "font-style", "font-variant", "font-stretch", "font-feature-settings", "font-variation-settings"];

const rules = (css) => [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
  selectors: m[1].split(",").map((s) => s.trim()).filter(Boolean),
  decls: Object.fromEntries(m[2].split(";").map((d) => d.split(/:(.*)/s)).filter((d) => d[1] !== undefined).map((d) => [d[0].trim().toLowerCase(), d[1].replace(/!important/i, "").trim().toLowerCase()])),
}));
const onWord = (sel) => /\[data-skin-part=["']?credit["']?\]\s*(>\s*)?a(?![\w-])/.test(sel);
const onParent = (sel) => /\[data-skin-part=["']?credit["']?\]\s*$/.test(sel) || /\[data-skin-part=["']?credit["']?\]\s*:(?!hover|focus)/.test(sel);

// Tous les skins sont contrôlés pour de bon.

for (const id of existsSync(root) ? readdirSync(root) : []) {
  const file = path.join(root, id, "skin.css");
  if (!existsSync(file)) continue;
  test(`${id} : le nom Curiosa garde son rendu de marque`, () => {
    const rs = rules(readFileSync(file, "utf8"));
    const problems = [];
    let parentInherits = new Set();
    for (const r of rs) {
      for (const sel of r.selectors) {
        if (onWord(sel)) {
          for (const p of TYPO) {
            if (!(p in r.decls)) continue;
            if (RESET[p]?.includes(r.decls[p])) continue;
            problems.push(`${sel} { ${p}: ${r.decls[p]} } restyle le mot Curiosa`);
          }
        }
        if (onParent(sel)) {
          for (const p of NEVER_ON_PARENT) if (p in r.decls) problems.push(`${sel} { ${p} } se propage au mot Curiosa et ne peut pas y être remis à zéro`);
          for (const p of INHERITED) if (p in r.decls && !RESET[p].includes(r.decls[p])) parentInherits.add(p);
        }
      }
    }
    for (const p of parentInherits) {
      const reset = rs.some((r) => r.selectors.some(onWord) && RESET[p].includes(r.decls[p]));
      if (!reset) problems.push(`« credit » règle ${p} sans le remettre à zéro sur « credit a » : le mot Curiosa le reçoit`);
    }
    assert.deepEqual(problems, [], `Le nom Curiosa ne se restyle pas (police, graisse, casse, espacement de marque) :\n- ${problems.join("\n- ")}`);
  });
}
