// src/entities/2d/rectangle.ts
import { Shape } from '../base/shape';
import { Point } from '../base/point';

export class Rectangle extends Shape {
  constructor(public readonly points: Point[]) {
    super('Rectangle');
  }
}
