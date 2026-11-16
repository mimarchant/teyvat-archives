import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { contentRevision } from '../src/lib/content-revision.ts';

const headings = [{ depth: 2, slug: 'introducción', text: 'Introducción' }];
const date = '2026-11-16T00:00:00.000Z';
test('Web Crypto produces exactly the previous revision, including Unicode and empty bodies', async () => {
  for (const body of ['', 'Texto con ñ y símbolos ✧', 'Primera línea\r\nSegunda línea\rFin']) {
    const previous = createHash('sha256').update(body.replace(/\r\n?/g, '\n'))
      .update(JSON.stringify(headings)).update(date).digest('hex').slice(0, 16);
    assert.equal(await contentRevision(body, headings, date), previous);
  }
});
test('normalizes line endings while still detecting actual content, heading and date changes', async () => {
  const revision = await contentRevision('A\nB', headings, date);
  assert.equal(await contentRevision('A\r\nB', headings, date), revision);
  assert.notEqual(await contentRevision('A\nC', headings, date), revision);
  assert.notEqual(await contentRevision('A\nB', [], date), revision);
  assert.notEqual(await contentRevision('A\nB', headings, '2026-11-17T00:00:00.000Z'), revision);
});
test('revision helper typechecks without resolving external packages or automatic Node types', () => {
  const source = fileURLToPath(new URL('../src/lib/content-revision.ts', import.meta.url));
  const program = ts.createProgram([source], {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'], types: [], noResolve: true,
    strict: true, noEmit: true, skipLibCheck: true,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.deepEqual(diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')), []);
});
