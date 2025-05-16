// src/strategies/pyramid-data-strategy.ts
import { Pyramid } from '@src/entities/3d/pyramid';
import { PyramidMathService } from '@src/services/geometry/pyramid-math';
import { ShapeDataStrategy } from '@src/interfaces/shape-data-strategy.interface';

export class PyramidDataStrategy implements ShapeDataStrategy {
  constructor(private pyramidMathService: PyramidMathService) {}

  calculateArea(shape: Pyramid): number {
    return this.pyramidMathService.getSurfaceArea(shape);
  }

  calculatePerimeter(shape: Pyramid): number {
    return 0;
  }

  calculateVolume(shape: Pyramid): number {
    return this.pyramidMathService.getVolume(shape);
  }
}
