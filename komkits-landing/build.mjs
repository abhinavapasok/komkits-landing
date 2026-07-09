#!/usr/bin/env node
/**
 * Assembles komkits-landing-mockup.html from komkits-landing/components/.
 *
 * Components are self-contained partials (own <style> + markup + <script>),
 * concatenated in filename order. 00-head.html opens the document and
 * 15-final-footer.html closes it, so ordering is load-bearing — keep the
 * numeric prefixes.
 *
 * Usage:  node komkits-landing/build.mjs
 * Output: ../komkits-landing-mockup.html (same path the nav/onboarding
 *         mockups already link to)
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';

const componentsDir = new URL('./components/', import.meta.url);
const outFile = new URL('../komkits-landing-mockup.html', import.meta.url);

const files = (await readdir(componentsDir)).filter(f => f.endsWith('.html')).sort();
if (!files[0]?.startsWith('00-')) {
  console.error('components/00-*.html (document head) is missing — aborting');
  process.exit(1);
}

let out = '';
for (const f of files) {
  const src = await readFile(new URL(f, componentsDir), 'utf8');
  // no banner before the doctype; every other component gets a seam marker
  if (!f.startsWith('00-')) out += `\n<!-- ═══════════ component: ${f} ═══════════ -->\n`;
  out += src.trimEnd() + '\n';
}

await writeFile(outFile, out);
console.log(`built ${decodeURIComponent(outFile.pathname)} from ${files.length} components:`);
files.forEach(f => console.log('  · ' + f));
