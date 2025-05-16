// test/unit/services/geometry/pyramid-inspector.test.ts
import { Point } from '@src/entities/base/point';
import { Pyramid } from '@src/entities/3d/pyramid';
import { PyramidInspector } from '@src/services/geometry/pyramid-inspector';
import { pyramidValidator } from '@src/services/validation/pyramid/pyramid-validator';
import { InvalidShapeDataError } from '@src/core/errors/errors';

describe('PyramidInspector', () => {
  const inspector = new PyramidInspector();

  const safePyramid = (base: Point[], apex: Point): Pyramid => {
    const result = pyramidValidator.validate({ base, apex });
    if (!result.isValid)
      throw new InvalidShapeDataError(`Invalid pyramid data: ${result.reason ?? ''}`);
    return new Pyramid(base, apex);
  };

  test('isValidPyramid returns true for valid triangular pyramid', () => {
    const pyramid = safePyramid(
      [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)],
      new Point(0, 0, 5),
    );
    expect(inspector.isValidPyramid(pyramid)).toBe(true);
  });

  test('isValidPyramid returns false if base has less than 3 points', () => {
    const data = { base: [new Point(0, 0, 0), new Point(1, 0, 0)], apex: new Point(0, 0, 1) };
    expect(inspector.isValidPyramidData(data)).toBe(false);
  });

  test('isValidPyramid returns false if base has duplicate points', () => {
    const data = {
      base: [new Point(0, 0, 0), new Point(0, 0, 0), new Point(1, 1, 0)],
      apex: new Point(0, 0, 5),
    };
    expect(inspector.isValidPyramidData(data)).toBe(false);
  });

  test('isValidPyramid returns false if apex is coplanar with base', () => {
    const data = {
      base: [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)],
      apex: new Point(0.5, 0.5, 0),
    };
    expect(inspector.isValidPyramidData(data)).toBe(false);
  });

  test('isBaseOnPlane returns true when base lies on XY plane', () => {
    const pyramid = safePyramid(
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(1, 1, 0)],
      new Point(1, 1, 2),
    );
    expect(inspector.isBaseOnPlane(pyramid, 'XY')).toBe(true);
  });

  test('isBaseOnPlane returns false when base does not lie on XY plane', () => {
    const pyramid = safePyramid(
      [new Point(0, 0, 0), new Point(1, 0, 1), new Point(0, 1, 0)],
      new Point(0, 0, 3),
    );
    expect(inspector.isBaseOnPlane(pyramid, 'XY')).toBe(false);
  });

  test('getSectionVolumeRatio returns cube of height ratio', () => {
    const pyramid = safePyramid(
      [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)],
      new Point(0, 0, 6),
    );
    expect(inspector.getSectionVolumeRatio(pyramid, 'XY')).toBeCloseTo(1);
  });
});
