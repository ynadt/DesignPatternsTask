// test/unit/utils/parsing/parse-lines.test.ts
import { parseLines } from '@src/utils/parsing/parse-lines';

describe('parseLines', () => {
  test('returns trimmed non-empty lines excluding comments and empty lines', () => {
    const content = `
      # This is a comment
      RECTANGLE 0,0; 0,2; 2,2; 2,0

      PYRAMID 0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1

      # Another comment
    `;

    const result = parseLines(content);

    expect(result).toEqual([
      'RECTANGLE 0,0; 0,2; 2,2; 2,0',
      'PYRAMID 0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1',
    ]);
  });

  test('returns empty array for empty content', () => {
    const result = parseLines('');
    expect(result).toEqual([]);
  });

  test('trims leading/trailing whitespace from each line', () => {
    const content = '   RECTANGLE 0,0; 0,1; 1,1; 1,0   \n   ';
    const result = parseLines(content);
    expect(result).toEqual(['RECTANGLE 0,0; 0,1; 1,1; 1,0']);
  });
});
