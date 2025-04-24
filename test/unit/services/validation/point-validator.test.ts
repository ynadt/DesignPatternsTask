import { Point } from '@src/entities/base/point';
import { PointValidator } from '@src/services/validation/point-validator';

describe('PointValidator', () => {
  describe('isValid', () => {
    test('returns true for valid 2D point', () => {
      const point = new Point(1, 2);
      expect(PointValidator.isValid(point, 2)).toBe(true);
    });

    test('returns false for point with wrong dimension', () => {
      const point = new Point(1, 2, 3);
      expect(PointValidator.isValid(point, 2)).toBe(false);
    });

    test('returns false for NaN coordinate', () => {
      const point = new Point(1, NaN);
      expect(PointValidator.isValid(point, 2)).toBe(false);
    });
  });

  describe('isArrayValid', () => {
    test('returns true for valid array of 2D points', () => {
      const points = [new Point(1, 2), new Point(3, 4)];
      expect(PointValidator.isArrayValid(points, 2)).toBe(true);
    });

    test('returns false if one point is invalid', () => {
      const points = [new Point(1, 2), new Point(3)];
      expect(PointValidator.isArrayValid(points, 2)).toBe(false);
    });
  });

  describe('hasValidFormat', () => {
    test('returns true for valid 2D coordinate strings', () => {
      const coords = ['1', '2'];
      expect(PointValidator.hasValidFormat(coords, 2)).toBe(true);
    });

    test('returns false for wrong number of coordinates', () => {
      const coords = ['1'];
      expect(PointValidator.hasValidFormat(coords, 2)).toBe(false);
    });

    test('returns false for non-numeric values', () => {
      const coords = ['1', 'abc'];
      expect(PointValidator.hasValidFormat(coords, 2)).toBe(false);
    });
  });
});
