import { Point } from '../../../src/entities/base/point';
import {
  getDistance,
  getVector,
  areColinear,
  crossProductZ,
  angleBetween,
  polygonArea,
  areAllSidesEqual,
  areSidesParallel,
} from '../../../src/utils/geometry';

describe('geometry utils', () => {
  test('getDistance returns correct Euclidean distance', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 4);
    expect(getDistance(p1, p2)).toBe(5);
  });

  test('getVector returns correct vector', () => {
    expect(getVector(new Point(1, 2), new Point(4, 6))).toEqual([3, 4]);
  });

  test('areColinear returns true for colinear points', () => {
    expect(areColinear(new Point(0, 0), new Point(1, 1), new Point(2, 2))).toBe(true);
  });

  test('areColinear returns false for non-colinear points', () => {
    expect(areColinear(new Point(0, 0), new Point(1, 1), new Point(2, 3))).toBe(false);
  });

  test('crossProductZ returns correct sign', () => {
    expect(crossProductZ(new Point(0, 0), new Point(1, 0), new Point(1, 1))).toBeGreaterThan(0);
  });

  test('angleBetween returns 90 degrees in radians', () => {
    const result = angleBetween(new Point(1, 0), new Point(0, 0), new Point(0, 1));
    expect(result).toBeCloseTo(Math.PI / 2);
  });

  test('polygonArea returns correct value for square', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];
    expect(polygonArea(points)).toBe(4);
  });

  test('polygonArea returns 0 for degenerate polygon', () => {
    const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2)];
    expect(polygonArea(points)).toBe(0);
  });

  test('areAllSidesEqual returns true for square', () => {
    const square = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];
    expect(areAllSidesEqual(square)).toBe(true);
  });

  test('areAllSidesEqual returns false for non-square rectangle', () => {
    const rectangle = [new Point(0, 0), new Point(0, 2), new Point(4, 2), new Point(4, 0)];
    expect(areAllSidesEqual(rectangle)).toBe(false);
  });

  test('areSidesParallel returns true for parallel sides', () => {
    expect(
      areSidesParallel(new Point(0, 0), new Point(2, 0), new Point(0, 1), new Point(2, 1)),
    ).toBe(true);
  });

  test('getDistance returns 0 for identical points', () => {
    expect(getDistance(new Point(1, 1), new Point(1, 1))).toBe(0);
  });

  test('getVector returns zero vector for identical points', () => {
    expect(getVector(new Point(3, 3), new Point(3, 3))).toEqual([0, 0]);
  });
});
