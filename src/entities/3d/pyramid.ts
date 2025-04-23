// src/entities/3d/pyramid.ts
import { Shape } from '../base/shape';
import { Point } from '../base/point';

export class Pyramid extends Shape {
  constructor(
    public readonly basePoints: Point[],
    public readonly apex: Point,
  ) {
    super('Pyramid');
  }
}
