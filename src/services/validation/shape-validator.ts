import { Validator } from '../../interfaces/validator.interface';
import { Point } from '../../entities/base/point';
import { PointValidator } from './point-validator';
import { PyramidData } from '../../interfaces/pyramid-data.interface';
import { ValidationResult } from '../../interfaces/validation-result.interface';

export class RectangleValidator implements Validator<Point[]> {
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

export class PyramidValidator implements Validator<PyramidData> {
  validate(data: PyramidData): ValidationResult {
    const { base, apex } = data;
    const expectedDim = 3;
    //TODO: move contants to constants file

    if (base.length < 3) return { isValid: false, reason: 'Base must have at least 3 points' };
    if (!PointValidator.isValid(apex, expectedDim))
      return { isValid: false, reason: 'Invalid apex point' };
    if (!PointValidator.isArrayValid(base, expectedDim))
      return { isValid: false, reason: 'Invalid base points' };

    return { isValid: true };
  }
}
