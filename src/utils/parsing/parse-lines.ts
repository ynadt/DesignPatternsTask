/**
 * Splits raw file content into trimmed, non-empty lines, ignoring comments.
 */
export function parseLines(content: string): string[] {
  return content
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('#'))
    .map((line) => line.trim())
    .filter(Boolean);
}
