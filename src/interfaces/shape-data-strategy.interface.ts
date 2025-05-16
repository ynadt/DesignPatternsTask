// src/interfaces/shape-data-strategy.interface.ts
import { Shape } from '@src/entities/base/shape';

export interface ShapeDataStrategy {
  calculateArea(shape: Shape): number;
  calculateVolume(shape: Shape): number;
  calculatePerimeter(shape: Shape): number;
}
