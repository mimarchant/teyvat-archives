/** Pending review and spoiler-bearing articles must never populate search excerpts. */
export function isSearchableArticle(entry: { reviewStatus: string; spoilerLevel: string }) {
  return entry.reviewStatus === 'verified' && entry.spoilerLevel === 'none';
}
