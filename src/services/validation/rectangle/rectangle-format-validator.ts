// src/services/validation/rectangle/rectangle-format-validator.ts
import { Validator } from '@src/interfaces/validator.interface';
import { Point } from '@src/entities/base/point';
import { PointValidator } from '../point-validator';
import { ValidationResult } from '@src/interfaces/validation-result.interface';

export class RectangleFormatValidator implements Validator<Point[]> {
  validate(points: Point[]): ValidationResult {
    const expectedDim = 2;

    if (points.length !== 4) {
      return { isValid: false, reason: 'Rectangle must have 4 points' };
    }

    if (!PointValidator.isArrayValid(points, expectedDim)) {
      return { isValid: false, reason: 'Invalid 2D point format in rectangle' };
    }

    return { isValid: true };
  }
}
