import { Point } from '@src/entities/base/point';
import { Pyramid } from '@src/entities/3d/pyramid';
import { PyramidMathService } from '@src/services/geometry/pyramid-math';

describe('PyramidMathService', () => {
  const service = new PyramidMathService();

  test('getBaseArea returns correct area for triangular base', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 5);
    const pyramid = new Pyramid(base, apex);

    const result = service.getBaseArea(pyramid);

    expect(result).toBe(6);
  });

  test('getHeight returns Z-distance from apex to XY plane', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0, 0, 5);
    const pyramid = new Pyramid(base, apex);

    const height = service.getHeight(pyramid);

    expect(height).toBe(5);
  });

  test('getVolume returns correct volume for pyramid', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 6);
    const pyramid = new Pyramid(base, apex);

    const volume = service.getVolume(pyramid);

    expect(volume).toBeCloseTo(12);
  });

  test('getSideAreas returns positive area for triangular pyramid', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 6);
    const pyramid = new Pyramid(base, apex);

    const result = service.getSideAreas(pyramid);

    expect(result).toBeGreaterThan(0);
  });

  test('getSurfaceArea returns sum of base and side areas', () => {
    const base = [new Point(0, 0, 0), new Point(4, 0, 0), new Point(0, 3, 0)];
    const apex = new Point(0, 0, 6);
    const pyramid = new Pyramid(base, apex);

    const result = service.getSurfaceArea(pyramid);

    const baseArea = service.getBaseArea(pyramid);
    const sideAreas = service.getSideAreas(pyramid);
    expect(result).toBeCloseTo(baseArea + sideAreas);
  });

  test('getVolume returns 0 for flat pyramid (apex on base)', () => {
    const base = [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0)];
    const apex = new Point(0.5, 0.5, 0);
    const pyramid = new Pyramid(base, apex);

    const result = service.getVolume(pyramid);

    expect(result).toBe(0);
  });
});
