export interface ReadingProgress {
  version: 1;
  revision: string;
  anchor: string;
  offset: number;
  percent: number;
  completed: boolean;
  savedAt: number;
}
export interface ProgressStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export interface ReadingMarker { id: string; top: number }
export const readingStorageKey = (collection: string, id: string) =>
  `teyvat-archives:reading:v1:${encodeURIComponent(collection)}:${encodeURIComponent(id)}`;
const boundedText = (value: unknown, limit: number): value is string =>
  typeof value === 'string' && value.length > 0 && value.length <= limit && !/[\u0000-\u001f]/u.test(value);
const fraction = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function decodeProgress(raw: string | null): ReadingProgress | null {
  if (!raw || raw.length > 4096) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !boundedText(value.revision, 128) || !boundedText(value.anchor, 256) ||
      !fraction(value.offset) || !Number.isInteger(value.percent) || value.percent < 0 || value.percent > 100 ||
      typeof value.completed !== 'boolean' || !Number.isSafeInteger(value.savedAt) || value.savedAt < 0) return null;
    return { version: 1, revision: value.revision, anchor: value.anchor, offset: value.offset,
      percent: value.percent, completed: value.completed, savedAt: value.savedAt };
  } catch { return null; }
}

export function loadProgress(storage: ProgressStorage | null, key: string) {
  if (!storage) return { record: null, available: false, invalid: false };
  try {
    const raw = storage.getItem(key);
    const record = decodeProgress(raw);
    return { record, available: true, invalid: raw !== null && !record };
  } catch { return { record: null, available: false, invalid: false }; }
}
export function saveProgress(storage: ProgressStorage | null, key: string, record: ReadingProgress) {
  try { if (!storage) return false; storage.setItem(key, JSON.stringify(record)); return true; }
  catch { return false; }
}
export function clearProgress(storage: ProgressStorage | null, key: string) {
  try { if (!storage) return false; storage.removeItem(key); return true; }
  catch { return false; }
}

/** Geometry is measured against the rendered article layout. */
export function readingPosition(scrollTop: number, viewportHeight: number, articleTop: number, articleBottom: number,
  markers: readonly ReadingMarker[]) {
  const line = scrollTop + Math.min(120, viewportHeight * 0.2);
  const index = Math.max(0, markers.findLastIndex(marker => marker.top <= line));
  const marker = markers[index];
  if (!marker) return null;
  const end = markers[index + 1]?.top ?? articleBottom;
  const offset = clamp((line - marker.top) / Math.max(1, end - marker.top));
  const height = articleBottom - articleTop;
  const percent = Math.round(100 * (height <= viewportHeight
    ? (scrollTop + viewportHeight >= articleBottom ? 1 : 0)
    : clamp((scrollTop - articleTop) / (height - viewportHeight))));
  return { anchor: marker.id, offset, percent };
}

/** Unknown anchors fall back to the article start; changed sections ignore stale offsets. */
export function resumePosition(record: ReadingProgress, revision: string, markers: readonly ReadingMarker[],
  articleBottom: number, viewportHeight: number) {
  const index = markers.findIndex(marker => marker.id === record.anchor);
  const marker = markers[index < 0 ? 0 : index];
  if (!marker) return null;
  const sameRevision = record.revision === revision;
  const end = markers[(index < 0 ? 0 : index) + 1]?.top ?? articleBottom;
  const offset = index < 0 || !sameRevision ? 0 : record.offset;
  const top = Math.max(0, marker.top + Math.max(0, end - marker.top - 1) * offset - Math.min(120, viewportHeight * 0.2));
  return { anchor: marker.id, top, missing: index < 0, changed: !sameRevision };
}
