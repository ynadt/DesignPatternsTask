// src/domain/observers/shape-observer.ts
import { Observer } from '@src/interfaces/observer.interface';
import { Shape } from '@src/entities/base/shape';
import { Warehouse } from '@src/domain/repositories/warehouse';
import { ShapeDataStrategyRegistry } from '@src/strategies/strategy-registry';
import { ShapeDataStrategy } from '@src/interfaces/shape-data-strategy.interface';

export class ShapeObserver implements Observer<Shape> {
  constructor(
    private readonly warehouse: Warehouse,
    private readonly strategyRegistry: ShapeDataStrategyRegistry,
  ) {}

  update(shape: Shape): void {
    const strategy: ShapeDataStrategy = this.strategyRegistry.getStrategy(shape);

    const area = strategy.calculateArea(shape);
    const volume = strategy.calculateVolume(shape);
    const perimeter = strategy.calculatePerimeter(shape);

    this.warehouse.setMetrics(shape.id, { area, volume, perimeter });
  }
}
