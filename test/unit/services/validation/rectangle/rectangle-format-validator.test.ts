import { RectangleFormatValidator } from '@src/services/validation/rectangle/rectangle-format-validator';
import { Point } from '@src/entities/base/point';

describe('RectangleFormatValidator', () => {
  const validator = new RectangleFormatValidator();

  test('returns valid for correct rectangle with 4 valid 2D points', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];

    const result = validator.validate(points);

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid when number of points is not 4', () => {
    const points = [
      new Point(0, 0),
      new Point(1, 1),
      new Point(2, 2), // Only 3 points
    ];

    const result = validator.validate(points);

    expect(result).toEqual({
      isValid: false,
      reason: 'Rectangle must have 4 points',
    });
  });

  test('returns invalid when a point is not 2D', () => {
    const points = [
      new Point(0, 0),
      new Point(0, 1, 5), // 3D point
      new Point(1, 1),
      new Point(1, 0),
    ];

    const result = validator.validate(points);

    expect(result).toEqual({
      isValid: false,
      reason: 'Invalid 2D point format in rectangle',
    });
  });
});
