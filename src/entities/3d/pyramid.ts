// src/entities/3d/pyramid.ts
import { Shape } from '../base/shape';
import { Point } from '../base/point';
import { pyramidValidator } from '@src/services/validation/pyramid/pyramid-validator';
import { InvalidShapeDataError } from '@src/core/errors/errors';
import { PyramidData } from '@src/interfaces/pyramid-data.interface';

export class Pyramid extends Shape {
  private _basePoints: Point[];
  private _apex: Point;

  constructor(basePoints: Point[], apex: Point) {
    super('Pyramid');
    this.validate(basePoints, apex);
    this._basePoints = basePoints;
    this._apex = apex;
  }

  get basePoints(): Point[] {
    return this._basePoints;
  }

  set basePoints(value: Point[]) {
    this.validate(value, this._apex);
    this._basePoints = value;
    this.notify();
  }

  get apex(): Point {
    return this._apex;
  }

  set apex(value: Point) {
    this.validate(this._basePoints, value);
    this._apex = value;
    this.notify();
  }

  private validate(base: Point[], apex: Point): void {
    const data: PyramidData = { base, apex };
    const result = pyramidValidator.validate(data);
    if (!result.isValid) {
      throw new InvalidShapeDataError(`Invalid pyramid data: ${result.reason ?? ''}`);
    }
  }
}
