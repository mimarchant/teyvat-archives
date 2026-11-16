/** Keep the existing SHA-256 revision format without requiring ambient Node types. */
export async function contentRevision(body: string, headings: readonly unknown[], updatedAt: string) {
  const input = body.replace(/\r\n?/g, '\n') + JSON.stringify(headings) + updatedAt;
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('').slice(0, 16);
}
