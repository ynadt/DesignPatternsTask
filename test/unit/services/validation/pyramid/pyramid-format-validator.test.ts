import { PyramidFormatValidator } from '@src/services/validation/pyramid/pyramid-format-validator';
import { Point } from '@src/entities/base/point';

describe('PyramidFormatValidator', () => {
  const validator = new PyramidFormatValidator();

  test('returns valid for correct pyramid data', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 2);

    const result = validator.validate({ base, apex });

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid when base has less than 3 points', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0)];
    const apex = new Point(0.5, 0.5, 1);

    const result = validator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Base must have at least 3 points');
  });

  test('returns invalid when apex is not 3D', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(1, 2); // 2D point

    const result = validator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Invalid apex point');
  });

  test('returns invalid when base contains invalid points', () => {
    const base = [new Point(0, 0, 0), new Point(NaN, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(1, 1, 1);

    const result = validator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Invalid base points');
  });
});
