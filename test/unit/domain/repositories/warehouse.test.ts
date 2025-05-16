// test/unit/domain/repositories/warehouse.test.ts
import { Warehouse } from '@src/domain/repositories/warehouse';
import { Shape } from '@src/entities/base/shape';
import { ShapeMetrics } from '@src/interfaces/shape-metrics.interface';

class DummyShape extends Shape {
  constructor(public readonly id: string) {
    super('Dummy');
  }
}

describe('Warehouse', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    const all = warehouse.getAll();
    for (const key of all.keys()) {
      warehouse.remove(key);
    }
  });

  test('adds shape and initializes empty metrics', () => {
    const shape = new DummyShape('id-1');
    warehouse.add(shape);
    expect(warehouse.get(shape)).toEqual({});
  });

  test('does not overwrite existing metrics when adding again', () => {
    const shape = new DummyShape('id-2');
    warehouse.add(shape);
    warehouse.setMetrics(shape.id, { area: 10 });
    warehouse.add(shape);
    expect(warehouse.get(shape)).toEqual({ area: 10 });
  });

  test('removes shape by id', () => {
    const shape = new DummyShape('id-3');
    warehouse.add(shape);
    warehouse.remove(shape.id);
    expect(warehouse.get(shape)).toBeUndefined();
  });

  test('returns undefined for non-existing shape', () => {
    const shape = new DummyShape('non-existent');
    expect(warehouse.get(shape)).toBeUndefined();
  });

  test('sets and retrieves metrics correctly', () => {
    const shape = new DummyShape('id-4');
    const metrics: ShapeMetrics = { area: 12, volume: 5, perimeter: 6 };
    warehouse.add(shape);
    warehouse.setMetrics(shape.id, metrics);
    expect(warehouse.get(shape)).toEqual(metrics);
  });

  test('getAll returns map of all metrics', () => {
    const shape1 = new DummyShape('id-5');
    const shape2 = new DummyShape('id-6');
    warehouse.add(shape1);
    warehouse.add(shape2);
    warehouse.setMetrics(shape1.id, { area: 5 });
    warehouse.setMetrics(shape2.id, { volume: 9 });

    const all = warehouse.getAll();
    expect(all.size).toBe(2);
    expect(all.get(shape1.id)).toEqual({ area: 5 });
    expect(all.get(shape2.id)).toEqual({ volume: 9 });
  });
});
