// src/strategies/strategy-registry.ts
import { Shape } from '@src/entities/base/shape';
import { Rectangle } from '@src/entities/2d/rectangle';
import { Pyramid } from '@src/entities/3d/pyramid';
import { RectangleMathService } from '@src/services/geometry/rectangle-math';
import { PyramidMathService } from '@src/services/geometry/pyramid-math';
import { RectangleDataStrategy } from '@src/strategies/rectangle-data-strategy';
import { PyramidDataStrategy } from '@src/strategies/pyramid-data-strategy';
import { ShapeDataStrategy } from '@src/interfaces/shape-data-strategy.interface';

export class ShapeDataStrategyRegistry {
  private registry: Map<new (...args: any[]) => Shape, ShapeDataStrategy> = new Map();

  constructor(
    private rectangleMathService: RectangleMathService,
    private pyramidMathService: PyramidMathService,
  ) {
    this.registry.set(Rectangle, new RectangleDataStrategy(this.rectangleMathService));
    this.registry.set(Pyramid, new PyramidDataStrategy(this.pyramidMathService));
  }

  getStrategy(shape: Shape): ShapeDataStrategy {
    const strategy = this.registry.get(shape.constructor as new (...args: any[]) => Shape);
    if (!strategy) {
      throw new Error(`No strategy found for shape: ${shape.constructor.name}`);
    }
    return strategy;
  }
}
