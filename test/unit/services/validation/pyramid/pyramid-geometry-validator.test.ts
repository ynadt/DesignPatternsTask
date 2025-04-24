import { PyramidGeometryValidator } from '@src/services/validation/pyramid/pyramid-geometry-validator';
import { Point } from '@src/entities/base/point';

describe('PyramidGeometryValidator', () => {
  const validator = new PyramidGeometryValidator();

  test('returns valid for geometrically correct pyramid', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 2);

    const result = validator.validate({ base, apex });

    expect(result).toEqual({ isValid: true });
  });

  test('returns invalid for coplanar apex (flat pyramid)', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 0);

    const result = validator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Geometrically invalid pyramid');
  });

  test('returns invalid if base has duplicate points', () => {
    const base = [new Point(0, 0, 0), new Point(0, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 1);

    const result = validator.validate({ base, apex });

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Geometrically invalid pyramid');
  });
});
