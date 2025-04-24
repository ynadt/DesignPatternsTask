import { PyramidDataParser } from '@src/services/parsing/pyramid-data-parser';
import { Point } from '@src/entities/base/point';
import { InvalidShapeDataError } from '@src/core/errors/errors';

describe('PyramidDataParser', () => {
  test('parses valid pyramid data with base and apex', () => {
    const input = '0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1';
    const result = PyramidDataParser.parse(input);

    expect(result.base).toEqual([new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)]);
    expect(result.apex).toEqual(new Point(0.5, 0.5, 1));
  });

  test('throws error if apex is missing', () => {
    const input = '0,0,0; 1,0,0; 0,1,0 |';
    expect(() => PyramidDataParser.parse(input)).toThrow(InvalidShapeDataError);
  });

  test('throws error if base is missing', () => {
    const input = '| 0.5,0.5,1';
    expect(() => PyramidDataParser.parse(input)).toThrow(InvalidShapeDataError);
  });

  test('throws error if apex contains multiple points', () => {
    const input = '0,0,0; 1,0,0; 0,1,0 | 1,1,1; 2,2,2';
    expect(() => PyramidDataParser.parse(input)).toThrow(InvalidShapeDataError);
  });

  test('throws error if points are malformed', () => {
    const input = '0,0; 1,0,0 | 0.5,0.5,1';
    expect(() => PyramidDataParser.parse(input)).toThrow();
  });

  test('trims extra spaces and still parses', () => {
    const input = ' 0,0,0 ; 1,0,0 ; 0,1,0 | 0.5 , 0.5 , 1 ';
    const result = PyramidDataParser.parse(input);
    expect(result.base.length).toBe(3);
    expect(result.apex).toEqual(new Point(0.5, 0.5, 1));
  });
});
