// src/services/validation/rectangle/rectangle-format-validator.ts
import { Validator } from '../../../interfaces/validator.interface';
import { Point } from '../../../entities/base/point';
import { PointValidator } from '../point-validator';
import { ValidationResult } from '../../../interfaces/validation-result.interface';

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
