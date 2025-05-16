// src/strategies/rectangle-data-strategy.ts
import { Rectangle } from '@src/entities/2d/rectangle';
import { RectangleMathService } from '@src/services/geometry/rectangle-math';
import { ShapeDataStrategy } from '@src/interfaces/shape-data-strategy.interface';

export class RectangleDataStrategy implements ShapeDataStrategy {
  constructor(private rectangleMathService: RectangleMathService) {}

  calculateArea(shape: Rectangle): number {
    return this.rectangleMathService.getArea(shape);
  }

  calculatePerimeter(shape: Rectangle): number {
    return this.rectangleMathService.getPerimeter(shape);
  }

  calculateVolume(shape: Rectangle): number {
    return 0; // Прямоугольник не имеет объема
  }
}
