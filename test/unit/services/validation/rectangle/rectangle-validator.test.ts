import { rectangleValidator } from '@src/services/validation/rectangle/rectangle-validator';
import { Point } from '@src/entities/base/point';

describe('rectangleValidator (composite)', () => {
  test('returns valid for a correct rectangle', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];

    const result = rectangleValidator.validate(points);

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid when rectangle has wrong number of points', () => {
    const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2)];

    const result = rectangleValidator.validate(points);

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Rectangle must have 4 points');
  });

  test('returns invalid when rectangle has incorrect angles', () => {
    const points = [new Point(0, 0), new Point(1, 2), new Point(2, 2), new Point(3, 0)];

    const result = rectangleValidator.validate(points);

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Rectangle must have all 90-degree angles');
  });
});
