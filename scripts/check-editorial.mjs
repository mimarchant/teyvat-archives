import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEditorial } from './editorial-validator.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const contentRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.join(projectRoot, 'src/content');
const componentPath = path.join(projectRoot, 'src/components/editorial/SpoilerSection.astro');
const files = [];
async function scan(directory) {
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return; throw error; }
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (entry.isFile() && !entry.name.startsWith('_') && /\.mdx?$/iu.test(entry.name)) files.push(file);
  }
}
try {
  // An absent collection is valid; an absent content root usually means a wrong CLI path.
  await readdir(contentRoot);
  for (const collection of ['chronicles', 'entities', 'quests', 'mysteries']) await scan(path.join(contentRoot, collection));
  const diagnostics = [];
  for (const file of files) diagnostics.push(...validateEditorial(await readFile(file, 'utf8'), { file, componentPath }));
  for (const issue of diagnostics) console.error(`${path.relative(projectRoot, issue.file)}:${issue.line}:${issue.column} [${issue.code}] ${issue.message}`);
  console.log(`Editorial: ${files.length} archivos revisados, ${diagnostics.length} errores.`);
  if (diagnostics.length) process.exitCode = 1;
} catch (error) {
  console.error(`Editorial: no se pudo completar la validación: ${error.message}`);
  process.exitCode = 1;
}
