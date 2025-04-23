// src/services/parsing/shape-metadata.ts
export function extractShapeMetadata(line: string): { type: string; data: string } {
  const [typeRaw, ...rest] = line.trim().split(' ');
  return {
    type: typeRaw.toUpperCase(),
    data: rest.join(' ').trim(),
  };
}
