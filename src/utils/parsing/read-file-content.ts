import fs from 'fs';

export function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}
