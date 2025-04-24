import { Point } from '@src/entities/base/point';
import { Pyramid } from '@src/entities/3d/pyramid';
import { PyramidInspector } from '@src/services/geometry/pyramid-inspector';

describe('PyramidInspector', () => {
  const inspector = new PyramidInspector();

  test('isValidPyramid returns true for valid triangular pyramid', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 5);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isValidPyramid(pyramid)).toBe(true);
  });

  test('isValidPyramid returns false if base has less than 3 points', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0)];
    const apex = new Point(0, 0, 1);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isValidPyramid(pyramid)).toBe(false);
  });

  test('isValidPyramid returns false if base has duplicate points', () => {
    const base = [new Point(0, 0, 0), new Point(0, 0, 0), new Point(1, 1, 0)];
    const apex = new Point(0, 0, 5);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isValidPyramid(pyramid)).toBe(false);
  });

  test('isValidPyramid returns false if apex is coplanar with base', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 0);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isValidPyramid(pyramid)).toBe(false);
  });

  test('isBaseOnPlane returns true when base lies on XY plane', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(1, 1, 0)];
    const apex = new Point(1, 1, 2);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isBaseOnPlane(pyramid, 'XY')).toBe(true);
  });

  test('isBaseOnPlane returns false when base does not lie on XY plane', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 1), new Point(0, 1, 0)];
    const apex = new Point(0, 0, 3);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.isBaseOnPlane(pyramid, 'XY')).toBe(false);
  });

  test('getSectionVolumeRatio returns 1 when apex height is near zero', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 0);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.getSectionVolumeRatio(pyramid, 'XY')).toBe(1);
  });

  test('getSectionVolumeRatio returns cube of height ratio', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 6);
    const pyramid = new Pyramid(base, apex);
    expect(inspector.getSectionVolumeRatio(pyramid, 'XY')).toBeCloseTo(1);
  });
});
