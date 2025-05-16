// src/services/validation/rectangle/rectangle-geometry-validator.ts
import { Validator } from '@src/interfaces/validator.interface';
import { Point } from '@src/entities/base/point';
import { ValidationResult } from '@src/interfaces/validation-result.interface';
import { angleBetween } from '@src/utils/geometry';

export class RectangleGeometryValidator implements Validator<Point[]> {
  validate(points: Point[]): ValidationResult {
    if (points.length !== 4) {
      return { isValid: false, reason: 'Rectangle must have 4 points' };
    }

    for (let i = 0; i < 4; i++) {
      const prev = points[(i + 3) % 4];
      const center = points[i];
      const next = points[(i + 1) % 4];

      const angle = angleBetween(prev, center, next);
      if (Math.abs(angle - Math.PI / 2) > 1e-6) {
        return { isValid: false, reason: 'Rectangle must have all 90-degree angles' };
      }
    }

    return { isValid: true };
  }
}
