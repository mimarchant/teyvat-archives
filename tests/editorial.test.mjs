import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import { validateEditorial } from '../scripts/editorial-validator.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const componentPath = path.join(root, 'src/components/editorial/SpoilerSection.astro');
const file = path.join(root, 'src/content/chronicles/fixture.mdx');
const section = { id: 'prueba', title: 'Prueba', spoilerLevel: 'none' };
const body = '## Prueba\n\n<SpoilerSection level="none">\nTexto sintético de prueba.\n</SpoilerSection>\n';
const fixture = (content = body, data = {}, importLine = "import SpoilerSection from '../../components/editorial/SpoilerSection.astro';") =>
  `---\n${stringify({ spoilerLevel: 'none', sections: [section], ...data })}---\n\n${importLine}\n\n${content}`;
const lint = (source, options = {}) => validateEditorial(source, { file, componentPath, ...options });
const codes = source => lint(source).map(issue => issue.code);

test('the current chronicle satisfies the editorial coverage contract', async () => {
  const realFile = path.join(root, 'src/content/chronicles/khaenriah.mdx');
  assert.deepEqual(lint(await readFile(realFile, 'utf8'), { file: realFile }), []);
});
test('valid sections, inline formatting, code and comments are parsed as MDX', () => {
  const source = fixture(body.replace('## Prueba', '## **Prueba**').replace('Texto sintético de prueba.',
    '### Subsección\n\n```mdx\n## No es una sección\n<SpoilerSection level="inventado">\n```\n\n{/* comentario */}'));
  assert.deepEqual(lint(source), []);
});
test('safe preambles are allowed only inside a classified block', () => {
  assert.deepEqual(lint(fixture('<SpoilerSection level="none">\n> Nota editorial\n</SpoilerSection>\n\n' + body)), []);
  assert.ok(codes(fixture('Párrafo sin clasificar.\n\n' + body)).includes('UNCOVERED_CONTENT'));
});
test('unwrapped prose, code, images and components are rejected', () => {
  for (const content of ['Párrafo', '```js\nlet a = 1;\n```', '![imagen](test.png)', '<EvidenceBlock />']) {
    assert.ok(codes(fixture(`## Prueba\n\n${content}`)).includes('UNCOVERED_CONTENT'));
  }
});
test('every level must be from the shared milestone registry', () => {
  assert.ok(codes(fixture(body, { spoilerLevel: 'secret' })).includes('ARTICLE_LEVEL'));
  assert.ok(codes(fixture(body, { sections: [{ ...section, spoilerLevel: 'secret' }] })).includes('SECTION_LEVEL'));
  assert.ok(codes(fixture(body.replace('level="none"', 'level="secret"'))).includes('BLOCK_LEVEL'));
});
test('a block must agree with its declared section', () => {
  assert.ok(codes(fixture(body, { spoilerLevel: 'sumeru', sections: [{ ...section, spoilerLevel: 'sumeru' }] })).includes('LEVEL_MISMATCH'));
});
test('article metadata must not understate a section or block', () => {
  const source = fixture(body.replace('level="none"', 'level="sumeru"'), { sections: [{ ...section, spoilerLevel: 'sumeru' }] });
  assert.equal(codes(source).filter(code => code === 'ARTICLE_UNDERRATED').length, 2);
});
test('multiple sibling blocks may classify one section', () => {
  assert.deepEqual(lint(fixture(body + '\n<SpoilerSection level="none">\nOtra nota.\n</SpoilerSection>')), []);
});
test('nested spoiler controls are rejected even when their levels match', () => {
  assert.ok(codes(fixture(body.replace('Texto sintético de prueba.', '<SpoilerSection level="none">Anidado</SpoilerSection>'))).includes('NESTED_WRAPPER'));
});
test('empty blocks and empty sections cannot imply completed coverage', () => {
  assert.ok(codes(fixture('## Prueba\n\n<SpoilerSection level="none" />')).includes('EMPTY_BLOCK'));
  assert.ok(codes(fixture('## Prueba\n')).includes('EMPTY_SECTION'));
});
test('requires a literal block level and forbids spreads that could override it', () => {
  for (const attr of ['', 'level={"none"}', 'level="none" level="none"', 'level="none" {...props}']) {
    assert.ok(codes(fixture(body.replace('level="none"', attr))).includes('BLOCK_LEVEL'));
  }
});
test('validates the real component import and supports a default-import alias', () => {
  assert.deepEqual(lint(fixture(body.replaceAll('SpoilerSection', 'Safe'), {}, "import Safe from '../../components/editorial/SpoilerSection.astro';")), []);
  assert.ok(codes(fixture(body, {}, "import SpoilerSection from './Fake.astro';")).includes('WRAPPER_IMPORT'));
  assert.ok(codes(fixture(body, {}, '')).includes('WRAPPER_IMPORT'));
});
test('all top-level headings must be declared and all declarations must exist', () => {
  assert.ok(codes(fixture(body.replace('## Prueba', '## Otro título'))).includes('UNDECLARED_SECTION'));
  assert.ok(codes(fixture(body.replace('## Prueba', '## Otro título'))).includes('STALE_SECTION'));
});
test('duplicate ids, titles and actual headings are ambiguous and rejected', () => {
  const metadata = { sections: [section, { ...section }] };
  assert.ok(codes(fixture(body, metadata)).includes('DUPLICATE_ID'));
  assert.ok(codes(fixture(body, metadata)).includes('DUPLICATE_TITLE'));
  assert.ok(codes(fixture(body + '\n' + body)).includes('DUPLICATE_HEADING'));
});
test('requires well-formed section declarations rather than silently using defaults', () => {
  assert.ok(codes(fixture(body, { sections: undefined })).includes('SECTIONS'));
  assert.ok(codes(fixture(body, { sections: [null] })).includes('SECTION_METADATA'));
  assert.ok(codes(fixture(body, { sections: [{ ...section, id: 'invalid id' }] })).includes('SECTION_ID'));
  assert.ok(codes(fixture(body, { sections: [{ ...section, title: '' }] })).includes('SECTION_TITLE'));
});
test('headers cannot be hidden inside wrapper components or introduced with HTML', () => {
  assert.ok(codes(fixture(body.replace('Texto sintético de prueba.', '## Oculto'))).includes('NESTED_HEADING'));
  assert.ok(codes(fixture(body.replace('Texto sintético de prueba.', '<h2>Oculto</h2>'))).includes('HTML_HEADING'));
  assert.ok(codes(fixture('# Título propio\n\n' + body)).includes('NESTED_HEADING'));
});
test('expressions and JSX cannot produce unchecked dynamic section titles', () => {
  for (const heading of ['## Prueba {secret}', '## Prueba <Title />']) {
    assert.ok(codes(fixture(body.replace('## Prueba', heading))).includes('DYNAMIC_HEADING'));
  }
});
test('protected preambles require a declared section', () => {
  assert.ok(codes(fixture('<SpoilerSection level="sumeru">\nTexto\n</SpoilerSection>\n\n' + body, { spoilerLevel: 'sumeru' })).includes('PREAMBLE_LEVEL'));
});
test('reports parse errors instead of throwing or silently skipping malformed MDX', () => {
  assert.ok(codes(fixture(body.replace('</SpoilerSection>', '</Other>'))).includes('PARSE'));
});
test('YAML duplicate keys, malformed YAML and absent fences fail validation', () => {
  assert.ok(codes(fixture().replace('spoilerLevel: none', 'spoilerLevel: none\nspoilerLevel: none')).includes('YAML'));
  assert.ok(codes('---\nsections: [\n---\n').includes('YAML'));
  assert.ok(codes('## Texto sin frontmatter').includes('FRONTMATTER'));
});
test('preserves original diagnostic lines with BOM and Windows line endings', () => {
  const source = '\uFEFF' + fixture('## Prueba\n\nTEXTO DESCUBIERTO\n').replaceAll('\n', '\r\n');
  const issue = lint(source).find(issue => issue.code === 'UNCOVERED_CONTENT');
  assert.equal(issue.line, source.slice(0, source.indexOf('TEXTO DESCUBIERTO')).split('\n').length);
  assert.equal(issue.column, 1);
});
test('plain Markdown is permitted only with explicit none metadata', () => {
  const markdownFile = file.replace('.mdx', '.md');
  assert.deepEqual(lint(fixture('## Prueba\n\nTexto sin spoilers.', {}, ''), { file: markdownFile }), []);
  assert.ok(lint(fixture('## Prueba\n\nTexto.', { spoilerLevel: 'sumeru' }, ''), { file: markdownFile }).some(issue => issue.code === 'MARKDOWN_SPOILERS'));
});
test('CLI scans collections recursively, excludes underscore drafts and returns failure diagnostics', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'teyvat-editorial-'));
  const collection = path.join(directory, 'chronicles', 'nested');
  await mkdir(collection, { recursive: true });
  try {
    const target = path.join(collection, 'fixture.mdx');
    const specifier = path.relative(collection, componentPath).split(path.sep).join('/');
    await writeFile(target, fixture(body, {}, `import SpoilerSection from '${specifier}';`));
    await writeFile(path.join(collection, '_excluded.mdx'), 'broken input');
    const run = () => spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/check-editorial.mjs', directory], { cwd: root, encoding: 'utf8' });
    const valid = run();
    assert.equal(valid.status, 0, valid.stderr);
    assert.match(valid.stdout, /1 archivos revisados, 0 errores/);
    await writeFile(target, fixture('## Prueba\n\nContenido descubierto.', {}, `import SpoilerSection from '${specifier}';`));
    const invalid = run();
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /fixture\.mdx:\d+:1 \[UNCOVERED_CONTENT\]/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
