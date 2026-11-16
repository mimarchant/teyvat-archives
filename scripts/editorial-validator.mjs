import path from 'node:path';
import ts from 'typescript';
import { parseDocument } from 'yaml';
import { markdownToMdast, mdxToMdast } from 'satteri';
import { spoilerLevels } from '../src/data/spoilers.ts';

export { spoilerLevels };
const validLevel = value => spoilerLevels.includes(value);
const normalizeTitle = title => title.normalize('NFC').trim().replace(/\s+/gu, ' ');
const textOf = node => node.value ?? node.alt ?? (node.children ?? []).map(textOf).join('');
const hasDynamicHeading = node => node.type.startsWith('mdx') || (node.children ?? []).some(hasDynamicHeading);
const isComment = node => ['mdxFlowExpression', 'mdxTextExpression'].includes(node.type) &&
  /^(?:\s|\/\*[\s\S]*?\*\/)*$/u.test(node.value ?? '');

/** Structural lint only: never evaluates imports, expressions, or the article's lore. */
export function validateEditorial(source, { file, componentPath }) {
  const diagnostics = [];
  const add = (code, message, node) => diagnostics.push({ file, line: node?.position?.start?.line ?? 1,
    column: node?.position?.start?.column ?? 1, code, message });
  const input = source.replace(/^\uFEFF/u, '');
  const frontmatter = /^(---)[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/u.exec(input);
  if (!frontmatter) {
    add('FRONTMATTER', 'Falta un bloque YAML inicial delimitado por --- o no está cerrado.');
    return diagnostics;
  }
  const yaml = parseDocument(frontmatter[2]);
  if (yaml.errors.length) {
    for (const error of yaml.errors) diagnostics.push({ file, line: (error.linePos?.[0]?.line ?? 1) + 1,
      column: error.linePos?.[0]?.col ?? 1, code: 'YAML', message: error.message.split('\n')[0] });
    return diagnostics;
  }
  let data;
  try { data = yaml.toJS({ maxAliasCount: 100 }); }
  catch (error) { add('YAML', error.message); return diagnostics; }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    add('FRONTMATTER', 'El frontmatter debe ser un objeto YAML.'); return diagnostics;
  }
  if (!validLevel(data.spoilerLevel)) add('ARTICLE_LEVEL', 'spoilerLevel del artículo debe ser un nivel admitido.');
  if (!Array.isArray(data.sections)) add('SECTIONS', 'Declara sections como una lista, incluso si está vacía.');
  const sections = Array.isArray(data.sections) ? data.sections : [];
  const declared = new Map();
  const ids = new Set();
  for (const section of sections) {
    if (!section || typeof section !== 'object' || Array.isArray(section)) {
      add('SECTION_METADATA', 'Cada sección necesita id, title y spoilerLevel.'); continue;
    }
    if (typeof section.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(section.id)) {
      add('SECTION_ID', 'El id de sección debe usar minúsculas, números y guiones.');
    } else if (ids.has(section.id)) add('DUPLICATE_ID', `Id de sección duplicado: ${section.id}.`);
    ids.add(section.id);
    if (typeof section.title !== 'string' || !section.title.trim()) {
      add('SECTION_TITLE', 'Cada sección necesita un title no vacío.'); continue;
    }
    const title = normalizeTitle(section.title);
    if (declared.has(title)) add('DUPLICATE_TITLE', `Título de sección duplicado: ${title}.`);
    declared.set(title, section);
    if (!validLevel(section.spoilerLevel)) add('SECTION_LEVEL', `Nivel inválido en la sección «${title}».`);
    else if (validLevel(data.spoilerLevel) && spoilerLevels.indexOf(section.spoilerLevel) > spoilerLevels.indexOf(data.spoilerLevel)) {
      add('ARTICLE_UNDERRATED', `El nivel de «${title}» supera el spoilerLevel del artículo.`);
    }
  }

  const plainMarkdown = path.extname(file).toLowerCase() === '.md';
  if (plainMarkdown && (data.spoilerLevel !== 'none' || sections.some(section => section?.spoilerLevel !== 'none'))) {
    add('MARKDOWN_SPOILERS', 'Un archivo .md solo admite niveles none. Usa .mdx y SpoilerSection para contenido con spoilers.');
  }
  // Retain every newline so diagnostics point into the original file (including CRLF).
  const body = frontmatter[0].replace(/[^\r\n]/gu, ' ') + input.slice(frontmatter[0].length);
  let tree;
  try { tree = (plainMarkdown ? markdownToMdast : mdxToMdast)(body); }
  catch (error) {
    const location = /^(\d+):(\d+):/u.exec(error.message);
    diagnostics.push({ file, line: Number(location?.[1] ?? 1), column: Number(location?.[2] ?? 1),
      code: 'PARSE', message: error.message });
    return diagnostics;
  }

  const wrappers = new Set();
  for (const node of tree.children.filter(node => node.type === 'mdxjsEsm')) {
    const esm = ts.createSourceFile(file + '.ts', node.value, ts.ScriptTarget.Latest, true);
    for (const statement of esm.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
      const imported = statement.importClause?.name?.text;
      const specifier = statement.moduleSpecifier.text;
      if (imported && specifier.startsWith('.') && path.resolve(path.dirname(file), specifier) === path.resolve(componentPath)) {
        wrappers.add(imported);
      }
    }
  }
  let current;
  let currentHeading;
  let covered = 0;
  const seenTitles = new Set();
  const finishSection = () => {
    if (current && covered === 0) add('EMPTY_SECTION', `La sección «${current.title}» no tiene contenido clasificado.`, currentHeading);
  };
  function visit(node, protectedBy = false, wrapperDepth = 0) {
    if (isComment(node) || node.type === 'definition') return;
    if (node.type === 'heading' && node.depth <= 2) {
      add('NESTED_HEADING', 'Los encabezados ## deben estar en la raíz, fuera de componentes; no uses # dentro del artículo.', node);
      return;
    }
    const jsx = node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
    if (jsx && ['h1', 'h2'].includes(node.name)) {
      add('HTML_HEADING', 'Usa encabezados Markdown ## en la raíz, en lugar de etiquetas HTML h1/h2.', node);
    }
    if (jsx && (wrappers.has(node.name) || node.name === 'SpoilerSection')) {
      if (!wrappers.has(node.name)) add('WRAPPER_IMPORT', 'Importa el componente editorial SpoilerSection real, no otro componente con el mismo nombre.', node);
      if (wrapperDepth) add('NESTED_WRAPPER', 'No anides bloques SpoilerSection; divide el contenido en bloques hermanos.', node);
      const attrs = node.attributes ?? [];
      const levels = attrs.filter(attr => attr.name === 'level');
      const level = levels.length === 1 && typeof levels[0].value === 'string' ? levels[0].value : undefined;
      if (!validLevel(level) || attrs.some(attr => attr.type !== 'mdxJsxAttribute')) {
        add('BLOCK_LEVEL', 'SpoilerSection necesita un único level literal válido, sin expresiones ni atributos expandidos.', node);
      }
      if (current && validLevel(level) && level !== current.spoilerLevel) {
        add('LEVEL_MISMATCH', `El bloque usa ${level}, pero «${current.title}» declara ${current.spoilerLevel}.`, node);
      }
      if (!currentHeading && level !== 'none') add('PREAMBLE_LEVEL', 'El preámbulo solo admite bloques level="none". Usa una sección declarada para spoilers.', node);
      if (validLevel(level) && validLevel(data.spoilerLevel) && spoilerLevels.indexOf(level) > spoilerLevels.indexOf(data.spoilerLevel)) {
        add('ARTICLE_UNDERRATED', 'El nivel del bloque supera el spoilerLevel del artículo.', node);
      }
      if (!(node.children ?? []).some(child => !isComment(child))) add('EMPTY_BLOCK', 'El bloque SpoilerSection está vacío.', node);
      covered++;
      for (const child of node.children ?? []) visit(child, true, wrapperDepth + 1);
      return;
    }
    if (!protectedBy && !plainMarkdown) {
      add('UNCOVERED_CONTENT', currentHeading
        ? 'Contenido fuera de SpoilerSection: clasifícalo con el nivel declarado para esta sección.'
        : 'El contenido antes del primer ## debe estar dentro de SpoilerSection level="none".', node);
      return;
    }
    if (plainMarkdown) covered++;
    for (const child of node.children ?? []) visit(child, protectedBy, wrapperDepth);
  }
  for (const node of tree.children) {
    if (node.type === 'mdxjsEsm' || isComment(node)) continue;
    if (node.type === 'heading' && node.depth === 2) {
      finishSection();
      if (hasDynamicHeading(node)) add('DYNAMIC_HEADING', 'Los títulos ## deben ser texto Markdown estático, sin expresiones ni componentes MDX.', node);
      const title = normalizeTitle(textOf(node));
      currentHeading = node; current = declared.get(title); covered = 0;
      if (seenTitles.has(title)) add('DUPLICATE_HEADING', `Encabezado ## duplicado: ${title}.`, node);
      seenTitles.add(title);
      if (!current) add('UNDECLARED_SECTION', `Falta declarar «${title}» en sections del frontmatter.`, node);
      continue;
    }
    visit(node);
  }
  finishSection();
  for (const [title] of declared) {
    if (!seenTitles.has(title)) add('STALE_SECTION', `La sección declarada «${title}» no tiene un encabezado ## correspondiente.`);
  }
  return diagnostics;
}
