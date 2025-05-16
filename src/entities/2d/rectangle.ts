// src/entities/2d/rectangle.ts
import { Shape } from '../base/shape';
import { Point } from '../base/point';
import { rectangleValidator } from '@src/services/validation/rectangle/rectangle-validator';
import { InvalidShapeDataError } from '@src/core/errors/errors';

export class Rectangle extends Shape {
  private _points: Point[];

  constructor(points: Point[]) {
    super('Rectangle');
    this.validatePoints(points);
    this._points = points;
  }

  get points(): Point[] {
    return this._points;
  }

  set points(value: Point[]) {
    this.validatePoints(value);
    this._points = value;
    this.notify();
  }

  private validatePoints(points: Point[]): void {
    const result = rectangleValidator.validate(points);
    if (!result.isValid) {
      throw new InvalidShapeDataError(`Invalid rectangle points: ${result.reason ?? ''}`);
    }
  }
}
