// test/unit/domain/specifications/shape-specifications.test.ts
import { Rectangle } from '@src/entities/2d/rectangle';
import { Point } from '@src/entities/base/point';
import {
  DistanceRangeSpecification,
  FirstQuadrantSpecification,
  IdSpecification,
  NameSpecification,
  SurfaceRangeSpecification,
} from '@src/domain/specifications/shape-specifications';
import { Warehouse } from '@src/domain/repositories/warehouse';

class DummyRectangle extends Rectangle {
  constructor(id: string, offsetX = 0, offsetY = 0) {
    super([
      new Point(offsetX, offsetY),
      new Point(offsetX, offsetY + 2),
      new Point(offsetX + 3, offsetY + 2),
      new Point(offsetX + 3, offsetY),
    ]);
    (this as any).id = id;
  }
}

describe('Shape Specifications', () => {
  test('IdSpecification matches correct id', () => {
    const shape = new DummyRectangle('abc123');
    const spec = new IdSpecification('abc123');
    expect(spec.isSatisfiedBy(shape)).toBe(true);
  });

  test('NameSpecification matches correct name', () => {
    const shape = new DummyRectangle('abc123');
    const spec = new NameSpecification('Rectangle');
    expect(spec.isSatisfiedBy(shape)).toBe(true);
  });

  test('FirstQuadrantSpecification returns true for positive coordinates', () => {
    const shape = new DummyRectangle('q1', 1, 1);
    const spec = new FirstQuadrantSpecification();
    expect(spec.isSatisfiedBy(shape)).toBe(true);
  });

  test('FirstQuadrantSpecification returns false for negative coordinates', () => {
    const shape = new DummyRectangle('q2', -2, -2);
    const spec = new FirstQuadrantSpecification();
    expect(spec.isSatisfiedBy(shape)).toBe(false);
  });

  test('SurfaceRangeSpecification returns true when area is in range', () => {
    const shape = new DummyRectangle('r1');
    const warehouse = Warehouse.getInstance();
    warehouse.setMetrics('r1', { area: 6, volume: 0, perimeter: 0 });
    const spec = new SurfaceRangeSpecification(warehouse, 5, 10);
    expect(spec.isSatisfiedBy(shape)).toBe(true);
  });

  test('SurfaceRangeSpecification returns false when area is out of range', () => {
    const shape = new DummyRectangle('r2');
    const warehouse = Warehouse.getInstance();
    warehouse.setMetrics('r2', { area: 3, volume: 0, perimeter: 0 });
    const spec = new SurfaceRangeSpecification(warehouse, 5, 10);
    expect(spec.isSatisfiedBy(shape)).toBe(false);
  });

  test('DistanceRangeSpecification returns true for point within range', () => {
    const shape = new DummyRectangle('d1', 3, 4); // (3,4) distance = 5
    const spec = new DistanceRangeSpecification(4, 6);
    expect(spec.isSatisfiedBy(shape)).toBe(true);
  });

  test('DistanceRangeSpecification returns false for point outside range', () => {
    const shape = new DummyRectangle('d2', 10, 10); // (10,10) distance ~14.14
    const spec = new DistanceRangeSpecification(0, 10);
    expect(spec.isSatisfiedBy(shape)).toBe(false);
  });
});
