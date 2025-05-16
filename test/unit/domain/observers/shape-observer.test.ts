import { ShapeObserver } from '@src/domain/observers/shape-observer';
import { Warehouse } from '@src/domain/repositories/warehouse';
import { ShapeDataStrategyRegistry } from '@src/strategies/strategy-registry';
import { ShapeDataStrategy } from '@src/interfaces/shape-data-strategy.interface';
import { Shape } from '@src/entities/base/shape';

class DummyShape extends Shape {
  constructor(public override readonly id: string = 'test-shape') {
    super('Dummy');
  }
}

describe('ShapeObserver', () => {
  test('updates shape metrics', () => {
    const shape = new DummyShape();

    const mockStrategy: ShapeDataStrategy = {
      calculateArea: jest.fn().mockReturnValue(10),
      calculateVolume: jest.fn().mockReturnValue(20),
      calculatePerimeter: jest.fn().mockReturnValue(30),
    };

    const warehouse = {
      setMetrics: jest.fn(),
    } as unknown as Warehouse;

    const strategyRegistry = {
      getStrategy: jest.fn().mockReturnValue(mockStrategy),
    } as unknown as ShapeDataStrategyRegistry;

    const observer = new ShapeObserver(warehouse, strategyRegistry);
    observer.update(shape);

    expect(strategyRegistry.getStrategy).toHaveBeenCalledWith(shape);
    expect(warehouse.setMetrics).toHaveBeenCalledWith(shape.id, {
      area: 10,
      volume: 20,
      perimeter: 30,
    });
  });
});
