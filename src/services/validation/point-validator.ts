// src/services/validation/point-validator.ts
import { Point } from '@src/entities/base/point';

export class PointValidator {
  static isValid(point: Point, expectedDim: number): boolean {
    return point.dimension === expectedDim && point.coordinates.every((c) => !isNaN(c));
  }

  static isArrayValid(points: Point[], expectedDim: number): boolean {
    return points.every((p) => this.isValid(p, expectedDim));
  }

  static hasValidFormat(coords: string[], dim: number): boolean {
    if (coords.length !== dim) return false;
    return coords.every((s) => !isNaN(parseFloat(s)));
  }
}
