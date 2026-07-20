/* Builds the REAL_COINS manifest from Visuals/coins/<denom>/{obverse,reverse}/
   and injects it into index.html between the RC-START / RC-END markers.
   Run from the coin-sorter folder:  node tools/build-coin-manifest.js
   Re-run any time coin images are added or removed. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COINS = path.join(ROOT, 'Visuals', 'coins');
const DENOM_DIRS = { '1rs': 1, '2rs': 2, '5rs': 5, '10rs': 10 };

// tiny CSV line parser (handles quoted fields with commas)
function csvSplit(line) {
  const out = []; let cur = '', q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out.map(s => s.trim());
}
function readCsv(file) {
  if (!fs.existsSync(file)) return {};
  const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim());
  const head = csvSplit(lines[0]).map(h => h.toLowerCase());
  const fi = head.indexOf('filename');
  if (fi < 0) return {};
  // series column: first header that mentions theme/series; year column if present
  const si = head.findIndex(h => /theme|series/.test(h));
  const yi = head.indexOf('year');
  const map = {}; let order = 0;
  for (const line of lines.slice(1)) {
    const cells = csvSplit(line);
    const fn = cells[fi];
    if (!fn) continue;
    map[fn] = { s: si >= 0 ? cells[si] : '', y: yi >= 0 ? cells[yi] : '', o: order++ };
  }
  return map;
}

const entries = [];
for (const [dir, denom] of Object.entries(DENOM_DIRS)) {
  const base = path.join(COINS, dir);
  const obv = path.join(base, 'obverse'), rev = path.join(base, 'reverse');
  if (!fs.existsSync(obv) || !fs.existsSync(rev)) { console.warn(`skip ${dir}: missing obverse/reverse`); continue; }
  const meta = readCsv(path.join(base, 'image_mapping.csv'));
  const revSet = new Set(fs.readdirSync(rev));
  let files = fs.readdirSync(obv).filter(f => /\.(png|jpe?g|webp)$/i.test(f) && revSet.has(f));
  // keep CSV order (regular series first, commemoratives after); unknown files last
  files.sort((a, b) => ((meta[a]?.o ?? 1e9) - (meta[b]?.o ?? 1e9)) || a.localeCompare(b));
  files.forEach((f, i) => {
    entries.push({
      k: `r${denom}-${i}`, d: denom,
      f: `coins/${dir}/reverse/${f}`,   // front shown in game = value side (reverse photo)
      b: `coins/${dir}/obverse/${f}`,   // flip side = lion capital side (obverse photo)
      s: meta[f]?.s || '', y: meta[f]?.y || ''
    });
  });
  console.log(`${dir}: ${files.length} pairs`);
}

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const re = /\/\*RC-START\*\/[\s\S]*?\/\*RC-END\*\//;
if (!re.test(html)) { console.error('RC markers not found in index.html'); process.exit(1); }
const inject = `/*RC-START*/${JSON.stringify(entries)}/*RC-END*/`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html.replace(re, inject));
console.log(`injected ${entries.length} coins into index.html`);
