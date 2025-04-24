import { pyramidValidator } from '@src/services/validation/pyramid/pyramid-validator';
import { Point } from '@src/entities/base/point';

describe('pyramidValidator (composite)', () => {
  test('returns valid for fully correct pyramid', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 2);

    const result = pyramidValidator.validate({ base, apex });

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid when base format is wrong (too few points)', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0)];
    const apex = new Point(0.5, 0.5, 2);

    const result = pyramidValidator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Base must have at least 3 points');
  });

  test('returns invalid when geometry is wrong (coplanar)', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 0);

    const result = pyramidValidator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Geometrically invalid pyramid');
  });
});
