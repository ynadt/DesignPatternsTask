import { extractShapeMetadata } from '@src/services/parsing/shape-metadata';

describe('extractShapeMetadata', () => {
  test('extracts type and data from a well-formed line', () => {
    const line = 'RECTANGLE 0,0; 0,2; 2,2; 2,0';
    const result = extractShapeMetadata(line);

    expect(result).toEqual({
      type: 'RECTANGLE',
      data: '0,0; 0,2; 2,2; 2,0',
    });
  });

  test('trims extra whitespace around the line', () => {
    const line = '  pyramid    0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1   ';
    const result = extractShapeMetadata(line);

    expect(result).toEqual({
      type: 'PYRAMID',
      data: '0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1',
    });
  });

  test('returns empty data if only type is provided', () => {
    const line = 'TRIANGLE';
    const result = extractShapeMetadata(line);

    expect(result).toEqual({
      type: 'TRIANGLE',
      data: '',
    });
  });

  test('handles multiple spaces between type and data', () => {
    const line = 'RECTANGLE     1,2; 3,4';
    const result = extractShapeMetadata(line);

    expect(result).toEqual({
      type: 'RECTANGLE',
      data: '1,2; 3,4',
    });
  });

  test('handles lowercase type and converts to uppercase', () => {
    const line = 'rectangle 1,2; 3,4';
    const result = extractShapeMetadata(line);

    expect(result.type).toBe('RECTANGLE');
  });
});
