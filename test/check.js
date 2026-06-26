#!/usr/bin/env node
// Validates the compiled output of test/compile-test.scss.
// Fails (exit 1) if the CSS contains invalid tokens that Sass happily emits
// but browsers reject — the class of bug that shipped in v3.0.x.
'use strict';

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '.build.css');
let css;
try {
  css = fs.readFileSync(file, 'utf8');
} catch (e) {
  console.error(`✗ Could not read ${file}. Run the compile step first (npm test).`);
  process.exit(1);
}

const failures = [];

// Patterns that indicate invalid CSS produced by unit-handling bugs.
const banned = [
  { re: /pxpx/g, why: 'double "px" unit (broken interpolation, e.g. v-fluid/container)' },
  { re: /\d\s*\/\s*1px/g, why: 'unresolved px division (e.g. calc(0 / 1px) from em()/rem())' },
  { re: /NaN|Infinity/g, why: 'non-finite numeric output' },
];
for (const { re, why } of banned) {
  const hits = css.match(re);
  if (hits) failures.push(`Found ${hits.length}x ${re} — ${why}`);
}

// Tokens that must be present (proves the exercised APIs emitted real values).
const required = [
  { re: /clamp\(24px, 24px \+ 3\.90625vw, 64px\)/, why: 'v-fluid valid output' },
  { re: /@container \(min-width: 264px\)/, why: 'container-min-h valid output' },
  { re: /--vs: 24px/, why: 'v-static(2) === 24px (matches docs)' },
];
for (const { re, why } of required) {
  if (!re.test(css)) failures.push(`Missing expected token ${re} — ${why}`);
}

if (failures.length) {
  console.error('✗ compile-test FAILED:');
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log('✓ compile-test passed: no invalid CSS, expected tokens present.');
