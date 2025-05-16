import { Point } from '@src/entities/base/point';
import { rectangleValidator } from '@src/services/validation/rectangle/rectangle-validator';

describe('RectangleGeometryValidator', () => {
  const validator = rectangleValidator;

  test('returns valid for a rectangle with 90-degree angles', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];

    const result = validator.validate(points);

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid for points that do not form a rectangle', () => {
    const points = [new Point(0, 0), new Point(1, 2), new Point(2, 2), new Point(3, 0)];

    const result = validator.validate(points);

    expect(result).toEqual({
      isValid: false,
      reason: 'Rectangle must have all 90-degree angles',
    });
  });
});
