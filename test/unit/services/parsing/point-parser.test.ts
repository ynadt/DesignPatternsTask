import { parsePoints } from '@src/services/parsing/point-parser';
import { Point } from '@src/entities/base/point';
import { InvalidPointFormatError } from '@src/core/errors/errors';

describe('parsePoints', () => {
  test('parses a single valid 2D point', () => {
    const input = '1.5, 2.3';
    const result = parsePoints(input, 2);
    expect(result).toEqual([new Point(1.5, 2.3)]);
  });

  test('parses a single valid 3D point', () => {
    const input = '1,2,3';
    const result = parsePoints(input, 3);
    expect(result).toEqual([new Point(1, 2, 3)]);
  });

  test('parses multiple points separated by ;', () => {
    const input = '1,1; 2,2; 3,3';
    const result = parsePoints(input, 2);
    expect(result).toEqual([new Point(1, 1), new Point(2, 2), new Point(3, 3)]);
  });

  test('trims whitespace in coordinates and separators', () => {
    const input = '  1 , 2  ;  3,4 ';
    const result = parsePoints(input, 2);
    expect(result).toEqual([new Point(1, 2), new Point(3, 4)]);
  });

  test('throws error if point has too few coordinates', () => {
    const input = '1.0';
    expect(() => parsePoints(input, 2)).toThrow(InvalidPointFormatError);
  });

  test('throws error if point has non-numeric coordinate', () => {
    const input = '1,a';
    expect(() => parsePoints(input, 2)).toThrow(InvalidPointFormatError);
  });

  test('throws error if point has too many coordinates', () => {
    const input = '1,2,3,4';
    expect(() => parsePoints(input, 3)).toThrow(InvalidPointFormatError);
  });

  test('parses mixed spacing and still succeeds', () => {
    const input = '  0 ,0 ;  1, 1 ;2 , 2';
    const result = parsePoints(input, 2);
    expect(result).toEqual([new Point(0, 0), new Point(1, 1), new Point(2, 2)]);
  });
});
